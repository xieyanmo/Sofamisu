import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const projectRoot = process.cwd()
const assetFolderCandidates = [
  path.join(projectRoot, 'asset'),
  path.join(projectRoot, 'assets'),
  path.join(projectRoot, 'src', 'assets'),
]
const supportedWorkbookExtensions = new Set(['.xlsx', '.xlsm'])

function findAssetFolder() {
  const folder = assetFolderCandidates.find((candidate) => fs.existsSync(candidate))

  if (!folder) {
    throw new Error(
      `Could not find an asset folder. Checked: ${assetFolderCandidates.join(', ')}`,
    )
  }

  return folder
}

function findWorkbook(assetFolder) {
  const workbook = fs
    .readdirSync(assetFolder)
    .find((fileName) => path.parse(fileName).name === 'product_variant')

  if (!workbook) {
    throw new Error(`Could not find product_variant workbook in ${assetFolder}`)
  }

  const extension = path.extname(workbook).toLowerCase()

  if (!supportedWorkbookExtensions.has(extension)) {
    throw new Error(
      `Unsupported workbook extension "${extension}". Please save product_variant as .xlsx.`,
    )
  }

  return path.join(assetFolder, workbook)
}

function readZipEntries(filePath) {
  const buffer = fs.readFileSync(filePath)
  const endSearchStart = Math.max(0, buffer.length - 0xffff - 22)
  let endOffset = -1

  for (let index = buffer.length - 22; index >= endSearchStart; index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) {
      endOffset = index
      break
    }
  }

  if (endOffset === -1) {
    throw new Error('Invalid .xlsx file: zip end record was not found.')
  }

  const entryCount = buffer.readUInt16LE(endOffset + 10)
  const centralDirectoryOffset = buffer.readUInt32LE(endOffset + 16)
  const entries = new Map()
  let offset = centralDirectoryOffset

  for (let entryIndex = 0; entryIndex < entryCount; entryIndex += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error('Invalid .xlsx file: central directory is corrupt.')
    }

    const compressionMethod = buffer.readUInt16LE(offset + 10)
    const compressedSize = buffer.readUInt32LE(offset + 20)
    const fileNameLength = buffer.readUInt16LE(offset + 28)
    const extraLength = buffer.readUInt16LE(offset + 30)
    const commentLength = buffer.readUInt16LE(offset + 32)
    const localHeaderOffset = buffer.readUInt32LE(offset + 42)
    const fileName = buffer
      .subarray(offset + 46, offset + 46 + fileNameLength)
      .toString('utf8')
      .replaceAll('\\', '/')

    if (buffer.readUInt32LE(localHeaderOffset) !== 0x04034b50) {
      throw new Error(`Invalid .xlsx file: local header is corrupt for ${fileName}.`)
    }

    const localFileNameLength = buffer.readUInt16LE(localHeaderOffset + 26)
    const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28)
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraLength
    const compressedData = buffer.subarray(dataStart, dataStart + compressedSize)
    let data

    if (compressionMethod === 0) {
      data = compressedData
    } else if (compressionMethod === 8) {
      data = zlib.inflateRawSync(compressedData)
    } else {
      throw new Error(
        `Unsupported zip compression method ${compressionMethod} for ${fileName}.`,
      )
    }

    entries.set(fileName, data.toString('utf8'))
    offset += 46 + fileNameLength + extraLength + commentLength
  }

  return entries
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
}

function readSharedStrings(entries) {
  const xml = entries.get('xl/sharedStrings.xml')

  if (!xml) {
    return []
  }

  return [...xml.matchAll(/<si[\s\S]*?<\/si>/g)].map(([itemXml]) =>
    [...itemXml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)]
      .map((match) => decodeXml(match[1]))
      .join(''),
  )
}

function getFirstWorksheetXml(entries) {
  const workbookXml = entries.get('xl/workbook.xml')
  const workbookRelsXml = entries.get('xl/_rels/workbook.xml.rels')

  if (!workbookXml || !workbookRelsXml) {
    return entries.get('xl/worksheets/sheet1.xml')
  }

  const firstSheetMatch = workbookXml.match(/<sheet\b[^>]*r:id="([^"]+)"/)
  const firstSheetRelationshipId = firstSheetMatch?.[1]

  if (!firstSheetRelationshipId) {
    return entries.get('xl/worksheets/sheet1.xml')
  }

  const relationshipPattern = new RegExp(
    `<Relationship\\b[^>]*Id="${firstSheetRelationshipId}"[^>]*Target="([^"]+)"`,
  )
  const relationshipMatch = workbookRelsXml.match(relationshipPattern)
  const target = relationshipMatch?.[1]

  if (!target) {
    return entries.get('xl/worksheets/sheet1.xml')
  }

  const normalizedTarget = target.startsWith('/')
    ? target.slice(1)
    : path.posix.normalize(`xl/${target}`)

  return entries.get(normalizedTarget)
}

