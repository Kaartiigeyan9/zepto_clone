import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function CartDrawer({open,onClose}){
  const { items, updateQty, remove, subtotal } = useContext(CartContext)
  const delivery = subtotal>=199 ? 0 : 39
  const platform = Math.round(subtotal*0.03)
  const total = subtotal + delivery + platform

  return (
    <>
      <div className={"overlay " + (open? 'show':'')} onClick={onClose} />
      <div className={"drawer " + (open? 'open':'')}>
        <div style={{padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontWeight:700}}>Your Cart</div>
          <div style={{color:'#666'}}>{items.length} items</div>
        </div>
        <div style={{overflow:'auto',maxHeight: '50vh'}}>
          {items.map(it=> (
            <div className="cart-item" key={it.id}>
              <img src={it.image} style={{width:60,height:60,borderRadius:8,objectFit:'cover'}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{it.name}</div>
                <div style={{fontSize:13,color:'#666'}}>{it.weight}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
                  <div className="qty-stepper">
                    <button onClick={()=> updateQty(it.id, Math.max(1, it.qty-1))}>−</button>
                    <span>{it.qty}</span>
                    <button onClick={()=> updateQty(it.id, it.qty+1)}>+</button>
                  </div>
                  <div style={{fontWeight:700}}>₹{it.price * it.qty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="summary">
          <div style={{display:'flex',justifyContent:'space-between'}}><div>Subtotal</div><div>₹{subtotal}</div></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><div>Delivery fee</div><div>₹{delivery}</div></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><div>Platform fee</div><div>₹{platform}</div></div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontWeight:800}}><div>Total</div><div>₹{total}</div></div>
          <div style={{marginTop:12}}>
            <div className="cta">Proceed to Pay</div>
          </div>
        </div>
      </div>
    </>
  )
}
