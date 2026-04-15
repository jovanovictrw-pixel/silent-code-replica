import { createFileRoute } from "@tanstack/react-router";
import { products } from "../lib/products";
import { useEffect } from "react";
import { CategoryLayout } from "../components/shared/CategoryLayout";
import { ProductCard } from "../components/shared/ProductCard";
import { BundleCard } from "../components/shared/BundleCard";

export const Route = createFileRoute("/category/$categoryName")({
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryName } = Route.useParams();
  
  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase().trim() === categoryName?.toLowerCase().trim()
  );

  const bundles = categoryProducts.filter((p) => p.isBundle);
  const essentials = categoryProducts.filter((p) => !p.isBundle);

  useEffect(() => {
    const targets = document.querySelectorAll(".sc-fade-target");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("sc-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach((t, i) => {
      (t as HTMLElement).style.transitionDelay = `${(i % 12) * 50}ms`;
      observer.observe(t);
    });

    return () => observer.disconnect();
  }, [categoryProducts]);

  const titles: Record<string, string> = {
    men: "Men's Collection",
    women: "Women's Collection",
    accessories: "Essential Accessories",
  };

  const subtitles: Record<string, string> = {
    men: "Focused on a brutalist silhouette: wide tops, structured outerwear, and tapered bottoms.",
    women: "Balancing Neo-Grunge aesthetics with high-fashion silhouettes and liquid drapes.",
    accessories: "Industrial hardware and technical gear designed to elevate the minimalist uniform.",
  };

  const title = titles[categoryName.toLowerCase()] || "Collection";
  const subtitle = subtitles[categoryName.toLowerCase()] || "Explore our latest drops.";

  return (
    <CategoryLayout title={title} subtitle={subtitle}>
      {bundles.length > 0 && (
        <div className="mb-20">
          <div className="sc-section-label sc-fade-target mb-8 text-left">STRATEGIC BUNDLES</div>
          <div className="sc-prod-grid">
            {bundles.map((product) => (
              <BundleCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {essentials.length > 0 && (
        <div>
          <div className="sc-section-label sc-fade-target mb-8 text-left">
            {categoryName === "accessories" ? "COLLECTION" : "CORE ESSENTIALS"}
          </div>
          <div className="sc-prod-grid-4">
            {essentials.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      
      {categoryProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground uppercase tracking-widest">
            No items found in this category.
          </p>
        </div>
      )}
    </CategoryLayout>
  );
}
