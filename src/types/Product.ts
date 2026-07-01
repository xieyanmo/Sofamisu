export type ProductImage = {
  altText: string
  height?: number
  id: string
  url: string
  width?: number
}

export type ProductVariant = {
  availableForSale: boolean
  id: string
  inventoryQuantity: number
  price: number
  title: string
}

export type ProductColorVariant = {
  code: string
  id: string
  images: ProductImage[]
  name: string
  swatchColor: string
  swatchImage: string
}

export type Product = {
  availableForSale: boolean
  category: string
  colorVariants: ProductColorVariant[]
  compareAtPrice: number | null
  description: string
  featuredImage: ProductImage
  generatedProductId: string
  handle: string
  hoverImage: ProductImage
  id: string
  images: ProductImage[]
  inventoryQuantity: number
  price: number
  title: string
  variants: ProductVariant[]
}
