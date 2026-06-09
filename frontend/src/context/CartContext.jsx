import React, { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const add = (product) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))

  const clear = () => setItems([])

  const subtotal = items.reduce((s, p) => s + p.price * p.qty, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}
