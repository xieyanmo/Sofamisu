import { useState } from 'react'
import type { CSSProperties } from 'react'

type ProductImageProps = {
  alt: string
  className: string
  src: string
  style?: CSSProperties
}

export function ProductImage({ alt, className, src, style }: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div
        aria-label={alt}
        className={`${className} grid place-items-center bg-[#EAE4DB]`}
        role="img"
        style={style}
      >
        <span className="h-12 w-12 rounded-full border border-[#BE8B48]/45" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
    />
  )
}
