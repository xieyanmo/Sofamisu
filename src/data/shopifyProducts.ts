import { generatedProducts } from './generatedProducts.js'
import { masterData } from './masterData.js'
import {
  createProductImagesFromFolder,
  resolveSwatchAssetUrl,
} from './productAssets'
import type { Product, ProductColorVariant } from '../types/Product'

const temporaryProductContent = [
  {
    description:
      'A made-to-order leather sofa placeholder for future Shopify product data.',
    price: 2890,
    compareAtPrice: null,
    inventoryQuantity: 12,
  },
  {
    description:
      'A local sample product that can later be replaced with Shopify data.',
    price: 3190,
    compareAtPrice: 3490,
    inventoryQuantity: 8,
  },
  {
    description:
      'A temporary catalogue entry for layout, filtering, and cart testing.',
    price: 2690,
    compareAtPrice: null,
    inventoryQuantity: 10,
  },
]

const getFirstOption = (options: string[]) => options[0] ?? ''

const getDefaultImageBasePath = (
  generatedProduct: (typeof generatedProducts)[string],
) => {
  const material = getFirstOption(generatedProduct.materials)
  const size = getFirstOption(generatedProduct.sizes)
  const color = getFirstOption(generatedProduct.colors)

  return (
    generatedProduct.imageBasePaths[material]?.[size]?.[color] ??
    `/product_picture/${generatedProduct.productId}/${material}/${size}/${color}/`
  )
}

const createColorVariants = (
  generatedProduct: (typeof generatedProducts)[string],
): ProductColorVariant[] => {
  const material = getFirstOption(generatedProduct.materials)
  const size = getFirstOption(generatedProduct.sizes)

  return generatedProduct.colors.map((color) => {
    const colorName = masterData.colors[color]?.label ?? color
    const imageBasePath =
      generatedProduct.imageBasePaths[material]?.[size]?.[color] ??
      `/product_picture/${generatedProduct.productId}/${material}/${size}/${color}/`

    return {
      id: color,
      code: color,
      images: createProductImagesFromFolder(
        `${generatedProduct.productName} in ${colorName}`,
        imageBasePath,
      ),
      name: colorName,
      swatchColor: '#BE8B48',
      swatchImage: resolveSwatchAssetUrl(
        masterData.colors[color]?.swatch ?? `/swatch_pic/${color}.jpg`,
      ),
    }
  })
}

const generatedProductEntries = Object.values(generatedProducts)

export const featuredProductHandles = generatedProductEntries
  .slice(0, 5)
  .map((product) => product.productId.toLowerCase())

export const shopifyProducts: Product[] = generatedProductEntries.map(
  (generatedProduct, index) => {
    const temporaryContent =
      temporaryProductContent[index % temporaryProductContent.length]
    const defaultImageBasePath = getDefaultImageBasePath(generatedProduct)
    const images = createProductImagesFromFolder(
      generatedProduct.productName,
      defaultImageBasePath,
    )

    return {
      availableForSale: true,
      category: 'Sofas',
      colorVariants: createColorVariants(generatedProduct),
      compareAtPrice: temporaryContent.compareAtPrice,
      description: temporaryContent.description,
      featuredImage: images[0],
      generatedProductId: generatedProduct.productId,
      handle: generatedProduct.productId.toLowerCase(),
      hoverImage: images[1] ?? images[0],
      id: generatedProduct.productId,
      images,
      inventoryQuantity: temporaryContent.inventoryQuantity,
      price: temporaryContent.price,
      title: generatedProduct.productName,
      variants: [
        {
          availableForSale: true,
          id: `${generatedProduct.productId}-default`,
          inventoryQuantity: temporaryContent.inventoryQuantity,
          price: temporaryContent.price,
          title: 'Default',
        },
      ],
    }
  },
)
