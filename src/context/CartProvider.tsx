import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from './CartContext'
import type { CartContextValue, CartItem } from './CartContext'

const storageKey = 'sofamisu-cart'

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(storageKey)
    return storedCart ? (JSON.parse(storedCart) as CartItem[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(readStoredCart)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(cartItems))
  }, [cartItems])

  const value = useMemo<CartContextValue>(() => {
    const addCartItem = (item: CartItem) => {
      setCartItems((current) => {
        const existingItem = current.find((cartItem) => cartItem.id === item.id)

        if (!existingItem) {
          return [...current, item]
        }

        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        )
      })
    }

    const updateCartItemQuantity = (id: string, quantity: number) => {
      setCartItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
        ),
      )
    }

    const removeCartItem = (id: string) => {
      setCartItems((current) => current.filter((item) => item.id !== id))
    }

    return {
      addCartItem,
      cartItems,
      removeCartItem,
      totalQuantity: cartItems.reduce((total, item) => total + item.quantity, 0),
      updateCartItemQuantity,
    }
  }, [cartItems])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
