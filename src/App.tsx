import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { CartProvider } from './context/CartProvider'
import { Collections } from './pages/Collections'
import { FAQ } from './pages/FAQ'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'

function AppRoutes() {
  const path = window.location.pathname
  const isCollectionsPage = path === '/collections'
  const isFAQPage = path === '/faq'
  const productMatch = path.match(/^\/products\/([^/]+)$/)
  const productHandle = productMatch?.[1]

  return (
    <>
      <Navbar
        forceShrunk={isCollectionsPage || isFAQPage || Boolean(productHandle)}
      />
      {productHandle ? (
        <ProductDetail handle={productHandle} />
      ) : isFAQPage ? (
        <FAQ />
      ) : isCollectionsPage ? (
        <Collections />
      ) : (
        <Home />
      )}
      <Footer />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  )
}

export default App
