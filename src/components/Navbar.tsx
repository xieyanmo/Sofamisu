import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import logo from '../assets/logo.svg'
import logoPic from '../assets/logo-pic.svg'
import { siteContent } from '../content/siteContent'
import { useCart } from '../context/CartContext'

function ContactIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 md:h-[30px] md:w-[30px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25v7.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15.75v-7.5m18 0A2.25 2.25 0 0 0 18.75 6H5.25A2.25 2.25 0 0 0 3 8.25m18 0-9 5.25-9-5.25"
      />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 md:h-[30px] md:w-[30px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 md:h-[30px] md:w-[30px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 8.25h10.5l-.75 11.25h-9L6.75 8.25ZM9 8.25V6a3 3 0 1 1 6 0v2.25"
      />
    </svg>
  )
}

function IconHoverFrame() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      fill="none"
      viewBox="0 0 48 48"
    >
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="11"
        className="stroke-[#BE8B48] [stroke-dasharray:168] [stroke-dashoffset:168] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0]"
        strokeWidth="1"
      />
      <rect
        x="7"
        y="7"
        width="34"
        height="34"
        rx="9"
        className="stroke-[#BE8B48] [stroke-dasharray:136] [stroke-dashoffset:136] transition-[stroke-dashoffset] delay-75 duration-500 ease-out group-hover:[stroke-dashoffset:0]"
        strokeWidth="1"
      />
    </svg>
  )
}

function IconButton({
  label,
  children,
  className = '',
  href,
  hidden = false,
}: {
  label: string
  children: ReactNode
  className?: string
  href?: string
  hidden?: boolean
}) {
  const buttonClassName = `group relative grid h-10 w-10 place-items-center rounded-[14px] text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] md:h-12 md:w-12 md:rounded-[16px] ${className}`

  return href ? (
    <a
      href={href}
      aria-label={label}
      hidden={hidden}
      className={buttonClassName}
    >
      <IconHoverFrame />
      {children}
    </a>
  ) : (
    <button
      type="button"
      aria-label={label}
      hidden={hidden}
      className={buttonClassName}
    >
      <IconHoverFrame />
      {children}
    </button>
  )
}

type NavbarProps = {
  forceShrunk?: boolean
}