function columnIndexFromReference(cellReference) {
  const letters = cellReference.match(/^[A-Z]+/i)?.[0] ?? ''

  return [...letters.toUpperCase()].reduce(
    (value, letter) => value * 26 + letter.charCodeAt(0) - 64,
    0,
  )
}

function readCellValue(attributes, cellXml, sharedStrings) {
  const type = attributes.match(/\bt="([^"]+)"/)?.[1]

  if (type === 'inlineStr') {
    const text = [...cellXml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)]
      .map((match) => decodeXml(match[1]))
      .join('')

    return text.trim()
  }

  const value = cellXml.match(/<v>([\s\S]*?)<\/v>/)?.[1] ?? ''

  if (type === 's') {
    return (sharedStrings[Number(value)] ?? '').trim()
  }

  return decodeXml(value).trim()
}

function readRowsFromWorkbook(filePath) {
  const entries = readZipEntries(filePath)
  const sharedStrings = readSharedStrings(entries)
  const worksheetXml = getFirstWorksheetXml(entries)

  if (!worksheetXml) {
    throw new Error('Could not find a worksheet in the product_variant workbook.')
  }

  return [...worksheetXml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)].map(
    ([, rowXml]) => {
      const row = []
      let fallbackColumnIndex = 1

      for (const [, attributes, cellXml] of rowXml.matchAll(
        /<c\b([^>]*)>([\s\S]*?)<\/c>/g,
      )) {
        const cellReference = attributes.match(/\br="([^"]+)"/)?.[1]
        const columnIndex = cellReference
          ? columnIndexFromReference(cellReference)
          : fallbackColumnIndex

        row[columnIndex - 1] = readCellValue(attributes, cellXml, sharedStrings)
        fallbackColumnIndex = columnIndex + 1
      }

      return row
    },
  )
}

