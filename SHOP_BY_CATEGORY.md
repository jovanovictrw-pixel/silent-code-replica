# SHOP BY CATEGORY - Implementation Plan: "Silent Code"

## 1. Vision & Aesthetic
"Silent Code" is a premium, brutalist-meets-luxury streetwear brand. The category pages must reflect this through:
- **Cinematic Transitions**: Using scroll-driven scaling and depth.
- **Micro-interactions**: Subtle hover states, "glassmorphism" UI elements, and high-density typography.
- **Premium Imagery**: AI-generated high-fashion editorial shots that match the technical, dark minimalist DNA.

---

## 2. Category Architecture & Routes

| Category | Slug | Primary Aesthetic Focus |
| :--- | :--- | :--- |
| **Men** | `/category/men` | Brutalist Silhouettes, Structured, Technical |
| **Women** | `/category/women` | Neo-Grunge, High-Fashion, Fluid-meets-Structured |
| **Accessories** | `/category/accessories` | Industrial Hardware, Wearable Tech |

---

## 3. Product Catalog Specs

### Men’s Collection (The "Brutalist" Series)
**9 Core Items:**
1. **"Void" Heavyweight Hoodie**: 500 GSM French Terry, invisible pockets.
2. **Architectural Cargo Pants**: Matte nylon, 3D modular pockets.
3. **Distressed "Onyx" Denim**: Wax-coated finish, laser-etched.
4. **Boxy "Ghost" Tee**: Dropped shoulders, rubber logo.
5. **Technical "Shell" Bomber**: Water-resistant, asymmetrical zippers.
6. **Suede "Shadow" Chelsea Boots**: Lug sole, water-repellent.
7. **"Industrial" Utility Belt**: Cobra buckle, seatbelt nylon.
8. **Carbon-Fiber Frame Shades**: Polarized midnight lenses.
9. **Modular "Courier" Sling Bag**: FIDLOCK buckles, weatherproof.

**3 Strategic Bundles:**
- **The "Street-Armor" Kit**: Hoodie + Cargo Pants + Belt.
- **The "Midnight Rider" Set**: Bomber + Ghost Tee + Shades.
- **The "Stealth Accessory" Pack**: Sling Bag + Belt + Shades.

### Women’s Collection (The "Neo-Grunge" Edit)
**12–15 Items Including:**
- **Cinch-Waist Cropped Puffer**: High-gloss black, adjustable bungee.
- **Asymmetrical Ribbed Knit Dress**: Second-skin maxi, thumbholes.
- **Wide-Leg "Fluid" Trousers**: Heavy-drape liquid movement.
- **Mesh "Cyber" Bodysuit**: Digital circuitry prints.
- **Distressed "Grunge" Oversized Knit**: Mohair-blend, frayed edges.
- **Vegan Leather "Corset" Top**: Industrial zipper back.
- **Parachute "Tech" Skirt**: Maxi length, toggle volume.
- **Platform "Stomp" Boots**: 3-inch chunky tread.
- **"Lunar" Crescent Tote**: Matte leather hobo bag.

### Essential Accessories ("Wearable Hardware")
1. **The "Heavy Metal" Cuban Chain**: Gunmetal-finished stainless steel.
2. **Leather "Tech" Gloves**: Touchscreen-compatible lambskin.
3. **The "Arch" Structured Cap**: Heavy nylon with 3D tonal embroidery.
4. **"Shadow" Silk-Blend Scarf**: Jacquard-woven monogram.
5. **Matte Carbon-Fiber Cardholder**: RFID-blocking, magnetic strap.
6. **The "Omni" Utility Carabiner**: CNC-machined aluminum with multi-tool.

---

## 4. Sales Efficiency & Conversion Drivers
To maximize revenue per visit, we will implement:

- **Value Anchoring (Bundle Math)**: 
    - Display bundle price vs. sum of individual items (e.g., "$350 vs $420").
    - Visual "Savings" badge on bundle cards.
- **Urgency Hooks**:
    - "Low Stock" markers on specific variants (e.g., Size L of the Void Hoodie).
    - "Limited Edition" labels for the Strategic Bundles.
- **Cross-Selling Engine**:
    - "Complete the Kit" section on product pages suggesting Accessories.
    - Floating ADD TO CART button on scroll for mobile.

---

## 5. Implementation Workflow

### Phase 1: Imagery Asset Generation
- Generate AI images for each item using the `generate_image` tool.
- Assets must follow a consistent lighting (cold, high-contrast) and background (concrete, dark studio).
- **Optimization Strategy**: All imagery must be served in next-gen formats (WebP/AVIF). Implement responsive `srcset` with widths at 400w, 800w, and 1200w. Ensure `sizes` attributes reflect the brutalist grid columns (e.g., `(max-width: 768px) 100vw, 33vw`). Use `loading="lazy"` for all below-the-fold assets.

### Phase 2: Route & Layout Setup
- Create `src/routes/category/$categoryName.tsx`.
- Implement a `CategoryLayout` component with a sticky sub-navigation.

### Phase 3: Component Development
- **`ProductCard`**: Hover to zoom, quick-buy overlay.
- **`BundleCard`**: Multi-item preview, price comparison badge.
- **`ScarcityIndicator`**: Dynamic stock levels.

### Phase 4: Polish
- Implement TanStack Router transitions.
- Finetune `src/styles.css` for the brutalist typography and glassmorphism.
- Responsive testing for mobile "one-handed" shopping accessibility.

---

## 6. Progress Tracker

- [x] **Phase 1: Imagery Asset Generation** (Core editorial assets for Men, Women, Accessories generated)
- [x] **Phase 2: Route & Layout Setup** (Category dynamic route and Layout implemented)
- [x] **Phase 3: Component Development**
    - [x] `ProductCard` (Hover zoom, high-end polish)
    - [x] `BundleCard` (Strategic layout, multi-item preview)
    - [x] `ScarcityIndicator` (Reusable status labels)
- [ ] **Phase 4: Polish**
    - [ ] TanStack Router transitions
    - [ ] Mobile "one-handed" shopping accessibility
    - [ ] Performance optimization (Image lazy-loading)
