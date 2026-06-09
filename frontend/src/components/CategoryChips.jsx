import React from 'react'

const CATS = ['Fruits & Veggies','Dairy','Snacks','Beverages','Bakery','Frozen','Cleaning','Personal Care']

export default function CategoryChips({onSelect, active}){
  return (
    <div className="chips">
      {CATS.map(c=> (
        <div key={c} className="chip" onClick={()=>onSelect(c)} style={{borderColor: active===c ? '#FF1F71' : undefined}}>{c}</div>
      ))}
    </div>
  )
}
