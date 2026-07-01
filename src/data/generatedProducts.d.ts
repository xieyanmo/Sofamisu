export type GeneratedProduct = {
  productId: string
  productName: string
  materials: string[]
  sizes: string[]
  colors: string[]
  imageBasePaths: Record<string, Record<string, Record<string, string>>>
}

export const generatedProducts: Record<string, GeneratedProduct>
