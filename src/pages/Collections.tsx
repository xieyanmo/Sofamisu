import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { siteContent } from '../content/siteContent'
import { shopifyProducts } from '../data/shopifyProducts'

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low']
const seatingCapacityOptions = ['1 Seater', '2 Seater', '3+ Seater']

export function Collections() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filterTouchStartX, setFilterTouchStartX] = useState<number | null>(
    null,
  )
  const [filterTouchStartY, setFilterTouchStartY] = useState<number | null>(
    null,
  )
  const [maxPrice, setMaxPrice] = useState(9000)
  const [selectedSort, setSelectedSort] = useState('Featured')
  const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState<
    string[]
  >([])
  const hasPriceFilter = maxPrice < 9000
  const filteredProducts = shopifyProducts
    .filter((product) => product.price <= maxPrice)
    .toSorted((firstProduct, secondProduct) => {
      if (selectedSort === 'Price: Low to High') {
        return firstProduct.price - secondProduct.price
      }

      if (selectedSort === 'Price: High to Low') {
        return secondProduct.price - firstProduct.price
      }

      return 0
    })
  const activeFilterChips = [
    ...(hasPriceFilter
      ? [
          {
            id: 'price',
            label: `Price under $${maxPrice.toLocaleString()}`,
            onRemove: () => setMaxPrice(9000),
          },
        ]
      : []),
    ...selectedSeatingCapacity.map((option) => ({
      id: `seating-${option}`,
      label: option,
      onRemove: () =>
        setSelectedSeatingCapacity((current) =>
          current.filter((item) => item !== option),
        ),
    })),
    ...(selectedSort !== 'Featured'
      ? [
          {
            id: 'sort',
            label: selectedSort,
            onRemove: () => setSelectedSort('Featured'),
          },
        ]
      : []),
  ]

  const toggleSeatingCapacity = (option: string) => {
    setSelectedSeatingCapacity((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    )
  }

  const handleFilterTouchEnd = (endX: number, endY: number) => {
    if (filterTouchStartX === null) {
      return
    }

    const swipeDistance = endX - filterTouchStartX
    const verticalSwipeDistance =
      filterTouchStartY === null ? 0 : endY - filterTouchStartY

    if (!isFilterOpen && swipeDistance < -60) {
      setIsFilterOpen(true)
    }

    if (
      isFilterOpen &&
      (swipeDistance > 60 || Math.abs(verticalSwipeDistance) > 60)
    ) {
      setIsFilterOpen(false)
    }

    setFilterTouchStartX(null)
    setFilterTouchStartY(null)
  }

  return (
    <main
      className="min-h-screen bg-[#F7F4EF] px-6 pt-12 pb-24 text-[#3A1C0F] lg:px-20"
      onTouchStart={(event) => {
        setFilterTouchStartX(event.touches[0]?.clientX ?? null)
        setFilterTouchStartY(event.touches[0]?.clientY ?? null)
      }}
      onTouchEnd={(event) =>
        handleFilterTouchEnd(
          event.changedTouches[0]?.clientX ?? filterTouchStartX ?? 0,
          event.changedTouches[0]?.clientY ?? filterTouchStartY ?? 0,
        )
      }
    >
      <section className="mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light tracking-[0.1em] text-[#744026] md:text-sm md:tracking-[0.14em]"
        >
          <a
            href="/"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            {siteContent.collections.breadcrumb[0]}
          </a>{' '}
          /{' '}
          <a
            href="/collections"
            className="relative pb-1.5 before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:text-[#944E25] hover:before:scale-x-100 hover:after:scale-x-100"
          >
            {siteContent.collections.breadcrumb[1]}
          </a>{' '}
          / {siteContent.collections.breadcrumb[2]}
        </nav>
        <h1 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-4xl font-light text-[#944E25] md:text-5xl">
          {siteContent.collections.pageTitle}
        </h1>
        <p className="mt-5 max-w-2xl font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-light leading-7 text-[#744026]">
          {siteContent.collections.collectionsDescription}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 py-5">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="relative pb-1.5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#005A4F] before:absolute before:bottom-1 before:left-0 before:h-px before:w-full before:origin-left before:scale-x-0 before:bg-[#BE8B48] before:transition-transform before:duration-300 before:ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#BE8B48] after:transition-transform after:duration-300 after:ease-out hover:before:scale-x-100 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            {siteContent.collections.filterSortLabel}
          </button>

          {activeFilterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {activeFilterChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={chip.onRemove}
                  className="group flex items-center gap-2 rounded-[16px] border border-[#BE8B48]/40 bg-[#EAE4DB] px-3 py-1.5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light tracking-[0.08em] text-[#744026] transition-colors duration-200 hover:border-[#944E25] hover:text-[#944E25] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
                >
                  <span>{chip.label}</span>
                  <span
                    aria-hidden="true"
                    className="max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-w-3 group-hover:opacity-100"
                  >
                    x
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.12em] text-[#744026]">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'} shown
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div
        aria-hidden={!isFilterOpen}
        className={`fixed inset-0 z-[60] bg-[#3A1C0F]/25 backdrop-blur-sm transition-opacity duration-300 ${
          isFilterOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsFilterOpen(false)}
      />

      <aside
        aria-label="Filter and sort drawer"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[70] h-dvh w-full max-w-md bg-[#F7F4EF]/75 px-8 py-8 text-[#3A1C0F] shadow-2xl transition-transform duration-500 ease-out ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTouchStart={(event) => {
          setFilterTouchStartX(event.touches[0]?.clientX ?? null)
          setFilterTouchStartY(event.touches[0]?.clientY ?? null)
        }}
        onTouchEnd={(event) =>
          handleFilterTouchEnd(
            event.changedTouches[0]?.clientX ?? filterTouchStartX ?? 0,
            event.changedTouches[0]?.clientY ?? filterTouchStartY ?? 0,
          )
        }
        role="dialog"
      >
        <div className="flex items-center justify-between gap-6">
          <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-2xl font-light text-[#944E25]">
            Filter & Sort
          </h2>
          <button
            type="button"
            aria-label="Close filter and sort"
            onClick={() => setIsFilterOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-[16px] text-[#944E25] transition-colors duration-200 hover:bg-[#EAE4DB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="mt-12">
          <h3 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#005A4F]">
            Price
          </h3>
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light text-[#744026]">
              <span>$1,000</span>
              <span>Up to ${maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="9000"
              step="100"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="h-1 w-full accent-[#944E25]"
            />
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#005A4F]">
            Sort
          </h3>
          <div className="mt-5 space-y-4">
            {sortOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light text-[#744026]"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === option}
                  onChange={() => setSelectedSort(option)}
                  className="accent-[#944E25]"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#005A4F]">
            Seating Capacity
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {seatingCapacityOptions.map((option) => {
              const isSelected = selectedSeatingCapacity.includes(option)

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleSeatingCapacity(option)}
                  className={`rounded-[16px] border px-4 py-2 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] ${
                    isSelected
                      ? 'border-[#944E25] bg-[#944E25] text-[#F7F4EF]'
                      : 'border-[#BE8B48]/40 bg-[#EAE4DB] text-[#744026] hover:border-[#944E25] hover:text-[#944E25]'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </aside>
    </main>
  )
}
