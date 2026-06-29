import { useEffect, useMemo, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { shopifyProducts } from '../data/shopifyProducts'
import type { ProductColorVariant } from '../types/Product'

type ProductDetailProps = {
  handle: string
}

const getTouchDistance = (touches: React.TouchList) => {
  const firstTouch = touches[0]
  const secondTouch = touches[1]

  if (!firstTouch || !secondTouch) {
    return 0
  }

  return Math.hypot(
    firstTouch.clientX - secondTouch.clientX,
    firstTouch.clientY - secondTouch.clientY,
  )
}

const getTouchMidpoint = (touches: React.TouchList) => {
  const firstTouch = touches[0]
  const secondTouch = touches[1]

  if (!firstTouch || !secondTouch) {
    return { x: 0, y: 0 }
  }

  return {
    x: (firstTouch.clientX + secondTouch.clientX) / 2,
    y: (firstTouch.clientY + secondTouch.clientY) / 2,
  }
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

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
          fill={isOpen ? 'currentColor' : 'transparent'}
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1"
          className="transition-[fill] duration-300 ease-out"
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
        <span
          className={`relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out ${
            isOpen
              ? 'before:scale-x-100 after:scale-x-100'
              : 'before:scale-x-0 after:scale-x-0'
          }`}
        >
          {title}
        </span>
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
    <main className="min-h-screen bg-[#F7F4EF] px-6 pt-12 pb-24 text-[#3A1C0F] lg:px-20">
      <section className="mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light tracking-[0.1em] text-[#744026] md:text-sm md:tracking-[0.14em]"
        >
          <a
            href="/"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            Home
          </a>{' '}
          /{' '}
          <a
            href="/collections"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            Collections
          </a>{' '}
          /{' '}
          <a
            href="/collections"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            All Sofas
          </a>
        </nav>
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
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const [imageTouchStartX, setImageTouchStartX] = useState<number | null>(null)
  const [viewerTouchStartX, setViewerTouchStartX] = useState<number | null>(null)
  const [viewerTouchStartY, setViewerTouchStartY] = useState<number | null>(null)
  const [viewerScale, setViewerScale] = useState(1)
  const [viewerTranslate, setViewerTranslate] = useState({ x: 0, y: 0 })
  const [cartSuccessMessage, setCartSuccessMessage] = useState('')
  const [mobileCartSuccessMessage, setMobileCartSuccessMessage] = useState('')
  const [isMobileCartSuccessVisible, setIsMobileCartSuccessVisible] =
    useState(false)
  const productImageButtonRef = useRef<HTMLButtonElement | null>(null)
  const viewerFrameRef = useRef<HTMLDivElement | null>(null)
  const imageSwipeRef = useRef(false)
  const imageTouchStartRef = useRef({ x: 0, y: 0 })
  const imageGestureLockRef = useRef<'horizontal' | 'vertical' | null>(null)
  const viewerGestureRef = useRef(false)
  const pinchStartDistanceRef = useRef(0)
  const pinchStartScaleRef = useRef(1)
  const pinchStartImagePointRef = useRef({ x: 0, y: 0 })
  const panStartRef = useRef({ touchX: 0, touchY: 0, x: 0, y: 0 })

  useEffect(() => {
    if (!isImageViewerOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isImageViewerOpen])

  useEffect(() => {
    const imageButton = productImageButtonRef.current

    if (!imageButton) {
      return
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]

      if (!touch) {
        return
      }

      const deltaX = touch.clientX - imageTouchStartRef.current.x
      const deltaY = touch.clientY - imageTouchStartRef.current.y
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (!imageGestureLockRef.current && Math.max(absX, absY) > 10) {
        if (absX > absY * 1.2) {
          imageGestureLockRef.current = 'horizontal'
        }

        if (absY > absX * 1.2) {
          imageGestureLockRef.current = 'vertical'
        }
      }

      if (imageGestureLockRef.current === 'horizontal') {
        event.preventDefault()
      }
    }

    imageButton.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    })

    return () => {
      imageButton.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

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
  }

  const showPreviousImage = () => {
    setSelectedImageIndex((current) =>
      current === 0 ? selectedColor.images.length - 1 : current - 1,
    )
  }

  const showNextImage = () => {
    setSelectedImageIndex((current) =>
      current === selectedColor.images.length - 1 ? 0 : current + 1,
    )
  }
  const handleImageTouchEnd = (endX: number, endY: number) => {
    if (imageTouchStartX === null) {
      return
    }

    const swipeDistance = endX - imageTouchStartX
    const verticalDistance = endY - imageTouchStartRef.current.y

    if (
      imageGestureLockRef.current === 'horizontal' &&
      Math.abs(swipeDistance) > 48 &&
      Math.abs(swipeDistance) > Math.abs(verticalDistance) * 1.2
    ) {
      imageSwipeRef.current = true
    }

    if (imageSwipeRef.current && swipeDistance > 48) {
      showPreviousImage()
    }

    if (imageSwipeRef.current && swipeDistance < -48) {
      showNextImage()
    }

    setImageTouchStartX(null)
    imageGestureLockRef.current = null
  }
  const handleImageClick = () => {
    if (imageSwipeRef.current) {
      imageSwipeRef.current = false
      return
    }

    setViewerScale(1)
    setViewerTranslate({ x: 0, y: 0 })
    setIsImageViewerOpen(true)
  }
  const handleAddToCart = () => {
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
    setCartSuccessMessage(
      `${product.title} has been added to your cart successfully.`,
    )
    setMobileCartSuccessMessage(
      `${product.title} has been added to your cart successfully.`,
    )
    setIsMobileCartSuccessVisible(true)

    window.setTimeout(() => {
      setIsMobileCartSuccessVisible(false)
    }, 2000)

    window.setTimeout(() => {
      setMobileCartSuccessMessage('')
    }, 2200)

    window.setTimeout(() => {
      setCartSuccessMessage('')
    }, 3200)
  }
  const closeImageViewer = () => {
    setIsImageViewerOpen(false)
    setViewerScale(1)
    setViewerTranslate({ x: 0, y: 0 })
    setViewerTouchStartX(null)
    setViewerTouchStartY(null)
    viewerGestureRef.current = false
  }
  const getClampedViewerTranslate = (
    nextTranslate: { x: number; y: number },
    nextScale: number,
  ) => {
    const frame = viewerFrameRef.current

    if (!frame || nextScale <= 1) {
      return { x: 0, y: 0 }
    }

    const maxX = ((nextScale - 1) * frame.clientWidth) / 2
    const maxY = ((nextScale - 1) * frame.clientHeight) / 2

    return {
      x: clamp(nextTranslate.x, -maxX, maxX),
      y: clamp(nextTranslate.y, -maxY, maxY),
    }
  }
  const handleViewerTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      event.preventDefault()
      const frame = viewerFrameRef.current
      const midpoint = getTouchMidpoint(event.touches)

      if (frame) {
        const rect = frame.getBoundingClientRect()
        const relativeMidpoint = {
          x: midpoint.x - rect.left - rect.width / 2,
          y: midpoint.y - rect.top - rect.height / 2,
        }

        pinchStartImagePointRef.current = {
          x: (relativeMidpoint.x - viewerTranslate.x) / viewerScale,
          y: (relativeMidpoint.y - viewerTranslate.y) / viewerScale,
        }
      }

      pinchStartDistanceRef.current = getTouchDistance(event.touches)
      pinchStartScaleRef.current = viewerScale
      viewerGestureRef.current = true
      return
    }

    const touch = event.touches[0]

    if (!touch) {
      return
    }

    setViewerTouchStartX(touch.clientX)
    setViewerTouchStartY(touch.clientY)
    panStartRef.current = {
      touchX: touch.clientX,
      touchY: touch.clientY,
      x: viewerTranslate.x,
      y: viewerTranslate.y,
    }
  }
  const handleViewerTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      event.preventDefault()

      const startDistance = pinchStartDistanceRef.current

      const frame = viewerFrameRef.current

      if (startDistance === 0 || !frame) {
        return
      }

      const midpoint = getTouchMidpoint(event.touches)
      const rect = frame.getBoundingClientRect()
      const relativeMidpoint = {
        x: midpoint.x - rect.left - rect.width / 2,
        y: midpoint.y - rect.top - rect.height / 2,
      }
      const nextScale = Math.min(
        3,
        Math.max(
          1,
          pinchStartScaleRef.current *
            (getTouchDistance(event.touches) / startDistance),
        ),
      )
      const nextTranslate = getClampedViewerTranslate(
        {
          x:
            relativeMidpoint.x -
            pinchStartImagePointRef.current.x * nextScale,
          y:
            relativeMidpoint.y -
            pinchStartImagePointRef.current.y * nextScale,
        },
        nextScale,
      )

      setViewerScale(nextScale)
      setViewerTranslate(nextTranslate)

      viewerGestureRef.current = true
      return
    }

    const touch = event.touches[0]

    if (!touch || viewerTouchStartX === null || viewerTouchStartY === null) {
      return
    }

    const deltaX = touch.clientX - viewerTouchStartX
    const deltaY = touch.clientY - viewerTouchStartY

    if (viewerScale > 1) {
      event.preventDefault()
      setViewerTranslate(
        getClampedViewerTranslate(
          {
            x: panStartRef.current.x + touch.clientX - panStartRef.current.touchX,
            y: panStartRef.current.y + touch.clientY - panStartRef.current.touchY,
          },
          viewerScale,
        ),
      )
      viewerGestureRef.current = true
      return
    }

    if (Math.abs(deltaY) > 42 && Math.abs(deltaY) > Math.abs(deltaX)) {
      viewerGestureRef.current = true
      closeImageViewer()
    }
  }
  const handleViewerTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 0 && viewerScale <= 1) {
      setViewerTranslate({ x: 0, y: 0 })
    }

    if (viewerTouchStartX === null || viewerScale > 1) {
      return
    }

    const endTouch = event.changedTouches[0]

    if (!endTouch) {
      return
    }

    const swipeDistance = endTouch.clientX - viewerTouchStartX

    if (swipeDistance > 48) {
      viewerGestureRef.current = true
      showPreviousImage()
    }

    if (swipeDistance < -48) {
      viewerGestureRef.current = true
      showNextImage()
    }

    setViewerTouchStartX(null)
    setViewerTouchStartY(null)
  }

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 pt-12 pb-24 text-[#3A1C0F] lg:px-20">
      <section className="mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light tracking-[0.1em] text-[#744026] md:text-sm md:tracking-[0.14em]"
        >
          <a
            href="/"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            Home
          </a>{' '}
          /{' '}
          <a
            href="/collections"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            Collections
          </a>{' '}
          /{' '}
          <a
            href="/collections"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            All Sofas
          </a>{' '}
          / {product.title}
        </nav>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,7fr)_minmax(20rem,5fr)] lg:gap-8">
          <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[7rem_minmax(0,1fr)]">
            <div className="order-2 overflow-x-auto overflow-y-hidden lg:order-1 lg:max-h-[850px] lg:overflow-x-hidden lg:overflow-y-visible">
              <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-1 [scrollbar-color:rgba(190,139,72,0.5)_transparent] [scrollbar-width:none] hover:[scrollbar-width:thin] lg:max-h-[850px] lg:flex-col lg:gap-12 lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0 hover:[&::-webkit-scrollbar]:h-1.5 hover:[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#BE8B48]/50">
              {selectedColor.images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(index)
                  }}
                  className="group relative aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-[16px] border border-transparent bg-[#EAE4DB] transition-colors duration-200 lg:h-20 lg:w-20 xl:h-24 xl:w-24"
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

            <div className="group relative order-1 aspect-square w-full min-w-0 overflow-hidden rounded-[16px] bg-[#EAE4DB] lg:order-2">
              <button
                ref={productImageButtonRef}
                type="button"
                onClick={handleImageClick}
                onTouchStart={(event) => {
                  const touch = event.touches[0]
                  imageTouchStartRef.current = {
                    x: touch?.clientX ?? 0,
                    y: touch?.clientY ?? 0,
                  }
                  imageGestureLockRef.current = null
                  imageSwipeRef.current = false
                  setImageTouchStartX(event.touches[0]?.clientX ?? null)
                }}
                onTouchEnd={(event) =>
                  handleImageTouchEnd(
                    event.changedTouches[0]?.clientX ?? imageTouchStartX ?? 0,
                    event.changedTouches[0]?.clientY ??
                      imageTouchStartRef.current.y,
                  )
                }
                onTouchCancel={() => {
                  setImageTouchStartX(null)
                  imageGestureLockRef.current = null
                }}
                className="h-full w-full touch-pan-y overflow-hidden overscroll-contain lg:cursor-zoom-in"
                aria-label="Open product image viewer"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.altText}
                  className="h-full w-full object-cover object-center"
                />
              </button>

              <button
                type="button"
                aria-label="Previous image"
                onClick={showPreviousImage}
                className="absolute top-1/2 left-4 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#3A1C0F]/25 text-[#F7F4EF] opacity-0 transition-opacity duration-200 hover:bg-[#3A1C0F]/40 group-hover:opacity-100 lg:grid"
              >
                {'<'}
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={showNextImage}
                className="absolute top-1/2 right-4 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[#3A1C0F]/25 text-[#F7F4EF] opacity-0 transition-opacity duration-200 hover:bg-[#3A1C0F]/40 group-hover:opacity-100 lg:grid"
              >
                {'>'}
              </button>
            </div>
          </div>

          <aside>
            <h1 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xl font-light text-[#944E25] lg:text-4xl">
              {product.title}
            </h1>

            <div className="mt-2 lg:mt-6">
              <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#005A4F]">
                Color:{' '}
                <span className="tracking-normal text-[#744026]">
                  {selectedColor.name}
                </span>
              </p>
              <div className="mt-2 flex select-none gap-2 lg:mt-4 lg:gap-3">
                {product.colorVariants.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.name}
                    onClick={() => selectColor(color)}
                    className={`h-9 w-9 select-none overflow-hidden rounded-[10px] border p-1 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] lg:h-11 lg:w-11 lg:rounded-[12px] ${
                      selectedColor.id === color.id
                        ? 'border-[#944E25]'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={color.swatchImage}
                      alt=""
                        className="h-full w-full rounded-[6px] object-cover object-center lg:rounded-[8px]"
                    />
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-lg font-semibold text-[#944E25] lg:mt-6 lg:text-2xl">
              ${product.price.toLocaleString()}
            </p>
            <p className="mt-0.5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-5 text-[#744026] lg:mt-2 lg:leading-6">
              Secure your made-to-order sofa with deposit only.
            </p>
            <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-semibold text-[#944E25] lg:mt-1 lg:text-xl">
              Deposit: ${depositAmount.toLocaleString()}
            </p>

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
              onClick={handleAddToCart}
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
      <div
        aria-live="polite"
        className={`fixed right-0 left-0 z-[45] hidden border-b border-[#BE8B48]/35 bg-[#EAE4DB] px-8 py-5 text-center font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.08em] text-[#744026] shadow-[0_18px_42px_rgba(58,28,15,0.14)] transition-transform duration-500 ease-out md:block ${
          cartSuccessMessage ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ top: '88px' }}
      >
        {cartSuccessMessage}
      </div>
      <div
        aria-live="polite"
        className={`fixed top-1/2 left-1/2 z-[75] grid w-[min(82vw,20rem)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[16px] bg-[#F7F4EF] px-6 py-6 text-center font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-6 text-[#744026] shadow-[0_22px_60px_rgba(58,28,15,0.20)] transition-opacity duration-200 ease-out md:hidden ${
          isMobileCartSuccessVisible
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16px] border border-[#BE8B48]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1.5 rounded-[12px] border border-[#BE8B48]"
        />
        <span
          aria-hidden="true"
          className={`relative mb-3 grid h-11 w-11 place-items-center text-[#944E25] transition-transform duration-300 ease-out ${
            isMobileCartSuccessVisible ? 'scale-100' : 'scale-50'
          }`}
        >
          <span className="absolute inset-0 rounded-full border border-[#944E25]" />
          <span className="absolute inset-1 rounded-full border border-[#944E25]" />
          <svg
            className="relative h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              className={`[stroke-dasharray:24] transition-[stroke-dashoffset] duration-500 ease-out ${
                isMobileCartSuccessVisible
                  ? '[stroke-dashoffset:0]'
                  : '[stroke-dashoffset:24]'
              }`}
              strokeWidth="3"
              strokeOpacity="0.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5 12 4 4L19 6"
            />
            <path
              className={`[stroke-dasharray:24] transition-[stroke-dashoffset] delay-100 duration-500 ease-out ${
                isMobileCartSuccessVisible
                  ? '[stroke-dashoffset:0]'
                  : '[stroke-dashoffset:24]'
              }`}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5 12 4 4L19 6"
            />
          </svg>
        </span>
        <span>{mobileCartSuccessMessage}</span>
      </div>
      {isImageViewerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} image viewer`}
          onClick={() => {
            if (viewerGestureRef.current) {
              viewerGestureRef.current = false
              return
            }

            closeImageViewer()
          }}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#944E25] px-0 py-8 text-[#F7F4EF]"
        >
          <button
            type="button"
            aria-label="Close product image viewer"
            onClick={(event) => {
              event.stopPropagation()
              closeImageViewer()
            }}
            className="absolute top-5 left-5 z-10 grid h-11 w-11 place-items-center rounded-full font-['Neue_Haas_Grotesk','Inter',sans-serif] text-3xl font-light text-[#F7F4EF] transition-colors duration-200 hover:bg-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            {'<'}
          </button>

          <div className="w-screen">
            <div
              ref={viewerFrameRef}
              onTouchStart={handleViewerTouchStart}
              onTouchMove={handleViewerTouchMove}
              onTouchEnd={handleViewerTouchEnd}
              className="aspect-square w-screen touch-none overflow-hidden bg-[#EAE4DB]"
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.altText}
                className="h-full w-full object-cover object-center"
                style={{
                  transform: `translate(${viewerTranslate.x}px, ${viewerTranslate.y}px) scale(${viewerScale})`,
                  transition: viewerScale === 1 ? 'transform 200ms ease-out' : undefined,
                }}
              />
            </div>

            <div
              aria-label="Product image position"
              className="mt-5 flex items-center justify-center gap-2"
            >
              {selectedColor.images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  aria-label={`Show product image ${index + 1}`}
                  aria-current={index === selectedImageIndex ? 'true' : undefined}
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedImageIndex(index)
                    setViewerScale(1)
                    setViewerTranslate({ x: 0, y: 0 })
                  }}
                  className={`h-2 rounded-full transition-[width,background-color] duration-300 ease-out ${
                    index === selectedImageIndex
                      ? 'w-7 bg-[#F7F4EF]'
                      : 'w-2 bg-[#F7F4EF]/45'
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 text-center font-['Neue_Haas_Grotesk','Inter',sans-serif]">
              <h2 className="text-2xl font-light">{product.title}</h2>
              <p className="mt-3 text-xl font-semibold">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
