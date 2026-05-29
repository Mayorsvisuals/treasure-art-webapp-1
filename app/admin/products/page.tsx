"use client";

import { useState } from "react";
import { Plus, MoreVertical, Edit, Eye, Trash2 } from "lucide-react";

// Mock Data
const mockProducts = [
  { id: "1", name: "Ocean Wave Geode Table", category: "Custom Project", price: 450000, inventory: 1, status: "Active" },
  { id: "2", name: "Amethyst Crystal Wall Art", category: "Decor", price: 150000, inventory: 4, status: "Active" },
  { id: "3", name: "Golden Leaf Coaster Set", category: "Accessories", price: 25000, inventory: 12, status: "Low Stock" },
  { id: "4", name: "Midnight Marble Epoxy Tray", category: "Decor", price: 45000, inventory: 0, status: "Out of Stock" },
];

export default function AdminProductsPage() {
  const [products] = useState(mockProducts);

  return (
    <div className="pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2">Products Master</h1>
          <p className="text-gray-400 font-light text-sm">Manage inventory, pricing, and product details.</p>
        </div>
        <button 
          className="bg-white text-black px-6 py-3 text-xs tracking-widest uppercase font-bold hover:bg-luxury-gold transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-luxury-charcoal/10 border border-luxury-charcoal overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-luxury-charcoal/30 text-xs tracking-widest uppercase text-gray-400 border-b border-luxury-charcoal">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Inventory</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-charcoal">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-luxury-charcoal/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-luxury-paper">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 text-luxury-gold">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">{product.inventory}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] tracking-widest uppercase font-bold border ${
                      product.status === 'Active' ? 'text-green-400 border-green-400' :
                      product.status === 'Low Stock' ? 'text-yellow-400 border-yellow-400' :
                      'text-red-400 border-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3 text-gray-400">
                    <button className="hover:text-white transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="hover:text-luxury-gold transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-luxury-charcoal flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to 4 of 4 entries</span>
        </div>
      </div>
    </div>
  );
}
