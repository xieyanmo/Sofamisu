import sampleOneImage from '../assets/sample1_1.jpg'
import sampleTwoImage from '../assets/sample1_2.jpg'
import sampleThreeImage from '../assets/sample1_3.jpg'
import sampleFourImage from '../assets/sample1_4.jpg'
import sampleFiveImage from '../assets/sample1_5.jpg'
import colorBlackImage from '../assets/color_black.jpg'
import colorBlueImage from '../assets/color_blue.jpg'
import colorBrownImage from '../assets/color_brown.jpg'
import colorOrangeImage from '../assets/color_orange.jpg'
import type { Product, ProductColorVariant } from '../types/Product'

// Edit product titles in each `title` field below.
// Edit product descriptions in each `description` field below.
// Edit product prices in each `price` field and matching variant `price` field below.
// Replace placeholder image paths later by changing `featuredImage.url`, `hoverImage.url`, and entries in `images`.
// Edit Home featured products by changing the handles or ids in `featuredProductHandles`.

export const featuredProductHandles = [
  'atelier-leather-sofa',
  'linen-house-sofa',
  'audo-lounge-sofa',
  'copenhagen-chaise-sofa',
  'rue-tufted-sofa',
]

const sampleImages = [
  sampleOneImage,
  sampleTwoImage,
  sampleThreeImage,
  sampleFourImage,
  sampleFiveImage,
]

const createProductImages = (
  productTitle: string,
  imagePrefix: string,
  imageOrder = sampleImages,
) =>
  imageOrder.map((image, index) => ({
    id: `${imagePrefix}-${String(index + 1).padStart(2, '0')}`,
    url: image,
    altText:
      index === 0
        ? productTitle
        : `${productTitle} alternate view ${index + 1}`,
  }))

const createColorVariants = (
  productTitle: string,
  productHandle: string,
): ProductColorVariant[] => [
  {
    id: `${productHandle}-midnight-onyx`,
    name: 'Midnight Onyx',
    swatchColor: '#171412',
    swatchImage: colorBlackImage,
    images: createProductImages(
      `${productTitle} in Midnight Onyx`,
      `${productHandle}-midnight-onyx`,
    ),
  },
  {
    id: `${productHandle}-fjord-smoke`,
    name: 'Fjord Smoke',
    swatchColor: '#4D6472',
    swatchImage: colorBlueImage,
    images: createProductImages(
      `${productTitle} in Fjord Smoke`,
      `${productHandle}-fjord-smoke`,
      [sampleTwoImage, sampleOneImage, sampleThreeImage, sampleFourImage, sampleFiveImage],
    ),
  },
  {
    id: `${productHandle}-amber-cognac`,
    name: 'Amber Cognac',
    swatchColor: '#A9612D',
    swatchImage: colorOrangeImage,
    images: createProductImages(
      `${productTitle} in Amber Cognac`,
      `${productHandle}-amber-cognac`,
      [sampleOneImage, sampleTwoImage, sampleThreeImage, sampleFiveImage, sampleFourImage],
    ),
  },
  {
    id: `${productHandle}-aged-truffle`,
    name: 'Aged Truffle',
    swatchColor: '#5A3425',
    swatchImage: colorBrownImage,
    images: createProductImages(
      `${productTitle} in Aged Truffle`,
      `${productHandle}-aged-truffle`,
      [sampleTwoImage, sampleThreeImage, sampleOneImage, sampleFourImage, sampleFiveImage],
    ),
  },
]

