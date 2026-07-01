import type { Product } from '../types/Product'
import { ProductImage } from './ProductImage'

type ProductCardProps = {
  imageClassName?: string
  product: Product
  showImageOverlayDetails?: boolean
  showDetails?: boolean
}

export function ProductCard({
  imageClassName = 'aspect-[2/3]',
  product,
  showImageOverlayDetails = false,
  showDetails = true,
}: ProductCardProps) {
  return (
    <article>
      <a
        href={`/products/${product.handle}`}
        aria-label={`View ${product.title}`}
        className="block"
      >
        <div
          className={`group relative w-full overflow-hidden rounded-[16px] bg-[#EAE4DB] ${imageClassName}`}
        >
          <ProductImage
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-100 transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
          <ProductImage
            src={product.hoverImage.url}
            alt={product.hoverImage.altText}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
          {showImageOverlayDetails && (
            <div className="product-card-overlay absolute inset-0 flex flex-col justify-end bg-[linear-gradient(180deg,rgba(58,28,15,0)_0%,rgba(58,28,15,0.76)_100%)] p-5 transition-opacity delay-300 duration-500 ease-out md:p-8">
              <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xl font-semibold text-[#F7F4EF] md:text-2xl">
                {product.title}
              </h2>
              <p className="mt-2 max-w-sm font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light leading-5 text-[#F7F4EF]/90 md:mt-3 md:text-sm md:leading-6">
                {product.description}
              </p>
              <p className="mt-4 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light tracking-[0.16em] text-[#BE8B48] md:mt-5 md:text-sm">
                ${product.price.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </a>

      {showDetails && (
        <div className="mt-5">
          <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xl font-semibold text-[#944E25]">
            {product.title}
          </h2>
          <p className="mt-2 max-w-sm font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-6 text-[#744026]">
            {product.description}
          </p>
          <p className="mt-4 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.16em] text-[#944E25]">
            ${product.price.toLocaleString()}
          </p>
        </div>
      )}
    </article>
  )
}
