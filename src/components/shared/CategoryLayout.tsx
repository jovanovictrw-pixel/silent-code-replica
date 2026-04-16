import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useScrollEngine } from "../../hooks/useScrollEngine";
import { useFadeOnScroll } from "../../hooks/useFadeOnScroll";

interface CategoryLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  categoryName?: string;
}

export function CategoryLayout({ children, title, subtitle, categoryName }: CategoryLayoutProps) {
  useScrollEngine();
  useFadeOnScroll([categoryName]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Header Section */}
      <header className="pt-40 pb-20 px-10 text-center max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb">
          <Link
            to="/"
            className="font-heading text-[10px] tracking-[0.3em] text-muted-foreground hover:text-white transition-colors uppercase mb-8 inline-block"
          >
            ← BACK TO HOME
          </Link>
        </nav>
        <div className="w-12 h-px bg-white/30 mx-auto mb-8" aria-hidden="true" />
        <h1 className="font-heading text-4xl md:text-6xl tracking-[0.2em] font-light uppercase mb-6 vt-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-muted-foreground text-sm md:text-base max-w-xl mx-auto tracking-wide leading-relaxed">
            {subtitle}
          </p>
        )}
      </header>

      <main className="px-6 md:px-10 pb-32">
        {children}
      </main>

      <Footer />
    </div>
  );
}