export function Navbar({ forceShrunk = false }: NavbarProps) {
  const { cartItems, removeCartItem, totalQuantity, updateCartItemQuantity } =
    useCart()
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [isCartListScrolling, setIsCartListScrolling] = useState(false)
  const [cartTouchStartX, setCartTouchStartX] = useState<number | null>(null)
  const cartScrollTimeoutRef = useRef<number | null>(null)
  const isShrunk = forceShrunk || hasScrolled
  const navbarHeight = isShrunk ? 88 : 183
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const cartDepositSubtotal = cartSubtotal * 0.5

  useEffect(() => {
    if (forceShrunk) {
      setHasScrolled(true)
      return
    }

    const handleScroll = () => {
      setHasScrolled((current) => {
        if (!current && window.scrollY > 120) {
          return true
        }

        if (current && window.scrollY < 40) {
          return false
        }

        return current
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [forceShrunk])

  useEffect(() => {
    return () => {
      if (cartScrollTimeoutRef.current) {
        window.clearTimeout(cartScrollTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isCartDrawerOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isCartDrawerOpen])

  const handleCartListScroll = () => {
    setIsCartListScrolling(true)

    if (cartScrollTimeoutRef.current) {
      window.clearTimeout(cartScrollTimeoutRef.current)
    }

    cartScrollTimeoutRef.current = window.setTimeout(() => {
      setIsCartListScrolling(false)
    }, 800)
  }
  const handleCartTouchEnd = (endX: number) => {
    if (cartTouchStartX === null) {
      return
    }

    if (Math.abs(endX - cartTouchStartX) > 60) {
      setIsCartDrawerOpen(false)
    }

    setCartTouchStartX(null)
  }

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 w-full text-[#3A1C0F]">
        <div
          className={`w-full overflow-hidden bg-[#F7F4EF] transition-[height] duration-500 ease-out ${
            isShrunk ? 'h-[72px] md:h-[88px]' : 'h-[112px] md:h-[183px]'
          }`}
        >
          <div className="h-4 w-full bg-[#944E25]">
            {siteContent.announcementBar.text && (
              <p className="sr-only">{siteContent.announcementBar.text}</p>
            )}
          </div>

          <nav
            aria-label="Primary navigation"
            className={`mx-auto grid w-full max-w-[96rem] grid-cols-[auto_1fr_auto] items-center px-4 transition-[min-height,padding] duration-500 ease-out md:grid-cols-[1fr_auto_1fr] md:px-6 lg:px-8 ${
              isShrunk
                ? 'min-h-12 pt-2 pb-0 md:min-h-14 md:py-2'
                : 'min-h-20 pt-5 pb-1 md:min-h-32 md:py-8'
            }`}
          >
            <a
              href="/"
              aria-label="Sofamisu home"
              className="flex translate-y-1 items-center justify-self-start md:translate-y-0"
            >
              <img
                src={isShrunk ? logoPic : logo}
                alt={siteContent.navbar.logoAlt}
                className={`w-auto object-contain transition-all duration-500 ease-out ${
                  isShrunk ? 'h-5 md:h-10' : 'h-7 md:h-[103px]'
                }`}
              />
            </a>

            <div
              className={`flex min-w-0 translate-y-1 items-center justify-center gap-3 self-center transition-all duration-500 ease-out md:gap-20 ${
                isShrunk
                  ? 'md:translate-y-4 md:items-center md:self-center'
                  : 'md:translate-y-3 md:items-end md:self-end'
              }`}
            >
              {siteContent.navbar.links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative pb-1.5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.1em] text-[#005A4F] before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:before:scale-x-100 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] md:text-base md:tracking-[0.2em]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex translate-y-1 items-center justify-self-end gap-1 md:translate-y-0 md:gap-3">
              <IconButton label={siteContent.navbar.icons.contact} hidden>
                <ContactIcon />
              </IconButton>
              <IconButton
                label={siteContent.navbar.icons.account}
                href="/login"
                hidden
              >
                <AccountIcon />
              </IconButton>
              <div className="relative">
                <button
                  type="button"
                  aria-label={siteContent.navbar.icons.cart}
                  onClick={() => setIsCartDrawerOpen((current) => !current)}
                  className="group relative grid h-10 w-10 place-items-center rounded-[14px] text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] md:h-12 md:w-12 md:rounded-[16px]"
                >
                  <IconHoverFrame />
                  <CartIcon />
                </button>
                {totalQuantity > 0 && (
                  <span className="pointer-events-none absolute top-1 right-1 grid h-5 min-w-5 select-none place-items-center rounded-full bg-[#944E25] px-1 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-[10px] font-light text-[#F7F4EF]">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      {isCartDrawerOpen && (
        <button
          type="button"
          aria-label="Close cart overlay"
          onClick={() => setIsCartDrawerOpen(false)}
          className="fixed inset-0 z-[55] cursor-default bg-[#3A1C0F]/45 backdrop-blur-sm"
        />
      )}
      <aside
        aria-label="Cart drawer"
        className={`fixed right-0 z-[60] flex w-full max-w-2xl flex-col overscroll-contain overflow-hidden rounded-l-[16px] bg-[#EAE4DB]/75 px-8 py-8 text-[#3A1C0F] shadow-2xl transition-[clip-path] duration-500 ease-out ${
          isCartDrawerOpen
            ? '[clip-path:inset(0_0_0_0)]'
            : '[clip-path:inset(0_0_100%_0)]'
        }`}
        style={{
          top: `${navbarHeight}px`,
          height: `calc(100dvh - ${navbarHeight}px)`,
        }}
        onTouchStart={(event) =>
          setCartTouchStartX(event.touches[0]?.clientX ?? null)
        }
        onTouchEnd={(event) =>
          handleCartTouchEnd(
            event.changedTouches[0]?.clientX ?? cartTouchStartX ?? 0,
          )
        }
      >
        <div
          className="flex items-center justify-between"
          onClick={() => setIsCartDrawerOpen(false)}
        >
          <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-2xl font-light text-[#944E25]">
            Cart
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartDrawerOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-[16px] text-[#944E25] transition-colors duration-200 hover:bg-[#F7F4EF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              x
            </span>
          </button>
        </div>
        <div
          onScroll={handleCartListScroll}
          className={`cart-drawer-scroll mt-8 flex-1 space-y-6 overflow-y-auto pr-2 ${
            isCartListScrolling ? 'cart-drawer-scroll-active' : ''
          }`}
        >
          {cartItems.length === 0 ? (
            <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light text-[#744026]">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-[#BE8B48]/30 pb-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image.url}
                      alt={item.image.altText}
                      className="h-20 w-20 rounded-[16px] object-cover object-center"
                    />
                    <div className="font-['Neue_Haas_Grotesk','Inter',sans-serif]">
                        <p className="text-sm font-semibold leading-tight text-[#944E25]">
                          {item.productTitle}
                        </p>
                      <div className="mt-0 flex flex-col items-start gap-2 text-xs font-light leading-tight text-[#744026]">
                        <span className="w-36 truncate whitespace-nowrap">
                          Color: {item.colorName}
                        </span>
                        {item.colorSwatchImage ? (
                          <img
                            src={item.colorSwatchImage}
                            alt=""
                            className="h-9 w-9 rounded-[8px] border border-[#BE8B48]/40 object-cover object-center"
                          />
                        ) : (
                          item.colorSwatch && (
                            <span
                              aria-hidden="true"
                              className="h-9 w-9 rounded-[8px] border border-[#BE8B48]/40"
                              style={{ backgroundColor: item.colorSwatch }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-['Neue_Haas_Grotesk','Inter',sans-serif]">
                    <p className="text-base font-light text-[#944E25]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#744026]">
                      Deposit: $
                      {(item.price * 0.5 * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      item.quantity === 1
                        ? removeCartItem(item.id)
                        : updateCartItemQuantity(item.id, item.quantity - 1)
                    }
                    className="group h-9 w-9 text-[#944E25]"
                  >
                    <span className={item.quantity === 1 ? 'group-hover:hidden' : ''}>
                      -
                    </span>
                    {item.quantity === 1 && (
                      <span className="hidden group-hover:inline">x</span>
                    )}
                  </button>
                  <span className="grid h-9 w-12 place-items-center font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-semibold text-[#3A1C0F]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                    className="h-9 w-9 text-[#944E25]"
                  >
                    +
                  </button>
                </div>
              </div>
              ))}
            </>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mt-3 pt-2">
            <div className="mb-6 font-['Neue_Haas_Grotesk','Inter',sans-serif]">
              <div className="flex items-center justify-between text-sm font-light text-[#944E25]">
                <span>Subtotal</span>
                <span className="text-lg">${cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm font-light text-[#744026]">
                <span>Due Today Only (Deposit)</span>
                <span className="text-2xl font-semibold">
                  ${cartDepositSubtotal.toLocaleString()}
                </span>
              </div>
              <p className="mt-3 text-xs font-light text-[#744026]/80">
                All prices are inclusive of GST.
              </p>
            </div>
            <button
              type="button"
              className="w-full rounded-[16px] bg-[#944E25] px-6 py-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#F7F4EF] transition-colors duration-200 hover:bg-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
      <div
        aria-hidden="true"
        className={`w-full ${isShrunk ? 'h-[72px] md:h-[88px]' : 'h-[112px] md:h-[183px]'}`}
      />
    </>
  )
}
