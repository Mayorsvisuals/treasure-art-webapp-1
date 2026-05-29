"use client";

import { useState, useEffect } from "react";
import { AdminProduct, ProductVariant, useAdminProductsStore } from "@/store/useAdminProductsStore";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, UploadCloud, X, Plus, Eye, Trash2, Settings2 } from "lucide-react";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

interface ProductFormProps {
  initialData?: AdminProduct;
  isEdit?: boolean;
}

export function ProductForm({ initialData, isEdit }: ProductFormProps) {
  const router = useRouter();
  const { addProduct, updateProduct } = useAdminProductsStore();
  
  const [formData, setFormData] = useState<AdminProduct>(initialData || {
    id: "PROD-" + Math.floor(1000 + Math.random() * 9000).toString(),
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    price: 0,
    salePrice: 0,
    inventory: 0,
    status: "Draft",
    images: [],
    variants: [],
    seoTitle: "",
    metaDescription: "",
    dateCreated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  });

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["price", "salePrice", "inventory"].includes(name) ? Number(value) : value,
    }));
  };

  const handleAddImage = () => {
    if (imageUrlInput && formData.images.length < 10) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrlInput] }));
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newImages = [...formData.images];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      setFormData(prev => ({ ...prev, images: newImages }));
    } else if (direction === 'down' && index < formData.images.length - 1) {
      const newImages = [...formData.images];
      [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: "VAR-" + Math.floor(1000 + Math.random() * 9000).toString(),
      name: "",
      value: "",
      priceAdjustment: 0,
      inventory: 0,
    };
    setFormData(prev => ({ ...prev, variants: [...prev.variants, newVariant] }));
  };

  const handleVariantChange = (index: number, field: keyof ProductVariant, value: string | number) => {
    const updated = [...formData.variants];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  const handleRemoveVariant = (index: number) => {
    setFormData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    if (isEdit && initialData) {
      updateProduct(initialData.id, formData);
    } else {
      addProduct(formData);
    }
    router.push("/admin/products");
  };

  if (previewMode) {
    return (
      <div className="bg-luxury-black min-h-screen">
        <div className="flex justify-between items-center p-6 border-b border-luxury-charcoal bg-luxury-charcoal/20">
          <h2 className="font-serif text-xl">Preview Mode</h2>
          <button 
            onClick={() => setPreviewMode(false)}
            className="flex items-center gap-2 border border-luxury-gold text-luxury-gold px-4 py-2 text-xs uppercase tracking-widest hover:bg-luxury-gold hover:text-black transition-colors"
          >
            <X className="w-4 h-4" /> Exit Preview
          </button>
        </div>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-luxury-charcoal relative">
              {formData.images[0] ? (
                <Image src={formData.images[0]} alt={formData.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No Image provided</div>
              )}
            </div>
            <div>
              <p className="text-luxury-gold text-xs tracking-widest uppercase mb-4">{formData.category}</p>
              <h1 className="font-serif text-4xl mb-4">{formData.name || "Untitled Product"}</h1>
              <p className="text-2xl font-light mb-6">₦{(formData.price || 0).toLocaleString()}</p>
              <p className="text-gray-400 font-light mb-8">{formData.shortDescription}</p>
              {formData.variants.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-4">Options</h3>
                  <div className="flex flex-wrap gap-3">
                    {formData.variants.map((v, i) => (
                      <span key={i} className="border border-luxury-charcoal px-4 py-2 text-sm">{v.name}: {v.value} (+₦{v.priceAdjustment.toLocaleString()})</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-3xl text-luxury-paper">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setPreviewMode(true)}
            className="border border-luxury-charcoal text-gray-300 px-6 py-3 text-xs tracking-widest uppercase font-bold hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button 
            onClick={handleSave}
            className="bg-luxury-gold text-black px-6 py-3 text-xs tracking-widest uppercase font-bold hover:bg-white transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* General Information */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 border-b border-luxury-charcoal pb-2">General Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
                <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Short Description</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Full Description</label>
                <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows={5} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 border-b border-luxury-charcoal pb-2">Media ({formData.images.length}/10)</h2>
            <div className="flex gap-4 mb-6">
              <input 
                placeholder="Enter image URL..."
                value={imageUrlInput} 
                onChange={(e) => setImageUrlInput(e.target.value)} 
                className="flex-1 bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors text-sm" 
              />
              <button onClick={handleAddImage} className="bg-luxury-charcoal border border-luxury-charcoal px-6 py-3 text-xs tracking-widest uppercase hover:text-luxury-gold transition-colors">
                Add Image
              </button>
            </div>
            
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {formData.images.map((img, i) => (
                  <div key={i} className="aspect-square relative bg-luxury-black border border-luxury-charcoal group">
                    <Image src={img} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                      <div className="flex justify-between">
                        <button onClick={() => moveImage(i, 'up')} className="text-white hover:text-luxury-gold text-xs bg-black/40 px-1 py-0.5">◀</button>
                        <button onClick={() => moveImage(i, 'down')} className="text-white hover:text-luxury-gold text-xs bg-black/40 px-1 py-0.5">▶</button>
                      </div>
                      <button onClick={() => handleRemoveImage(i)} className="bg-red-500 text-white w-full py-1 text-[10px] tracking-widest uppercase hover:bg-red-600 transition">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-luxury-charcoal p-12 flex flex-col items-center justify-center text-gray-500">
                <UploadCloud className="w-8 h-8 mb-4 text-gray-400" />
                <p className="text-sm">No images added yet.</p>
              </div>
            )}
          </div>

          {/* Variants */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <div className="flex justify-between items-center mb-6 border-b border-luxury-charcoal pb-2">
              <h2 className="text-sm tracking-widest uppercase text-gray-500">Variants & Options</h2>
              <button onClick={handleAddVariant} className="text-xs text-luxury-gold uppercase tracking-widest flex items-center gap-1 hover:text-white transition">
                <Plus className="w-3 h-3" /> Add Variant
              </button>
            </div>
            
            {formData.variants.length > 0 ? (
              <div className="space-y-4">
                {formData.variants.map((variant, i) => (
                  <div key={variant.id} className="grid grid-cols-12 gap-4 items-center bg-luxury-black p-4 border border-luxury-charcoal">
                    <div className="col-span-3">
                      <label className="block text-[10px] uppercase text-gray-500 mb-1">Type</label>
                      <select value={variant.name} onChange={(e) => handleVariantChange(i, 'name', e.target.value)} className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-3 py-2 text-sm text-luxury-paper outline-none">
                        <option value="">Select...</option>
                        <option value="Size">Size</option>
                        <option value="Color">Color</option>
                        <option value="Material">Material</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[10px] uppercase text-gray-500 mb-1">Value</label>
                      <input value={variant.value} onChange={(e) => handleVariantChange(i, 'value', e.target.value)} placeholder="e.g. Large" className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-3 py-2 text-sm text-luxury-paper outline-none" />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[10px] uppercase text-gray-500 mb-1">+ Price</label>
                      <input type="number" value={variant.priceAdjustment} onChange={(e) => handleVariantChange(i, 'priceAdjustment', Number(e.target.value))} className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-3 py-2 text-sm text-luxury-paper outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase text-gray-500 mb-1">Stock</label>
                      <input type="number" value={variant.inventory} onChange={(e) => handleVariantChange(i, 'inventory', Number(e.target.value))} className="w-full bg-luxury-charcoal/20 border border-luxury-charcoal px-3 py-2 text-sm text-luxury-paper outline-none" />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button onClick={() => handleRemoveVariant(i)} className="text-gray-500 hover:text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No variants configured. Product is treated as single variation.</p>
            )}
          </div>
          
          {/* SEO Preview Element */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 border-b border-luxury-charcoal pb-2">Search Engine Optimization</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">SEO Title</label>
                <input name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Meta Description</label>
                <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={2} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">URL Slug</label>
                <input name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. ocean-wave-table" className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
            </div>
            
            <div className="mt-8 border border-luxury-charcoal bg-white p-4 max-w-xl">
              <p className="text-blue-800 text-sm font-medium hover:underline cursor-pointer truncate">{formData.seoTitle || formData.name || "Product Title"}</p>
              <p className="text-green-700 text-[10px] truncate">https://treasurearts.com/product/{formData.slug}</p>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">{formData.metaDescription || formData.shortDescription || "No description provided."}</p>
            </div>
          </div>

        </div>

        <div className="space-y-8">
          
          {/* Organization */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 border-b border-luxury-charcoal pb-2">Organization</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors appearance-none cursor-pointer">
                  <option value="Active">Active (Published)</option>
                  <option value="Draft">Draft (Hidden)</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors appearance-none cursor-pointer">
                  <option value="">Select Category...</option>
                  <option value="Custom Project">Custom Project</option>
                  <option value="Resin Supplies">Resin Supplies</option>
                  <option value="Decor">Decor</option>
                  <option value="Interiors">Interiors</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 border-b border-luxury-charcoal pb-2">Pricing</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Price (₦)</label>
                <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Sale Price (₦)</label>
                <input name="salePrice" type="number" value={formData.salePrice} onChange={handleChange} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
                <p className="text-[10px] text-gray-500 mt-2">Leave 0 for no active sale.</p>
              </div>
            </div>
          </div>
          
          {/* Inventory */}
          <div className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6">
            <h2 className="text-sm tracking-widest uppercase text-gray-500 mb-6 border-b border-luxury-charcoal pb-2">Inventory Management</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Stock Quantity</label>
                <input name="inventory" type="number" value={formData.inventory} onChange={handleChange} className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors" />
              </div>
              <div className="bg-luxury-black p-4 border border-luxury-charcoal text-xs text-gray-400">
                {formData.inventory <= 0 ? (
                  <span className="text-red-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-400"></div> Out of stock</span>
                ) : formData.inventory <= 5 ? (
                  <span className="text-yellow-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Low stock warning</span>
                ) : (
                  <span className="text-green-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div> In stock</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
