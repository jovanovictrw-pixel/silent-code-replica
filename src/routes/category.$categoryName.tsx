import { createFileRoute } from "@tanstack/react-router";
import { products } from "../lib/products";
import { CategoryLayout } from "../components/shared/CategoryLayout";
import { ProductCard } from "../components/shared/ProductCard";
import { BundleCard } from "../components/shared/BundleCard";
import { CategoryFilters } from "../components/shared/CategoryFilters";
import { useFadeOnScroll } from "../hooks/useFadeOnScroll";

export const Route = createFileRoute("/category/$categoryName")({
  head: ({ params }) => {
    const name = params.categoryName;
    const titleMap: Record<string, string> = {
      men: "Men's Collection — SilentNumen",
      women: "Women's Collection — SilentNumen",
      accessories: "Accessories — SilentNumen",
    };
    const descMap: Record<string, string> = {
      men: "Brutalist silhouettes, structured outerwear, and tapered bottoms. Shop the SilentNumen Men's Collection.",
      women: "Neo-grunge aesthetics with high-fashion silhouettes. Shop the SilentNumen Women's Collection.",
      accessories: "Industrial hardware and technical gear to elevate the minimalist uniform. Shop SilentNumen Accessories.",
    };
    const title = titleMap[name] ?? "Collection — SilentNumen";
    const description = descMap[name] ?? "Explore the SilentNumen collection.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryName } = Route.useParams();

  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase().trim() === categoryName?.toLowerCase().trim()
  );

  const bundles = categoryProducts.filter((p) => p.isBundle);
  const essentials = categoryProducts.filter((p) => !p.isBundle);

  // Use the shared fade hook — re-runs when categoryProducts change
  useFadeOnScroll([categoryName]);

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
    <CategoryLayout title={title} subtitle={subtitle} categoryName={categoryName}>
      {bundles.length > 0 && (
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="sc-section-label !mb-0">SYSTEM_BUNDLES</div>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {bundles.map((product) => (
              <BundleCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {essentials.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="sc-section-label !mb-0">
              {categoryName === "accessories" ? "COLLECTION_COMPONENTS" : "CORE_ESSENTIALS"}
            </div>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
            {essentials.map((product, idx) => (
              <div 
                key={product.id} 
                className={`sc-fade-target ${
                  (idx % 5 === 0) ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className={idx % 5 === 0 ? "aspect-[16/9] md:aspect-auto" : ""}>
                   <ProductCard product={product} />
                </div>
              </div>
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

      <CategoryFilters />
    </CategoryLayout>
  );
}
