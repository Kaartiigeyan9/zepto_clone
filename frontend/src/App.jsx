import React, { useEffect, useMemo, useState } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import CategoryChips from './components/CategoryChips'
import HeroCarousel from './components/HeroCarousel'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import { PRODUCTS } from './data/products'

function HomeView({products, onSelectCategory, onOpenCart, onSearch}){
  return (
    <div>
      <HeroCarousel />
      <div className="section">
        <div style={{fontWeight:800}}>Top Picks for You</div>
        <div className="h-scroll" style={{marginTop:8}}>
          {products.slice(0,6).map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      <div className="section">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontWeight:800}}>10-Minute Delivery</div>
          <div style={{fontSize:13,color:'#666'}}>View all</div>
        </div>
        <div className="grid" style={{marginTop:12}}>
          {products.slice(0,8).map(p=> (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ResultsView({items, onFilter}){
  return (
    <div>
      <div className="filtered-controls">
        <div className="filter-chip">Price</div>
        <div className="filter-chip">Brand</div>
        <div className="filter-chip">Discount</div>
      </div>
      <div className="section">
        <div className="grid">
          {items.map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [openCart, setOpenCart] = useState(false)

  const products = useMemo(()=> {
    let res = PRODUCTS
    if(category) res = res.filter(p=> p.category === category)
    if(query) res = res.filter(p=> p.name.toLowerCase().includes(query.toLowerCase()))
    return res
  },[category, query])

  return (
    <CartProvider>
      <div className="app">
        <Header onOpenCart={()=> setOpenCart(true)} onSearch={setQuery} />
        <CategoryChips onSelect={(c)=> setCategory(c)} active={category} />
        <div style={{padding:8}}>
          {query || category ? (
            <ResultsView items={products} />
          ) : (
            <HomeView products={products} />
          )}
        </div>

        <div className="cart-fab" onClick={()=> setOpenCart(true)}>
          Cart
        </div>

        <CartDrawer open={openCart} onClose={()=> setOpenCart(false)} />
      </div>
    </CartProvider>
  )
}
