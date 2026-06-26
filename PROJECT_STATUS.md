# Sofamisu Project Status

## Current Architecture

Sofamisu is a Vite + React + TypeScript + Tailwind project for a warm luxury premium furniture brand.

Key folders:

- `src/components` - shared UI components such as `Navbar`, `Footer`, and `ProductCard`
- `src/pages` - page-level views: Home, Collections, FAQ, Product Detail
- `src/assets` - local images, logos, benefit icons, product images, and color swatch images
- `src/content` - editable Sofamisu UI copy in `siteContent.ts`
- `src/data` - mock product data prepared for future Shopify integration
- `src/types` - shared product and cart TypeScript types
- `src/context` - global cart state with React Context

Routing is still lightweight and path-based in `src/App.tsx` using `window.location.pathname`.

## Completed Today

- Refined the cart drawer substantially:
  - Added overlay behavior that dims and blocks the page behind the drawer.
  - Added product thumbnail images.
  - Added selected color text and color swatch images.
  - Added quantity controls, remove-at-quantity-1 behavior, subtotal, deposit total, GST note, and Checkout button.
  - Added internal scrolling with a thin accent scrollbar that reserves layout space.
  - Added rounded drawer corners and improved footer spacing.
- Updated product color architecture:
  - Added image-based color swatches from `color_black`, `color_blue`, `color_orange`, and `color_brown`.
  - Renamed colors to premium names: Midnight Onyx, Fjord Smoke, Amber Cognac, Aged Truffle.
- Created and integrated a global Footer:
  - Footer appears on Home, Collections, Product Detail, and FAQ.
  - Footer content comes from `siteContent.ts`.
  - Contact links include custom outline SVG icons.
- Refactored Featured Product:
  - Added `featuredProductHandles` in `src/data/shopifyProducts.ts`.
  - Added shared `ProductCard`.
  - Home Featured Product now reads from the same product data as Collections.
  - Added hover image behavior and overlay product details.
  - Added a 3-visible-item looping carousel for the 5 selected featured products.
  - Added thin copper carousel arrow controls with double-line rounded-square hover animation.
- Added matching double-line rounded-square hover animation to Navbar contact, account, and cart icons.
- Changed site typography to `Neue Haas Grotesk`:
  - Updated component font stacks.
  - Added global body font fallback in `src/index.css`.
  - Updated `design.md` typography guidance.

## Files Created Or Modified

Created:

- `src/components/Footer.tsx`
- `src/components/ProductCard.tsx`

Modified:

- `src/App.tsx`
- `src/components/Navbar.tsx`
- `src/content/siteContent.ts`
- `src/context/CartContext.ts`
- `src/context/CartProvider.tsx`
- `src/data/shopifyProducts.ts`
- `src/index.css`
- `src/pages/Home.tsx`
- `src/pages/Collections.tsx`
- `src/pages/FAQ.tsx`
- `src/pages/ProductDetail.tsx`
- `src/types/Product.ts`
- `design.md`
- `PROJECT_STATUS.md`

## Current UI State

### Navbar

- Fixed header with copper announcement bar.
- Home starts expanded and shrinks on scroll.
- Collections, FAQ, and Product Detail force the shrunken navbar.
- Expanded logo uses `src/assets/logo.png`.
- Shrunken logo uses `src/assets/logo-pic.png`.
- Center links use deep green text and double underline hover animation.
- Contact, account, and cart icons use thin outline SVGs and a double-line rounded-square clockwise hover frame.
- Cart icon shows a quantity badge when cart has items.

### Home

- Hero uses `src/assets/hero_s1.jpg` with dark gradient overlays.
- Key benefit bar shows four editable benefit labels from `siteContent.ts`.
- Featured Product section:
  - Uses `featuredProductHandles` from `shopifyProducts.ts`.
  - Currently selected: product 001, 004, 006, 009, 011.
  - Shows 3 at a time in a looping carousel.
  - Cards are square and use shared `ProductCard`.
  - Hover crossfades to `hoverImage`.
  - Longer hover reveals product title, description, and price over the image.

### Collections

- Uses shrunken navbar.
- Breadcrumb: `Home / Collections / All Sofas`.
- Page title: `All Sofas`.
- Description comes from `siteContent.ts`.
- Product grid shows all 12 mock products from `shopifyProducts.ts`.
- Product cards use `product.featuredImage` and `product.hoverImage`.
- Clicking a product navigates to `/products/:handle`.
- Filter & Sort drawer exists, but filtering/sorting logic does not yet affect products.

### Product Detail

