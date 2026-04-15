import { createFileRoute } from "@tanstack/react-router";
import { products } from "../lib/products";
import { CategoryLayout } from "../components/shared/CategoryLayout";
import { ProductCard } from "../components/shared/ProductCard";

export const Route = createFileRoute("/category/$categoryName")({
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryName } = Route.useParams();
  
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

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
      <div className="sc-prod-grid">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
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
