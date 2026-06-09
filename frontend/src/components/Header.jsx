import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function Header({ onOpenCart, onSearch }){
  const { items, subtotal } = useContext(CartContext)
  const count = items.reduce((s, i) => s + i.qty, 0)
  return (
    <div className="header">
      <div className="row space-between">
        <div>
          <div className="location">Delivering to: <strong>HSR Layout</strong></div>
          <div style={{fontSize:12,color:'#FF1F71',fontWeight:700}}>Delivery in 8 mins</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:12,color:'#666'}}>Subtotal</div>
          <div style={{fontWeight:700}}>₹{subtotal}</div>
        </div>
      </div>
      <div className="search">
        <input placeholder="Search for products, brands and more" onChange={e=>onSearch(e.target.value)} />
        <div className="badge" onClick={onOpenCart} style={{cursor:'pointer'}}>{count}</div>
      </div>
    </div>
  )
}
