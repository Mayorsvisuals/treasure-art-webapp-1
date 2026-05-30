"use client";

import { useState } from "react";
import { useContentStore, FAQ } from "@/store/useContentStore";
import { Plus, Trash2, Edit, Save, ArrowUp, ArrowDown } from "lucide-react";

export function FAQManager() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ, reorderFAQs } = useContentStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FAQ>>({});

  const sortedFaqs = [...faqs].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleEdit = (f: FAQ) => {
    setEditingId(f.id);
    setFormData(f);
  };

  const handleSave = () => {
    if (editingId) {
      if (editingId === "new") {
        addFAQ({
          ...formData,
          id: `f-${Date.now()}`,
          displayOrder: sortedFaqs.length > 0 ? sortedFaqs[sortedFaqs.length - 1].displayOrder + 1 : 1
        } as FAQ);
      } else {
        updateFAQ(editingId, formData);
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
      question: "",
      answer: ""
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...sortedFaqs];
    const prev = newItems[index - 1];
    const curr = newItems[index];
    
    // Swap displayOrder
    const tempOrder = prev.displayOrder;
    prev.displayOrder = curr.displayOrder;
    curr.displayOrder = tempOrder;
    
    reorderFAQs(newItems);
  };

  const moveDown = (index: number) => {
    if (index === sortedFaqs.length - 1) return;
    const newItems = [...sortedFaqs];
    const next = newItems[index + 1];
    const curr = newItems[index];

    // Swap displayOrder
    const tempOrder = next.displayOrder;
    next.displayOrder = curr.displayOrder;
    curr.displayOrder = tempOrder;

    reorderFAQs(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-serif mb-1">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-400">Manage FAQs displayed on product and contact pages.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null}
          className="flex items-center gap-2 bg-luxury-gold text-black px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {editingId && (
        <div className="p-6 border border-luxury-gold/50 bg-[#0a0a0a]">
          <h3 className="text-sm uppercase tracking-widest text-luxury-gold mb-4 font-bold border-b border-luxury-charcoal pb-2">
            {editingId === "new" ? "New FAQ" : "Edit FAQ"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Question</label>
              <input 
                type="text" 
                value={formData.question || ""}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="What is your return policy?"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs uppercase tracking-widest mb-1">Answer</label>
              <textarea 
                value={formData.answer || ""}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full h-24 bg-transparent border border-luxury-charcoal text-luxury-paper px-3 py-2 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="We offer a 14-day return policy..."
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

      <div className="space-y-2 border border-luxury-charcoal p-1">
        {sortedFaqs.map((f, index) => (
          <div key={f.id} className="p-4 bg-[#0a0a0a] border border-luxury-charcoal/50 flex gap-4 items-start">
            <div className="flex flex-col gap-1 items-center justify-center pt-1">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="text-gray-500 hover:text-white disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
              <button onClick={() => moveDown(index)} disabled={index === sortedFaqs.length - 1} className="text-gray-500 hover:text-white disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
            </div>
            <div className="flex-1">
              <h3 className="text-luxury-paper font-medium mb-1">{f.question}</h3>
              <p className="text-sm text-gray-400">{f.answer}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(f)} className="text-gray-500 hover:text-white transition-colors"><Edit className="w-4 h-4" /></button>
              <button onClick={() => deleteFAQ(f.id)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <p className="text-gray-500 text-sm p-4 text-center">No FAQs defined.</p>}
      </div>
    </div>
  );
}
