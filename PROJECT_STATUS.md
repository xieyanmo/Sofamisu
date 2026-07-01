# Sofamisu Project Status

Last updated: 02/07/26

## 1. Completed Today

- Implemented the Excel-based product generation workflow.
- Added `scripts/generate-products.js`.
- Added the npm script `generate:products`.
- `product_variant.xlsx` is now the source for product variants.
- `src/data/generatedProducts.js` is generated from `src/assets/product_variant.xlsx`.
- `src/assets/product_picture` folders are generated automatically from the Excel combinations.
- `src/assets/swatch_pic` is used for global shared color swatches.
- Added `src/data/masterData.js` for material and color display data.
- Product names now come from the `productname` column in `product_variant.xlsx`.
- Product Detail and product listing data now come from generated product data instead of the old temporary product/image setup.
- Product Detail now loads images based on selected `productId + material + size + color`.
- Product images inside `product_picture` were renamed per lowest-level folder to `1.png`, `2.png`, `3.png`, etc.
- Fixed swatch paths to use `.jpg` instead of `.webp`.
- Fixed Product Detail desktop scroll behavior over the main image area.

Files changed today include:

- `scripts/generate-products.js`
- `package.json`
- `src/data/generatedProducts.js`
- `src/data/generatedProducts.d.ts`
- `src/data/masterData.js`
- `src/data/masterData.d.ts`
- `src/data/productAssets.ts`
- `src/data/shopifyProducts.ts`
- `src/types/Product.ts`
- `src/components/ProductCard.tsx`
- `src/components/ProductImage.tsx`
- `src/pages/Home.tsx`
- `src/pages/ProductDetail.tsx`
- `PROJECT_STATUS.md`

## 2. Current Product Data Architecture

- `src/assets/product_variant.xlsx` is the source of truth for product availability.
- The Excel file defines:
  - `productid`
  - `productname`
  - available material codes
  - available size values
  - available color codes
- Running `npm.cmd run generate:products` reads the latest Excel file and regenerates `src/data/generatedProducts.js`.
- `generatedProducts.js` controls what appears in the UI.
- Updating Excel updates frontend product names and available material, size, and color options.
- Updating Excel does not delete old product image folders.
- Existing folders are assets only and do not control the UI.
- `masterData.js` maps internal material/color codes to display data:
  - `VL` = Vintage Leather
  - `NL` = Natural Leather
  - `FB` = Fabric / Faux Leather
  - `b6` = Cuban Tan
  - `b7` = Rum Brown
  - `b8` = Espresso
  - `b9` = Dark Walnut
  - `g8` = Olive Green
  - `b1` = Ebony
- Size has no master mapping file.
- Size values are displayed directly from Excel, for example `2000x1800x850`.
- Product Detail image selection is based on the selected generated combination:
  `/product_picture/{productId}/{materialCode}/{size}/{colorCode}/`
- Swatch images currently use `.jpg`, for example:
  `/swatch_pic/b6.jpg`

## 3. Current Asset Folder Structure

- Product variant workbook:
  - `src/assets/product_variant.xlsx`
- Generated product image folders:
  - `src/assets/product_picture/{productId}/{materialCode}/{size}/{colorCode}/`
- Example product image folder:
  - `src/assets/product_picture/BWSF01/VL/2000x1800x850/b6/`
- Product image filenames inside each lowest-level folder now follow:
  - `1.png`
  - `2.png`
  - `3.png`
  - `4.png`
  - `5.png`
- Shared global swatches:
  - `src/assets/swatch_pic/b1.jpg`
  - `src/assets/swatch_pic/b6.jpg`
  - `src/assets/swatch_pic/b7.jpg`
  - `src/assets/swatch_pic/b8.jpg`
  - `src/assets/swatch_pic/b9.jpg`
  - `src/assets/swatch_pic/g8.jpg`
- `product_picture` is for product-specific images.
- `swatch_pic` is for shared color swatch images used across products.

## 4. Known Issues Fixed

- Fixed Product Detail images showing placeholders even when product images existed.
- Fixed image loading so real files in the selected combination folder are used.
- Fixed Product Detail to auto-select the first available material, size, and color from generated data.
- Fixed Product Detail gallery updates when material, size, or color changes.
- Fixed swatch extension mismatch from `.webp` to `.jpg`.
- Fixed swatches to render real image assets when available.
- Fixed product image filenames that were too long by renaming them sequentially per folder.
- Fixed desktop page scrolling when hovering over the Product Detail main image.
- Fixed generator behavior so old folders are not deleted when Excel options are removed.
- Added unused folder warnings during generation.

## 5. Known Issues Remaining

- Shopify integration is not connected yet.
- Real prices are not finalized yet.
- Real descriptions are not finalized yet.
- Temporary price and description text is still used.
- Checkout/payment is not connected to Shopify.
- Account/login flows are still mock only and hidden from the navbar.
- Some old demo assets still exist in `src/assets`; they are not deleted yet.
- Product image optimization is still needed for production.
- Large generated image files may increase build size.
- No automated tests exist yet.
- Routing is still custom path detection rather than React Router.

## 6. Next Steps

Run these commands next time after editing the Excel file:

```bash
npm.cmd run generate:products
```

Then start the local site:

```bash
npm run dev
```

Recommended next tasks:

1. Add or replace product images in the correct `product_picture` folders.
2. Confirm every active Excel combination has the intended product images.
3. Confirm all swatch images in `swatch_pic` are final.
4. Replace temporary prices and descriptions with real data when ready.
5. Decide when to connect Shopify product, cart, checkout, and customer account APIs.
6. Optimize product images before production deployment.
7. Run a full desktop/mobile QA pass after the next image/data update.