- Route: `/products/:handle`.
- Breadcrumb includes Home / Collections / All Sofas / Product Name.
- Thumbnail gallery supports scrolling, selection, and copper overlay on inactive thumbnails.
- Main image supports image navigation and zoom/magnifier behavior.
- Color variants use image swatches with elegant names.
- Add to Cart uses global cart context.
- Quantity control is custom, no native number input.
- Product Description and Product Specifications use custom double-line triangle accordion icons.

### FAQ

- Uses shrunken navbar.
- Breadcrumb: `Home / FAQ`.
- FAQ content comes from `siteContent.ts`.
- FAQ accordions use the same visual language as Product Detail accordions.
- Right column contains a placeholder contact form.

### Cart Drawer

- Global cart state persists through navigation and localStorage.
- Cart drawer opens from the navbar cart icon.
- Page behind drawer is dimmed and not interactable.
- Clicking outside the drawer closes it.
- Drawer shows product image, title, selected color, color swatch image, quantity controls, item price total, and deposit total.
- Quantity at 1 changes `-` to `x` on hover; clicking removes the item.
- Drawer footer shows Subtotal, Due Today Only (Deposit), GST note, and a Checkout button.
- Checkout button is visual only; no payment flow yet.

### Footer

- Global footer appears after all page content.
- Uses Sofamisu logo, description, navigation links, contact links, legal links, and copyright.
- Footer content is managed in `siteContent.ts`.
- Contact icons are custom SVGs, not third-party icons.

## Product Data Architecture

Product type supports:

- `id`
- `handle`
- `title`
- `description`
- `price`
- `compareAtPrice`
- `category`
- `availableForSale`
- `inventoryQuantity`
- `variants`
- `featuredImage`
- `hoverImage`
- `images`
- `colorVariants`

Color variants support:

- color name
- fallback swatch color
- swatch image
- image gallery

Current product data:

- 12 mock products.
- Local sample images are reused for product images.
- Four local swatch images are used for color variants.
- `featuredProductHandles` controls Home featured products.
- No Shopify API connection exists yet.

## Content Management Architecture

Editable Sofamisu-controlled UI content lives in `src/content/siteContent.ts`.

Currently includes:

- announcement bar text
- navbar labels
- hero placeholders
- key benefit labels and icon names
- featured product section title
- Collections breadcrumb/title/description/filter label
- FAQ categories/questions/answers
- Footer logo alt text, description, navigation, contact links, copyright, and legal links

Product data remains separate in `src/data/shopifyProducts.ts`.

## New Architecture Decisions

- Shared `ProductCard` is now the product card source for both Home and Collections.
- Home featured products are selected by handle/id via `featuredProductHandles`.
- Cart state lives in global React Context and persists in localStorage.
- Color swatches are image-based, with fallback color values for older saved cart items.
- Footer and Navbar visible text should come from `siteContent.ts`.
- Typography is now globally standardized on `Neue Haas Grotesk`, with `Inter` and `sans-serif` fallback.

## Known Issues

- `Neue Haas Grotesk` is referenced by CSS but not bundled as a web font. It will only render if available locally unless a font file or webfont provider is added later.
- Routing is still custom path detection, not React Router.
- Filter & Sort UI does not yet filter or sort products.
- Checkout button is currently a placeholder.
- Contact/account navbar icons do not yet navigate or open real flows.
- Footer Privacy Policy and Terms links point to placeholder paths without pages.
- Some large PNG assets are still unoptimized.
- `siteContent.collections.collectionsDescription` contains messy placeholder promo/sample text and should be cleaned.
- No automated tests exist.
- Mobile/responsive behavior has not been fully QA reviewed.

## Remaining TODOs

- Implement real filtering and sorting on Collections.
- Add checkout flow or checkout placeholder page.
- Add privacy policy and terms pages or remove links until ready.
- Connect product data to Shopify Storefront API.
- Replace mock product images and descriptions with real data.
- Add route management with React Router when routing grows.
- Bundle or load Neue Haas Grotesk properly if this font is required for all visitors.
- Review responsive behavior on mobile and tablet.
- Optimize oversized image/icon assets.
- Add basic tests for cart, product routing, and carousel behavior.

## Recommended Next Steps

1. Clean `siteContent.collections.collectionsDescription`.
2. Decide whether to bundle `Neue Haas Grotesk` locally or use a licensed webfont source.
3. Implement Collections filter/sort behavior using the existing UI state.
4. Add basic Checkout page or modal flow.
5. Review Home carousel and Navbar hover effects in browser at desktop and mobile widths.
6. Replace placeholder Footer contact links with real Sofamisu contact details.
7. Start Shopify integration planning after product detail and cart behavior are stable.