function splitOptionList(value) {
  return String(value ?? '')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeSize(size) {
  return size.replace(/[＊*×X]/g, 'x')
}

function safePathSegment(value, label) {
  const segment = String(value).trim()

  if (!segment || segment.includes('/') || segment.includes('\\') || segment === '.') {
    throw new Error(`Invalid ${label} path segment: "${value}"`)
  }

  if (segment === '..') {
    throw new Error(`Invalid ${label} path segment: "${value}"`)
  }

  return segment
}

function buildGeneratedProducts(rows) {
  const headerRow = rows.find((row) => row.some(Boolean))

  if (!headerRow) {
    throw new Error('The workbook does not contain a header row.')
  }

  const headerMap = new Map(
    headerRow.map((header, index) => [String(header).trim().toLowerCase(), index]),
  )
  const requiredColumns = ['productid', 'material', 'size', 'color']

  for (const column of requiredColumns) {
    if (!headerMap.has(column)) {
      throw new Error(`Missing required column: ${column}`)
    }
  }

  const products = {}
  const dataRows = rows.slice(rows.indexOf(headerRow) + 1)

  for (const row of dataRows) {
    const productId = safePathSegment(row[headerMap.get('productid')], 'productid')

    if (!productId) {
      continue
    }

    const productNameColumnIndex = headerMap.get('productname')
    const productName =
      productNameColumnIndex === undefined
        ? productId
        : String(row[productNameColumnIndex] ?? productId).trim() || productId
    const materials = splitOptionList(row[headerMap.get('material')]).map((material) =>
      safePathSegment(material, 'material'),
    )
    const sizes = splitOptionList(row[headerMap.get('size')]).map((size) =>
      safePathSegment(normalizeSize(size), 'size'),
    )
    const colors = splitOptionList(row[headerMap.get('color')]).map((color) =>
      safePathSegment(color, 'color'),
    )
    const imageBasePaths = {}

    for (const material of materials) {
      imageBasePaths[material] = {}

      for (const size of sizes) {
        imageBasePaths[material][size] = {}

        for (const color of colors) {
          imageBasePaths[material][size][
            color
          ] = `/product_picture/${productId}/${material}/${size}/${color}/`
        }
      }
    }

    products[productId] = {
      productId,
      productName,
      materials,
      sizes,
      colors,
      imageBasePaths,
    }
  }

  return products
}

function createImageFolders(assetFolder, products) {
  const productPictureRoot = path.join(assetFolder, 'product_picture')
  const swatchPictureRoot = path.join(assetFolder, 'swatch_pic')
  const requiredImageFolders = new Set()

  fs.mkdirSync(productPictureRoot, { recursive: true })
  fs.mkdirSync(swatchPictureRoot, { recursive: true })

  for (const product of Object.values(products)) {
    for (const material of product.materials) {
      for (const size of product.sizes) {
        for (const color of product.colors) {
          const folderPath = path.join(
            productPictureRoot,
            product.productId,
            material,
            size,
            color,
          )

          requiredImageFolders.add(path.relative(productPictureRoot, folderPath))
          fs.mkdirSync(folderPath, { recursive: true })
        }
      }
    }
  }

  return { productPictureRoot, requiredImageFolders, swatchPictureRoot }
}

function collectImageOptionFolders(productPictureRoot) {
  if (!fs.existsSync(productPictureRoot)) {
    return []
  }

  const imageOptionFolders = []

  for (const productId of fs.readdirSync(productPictureRoot)) {
    const productPath = path.join(productPictureRoot, productId)

    if (!fs.statSync(productPath).isDirectory()) {
      continue
    }

    for (const material of fs.readdirSync(productPath)) {
      const materialPath = path.join(productPath, material)

      if (!fs.statSync(materialPath).isDirectory()) {
        continue
      }

      for (const size of fs.readdirSync(materialPath)) {
        const sizePath = path.join(materialPath, size)

        if (!fs.statSync(sizePath).isDirectory()) {
          continue
        }

        for (const color of fs.readdirSync(sizePath)) {
          const colorPath = path.join(sizePath, color)

          if (fs.statSync(colorPath).isDirectory()) {
            imageOptionFolders.push(
              path.relative(productPictureRoot, colorPath),
            )
          }
        }
      }
    }
  }

  return imageOptionFolders
}

function warnAboutUnusedImageFolders(productPictureRoot, requiredImageFolders) {
  const unusedFolders = collectImageOptionFolders(productPictureRoot).filter(
    (folderPath) => !requiredImageFolders.has(folderPath),
  )

  if (unusedFolders.length === 0) {
    return unusedFolders
  }

  console.warn(
    `Warning: ${unusedFolders.length} existing product_picture folder(s) are not referenced by generatedProducts.js.`,
  )
  console.warn('These folders were not deleted. Existing images are preserved.')

  for (const folderPath of unusedFolders) {
    console.warn(`Unused folder: ${path.join(productPictureRoot, folderPath)}`)
  }

  return unusedFolders
}

function writeGeneratedConfig(products) {
  const outputPath = path.join(projectRoot, 'src', 'data', 'generatedProducts.js')
  const fileContents = `// This file is generated by scripts/generate-products.js.
// Do not edit manually. Update src/assets/product_variant.xlsx and run npm run generate:products.

export const generatedProducts = ${JSON.stringify(products, null, 2)};
`

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, fileContents)

  return outputPath
}

const assetFolder = findAssetFolder()
const workbookPath = findWorkbook(assetFolder)
const rows = readRowsFromWorkbook(workbookPath)
const products = buildGeneratedProducts(rows)
const { productPictureRoot, requiredImageFolders, swatchPictureRoot } = createImageFolders(
  assetFolder,
  products,
)
const generatedConfigPath = writeGeneratedConfig(products)
const unusedImageFolders = warnAboutUnusedImageFolders(
  productPictureRoot,
  requiredImageFolders,
)

console.log(`Read workbook: ${path.relative(projectRoot, workbookPath)}`)
console.log(`Generated config: ${path.relative(projectRoot, generatedConfigPath)}`)
console.log(`Created image folders under: ${path.relative(projectRoot, productPictureRoot)}`)
console.log(`Created swatch folder: ${path.relative(projectRoot, swatchPictureRoot)}`)
console.log(`Unused product_picture folders: ${unusedImageFolders.length}`)
console.log(`Products generated: ${Object.keys(products).length}`)
