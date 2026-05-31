"use client";

import { AdminProduct } from "@/store/useAdminProductsStore";
import { adminProductService } from "@/lib/services/admin-product.service";
import { ProductForm } from "@/components/admin/ProductForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function load() {
      const p = await adminProductService.getProduct(id);
      setProduct(p);
      setLoading(false);
    }
    load();
  }, [id]);

  if (!mounted || loading) return <div className="text-luxury-paper p-8">Loading...</div>;

  if (!product) {
    return <div className="text-luxury-paper p-8">Product not found.</div>;
  }

  return <ProductForm initialData={product} isEdit={true} />;
}
