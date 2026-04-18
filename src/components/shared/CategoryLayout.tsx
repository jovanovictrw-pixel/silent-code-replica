import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CategoryHero } from "./CategoryHero";
import { useScrollEngine } from "../../hooks/useScrollEngine";
import { useFadeOnScroll } from "../../hooks/useFadeOnScroll";

interface CategoryLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  categoryName: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
  men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80&auto=format&fit=crop",
  women: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1920&q=80&auto=format&fit=crop",
  accessories: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920&q=80&auto=format&fit=crop",
};

export function CategoryLayout({ children, title, subtitle, categoryName }: CategoryLayoutProps) {
  useScrollEngine();
  useFadeOnScroll([categoryName]);

  const bgImage = CATEGORY_IMAGES[categoryName.toLowerCase()] || CATEGORY_IMAGES.men;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <CategoryHero category={categoryName} image={bgImage} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <header className="mb-20">
          <nav aria-label="Breadcrumb" className="mb-12">
            <Link
              to="/"
              className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground hover:text-white transition-colors uppercase inline-flex items-center gap-2"
            >
              <span className="text-lg">←</span> BACK_TO_CENTRAL_INDEX
            </Link>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-l border-white/10 pl-10">
            <div className="max-w-2xl">
              <div className="sc-section-label !text-left !mb-4">COLLECTION_MANIFESTO</div>
              <h2 className="font-heading text-4xl md:text-5xl tracking-[0.1em] font-light uppercase mb-6">
                {title}
              </h2>
              {subtitle && (
                <p className="font-body text-white/50 text-sm md:text-base tracking-wide leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-2 text-right">
              <div className="text-[10px] text-white/20 tracking-widest font-heading uppercase">Grid Resolution</div>
              <div className="text-xs text-white/40 font-heading">DYNAMIC_STAGGER_ACTIVE</div>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
