
# SilentCode — Premium Dark Streetwear Brand Website

## Overview
Build a pixel-perfect, fully static, single-page dark streetwear brand website for "SilentCode" — a cinematic, immersive, dark-themed clothing brand. The entire site will be implemented as a single route with all sections, animations, and interactions as described.

## Sections to Build

### 1. Global Design System
- Pure black/near-black backgrounds, white/grey typography, muted warm accent (#F5F0EB)
- Google Fonts: Josefin Sans + PT Sans
- CSS custom properties for all colors, generous whitespace, scroll-triggered fade-in animations via IntersectionObserver

### 2. Navigation (Fixed Overlay Drawer)
- Fixed hamburger icon (top-right) and SVG logo wordmark (top-left)
- Side drawer slides in from left with backdrop blur, close button, and hamburger→X morph animation
- Full nav link list with expandable dropdown sub-menus (Shop All, Men, Women, Accessories)
- Social icons and copyright in drawer footer
- Dimmer overlay behind drawer, closes on click

### 3. Hero Section (Full Viewport)
- Full-bleed dark fashion editorial background image with gradient overlay and slow zoom animation
- "SS 2025 COLLECTION" sub-label, "SILENCE IS THE LOUDEST STATEMENT." headline
- Primary CTA: "SHOP NEW ARRIVALS", secondary: "GET 15% OFF YOUR FIRST ORDER →"
- Animated scroll indicator at bottom

### 4. Category Navigation Grid
- "SHOP BY CATEGORY" label, 3-column grid (Men / Women / Accessories)
- Each tile: full background image, dark overlay, hover zoom + darken effect, label + explore CTA
- "VIEW THE FULL COLLECTION" full-width banner below with decorative lines

### 5. Best Sellers Product Grid
- "THE ESSENTIALS" section with 4 product cards in a grid
- Each card: product image, star rating, name, sub-label, price, "QUICK ADD →" link
- Hover: image zoom + "ADD TO BAG" button slides up from bottom
- Aggregate rating below grid CTA

### 6. Value Proposition ("Why SilentCode")
- Subtle fabric texture background at very low opacity
- Brand story headline + paragraph
- 4 benefit icons in a grid (Free Shipping, Free Exchanges, Responsible Materials, Tailored Sizing) with inline SVG icons
- Two secondary CTA links

### 7. User-Generated Content Grid
- 5-column UGC photo grid (square tiles)
- Hover: dark overlay + "SHOP THE LOOK" text fades in
- Click scrolls to Best Sellers section
- "FOLLOW @SILENTCODE" CTA button

### 8. Email Capture Section
- Subtle fabric texture background
- "FIRST TO KNOW. FIRST TO WEAR." headline + description
- Email input + submit button row (stacks on mobile)
- On submit: replaces form with confirmation message with fade-in

### 9. Footer
- 3-column layout: logo + socials + language selector, Shop links, Brand links
- Divider line, copyright text, "BACK TO TOP ↑" smooth scroll link

### 10. JavaScript Interactions
- IntersectionObserver fade-in with staggered delays on grid children
- Parallax effect on section background images
- Sticky nav opacity reduction after 80px scroll
- Smooth scrolling throughout
- All hover interactions (category tiles, product cards, UGC tiles)
- Nav hamburger↝X morph animation

### 11. Responsive Design
- Desktop (>1024px): full layout as specified
- Tablet (768–1024px): adjusted grid columns, reduced padding
- Mobile (<768px): single-column layouts, full-width buttons, stacked email form, 44px min touch targets

## Implementation
All built as a single TanStack Start route (`src/routes/index.tsx`) containing the complete HTML structure, with styles in the component and a useEffect for all JavaScript interactions (IntersectionObserver, nav toggle, email form, parallax, scroll behavior). Uses Unsplash placeholder images and inline SVGs for all icons and the logo.
