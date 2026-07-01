import type { ProductImage } from '../types/Product'

const productPictureAssets = import.meta.glob(
  '../assets/product_picture/**/*.{avif,jpeg,jpg,png,webp}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
) as Record<string, string>

const swatchAssets = import.meta.glob(
  '../assets/swatch_pic/**/*.{avif,jpeg,jpg,png,webp}',
  {
    eager: true,
    import: 'default',
    query: '?url',
  },
) as Record<string, string>

const normalizeAssetKey = (value: string) =>
  value.replaceAll('\\', '/').replace(/^.*assets\//, '')

const normalizePublicPath = (value: string) =>
  value.replaceAll('\\', '/').replace(/^\/+/, '').replace(/\/?$/, '/')

const getFileName = (value: string) => value.split('/').at(-1) ?? value

export const createProductImagesFromFolder = (
  productTitle: string,
  imageBasePath: string,
): ProductImage[] => {
  const normalizedBasePath = normalizePublicPath(imageBasePath)
  const imageEntries = Object.entries(productPictureAssets)
    .map(([assetKey, url]) => ({
      assetPath: normalizeAssetKey(assetKey),
      url,
    }))
    .filter(({ assetPath }) => assetPath.startsWith(normalizedBasePath))
    .toSorted((firstImage, secondImage) =>
      getFileName(firstImage.assetPath).localeCompare(
        getFileName(secondImage.assetPath),
        undefined,
        {
          numeric: true,
          sensitivity: 'base',
        },
      ),
    )

  if (imageEntries.length === 0) {
    return [
      {
        altText: productTitle,
        id: `${imageBasePath}placeholder`,
        url: '',
      },
    ]
  }

  return imageEntries.map(({ assetPath, url }, index) => ({
    altText:
      index === 0
        ? productTitle
        : `${productTitle} alternate view ${index + 1}`,
    id: assetPath,
    url,
  }))
}

export const resolveSwatchAssetUrl = (swatchPath: string) => {
  const normalizedSwatchPath = swatchPath.replaceAll('\\', '/').replace(/^\/+/, '')
  const matchingEntry = Object.entries(swatchAssets).find(([assetKey]) =>
    normalizeAssetKey(assetKey).endsWith(normalizedSwatchPath),
  )

  return matchingEntry?.[1] ?? swatchPath
}
