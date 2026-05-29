"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Eye, Trash2, Image as ImageIcon, CheckSquare, Square } from "lucide-react";
import { useAdminProductsStore, ProductStatus } from "@/store/useAdminProductsStore";
import Link from "next/link";
import { ImageWithFallback as Image } from "@/components/ui/ImageWithFallback";

export default function AdminProductsPage() {
  const { products, deleteProduct, bulkDelete, bulkUpdateStatus } = useAdminProductsStore();
  const [mounted, setMounted] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const handleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;
    
    if (action === "delete") {
      if (confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
        bulkDelete(selectedIds);
        setSelectedIds([]);
      }
    } else {
      bulkUpdateStatus(selectedIds, action as ProductStatus);
      setSelectedIds([]);
    }
  };

  const requestDelete = (id: string) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setProductToDelete(null);
      setDeleteModalOpen(false);
      setSelectedIds(prev => prev.filter(id => id !== productToDelete));
    }
  };

  return (
    <div className="pb-16 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">Products Master</h1>
          <p className="text-gray-400 font-light text-sm">Manage inventory, pricing, and product details.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-zinc-100 text-black px-6 py-3 text-xs tracking-widest uppercase font-bold hover:bg-luxury-gold transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-luxury-gold text-black p-4 mb-6 flex items-center justify-between transition-all">
          <div className="text-sm font-bold uppercase tracking-widest">
            {selectedIds.length} Selected
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest opacity-80">Change Status:</span>
            <button onClick={() => handleBulkAction("Active")} className="text-xs font-bold uppercase tracking-widest hover:text-white transition">Active</button>
            <button onClick={() => handleBulkAction("Draft")} className="text-xs font-bold uppercase tracking-widest hover:text-white transition">Draft</button>
            <button onClick={() => handleBulkAction("Out of Stock")} className="text-xs font-bold uppercase tracking-widest hover:text-white transition">Stock Out</button>
            <div className="w-px h-4 bg-black/20 mx-2"></div>
            <button onClick={() => handleBulkAction("delete")} className="text-xs font-bold uppercase tracking-widest hover:text-red-700 transition flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}

      <div className="bg-luxury-charcoal/10 border border-luxury-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-luxury-charcoal/30 text-xs tracking-widest uppercase text-gray-400 border-b border-luxury-charcoal">
              <tr>
                <th className="px-6 py-4 w-10">
                  <button onClick={handleSelectAll} className="hover:text-white transition">
                    {selectedIds.length === products.length && products.length > 0 ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Inventory</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-charcoal">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No products found. Add a product to begin.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className={`transition-colors ${selectedIds.includes(product.id) ? 'bg-luxury-charcoal/30' : 'hover:bg-luxury-charcoal/20'}`}>
                    <td className="px-6 py-4">
                      <button onClick={() => handleSelect(product.id)} className="hover:text-white transition">
                        {selectedIds.includes(product.id) ? <CheckSquare className="w-4 h-4 text-luxury-gold" /> : <Square className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-luxury-charcoal relative border border-luxury-charcoal">
                        {product.images[0] ? (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-4 h-4 text-gray-500" /></div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-luxury-paper">{product.name}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{product.dateCreated}</div>
                    </td>
                    <td className="px-6 py-4">{product.category || "Uncategorized"}</td>
                    <td className="px-6 py-4 text-luxury-gold">₦{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {product.inventory}
                      {product.inventory <= 5 && product.inventory > 0 && <span className="ml-2 text-yellow-400 text-[10px]">(Low)</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] tracking-widest uppercase font-bold border ${
                        product.status === 'Active' ? 'text-green-400 border-green-400' :
                        product.status === 'Draft' ? 'text-gray-400 border-gray-400' :
                        'text-red-400 border-red-400'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end gap-4 text-gray-400 mt-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="hover:text-luxury-gold transition-colors" title="Edit"><Edit className="w-4 h-4" /></Link>
                      <button onClick={() => requestDelete(product.id)} className="hover:text-red-400 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-luxury-charcoal flex items-center justify-between text-xs text-gray-500">
          <span>Showing {products.length} entries</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-luxury-black border border-luxury-charcoal p-8 max-w-sm w-full">
            <h2 className="font-serif text-2xl text-luxury-paper mb-4">Confirm Deletion</h2>
            <p className="text-gray-400 text-sm font-light mb-8">
              Are you sure you want to safely delete this product? This action removes all variants and associated data.
            </p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setDeleteModalOpen(false)} 
                className="px-6 py-3 border border-luxury-charcoal text-xs uppercase tracking-widest hover:bg-luxury-charcoal/50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-6 py-3 bg-red-600 text-white text-xs uppercase tracking-widest font-bold hover:bg-red-700 transition"
              >
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
