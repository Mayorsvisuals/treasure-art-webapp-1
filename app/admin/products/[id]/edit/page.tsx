"use client";

import { useAdminProductsStore } from "@/store/useAdminProductsStore";
import { ProductForm } from "@/components/admin/ProductForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { products } = useAdminProductsStore();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="text-luxury-paper p-8">Product not found.</div>;
  }

  return <ProductForm initialData={product} isEdit={true} />;
}
