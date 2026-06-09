import React, { useEffect, useRef, useState } from 'react'

const banners = [
  'Up to 30% off on essentials',
  'Free delivery on orders above ₹199',
  'Exclusive offers on dairy & bakery'
]

export default function HeroCarousel(){
  const [idx,setIdx] = useState(0)
  const ref = useRef()

  useEffect(()=>{
    const t = setInterval(()=> setIdx(i=> (i+1)%banners.length), 3000)
    return ()=> clearInterval(t)
  },[])

  return (
    <div className="hero">
      <div className="carousel">
        <div className="carouselInner" style={{transform:`translateX(${-idx*100}%)`}}>
          {banners.map((b,i)=> (
            <div className="banner" key={i}>
              <div style={{padding:20,fontSize:16}}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
