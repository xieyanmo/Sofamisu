import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { CartProvider } from './context/CartProvider'
import { Collections } from './pages/Collections'
import { FAQ } from './pages/FAQ'
import { Home } from './pages/Home'
import { Account } from './pages/Account'
import { Login } from './pages/Login'
import { ProductDetail } from './pages/ProductDetail'

function AppRoutes() {
  const path = window.location.pathname
  const isAccountPage = path === '/account'
  const isCollectionsPage = path === '/collections'
  const isFAQPage = path === '/faq'
  const isLoginPage = path === '/login'
  const productMatch = path.match(/^\/products\/([^/]+)$/)
  const productHandle = productMatch?.[1]

  return (
    <>
      <Navbar
        forceShrunk={
          isAccountPage ||
          isCollectionsPage ||
          isFAQPage ||
          isLoginPage ||
          Boolean(productHandle)
        }
      />
      {productHandle ? (
        <ProductDetail handle={productHandle} />
      ) : isAccountPage ? (
        <Account />
      ) : isFAQPage ? (
        <FAQ />
      ) : isLoginPage ? (
        <Login />
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
