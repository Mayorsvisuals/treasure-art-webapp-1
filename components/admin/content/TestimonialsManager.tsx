"use client";

import { useState } from "react";
import { useContentStore, Testimonial } from "@/store/useContentStore";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";

export function TestimonialsManager() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useContentStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setFormData(t);
  };

  const handleSave = () => {
    if (editingId) {
      if (editingId === "new") {
        addTestimonial({
          ...formData,
          id: `t-${Date.now()}`
        } as Testimonial);
      } else {
        updateTestimonial(editingId, formData);
      }
      setEditingId(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleAddNew = () => {
    setEditingId("new");
    setFormData({
      name: "",
      position: "",
      photoUrl: "",
      rating: 5,
      review: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-serif mb-1">Customer Testimonials</h2>
          <p className="text-sm text-gray-400">Manage what your clients are saying about your work.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null}
          className="flex items-center gap-2 bg-luxury-gold text-black px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {editingId && (
        <div className="p-6 border border-luxury-gold/50 bg-[#0a0a0a]">
          <h3 className="text-sm uppercase tracking-widest text-luxury-gold mb-4 font-bold border-b border-luxury-charcoal pb-2">
            {editingId === "new" ? "New Testimonial" : "Edit Testimonial"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Name</label>
              <input 
                type="text" 
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Position / Role</label>
              <input 
                type="text" 
                value={formData.position || ""}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="Interior Designer"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Photo URL</label>
              <input 
                type="text" 
                value={formData.photoUrl || ""}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Rating (1-5)</label>
              <input 
                type="number" 
                min="1" max="5"
                value={formData.rating || 5}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Review</label>
              <textarea 
                value={formData.review || ""}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                className="w-full h-24 bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="The custom piece was amazing..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button 
              onClick={handleCancel}
              className="flex items-center gap-1 text-xs uppercase tracking-widest hover:text-white transition-colors px-4 py-2"
            >
               Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-luxury-gold text-black px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
            >
              <Save className="w-3 h-3" /> Save Note
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="border border-luxury-charcoal p-4 bg-[#0a0a0a] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-luxury-paper font-medium">{t.name}</h3>
                <p className="text-xs text-gray-500">{t.position}</p>
                <div className="text-luxury-gold text-xs mt-1">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(t)} className="text-gray-500 hover:text-white transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => deleteTestimonial(t.id)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-sm text-gray-400 italic flex-1">&quot;{t.review}&quot;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
