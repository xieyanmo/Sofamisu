import { useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import { shopifyProducts } from '../data/shopifyProducts'
import type { ProductColorVariant } from '../types/Product'

type ProductDetailProps = {
  handle: string
}

function AccordionTriangle({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-7 w-7 place-items-center text-[#944E25] transition-transform duration-300 ease-out ${
        isOpen ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 40 40">
        <path
          d="M4.4 10h31.2L20 37.02 4.4 10Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M11.35 14h17.3L20 28.98 11.35 14Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </svg>
    </span>
  )
}

function Accordion({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-[#BE8B48]/30">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between py-5 text-left font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.16em] text-[#005A4F]"
      >
        {title}
        <AccordionTriangle isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className="pb-6 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-7 text-[#744026]">
          {children}
        </div>
      )}
    </div>
  )
}

function ProductNotFound() {
  return (
    <main className="-mt-[95px] min-h-screen bg-[#F7F4EF] px-6 pt-12 pb-24 text-[#3A1C0F] lg:px-20">
      <section className="mx-auto w-full">
        <a
          href="/collections"
          className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#744026] hover:text-[#944E25]"
        >
          Home / Collections / All Sofas
        </a>
        <h1 className="mt-8 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-5xl font-light text-[#944E25]">
          Product not found
        </h1>
      </section>
    </main>
  )
}

export function ProductDetail({ handle }: ProductDetailProps) {
  const { addCartItem } = useCart()
  const product = useMemo(
    () => shopifyProducts.find((item) => item.handle === handle),
    [handle],
  )
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!product) {
    return <ProductNotFound />
  }

  const selectedColor =
    product.colorVariants.find((color) => color.id === selectedColorId) ??
    product.colorVariants[0]
  const selectedImage = selectedColor.images[selectedImageIndex]
  const depositAmount = product.price * 0.5

  const selectColor = (color: ProductColorVariant) => {
    setSelectedColorId(color.id)
    setSelectedImageIndex(0)
    setIsZoomed(false)
  }

  const showPreviousImage = () => {
    setSelectedImageIndex((current) =>
      current === 0 ? selectedColor.images.length - 1 : current - 1,
    )
    setIsZoomed(false)
  }

  const showNextImage = () => {
    setSelectedImageIndex((current) =>
      current === selectedColor.images.length - 1 ? 0 : current + 1,
    )
    setIsZoomed(false)
  }

  return (
    <main className="-mt-[95px] min-h-screen bg-[#F7F4EF] px-6 pt-12 pb-24 text-[#3A1C0F] lg:px-20">
      <section className="mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#744026]"
        >
          Home / Collections /{' '}
          <a href="/collections" className="hover:text-[#944E25]">
            All Sofas
          </a>{' '}
          / {product.title}
        </nav>

        <div className="mt-10 grid gap-[50px] lg:grid-cols-[7fr_5fr]">
          <div className="grid items-start gap-6 md:grid-cols-[9rem_1fr]">
            <div className="max-h-[850px] overflow-x-hidden overflow-y-visible">
              <div className="flex max-h-[850px] flex-col gap-12 overflow-y-auto overflow-x-hidden pr-2 [scrollbar-color:rgba(190,139,72,0.5)_transparent] [scrollbar-width:none] hover:[scrollbar-width:thin] [&::-webkit-scrollbar]:w-0 hover:[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#BE8B48]/50">
              {selectedColor.images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(index)
                    setIsZoomed(false)
                  }}
                  className="group relative aspect-square h-29 w-29 shrink-0 overflow-hidden rounded-[16px] border border-transparent bg-[#EAE4DB] transition-colors duration-200"
                >
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="h-full w-full object-cover object-center"
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-[16px] bg-[#944E25] transition-opacity duration-200 ease-out group-hover:opacity-15 ${
                      selectedImageIndex === index ? 'opacity-0' : 'opacity-40'
                    }`}
                  />
                </button>
              ))}
              </div>
            </div>

            <div className="group relative h-[850px] w-[1000px] overflow-hidden rounded-[16px] bg-[#EAE4DB]">
              <button
                type="button"
                onClick={() => setIsZoomed((current) => !current)}
                className="h-full w-full cursor-zoom-in overflow-hidden"
                aria-label="Toggle product image zoom"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.altText}
                  className={`h-full w-full object-cover object-center transition-transform duration-500 ease-out ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
                  }`}
                />
              </button>

              <button
                type="button"
                aria-label="Previous image"
                onClick={showPreviousImage}
                className="absolute top-1/2 left-4 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#3A1C0F]/25 text-[#F7F4EF] opacity-0 transition-opacity duration-200 hover:bg-[#3A1C0F]/40 group-hover:opacity-100"
              >
                {'<'}
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={showNextImage}
                className="absolute top-1/2 right-4 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#3A1C0F]/25 text-[#F7F4EF] opacity-0 transition-opacity duration-200 hover:bg-[#3A1C0F]/40 group-hover:opacity-100"
              >
                {'>'}
              </button>
            </div>
          </div>

          <aside>
            <h1 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-4xl font-light text-[#944E25]">
              {product.title}
            </h1>
            <p className="mt-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-2xl font-semibold text-[#944E25]">
              ${product.price.toLocaleString()}
            </p>
            <p className="mt-2 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-6 text-[#744026]">
              Secure your made-to-order sofa with deposit only.
            </p>
            <p className="mt-1 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xl font-semibold text-[#944E25]">
              Deposit: ${depositAmount.toLocaleString()}
            </p>

            <div className="mt-6">
              <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#005A4F]">
                Color:{' '}
                <span className="tracking-normal text-[#744026]">
                  {selectedColor.name}
                </span>
              </p>
              <div className="mt-4 flex select-none gap-3">
                {product.colorVariants.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.name}
                    onClick={() => selectColor(color)}
                    className={`h-11 w-11 select-none overflow-hidden rounded-[12px] border p-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] ${
                      selectedColor.id === color.id
                        ? 'border-[#944E25]'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={color.swatchImage}
                      alt=""
                      className="h-full w-full rounded-[8px] object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-8">
              <span className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#005A4F]">
                Quantity
              </span>
              <div className="inline-flex items-center">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="h-11 w-11 text-[#944E25]"
                >
                  -
                </button>
                <span className="grid h-11 w-14 place-items-center text-center font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-semibold text-[#3A1C0F]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="h-11 w-11 text-[#944E25]"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                addCartItem({
                  id: `${product.id}-${selectedColor.id}`,
                  colorName: selectedColor.name,
                  colorSwatch: selectedColor.swatchColor,
                  colorSwatchImage: selectedColor.swatchImage,
                  image: selectedColor.images[0] ?? selectedImage,
                  price: product.price,
                  productHandle: product.handle,
                  productTitle: product.title,
                  quantity,
                })
              }
              className="mt-8 w-full rounded-[16px] bg-[#944E25] px-6 py-4 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#F7F4EF] transition-colors duration-200 hover:bg-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
            >
              Add to Cart
            </button>

            <div className="mt-10 border-b border-[#BE8B48]/30">
              <Accordion title="Product Description">
                {product.description}
              </Accordion>
              <Accordion title="Product Specifications">
                Category: {product.category}. Available inventory:{' '}
                {product.inventoryQuantity}. Made to order with customizable
                leather and colour options.
              </Accordion>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
