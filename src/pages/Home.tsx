import { useState } from 'react'
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
    imageClassName: 'max-h-[130px] max-w-[130px]',
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
  const shouldShowFeaturedControls = featuredProducts.length > 3
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

  return (
    <main className="bg-[#F7F4EF] text-[#3A1C0F]">
      <section className="flex h-[calc(100vh-183px)] min-h-[620px] flex-col">
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

        <div className="border-y border-[#BE8B48]/30 bg-[#EAE4DB] px-20 py-10">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteContent.keyBenefits.map((benefit) => {
              const icon = benefitIcons[benefit.iconName]

              return (
              <div
                key={benefit.text}
                className="flex items-center justify-center gap-6 text-[#744026]"
              >
                <span className="flex h-[132px] w-[132px] shrink-0 items-center justify-center">
                  <img
                    src={icon.src}
                    alt=""
                    className={`h-auto w-auto object-contain ${
                      'imageClassName' in icon
                        ? icon.imageClassName
                        : 'max-h-[108px] max-w-[108px]'
                    }`}
                  />
                </span>
                <span className="max-w-[180px] whitespace-pre-line text-left font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-light leading-7 tracking-[0.16em]">
                  {benefit.text}
                </span>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-[#F7F4EF] px-6 pt-20 pb-28 lg:px-20">
        <div className="mx-auto flex w-full flex-col items-center">
          <h1 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-5xl font-light text-[#944E25]">
            {siteContent.featuredProducts.sectionTitle}
          </h1>

          <div className="relative mt-16 w-full px-[88px]">
            {shouldShowFeaturedControls && (
              <>
                <button
                  type="button"
                  aria-label="Show previous featured products"
                  onClick={showPreviousFeaturedProducts}
                  className="group absolute top-1/2 left-0 z-10 grid h-16 w-16 -translate-y-1/2 place-items-center text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
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
                  className="group absolute top-1/2 right-0 z-10 grid h-16 w-16 -translate-y-1/2 place-items-center text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
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

            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
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
