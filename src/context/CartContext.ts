import { createContext, useContext } from 'react'
import type { ProductImage } from '../types/Product'

export type CartItem = {
  colorName: string
  colorSwatch?: string
  colorSwatchImage?: string
  id: string
  image: ProductImage
  price: number
  productHandle: string
  productTitle: string
  quantity: number
}

export type CartContextValue = {
  addCartItem: (item: CartItem) => void
  cartItems: CartItem[]
  removeCartItem: (id: string) => void
  totalQuantity: number
  updateCartItemQuantity: (id: string, quantity: number) => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
