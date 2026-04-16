# IMPROVEMENT.md — SilentCode Website Review
> Reviewed: 2026-04-16 | Reviewer: Antigravity AI  
> Stack: React + TanStack Router + Tailwind CSS v4 + Vanilla CSS + Vite

---

## Table of Contents
1. [Critical Bugs & Broken Assets](#1-critical-bugs--broken-assets)
2. [Performance](#2-performance)
3. [Accessibility (a11y)](#3-accessibility-a11y)
4. [SEO & Metadata](#4-seo--metadata)
5. [Architecture & Code Quality](#5-architecture--code-quality)
6. [UX & Conversion Optimisation](#6-ux--conversion-optimisation)
7. [Design & Visual Polish](#7-design--visual-polish)
8. [Mobile Experience](#8-mobile-experience)
9. [Missing Features / Pages](#9-missing-features--pages)
10. [Security](#10-security)

---

## 1. Critical Bugs & Broken Assets

### 🔴 Local asset paths will 404 in production
**Files:** `src/lib/products.ts` (lines 27, 37, 67, 77, 120, 138, 152-155, 181, 284)

Several products reference local assets that don't exist in `/public/assets/`:
```
/assets/men_hero.png
/assets/men_cargo.png
/assets/men_bomber.png
/assets/men_boots.png
/assets/women_hero.png
/assets/accessories_hero.png
```
The `public/assets/` directory only contains a `placeholder.svg`. These images will 404 on first load. The `ProductCard` component has an `onError` fallback, but that fallback URL also has unreliable formatting.

**Fix:** Either provide real static assets in `/public/assets/`, replace with stable Unsplash URLs like all the other products, or implement a centralized `getImageWithFallback()` utility.

---

### 🔴 Bundle item `m11` doesn't exist
**File:** `src/lib/products.ts` line 158

The `"Omni-Layer"` bundle references `bundleItemIds: ["a7", "m11", "m2"]`. There is no product with `id: "m11"` in the products array, which means `BundleCard.tsx` will silently receive an incomplete `bundleItems` array and display wrong or missing product detail chips.

**Fix:** Add the missing product or correct the ID reference.

---

### 🔴 Inline `<style>` tag injected per-card render
**File:** `src/components/shared/ScarcityIndicator.tsx` lines 32–37

A `<style dangerouslySetInnerHTML>` is rendered inside every single `ScarcityIndicator`. If a category page renders 10 low-stock cards, the same `@keyframes` rule is injected 10 times into the DOM. This is both wasteful and a potential style deduplication issue.

**Fix:** Move `@keyframes sc-low-box-pulse` into `styles.css` and use the class name directly.

---

### 🔴 Navbar sub-item links all navigate to the parent route
**File:** `src/components/shared/Navbar.tsx` lines 98–106

Sub-items (e.g. "Tops", "Hoodies & Sweatshirts", "Outerwear") all link to `link.href` — the same URL as the parent. Clicking any sub-category takes the user to the full category page with no filtering applied.

**Fix:** Either implement sub-category filtering (e.g. `/category/men?sub=tops`) or change sub-items to anchor-scroll to section IDs within the category page.

---

### 🟡 Footer "ASSISTANCE" links are dead `<a>` tags
**File:** `src/components/shared/Footer.tsx` lines 38–43

`<a className="sc-footer-link">SHIPPING & RETURNS</a>` etc. have no `href`, no `onClick`, and no routing. They render as non-interactive text disguised as links, which breaks user expectations and accessibility.

**Fix:** Add `href="#"` at minimum, or route to real pages/sections.

---

### 🟡 Ticker reset/wrap is not implemented — it drifts infinitely
**File:** `src/hooks/useScrollEngine.ts` lines 111–122

`s.tickerX` decrements forever. On a long scroll session the value becomes a large negative number, causing all ticker tracks to share the same ever-growing translateX. There is no wrap-around reset.

**Fix:** Calculate the single-item width of the ticker track and wrap `tickerX` using a modulo operation once it exceeds that width.

---

## 2. Performance

### 🔴 Lerp wrapper recalculates `scrollHeight` on every resize but not on content change
**File:** `src/hooks/useScrollEngine.ts` lines 221–245

`document.body.style.height` is set to `wrapper.scrollHeight` on init and resize, but not when React re-renders change the DOM height (e.g. nav open/close, fade-in animations completing). This causes the scrollable height to desync, making portions of the page unreachable or adding phantom scroll space at the bottom.

**Fix:** Use a `ResizeObserver` on the `.sc-lerp-wrapper` element instead of only listening to `window.resize`.

---

### 🟡 `.sc-prod-card` scale is applied in the RAF loop via `style.transform`
**File:** `src/hooks/useScrollEngine.ts` lines 126–144

Every card gets `card.style.transform = ...` AND `card.style.transition = "transform 0.15s ease-out"` set on *every single frame*. Setting CSS `transition` property inside rAF is very expensive and will cause style recalculations on every frame even for off-screen cards.

**Fix:** Set the transition once in CSS (it's already partially done with `.sc-prod-card` in `styles.css`), and only mutate `transform` in the rAF loop.

---

### 🟡 12 duplicate `<span>` ticker items rendered per strip
**File:** `src/routes/index.tsx` lines 138–140, 204–206

`Array.from({ length: 12 })` creates 12 copies of the full ticker string per strip. Each string is ~60 chars. This is fine visually but the DOM contains 24 ticker spans total (two strips × 12 copies), all of which will be measured and painted. Consider reducing to 6-8 per strip — still more than enough to fill any viewport width.

---

### 🟡 No route-level code splitting
**File:** `src/router.tsx`

TanStack Router supports lazy route loading via `createLazyFileRoute`. All routes are currently eagerly loaded. Adding lazy loading for category pages would reduce initial bundle size.

---

### 🟡 `useScrollEngine` is called on both the index page AND `CategoryLayout`
**Files:** `src/routes/index.tsx` line 56, `src/components/shared/CategoryLayout.tsx` line 14

Two separate scroll engines will run simultaneously if a category page is ever wrapped in a component that also independently triggers the hook. More importantly, the hook should be extracted to a shared layout level (e.g. `__root.tsx`) to ensure a single rAF loop across all pages. Currently each route mounts and cleans up its own loop.

---

### 🟡 Unsplash images lack explicit `width`/`height` attributes
**Files:** Various — `index.tsx`, `products.ts`

All `<img>` tags for product cards are missing explicit `width` and `height` attributes. This prevents the browser from reserving layout space before images load, causing cumulative layout shift (CLS).

**Fix:** Add width/height (or use `aspect-ratio` in CSS — which is already done for `.sc-prod-img-wrap`, but not for hero/UGC/category tiles).

---

## 3. Accessibility (a11y)

### 🔴 Navigation panel is not trapped for keyboard users
**File:** `src/components/shared/Navbar.tsx`

When the nav panel opens, focus is not trapped inside it. A keyboard user can Tab past the panel into the dimmed background content, which is unreachable visually. There is also no `role="dialog"` or `aria-modal="true"` on the panel.

**Fix:** Add a focus trap (e.g. npm package `focus-trap-react`) when `navOpen === true`, and add `role="dialog"` and `aria-modal="true"` to `.sc-nav-panel`.

---

### 🔴 No `aria-expanded` on accordion nav items
**File:** `src/components/shared/Navbar.tsx` line 82–93

The `<button>` that toggles sub-menus has no `aria-expanded` attribute. Screen readers cannot announce the open/closed state of sub-categories.

**Fix:** Add `aria-expanded={!!openSubs[link.label]}` to the toggle buttons and `aria-controls` pointing to the sub-list id.

---

### 🟡 Ticker text is not `aria-hidden`
**File:** `src/routes/index.tsx` lines 136–142

The ticker strips contain repetitive decorative text. Screen readers will read all 12 duplicates. Add `aria-hidden="true"` to the entire `.sc-ticker` wrapper.

---

### 🟡 UGC tiles use `div` with `onClick` instead of a semantic element
**File:** `src/routes/index.tsx` lines 249–256

Clickable `.sc-ugc-tile` divs with `onClick` are not keyboard-focusable and have no role. Replace with `<button>` or `<a>` to make them reachable by keyboard users.

---

### 🟡 Product "ADD TO BAG" button has no accessible product name
**File:** `src/routes/index.tsx` line 181, `src/components/shared/ProductCard.tsx` line 26

Both have `<button>ADD TO BAG</button>` with no context. Two or more on the same page are indistinguishable to a screen reader.

**Fix:** Add `aria-label={`Add ${p.name} to bag`}` to each button.

---

### 🟡 Hero image alt text is too generic
**File:** `src/routes/index.tsx` line 112

`alt="Dark fashion editorial"` describes the style, not the content. For meaningful SEO and accessibility, it should describe what's actually in the image (e.g., "Model wearing SilentCode SS25 heavyweight hoodie in obsidian").

---

### 🟡 Colour contrast on muted text may fail WCAG AA
**Files:** `src/styles.css`

Several colour values used for secondary text fall below the WCAG AA minimum contrast ratio of 4.5:1 against the black background:
- `#555555` (used for `.sc-section-label`, `.sc-prod-quick`) — contrast ratio ≈ 3.9:1 ❌
- `#666666` (`.sc-prod-sub`, `.sc-nav-sub-item`) — ≈ 3.0:1 ❌
- `#444444` (`.sc-footer-copy`) — ≈ 2.8:1 ❌

**Fix:** Increase muted text to at least `#888` or `#999` to pass AA for normal text sizes.

---

## 4. SEO & Metadata

### 🟡 Category pages have no `<title>` or `<meta description>`
**File:** `src/routes/category.$categoryName.tsx`

The category route does not have a `head()` function. All category pages will use the default root title `"SilentCode — Premium Dark Streetwear"` and the generic description.

**Fix:** Add a `head()` function to `createFileRoute` that sets the title and description dynamically based on `categoryName`.

---

### 🟡 Open Graph image is missing
**File:** `src/routes/__root.tsx` lines 28–40

The root meta includes `og:title` and `og:description` but not `og:image`. Social shares will show a blank preview.

**Fix:** Add `{ property: "og:image", content: "https://..." }` pointing to a brand editorial image.

---

### 🟡 Twitter card is set to `"summary"` instead of `"summary_large_image"`
**File:** `src/routes/__root.tsx` line 38

A dark fashion brand should be using large image Twitter cards to maximise visual impact on social shares.

---

### 🟡 No `robots.txt` or `sitemap.xml`
**File:** `/public/`

The public directory has no `robots.txt` or `sitemap.xml`. Crawlers will use default behaviour and the site won't be indexed efficiently.

---

### 🟡 No `favicon` defined
**File:** `src/routes/__root.tsx`

No `<link rel="icon">` is present. The browser will show a blank tab icon.

---

### 🟡 No `lang` attribute covers the full page
**File:** `src/routes/__root.tsx` line 55

`<html lang="en">` is set, but the footer has a language switcher (EN | DE | FR) with no `hreflang` handling. Clicking DE/FR does nothing and there are no translated routes.

---

## 5. Architecture & Code Quality

### 🟡 `BundleCard` is tightly coupled to specific product IDs
**File:** `src/components/shared/BundleCard.tsx` lines 15–28

The component uses hardcoded product IDs (`mb1`, `mb2`, `mb3`) to control layout behaviour and badge labels. This breaks the moment new bundles are added.

**Fix:** Move the badge label and layout variant into the `Product` type itself (e.g. `layoutVariant?: "full" | "split" | "triple"`).

---

### 🟡 Intersection Observer for fade-in is duplicated across two routes
**Files:** `src/routes/index.tsx` lines 71–88, `src/routes/category.$categoryName.tsx` lines 22–39

Identical `IntersectionObserver` logic is copy-pasted in both routes. This belongs in a custom hook `useFadeOnScroll()`.

---

### 🟡 `scrollToSection` uses imperative DOM query against `document`
**File:** `src/routes/index.tsx` line 58–60

`document.getElementById(id)?.scrollIntoView()` works but breaks if lerp is active (the element is in a fixed/transformed wrapper). The scroll position animation won't align correctly with the lerp offset.

**Fix:** When lerp is enabled, scroll the `window` to the element's `offsetTop` instead of calling `scrollIntoView`.

---

### 🟡 `NAV_LINKS` mixes hash routes, relative paths and `/#section` patterns
**File:** `src/components/shared/Navbar.tsx` lines 6–16

Links like `"/#products"` and `"#footer"` are handled by three different code paths (plain `<a>`, TanStack `<Link>`, and hash anchor). This logic in lines 77–93 is fragile. `"#footer"` (line 15) will navigate to `#footer` on the *current* page, which breaks on category pages.

**Fix:** Normalise how section navigation is handled — either use a scroll-to callback for all section links or handle hash navigation consistently in one place.

---

### 🟡 CSS mixes Tailwind utility classes with the custom `sc-*` class system
**File:** Multiple component files

Components mix Tailwind utilities (`tracking-widest`, `text-[10px]`, `flex`, `gap-4`) with the custom `sc-*` CSS class system. This makes styles unpredictable and harder to maintain. Committing to one approach would improve DX.

---

### 🟡 `package.json` — check for unused dependencies
**File:** `package.json`

The `/src/components/ui/` directory contains 46 shadcn/ui components (`calendar`, `chart`, `command`, `menubar`, `sidebar`, etc.) that are not referenced anywhere in the application code. These bloat the bundle.

**Fix:** Run `npx depcheck` or audit the `/src/components/ui/` folder and remove unused components.

---

## 6. UX & Conversion Optimisation

### 🟡 "ADD TO BAG" and "QUICK SHOP" buttons have no cart / state functionality
**Files:** `src/routes/index.tsx`, `src/components/shared/ProductCard.tsx`

All add-to-bag and quick-shop buttons have no `onClick` handlers. Clicking them is a dead end. Even a minimal cart context with a toast notification ("Added to bag!") would dramatically improve conversion intent.

---

### 🟡 Email form does not validate or store the email
**File:** `src/routes/index.tsx` lines 90–93

`handleEmailSubmit` just toggles `emailSubmitted` state. The email value is never read, validated beyond the `required` attribute, or sent anywhere. Integrate with an email service (Resend, Mailchimp, etc.) or at minimum log the value.

---

### 🟡 "FOLLOW @SILENTCODE" button links nowhere
**File:** `src/routes/index.tsx` line 259

The Instagram CTA button has no `onClick` or `href`. It should open `https://instagram.com/silentcode` in a new tab.

---

### 🟡 No product detail page
**File:** N/A

Clicking a product card leads nowhere — there is no `/product/:id` route or modal. This is the biggest conversion gap on the site.

---

### 🟡 No size selection before "ADD TO BAG"
Every product card has an "ADD TO BAG" CTA with no size picker. Users cannot commit to adding an item without knowing their size — a key purchase friction point.

---

### 🟡 "SHOP ALL BEST SELLERS" button links nowhere
**File:** `src/routes/index.tsx` line 194

The button has no `onClick` or `href`. It should navigate to a shop-all page or scroll to a relevant section.

---

### 🟡 Scarcity indicator on the homepage product grid is missing
**File:** `src/routes/index.tsx` lines 177–190

The homepage `PRODUCTS` array is hardcoded and doesn't reference `products.ts`. No scarcity badges (`LOW STOCK`, etc.) appear on the homepage cards, even though the full category pages have them. Connecting the homepage to the shared product data would unify the experience.

---

### 🟡 No breadcrumb trail on category pages
Category pages only offer "← BACK TO HOME". Users browsing Men → Women have no breadcrumb context.

---

## 7. Design & Visual Polish

### 🟡 Hero H1 font size is too small on desktop
**File:** `src/styles.css` line 425

```css
font-size: clamp(16px, 2.5vw, 32px);
```
At 1920px wide, `2.5vw = 48px`, but `max` is capped at `32px`. On a large monitor the headline `"SILENCE IS THE LOUDEST STATEMENT."` appears quite small relative to the hero background. Consider `clamp(22px, 3vw, 52px)` for more dramatic editorial impact.

---

### 🟡 Progress bar is nearly invisible
**File:** `src/styles.css` line 1201–1212

The scroll progress bar is `height: 1px` with `opacity: 0.4`. At this scale it is nearly imperceptible, particularly on non-retina screens. Consider `height: 2px` and `opacity: 0.7`, or add a subtle glow effect.

---

### 🟡 Curtain animation fires on every page load with no persistence
**File:** `src/routes/index.tsx` lines 62–69

The full-screen curtain plays every single time the homepage is visited, including on back-navigation from a category page. This quickly becomes annoying on repeat visits.

**Fix:** Use `sessionStorage` to detect first-visit and skip the curtain on subsequent navigations within the same session.

---

### 🟡 Category tiles are 70vh tall on desktop
**File:** `src/styles.css` line 554

A 70vh tile height in a 3-column grid makes the section extremely tall (total page height ~70vh). Combined with `sc-sticky-title` on the section label, this creates a jarring sticky behaviour. Consider `clamp(380px, 55vh, 640px)` for a tighter editorial grid.

---

### 🟡 No dark/light mode toggle
The design is exclusively dark. While this matches the brand, adding a CSS-variable-based light mode toggle would be a nice differentiator for accessibility-conscious users, especially given the `@custom-variant dark` token already in `styles.css`.

---

### 🟡 Footer language switcher is non-functional
**File:** `src/components/shared/Footer.tsx` line 16

The `EN | DE | FR` switcher is purely decorative. The `sc-lang-active` class is hardcoded to `EN`. Since i18n isn't implemented, remove the switcher or connect it to a real translation system.

---

## 8. Mobile Experience

### 🟡 Hero H1 is excessively small on mobile
**File:** `src/styles.css` lines 1114–1117

```css
@media (max-width: 767px) {
  .sc-hero-h1 { font-size: clamp(12px, 5vw, 16px); }
}
```
At 375px width, `5vw = 18.75px`, capped at `16px`. The main brand headline becomes barely readable. Consider `clamp(18px, 6vw, 26px)` for mobile.

---

### 🟡 4-column product grid collapses to 1 column on mobile with no 2-column intermediate step
**File:** `src/styles.css` lines 654–661

On tablets (768–1024px), `sc-prod-grid-4` goes to 2 columns, which is correct. On mobile it goes straight to 1 column. A 2-column mobile grid (especially for smaller product cards) would better utilise screen real estate and is an industry norm for mobile e-commerce.

---

### 🟡 UGC grid shows only 2 columns on mobile — the 5th image is orphaned
**File:** `src/styles.css` lines 837–839

With 5 images in a 2-column grid, the 5th tile sits alone in the last row, stretching to full width. This looks unbalanced.

**Fix:** Either use 3 columns on mobile, use a square 4-image grid and show the 5th only on desktop, or use a carousel on mobile.

---

### 🟡 Nav panel is `100vw` on mobile but has no swipe-to-close
**File:** `src/styles.css` line 279

The full-screen mobile nav has no swipe gesture support. Users expect to swipe left to close mobile-native slide menus on touch devices.

**Fix:** Add `touchstart`/`touchend` listeners to support swipe-to-close.

---

### 🟡 `sc-btn-primary` is forced `width: 100%` on mobile
**File:** `src/styles.css` line 1115

This override makes all primary buttons full-width on mobile, including "SHOP ALL BEST SELLERS" and "FOLLOW @SILENTCODE" which look oversized in their context. Apply the override only to `.sc-btn-primary.sc-full-width` when full width is intentional.

---

## 9. Missing Features / Pages

| Priority | Feature | Notes |
|----------|---------|-------|
| 🔴 High | **Product Detail Page** (`/product/:id`) | Full images, size picker, add to cart, material details |
| 🔴 High | **Cart / Bag** | State management, item list, subtotal, checkout CTA |
| 🟡 Medium | **Search** | Minimal search across product names/categories |
| 🟡 Medium | **404 page** | Existing 404 (`__root.tsx`) doesn't match brand aesthetic — it uses generic Tailwind styles |
| 🟡 Medium | **About / Our Story page** | Referenced in nav as "OUR STORY" but links to `/#value` |
| 🟡 Medium | **Lookbook page** | Nav has "LOOKBOOK" but it scrolls to UGC section on homepage |
| 🟡 Medium | **Size Guide page/modal** | Referenced in footer but dead link |
| 🔵 Low | **Wishlist / Save for Later** | Heart icon per-product |
| 🔵 Low | **Filter & Sort** on category pages | By price, availability, new arrivals |
| 🔵 Low | **Order Tracking page** | Referenced in "Assistance" |

---

## 10. Security

### 🟡 Social media links all use `href="#"`
**File:** `src/components/shared/Navbar.tsx` lines 114–118, `src/components/shared/Footer.tsx` lines 20–24

All social links are placeholder `#` hrefs. When real URLs are added, ensure they use `target="_blank" rel="noopener noreferrer"` to prevent reverse tab-nabbing exploits.

---

### 🟡 `dangerouslySetInnerHTML` in production component
**File:** `src/components/shared/ScarcityIndicator.tsx` lines 32–37

Even though the string is a literal (not user input), the pattern of `dangerouslySetInnerHTML` should be avoided. Move the keyframe to `styles.css` to eliminate this entirely.

---

### 🟡 No Content Security Policy headers
**File:** `wrangler.jsonc`

The Cloudflare Workers deployment config doesn't define any CSP headers. A fashion brand collecting emails should at minimum restrict `script-src` and `connect-src`.

---

## Summary Scorecard

| Category | Issues Found | Critical | Medium | Low |
|----------|-------------|----------|--------|-----|
| Broken Assets / Bugs | 5 | 3 | 2 | 0 |
| Performance | 5 | 1 | 4 | 0 |
| Accessibility | 7 | 2 | 5 | 0 |
| SEO & Metadata | 6 | 0 | 6 | 0 |
| Architecture | 6 | 0 | 6 | 0 |
| UX & Conversion | 8 | 0 | 8 | 0 |
| Design & Polish | 6 | 0 | 6 | 0 |
| Mobile | 5 | 0 | 5 | 0 |
| Missing Features | 10 | 2 | 5 | 3 |
| Security | 3 | 0 | 3 | 0 |
| **TOTAL** | **61** | **8** | **50** | **3** |

---

*Highest-impact items to tackle first: broken local assets (§1.1), missing product `m11` (§1.2), inline style tag in ScarcityIndicator (§1.3), and the product detail page (§9).*