const mockProducts: Omit<Product, 'colorVariants'>[] = [
  {
    id: 'gid://shopify/Product/mock-sofa-01',
    handle: 'atelier-leather-sofa',
    title: 'Atelier Leather Sofa',
    description:
      'A made-to-order leather sofa placeholder for future Shopify product data.',
    price: 2890,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 12,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-01-default',
        title: 'Default',
        price: 2890,
        availableForSale: true,
        inventoryQuantity: 12,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-01-image-01',
      url: sampleOneImage,
      altText: 'Atelier Leather Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-01-image-02',
      url: sampleTwoImage,
      altText: 'Atelier Leather Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-01-image-01',
        url: sampleOneImage,
        altText: 'Atelier Leather Sofa',
      },
      {
        id: 'mock-sofa-01-image-02',
        url: sampleTwoImage,
        altText: 'Atelier Leather Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-02',
    handle: 'nord-house-sofa',
    title: 'Nord House Sofa',
    description:
      'A local sample product that can later be replaced with Shopify data.',
    price: 3190,
    compareAtPrice: 3490,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 8,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-02-default',
        title: 'Default',
        price: 3190,
        availableForSale: true,
        inventoryQuantity: 8,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-02-image-01',
      url: sampleOneImage,
      altText: 'Nord House Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-02-image-02',
      url: sampleTwoImage,
      altText: 'Nord House Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-02-image-01',
        url: sampleOneImage,
        altText: 'Nord House Sofa',
      },
      {
        id: 'mock-sofa-02-image-02',
        url: sampleTwoImage,
        altText: 'Nord House Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-03',
    handle: 'residence-leather-sofa',
    title: 'Residence Leather Sofa',
    description:
      'A third mock product reusing local assets until Shopify is connected.',
    price: 3350,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 5,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-03-default',
        title: 'Default',
        price: 3350,
        availableForSale: true,
        inventoryQuantity: 5,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-03-image-01',
      url: sampleOneImage,
      altText: 'Residence Leather Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-03-image-02',
      url: sampleTwoImage,
      altText: 'Residence Leather Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-03-image-01',
        url: sampleOneImage,
        altText: 'Residence Leather Sofa',
      },
      {
        id: 'mock-sofa-03-image-02',
        url: sampleTwoImage,
        altText: 'Residence Leather Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-04',
    handle: 'linen-house-sofa',
    title: 'Linen House Sofa',
    description:
      'A fourth mock sofa for testing the Collections product grid layout.',
    price: 2750,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 9,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-04-default',
        title: 'Default',
        price: 2750,
        availableForSale: true,
        inventoryQuantity: 9,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-04-image-01',
      url: sampleOneImage,
      altText: 'Linen House Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-04-image-02',
      url: sampleTwoImage,
      altText: 'Linen House Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-04-image-01',
        url: sampleOneImage,
        altText: 'Linen House Sofa',
      },
      {
        id: 'mock-sofa-04-image-02',
        url: sampleTwoImage,
        altText: 'Linen House Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-05',
    handle: 'oslo-track-arm-sofa',
    title: 'Oslo Track Arm Sofa',
    description: 'A clean-lined sofa with generous cushions and quiet scale.',
    price: 2980,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 7,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-05-default',
        title: 'Default',
        price: 2980,
        availableForSale: true,
        inventoryQuantity: 7,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-05-image-01',
      url: sampleOneImage,
      altText: 'Oslo Track Arm Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-05-image-02',
      url: sampleTwoImage,
      altText: 'Oslo Track Arm Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-05-image-01',
        url: sampleOneImage,
        altText: 'Oslo Track Arm Sofa',
      },
      {
        id: 'mock-sofa-05-image-02',
        url: sampleTwoImage,
        altText: 'Oslo Track Arm Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-06',
    handle: 'audo-lounge-sofa',
    title: 'Audo Lounge Sofa',
    description: 'A low lounge profile designed for relaxed, refined rooms.',
    price: 3420,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 6,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-06-default',
        title: 'Default',
        price: 3420,
        availableForSale: true,
        inventoryQuantity: 6,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-06-image-01',
      url: sampleOneImage,
      altText: 'Audo Lounge Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-06-image-02',
      url: sampleTwoImage,
      altText: 'Audo Lounge Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-06-image-01',
        url: sampleOneImage,
        altText: 'Audo Lounge Sofa',
      },
      {
        id: 'mock-sofa-06-image-02',
        url: sampleTwoImage,
        altText: 'Audo Lounge Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-07',
    handle: 'marble-house-sectional',
    title: 'Marble House Sectional',
    description: 'A modular sectional with deep seats and tailored edges.',
    price: 4590,
    compareAtPrice: 4890,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 4,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-07-default',
        title: 'Default',
        price: 4590,
        availableForSale: true,
        inventoryQuantity: 4,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-07-image-01',
      url: sampleOneImage,
      altText: 'Marble House Sectional',
    },
    hoverImage: {
      id: 'mock-sofa-07-image-02',
      url: sampleTwoImage,
      altText: 'Marble House Sectional alternate view',
    },
    images: [
      {
        id: 'mock-sofa-07-image-01',
        url: sampleOneImage,
        altText: 'Marble House Sectional',
      },
      {
        id: 'mock-sofa-07-image-02',
        url: sampleTwoImage,
        altText: 'Marble House Sectional alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-08',
    handle: 'willow-slipcover-sofa',
    title: 'Willow Slipcover Sofa',
    description: 'A soft, casual silhouette with a tailored slipcover finish.',
    price: 2650,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 10,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-08-default',
        title: 'Default',
        price: 2650,
        availableForSale: true,
        inventoryQuantity: 10,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-08-image-01',
      url: sampleOneImage,
      altText: 'Willow Slipcover Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-08-image-02',
      url: sampleTwoImage,
      altText: 'Willow Slipcover Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-08-image-01',
        url: sampleOneImage,
        altText: 'Willow Slipcover Sofa',
      },
      {
        id: 'mock-sofa-08-image-02',
        url: sampleTwoImage,
        altText: 'Willow Slipcover Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-09',
    handle: 'copenhagen-chaise-sofa',
    title: 'Copenhagen Chaise Sofa',
    description: 'An elongated chaise sofa with calm Scandinavian proportions.',
    price: 3920,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 5,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-09-default',
        title: 'Default',
        price: 3920,
        availableForSale: true,
        inventoryQuantity: 5,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-09-image-01',
      url: sampleOneImage,
      altText: 'Copenhagen Chaise Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-09-image-02',
      url: sampleTwoImage,
      altText: 'Copenhagen Chaise Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-09-image-01',
        url: sampleOneImage,
        altText: 'Copenhagen Chaise Sofa',
      },
      {
        id: 'mock-sofa-09-image-02',
        url: sampleTwoImage,
        altText: 'Copenhagen Chaise Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-10',
    handle: 'harbour-leather-loveseat',
    title: 'Harbour Leather Loveseat',
    description: 'A compact leather loveseat for intimate living spaces.',
    price: 2180,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 11,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-10-default',
        title: 'Default',
        price: 2180,
        availableForSale: true,
        inventoryQuantity: 11,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-10-image-01',
      url: sampleOneImage,
      altText: 'Harbour Leather Loveseat',
    },
    hoverImage: {
      id: 'mock-sofa-10-image-02',
      url: sampleTwoImage,
      altText: 'Harbour Leather Loveseat alternate view',
    },
    images: [
      {
        id: 'mock-sofa-10-image-01',
        url: sampleOneImage,
        altText: 'Harbour Leather Loveseat',
      },
      {
        id: 'mock-sofa-10-image-02',
        url: sampleTwoImage,
        altText: 'Harbour Leather Loveseat alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-11',
    handle: 'rue-tufted-sofa',
    title: 'Rue Tufted Sofa',
    description: 'A refined tufted sofa with a quiet vintage influence.',
    price: 3090,
    compareAtPrice: 3290,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 6,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-11-default',
        title: 'Default',
        price: 3090,
        availableForSale: true,
        inventoryQuantity: 6,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-11-image-01',
      url: sampleOneImage,
      altText: 'Rue Tufted Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-11-image-02',
      url: sampleTwoImage,
      altText: 'Rue Tufted Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-11-image-01',
        url: sampleOneImage,
        altText: 'Rue Tufted Sofa',
      },
      {
        id: 'mock-sofa-11-image-02',
        url: sampleTwoImage,
        altText: 'Rue Tufted Sofa alternate view',
      },
    ],
  },
  {
    id: 'gid://shopify/Product/mock-sofa-12',
    handle: 'verona-deep-seat-sofa',
    title: 'Verona Deep Seat Sofa',
    description: 'A deep seat sofa designed for generous everyday comfort.',
    price: 3680,
    compareAtPrice: null,
    category: 'Sofas',
    availableForSale: true,
    inventoryQuantity: 3,
    variants: [
      {
        id: 'gid://shopify/ProductVariant/mock-sofa-12-default',
        title: 'Default',
        price: 3680,
        availableForSale: true,
        inventoryQuantity: 3,
      },
    ],
    featuredImage: {
      id: 'mock-sofa-12-image-01',
      url: sampleOneImage,
      altText: 'Verona Deep Seat Sofa',
    },
    hoverImage: {
      id: 'mock-sofa-12-image-02',
      url: sampleTwoImage,
      altText: 'Verona Deep Seat Sofa alternate view',
    },
    images: [
      {
        id: 'mock-sofa-12-image-01',
        url: sampleOneImage,
        altText: 'Verona Deep Seat Sofa',
      },
      {
        id: 'mock-sofa-12-image-02',
        url: sampleTwoImage,
        altText: 'Verona Deep Seat Sofa alternate view',
      },
    ],
  },
]

export const shopifyProducts: Product[] = mockProducts.map((product) => ({
  ...product,
  colorVariants: createColorVariants(product.title, product.handle),
  images: createProductImages(product.title, `${product.handle}-image`),
}))
