import { getProductBySlug, getProductsByCategory } from "@/lib/data/products";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductCard } from "@/components/ui/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Product Not Found | Treasure Arts" };

  return {
    title: `${product.title} | Treasure Arts`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Get related products from the same category
  const allRelated = await getProductsByCategory(product.category);
  const relatedProducts = allRelated
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-luxury-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          <ProductGallery images={product.images} title={product.title} />
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 border-t border-luxury-charcoal bg-luxury-charcoal/30">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl text-luxury-paper mb-12 text-center md:text-left">
              Related Pieces
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
