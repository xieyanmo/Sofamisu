import { useEffect, useRef, useState } from 'react'
import customColorIcon from '../assets/custom_color.png'
import freeDeliveryIcon from '../assets/free_delivery.png'
import heroImage from '../assets/hero_s1.jpg'
import madeToOrderIcon from '../assets/made_to_order.png'
import secureDepositIcon from '../assets/secure_deposit.png'
import { ProductCard } from '../components/ProductCard'
import { siteContent } from '../content/siteContent'
import {
  featuredProductHandles,
  shopifyProducts,
} from '../data/shopifyProducts'
import type { Product } from '../types/Product'

const benefitIcons = {
  custom_color: {
    src: customColorIcon,
  },
  free_delivery: {
    imageClassName: 'max-h-20 max-w-20 md:max-h-[130px] md:max-w-[130px]',
    src: freeDeliveryIcon,
  },
  secure_deposit: {
    src: secureDepositIcon,
  },
  made_to_order: {
    src: madeToOrderIcon,
  },
} as const

const featuredProducts = featuredProductHandles
  .map((featuredId) =>
    shopifyProducts.find(
      (product) => product.handle === featuredId || product.id === featuredId,
    ),
  )
  .filter((product): product is Product => Boolean(product))

function ArrowHoverFrame() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      fill="none"
      viewBox="0 0 48 48"
    >
      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="10"
        className="stroke-[#BE8B48] [stroke-dasharray:152] [stroke-dashoffset:152] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0]"
        strokeWidth="1"
      />
      <rect
        x="9"
        y="9"
        width="30"
        height="30"
        rx="8"
        className="stroke-[#BE8B48] [stroke-dasharray:120] [stroke-dashoffset:120] transition-[stroke-dashoffset] delay-75 duration-500 ease-out group-hover:[stroke-dashoffset:0]"
        strokeWidth="1"
      />
    </svg>
  )
}

