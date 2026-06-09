import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

export default function ProductCard({p, compact}){
  const { add, items, updateQty, remove } = useContext(CartContext)
  const inCart = items.find(i=>i.id===p.id)

  const inc = () => add(p)
  const dec = () => {
    const cur = items.find(i=>i.id===p.id)
    if(!cur) return
    if(cur.qty<=1) remove(p.id)
    else updateQty(p.id, cur.qty-1)
  }

  return (
    <div className="product-card">
      <img src={p.image} alt={p.name} />
      <div className="product-name">{p.name}</div>
      <div className="product-meta">{p.weight}</div>
      <div className="price-row">
        <div className="price">₹{p.price}</div>
        <div className="orig">₹{p.originalPrice}</div>
        <div className="discount">{p.discount}% OFF</div>
      </div>
      {!inCart ? (
        <div className="add-btn" onClick={inc}>ADD</div>
      ) : (
        <div className="qty-stepper">
          <button onClick={dec}>−</button>
          <span>{inCart.qty}</span>
          <button onClick={inc}>+</button>
        </div>
      )}
    </div>
  )
}
