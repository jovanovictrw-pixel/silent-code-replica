export type Product = {
  id: string;
  name: string;
  category: "men" | "women" | "accessories";
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  image: string;
  isBundle?: boolean;
  stockStatus: "in-stock" | "low-stock" | "sold-out";
  labels?: string[];
};

export const products: Product[] = [
  // MEN'S COLLECTION
  {
    id: "m1",
    name: '"Void" Heavyweight Hoodie',
    category: "men",
    price: 180,
    description: "500 GSM French Terry with a double-layered hood.",
    details: ["500 GSM French Terry", "Double-layered hood", '"Invisible" side-seam pockets'],
    image: "/assets/men_hero.png",
    stockStatus: "low-stock",
    labels: ["New Release"]
  },
  {
    id: "m2",
    name: "Architectural Cargo Pants",
    category: "men",
    price: 220,
    description: "Matte nylon with 3D modular pockets.",
    details: ["Matte nylon", "3D modular pockets", "Adjustable ankle toggles"],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "m3",
    name: 'Distressed "Onyx" Denim',
    category: "men",
    price: 240,
    description: "Straight-leg cut with laser-etched distressing.",
    details: ["Straight-leg cut", "Laser-etched distressing", "Wax-coated finish"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "m4",
    name: 'Boxy "Ghost" Tee',
    category: "men",
    price: 85,
    description: "Ultra-thick cotton with dropped shoulders.",
    details: ["Ultra-thick cotton", "Dropped shoulders", "High-density tonal rubber logo"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "m5",
    name: 'Technical "Shell" Bomber',
    category: "men",
    price: 350,
    description: "Water-resistant matte fabric with asymmetrical zippers.",
    details: ["Water-resistant matte fabric", "Asymmetrical zippers", "Quilted interior"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "m6",
    name: 'Suede "Shadow" Chelsea Boots',
    category: "men",
    price: 280,
    description: "Thick lug sole with a water-repellent suede upper.",
    details: ["Thick lug sole", "Water-repellent suede", "Rear pull-tab"],
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b7a?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "m7",
    name: '"Industrial" Utility Belt',
    category: "men",
    price: 65,
    description: "Heavy-duty seatbelt nylon with a cobra buckle.",
    details: ["Seatbelt nylon", "Laser-engraved metal cobra buckle", "Quick-release"],
    image: "https://images.unsplash.com/photo-1624222247344-550fb80053ad?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "m8",
    name: "Carbon-Fiber Frame Shades",
    category: "men",
    price: 195,
    description: "Wrap-around matte black frames with polarized lenses.",
    details: ["Carbon-fiber frames", "Polarized midnight lenses", "Matte finish"],
    image: "https://images.unsplash.com/photo-1511499767390-a7ada3521807?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "m9",
    name: 'Modular "Courier" Sling Bag',
    category: "men",
    price: 145,
    description: "Weather-proof chest bag with magnetic buckles.",
    details: ["Weather-proof fabric", "Magnetic FIDLOCK buckles", "Modular loops"],
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },

  // MEN'S BUNDLES
  {
    id: "mb1",
    name: 'The "Street-Armor" Kit',
    category: "men",
    price: 350,
    originalPrice: 465,
    description: "The ultimate daily uniform: Hoodie + Cargo Pants + Belt.",
    details: ["Void Hoodie included", "Architectural Cargo included", "Industrial Belt included"],
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800",
    isBundle: true,
    stockStatus: "in-stock",
    labels: ["Best Seller"]
  },
  {
    id: "mb2",
    name: 'The "Midnight Rider" Set',
    category: "men",
    price: 520,
    originalPrice: 630,
    description: "High-margin outerwear and easy styling: Bomber + Tee + Shades.",
    details: ["Technical Shell Bomber included", "Ghost Tee included", "Carbon-Fiber Shades included"],
    image: "https://images.unsplash.com/photo-1520975954732-4502c6b421ff?auto=format&fit=crop&q=80&w=800",
    isBundle: true,
    stockStatus: "low-stock"
  },
  {
    id: "mb3",
    name: 'The "Stealth Accessory" Pack',
    category: "men",
    price: 320,
    originalPrice: 405,
    description: "Entry point for new customers: Sling Bag + Belt + Shades.",
    details: ["Courier Sling Bag included", "Industrial Belt included", "Carbon-Fiber Shades included"],
    image: "https://images.unsplash.com/photo-1544441893-675973e306a5?auto=format&fit=crop&q=80&w=800",
    isBundle: true,
    stockStatus: "in-stock"
  },

  // WOMEN'S COLLECTION
  {
    id: "w1",
    name: "Cinch-Waist Cropped Puffer",
    category: "women",
    price: 290,
    description: "High-gloss black with a high neck.",
    details: ["High-gloss finish", "Adjustable waist bungee", "High neck warmth"],
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w2",
    name: "Asymmetrical Ribbed Knit Dress",
    category: "women",
    price: 210,
    description: 'A "second-skin" maxi dress with thumbholes.',
    details: ["Second-skin fit", "Integrated thumbholes", "Asymmetrical side-slit"],
    image: "/assets/women_hero.png",
    stockStatus: "in-stock"
  },
  {
    id: "w3",
    name: 'Wide-Leg "Fluid" Trousers',
    category: "women",
    price: 195,
    description: "High-waisted, heavy-drape fabric.",
    details: ["High-waisted cut", "Liquid-like movement", "Heavy-drape fabric"],
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w4",
    name: 'Mesh "Cyber" Bodysuit',
    category: "women",
    price: 120,
    description: "Tonal graphic prints inspired by digital circuitry.",
    details: ["Mesh layering piece", "Digital circuitry prints", "Snap closure"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w5",
    name: 'Distressed "Grunge" Oversized Knit',
    category: "women",
    price: 175,
    description: "Mohair-blend sweater with deliberate laddering.",
    details: ["Mohair-blend", "Deliberate laddering", "Frayed edges"],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w6",
    name: 'Vegan Leather "Corset" Top',
    category: "women",
    price: 140,
    description: "Structured top with matching industrial zipper back.",
    details: ["Vegan leather", "Matte finish", "Industrial zipper back"],
    image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w7",
    name: 'Parachute "Tech" Skirt',
    category: "women",
    price: 165,
    description: "Maxi length with toggle adjustments.",
    details: ["Maxi length", "Toggle hem adjustments", "Variable volume"],
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w8",
    name: 'Platform "Stomp" Boots',
    category: "women",
    price: 320,
    description: "3-inch chunky tread with technical nylon panels.",
    details: ["3-inch platform", "Vibram-style lug sole", "Water-resistant nylon panels"],
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w9",
    name: '"Lunar" Crescent Tote',
    category: "women",
    price: 185,
    description: "Matte leather hobo bag with industrial hardware.",
    details: ["Premium matte leather", "Adjustable seatbelt strap", "Silver-tone hardware"],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w10",
    name: 'High-Neck "Shadow" Bra',
    category: "women",
    price: 75,
    description: "Technical compression fabric with laser-cut ventilation.",
    details: ["High-support compression", "Laser-cut detailing", "Moisture-wicking"],
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "w11",
    name: '"Circuit" Utility Leggings',
    category: "women",
    price: 130,
    description: "Bonded seams and high-density technical mesh.",
    details: ["Bonded ergonomic seams", "Side utility pockets", "Squat-proof fabric"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
    stockStatus: "low-stock"
  },

  // ACCESSORIES
  {
    id: "a1",
    name: 'The "Heavy Metal" Cuban Chain',
    category: "accessories",
    price: 110,
    description: "Thick, gunmetal-finished stainless steel chain.",
    details: ["Gunmetal-finished", "Stainless steel", "Industrial clasp"],
    image: "/assets/accessories_hero.png",
    stockStatus: "in-stock"
  },
  {
    id: "a2",
    name: 'Leather "Tech" Gloves',
    category: "accessories",
    price: 135,
    description: "Touchscreen compatible lambskin leather.",
    details: ["Lambskin leather", "Touchscreen fingertips", "Reinforced palms"],
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "a3",
    name: 'The "Arch" Structured Cap',
    category: "accessories",
    price: 65,
    description: "Heavy nylon with tonal 3D embroidery.",
    details: ["Heavy nylon", "Tonal 3D embroidery", "Deep-fit 6-panel"],
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "a4",
    name: '"Shadow" Silk-Blend Scarf',
    category: "accessories",
    price: 125,
    description: "Oversized scarf with jacquard-woven monogram.",
    details: ["Silk-blend", "Jacquard-woven monogram", "Oversized rectangular cut"],
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  },
  {
    id: "a5",
    name: "Matte Carbon-Fiber Cardholder",
    category: "accessories",
    price: 85,
    description: "RFID-blocking with magnetic cash strap.",
    details: ["Genuine carbon fiber", "RFID-blocking", "Magnetic cash strap"],
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    stockStatus: "low-stock"
  },
  {
    id: "a6",
    name: 'The "Omni" Utility Carabiner',
    category: "accessories",
    price: 45,
    description: "CNC-machined aluminum with multi-tool.",
    details: ["CNC-machined aluminum", "Built-in bottle opener", "Leather-loop attachment"],
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800",
    stockStatus: "in-stock"
  }
];
