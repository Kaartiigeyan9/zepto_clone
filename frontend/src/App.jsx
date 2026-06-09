import React, { useEffect, useState } from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import CategoryChips from './components/CategoryChips'
import HeroCarousel from './components/HeroCarousel'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function HomeView({products}){
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

function ResultsView({items}){
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
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (query) params.append('q', query)

        const url = `http://localhost:8001/products?${params.toString()}`
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Failed to load products: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setProducts([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [category, query])

  return (
    <CartProvider>
      <div className="app">
        <Header onOpenCart={()=> setOpenCart(true)} onSearch={setQuery} />
        <CategoryChips onSelect={(c)=> setCategory(c)} active={category} />
        <div style={{padding:8}}>
          {loading ? (
            <div>Loading products...</div>
          ) : error ? (
            <div style={{color:'red'}}>Error loading products: {error}</div>
          ) : query || category ? (
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
