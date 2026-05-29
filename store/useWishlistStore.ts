import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface WishlistState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        if (!items.find((i) => i.id === item.id)) {
          set({ items: [...items, item] });
        }
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      isInWishlist: (id) => !!get().items.find((i) => i.id === id),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'treasure-arts-wishlist',
    }
  )
);