export function Home() {
  const [featuredStartIndex, setFeaturedStartIndex] = useState(0)
  const [mobileFeaturedStep, setMobileFeaturedStep] = useState(0)
  const [mobileTouchStartX, setMobileTouchStartX] = useState<number | null>(
    null,
  )
  const mobileCarouselRef = useRef<HTMLAnchorElement | null>(null)
  const mobileTouchStartRef = useRef({ x: 0, y: 0 })
  const mobileGestureLockRef = useRef<'horizontal' | 'vertical' | null>(null)
  const mobileDidSwipeRef = useRef(false)
  const shouldShowFeaturedControls = featuredProducts.length > 3
  const mobileFeaturedIndex =
    featuredProducts.length > 0
      ? Math.floor(mobileFeaturedStep / 2) % featuredProducts.length
      : 0
  const mobileImageIndex = mobileFeaturedStep % 2
  const mobileFeaturedProduct =
    featuredProducts[mobileFeaturedIndex % featuredProducts.length]
  const mobileFeaturedImages = mobileFeaturedProduct
    ? [
        mobileFeaturedProduct.images[0] ?? mobileFeaturedProduct.featuredImage,
        mobileFeaturedProduct.images[1] ?? mobileFeaturedProduct.hoverImage,
      ]
    : []
  const visibleFeaturedProducts = Array.from(
    { length: Math.min(3, featuredProducts.length) },
    (_, index) =>
      featuredProducts[(featuredStartIndex + index) % featuredProducts.length],
  )
  const showPreviousFeaturedProducts = () => {
    setFeaturedStartIndex((current) =>
      current === 0 ? featuredProducts.length - 1 : current - 1,
    )
  }
  const showNextFeaturedProducts = () => {
    setFeaturedStartIndex((current) => (current + 1) % featuredProducts.length)
  }
  const showPreviousMobileProduct = () => {
    setMobileFeaturedStep((current) => {
      const currentProduct = Math.floor(current / 2) % featuredProducts.length
      const previousProduct =
        currentProduct === 0 ? featuredProducts.length - 1 : currentProduct - 1

      return previousProduct * 2
    })
  }
  const showNextMobileProduct = () => {
    setMobileFeaturedStep((current) => {
      const currentProduct = Math.floor(current / 2) % featuredProducts.length
      const nextProduct = (currentProduct + 1) % featuredProducts.length

      return nextProduct * 2
    })
  }
  const selectMobileProduct = (productIndex: number) => {
    setMobileFeaturedStep(productIndex * 2)
  }
  const showNextMobileFeaturedStep = () => {
    setMobileFeaturedStep(
      (current) => (current + 1) % (featuredProducts.length * 2),
    )
  }
  const handleMobileTouchEnd = (endX: number, endY: number) => {
    if (mobileTouchStartX === null) {
      return
    }

    const swipeDistance = endX - mobileTouchStartX
    const verticalDistance = endY - mobileTouchStartRef.current.y

    if (
      mobileGestureLockRef.current === 'horizontal' &&
      Math.abs(swipeDistance) > 48 &&
      Math.abs(swipeDistance) > Math.abs(verticalDistance) * 1.2
    ) {
      mobileDidSwipeRef.current = true
    }

    if (mobileDidSwipeRef.current && swipeDistance > 48) {
      showPreviousMobileProduct()
    }

    if (mobileDidSwipeRef.current && swipeDistance < -48) {
      showNextMobileProduct()
    }

    setMobileTouchStartX(null)
    mobileGestureLockRef.current = null
  }

  useEffect(() => {
    if (featuredProducts.length === 0) {
      return
    }

    const imageRotation = window.setInterval(() => {
      showNextMobileFeaturedStep()
    }, 3000)

    return () => window.clearInterval(imageRotation)
  }, [])

  useEffect(() => {
    const carouselElement = mobileCarouselRef.current

    if (!carouselElement) {
      return
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]

      if (!touch) {
        return
      }

      const deltaX = touch.clientX - mobileTouchStartRef.current.x
      const deltaY = touch.clientY - mobileTouchStartRef.current.y
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (!mobileGestureLockRef.current && Math.max(absX, absY) > 10) {
        if (absX > absY * 1.2) {
          mobileGestureLockRef.current = 'horizontal'
        }

        if (absY > absX * 1.2) {
          mobileGestureLockRef.current = 'vertical'
        }
      }

      if (mobileGestureLockRef.current === 'horizontal') {
        event.preventDefault()
      }
    }

    carouselElement.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    })

    return () => {
      carouselElement.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <main className="bg-[#F7F4EF] text-[#3A1C0F]">
      <section className="flex h-[calc(100dvh-112px)] flex-col md:h-[calc(100vh-183px)] md:min-h-[620px]">
        <div
          aria-label={siteContent.hero.imageLabel}
          className="relative min-h-0 flex-1 overflow-hidden bg-[#EAE4DB]"
        >
          <img
            src={heroImage}
            alt={siteContent.hero.imageAlt}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(58,28,15,0.18)_0%,rgba(58,28,15,0.34)_48%,rgba(58,28,15,0.68)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_36%,rgba(190,139,72,0.24),transparent_34%)]" />
        </div>

        <div className="border-y border-[#BE8B48]/30 bg-[#EAE4DB] px-6 py-8 md:px-20 md:py-10">
          <div className="grid w-full grid-cols-2 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {siteContent.keyBenefits.map((benefit) => {
              const icon = benefitIcons[benefit.iconName]

              return (
              <div
                key={benefit.text}
                className="flex flex-col items-center justify-center gap-3 text-center text-[#744026] md:flex-row md:gap-6 md:text-left"
              >
                <span className="flex h-20 w-20 shrink-0 items-center justify-center md:h-[132px] md:w-[132px]">
                  <img
                    src={icon.src}
                    alt=""
                    className={`h-auto w-auto object-contain ${
                      'imageClassName' in icon
                        ? icon.imageClassName
                        : 'max-h-16 max-w-16 md:max-h-[108px] md:max-w-[108px]'
                    }`}
                  />
                </span>
                <span className="max-w-[150px] whitespace-pre-line font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light leading-5 tracking-[0.1em] md:max-w-[180px] md:text-base md:leading-7 md:tracking-[0.16em]">
                  {benefit.text}
                </span>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-[#F7F4EF] px-6 pt-14 pb-24 md:pt-20 md:pb-28 lg:px-20">
        <div className="mx-auto flex w-full flex-col items-center">
          <h1 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-4xl font-light text-[#944E25] md:text-5xl">
            {siteContent.featuredProducts.sectionTitle}
          </h1>

          <div className="relative mt-10 w-full px-0 md:mt-16 md:px-[88px]">
            {shouldShowFeaturedControls && (
              <>
                <button
                  type="button"
                  aria-label="Show previous featured products"
                  onClick={showPreviousFeaturedProducts}
                  className="group absolute top-1/2 left-0 z-10 hidden h-16 w-16 -translate-y-1/2 place-items-center text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] md:grid"
                >
                  <ArrowHoverFrame />
                  <svg
                    aria-hidden="true"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Show next featured products"
                  onClick={showNextFeaturedProducts}
                  className="group absolute top-1/2 right-0 z-10 hidden h-16 w-16 -translate-y-1/2 place-items-center text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] md:grid"
                >
                  <ArrowHoverFrame />
                  <svg
                    aria-hidden="true"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </>
            )}

            {mobileFeaturedProduct && (
              <article className="md:hidden">
                <div>
                  <a
                    ref={mobileCarouselRef}
                    href={`/products/${mobileFeaturedProduct.handle}`}
                    aria-label={`View ${mobileFeaturedProduct.title}`}
                    className="block touch-pan-y overscroll-contain"
                    onClick={(event) => {
                      if (mobileDidSwipeRef.current) {
                        event.preventDefault()
                        mobileDidSwipeRef.current = false
                      }
                    }}
                    onTouchStart={(event) => {
                      const touch = event.touches[0]
                      mobileTouchStartRef.current = {
                        x: touch?.clientX ?? 0,
                        y: touch?.clientY ?? 0,
                      }
                      mobileGestureLockRef.current = null
                      mobileDidSwipeRef.current = false
                      setMobileTouchStartX(event.touches[0]?.clientX ?? null)
                    }}
                    onTouchEnd={(event) =>
                      handleMobileTouchEnd(
                        event.changedTouches[0]?.clientX ??
                          mobileTouchStartX ??
                          0,
                        event.changedTouches[0]?.clientY ??
                          mobileTouchStartRef.current.y,
                      )
                    }
                    onTouchCancel={() => {
                      setMobileTouchStartX(null)
                      mobileGestureLockRef.current = null
                    }}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#EAE4DB]">
                      {mobileFeaturedImages.map((image, index) => (
                        <img
                          key={image.id}
                          src={image.url}
                          alt={image.altText}
                          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
                            mobileImageIndex === index
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                        />
                      ))}
                      <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(180deg,rgba(58,28,15,0)_0%,rgba(58,28,15,0.76)_100%)] p-5">
                        <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xl font-semibold text-[#F7F4EF]">
                          {mobileFeaturedProduct.title}
                        </h2>
                        <p className="mt-2 max-w-sm font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs leading-5 font-light text-[#F7F4EF]/90">
                          {mobileFeaturedProduct.description}
                        </p>
                        <p className="mt-4 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light tracking-[0.16em] text-[#BE8B48]">
                          ${mobileFeaturedProduct.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </a>
                  <div
                    aria-label="Featured product position"
                    className="mt-5 flex items-center justify-center gap-2"
                  >
                    {featuredProducts.map((product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        aria-label={`Show featured product ${index + 1}`}
                        aria-current={
                          index === mobileFeaturedIndex ? 'true' : undefined
                        }
                        onClick={() => selectMobileProduct(index)}
                        className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-out ${
                          index === mobileFeaturedIndex
                            ? 'w-7 bg-[#944E25]'
                            : 'w-2 bg-[#BE8B48]/45'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </article>
            )}

            <div className="hidden w-full grid-cols-1 gap-8 md:grid md:grid-cols-3">
              {visibleFeaturedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageClassName="aspect-square"
                  showImageOverlayDetails
                  showDetails={false}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
