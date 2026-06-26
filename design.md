# Sofamisu Design System

## Brand Direction

Sofamisu is a warm luxury furniture brand with Scandinavian restraint and premium proportions. The visual language should feel quiet, tactile, curated, and architectural, drawing inspiration from Restoration Hardware's refined scale and Audo Copenhagen's softer Nordic minimalism.

The experience should avoid visual clutter, loud decoration, and trend-heavy styling. Use generous whitespace, strong alignment, calm rhythm, and refined material cues.

## Style Principles

- Warm luxury over cold minimalism
- Scandinavian simplicity with premium depth
- Large whitespace and elegant proportions
- Tactile surfaces, muted contrast, and natural warmth
- Editorial restraint, not decorative excess
- Confident hierarchy with few competing elements

## Color Palette

| Token | Hex | Usage |
| --- | --- | --- |
| Primary | `#944E25` | Primary actions, key brand moments, selected states |
| Secondary | `#744026` | Secondary emphasis, deep accents, hover states |
| Accent | `#BE8B48` | Fine details, dividers, highlights, premium accents |
| Background | `#F7F4EF` | Main page background |
| Surface | `#EAE4DB` | Panels, cards, navigation surfaces, subtle sections |
| Text | `#3A1C0F` | Primary text and high-emphasis UI |

## Typography

### Global Font

Use `Neue Haas Grotesk` for all headings, body copy, navigation, labels, forms, metadata, and interface text.

Recommended usage:

- Clean, premium text with restrained weight
- Comfortable line height
- Medium weight only when emphasis is needed
- Avoid excessive uppercase text

## Shape

Global border radius: `16px`

Use this radius for cards, panels, inputs, menus, and framed content. Keep the shape consistent and understated.

## Layout

- Use large margins and generous section spacing.
- Favor fewer, larger elements over dense arrangements.
- Keep layouts aligned to a clear grid.
- Let furniture imagery, product details, and typography breathe.
- Avoid nested cards and overly segmented surfaces.
- Use full-width bands or quiet unframed layouts for major page sections.

## Website Structure

Main pages:

- Home
- Collections
- FAQ
- Product detail page
- Cart and checkout

The site structure should remain minimal and direct. Navigation should support browsing and purchasing without adding visual noise or unnecessary page complexity.

## Navbar

The navbar should feel warm, refined, and minimal.

- Left: Sofamisu logo
- Center: Home, Collections, FAQ
- Right: contact icon, account icon, cart icon

Use clear spacing and restrained icon styling. The navbar should feel integrated with the page rather than visually heavy, with soft contrast against the warm background or surface color.

## UI Tone

Buttons, navigation, and controls should feel precise and premium. Use restrained borders, soft surface contrast, and deliberate hover states.

Avoid:

- Bright white sterile surfaces
- Heavy shadows
- Glossy gradients
- Loud accent usage
- Crowded card grids
- Overly rounded pill-heavy interfaces

## Tailwind Reference Tokens

Suggested token names for future Tailwind configuration:

```ts
colors: {
  primary: '#944E25',
  secondary: '#744026',
  accent: '#BE8B48',
  background: '#F7F4EF',
  surface: '#EAE4DB',
  text: '#3A1C0F',
}
```

```ts
fontFamily: {
  sans: ['Neue Haas Grotesk', 'Inter', 'sans-serif'],
}
```

```ts
borderRadius: {
  DEFAULT: '16px',
}
```
