import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceAdjustment: number;
  inventory: number;
}

export type ProductStatus = "Active" | "Draft" | "Out of Stock";

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  salePrice: number;
  inventory: number;
  status: ProductStatus;
  images: string[];
  variants: ProductVariant[];
  seoTitle: string;
  metaDescription: string;
  dateCreated: string;
}

interface AdminProductsStore {
  products: AdminProduct[];
  addProduct: (product: AdminProduct) => void;
  updateProduct: (id: string, product: AdminProduct) => void;
  deleteProduct: (id: string) => void;
  bulkDelete: (ids: string[]) => void;
  bulkUpdateStatus: (ids: string[], status: ProductStatus) => void;
}

const initialProducts: AdminProduct[] = [
  {
    id: "1",
    name: "Ocean Wave Geode Table",
    slug: "ocean-wave-geode-table",
    shortDescription: "A beautiful custom table.",
    fullDescription: "Premium resin layered custom project piece.",
    category: "Custom Project",
    price: 450000,
    salePrice: 0,
    inventory: 1,
    status: "Active",
    images: ["https://picsum.photos/seed/154093/600/750"],
    variants: [],
    seoTitle: "Ocean Wave Geode Table | Treasure Arts",
    metaDescription: "Purchase the beautiful Ocean Wave Geode Table.",
    dateCreated: "May 20, 2026",
  },
  {
    id: "2",
    name: "Amethyst Crystal Wall Art",
    slug: "amethyst-crystal-wall-art",
    shortDescription: "Decorate your wall with crystal art.",
    fullDescription: "Deep purple amethyst styled decor.",
    category: "Decor",
    price: 150000,
    salePrice: 120000,
    inventory: 4,
    status: "Active",
    images: ["https://picsum.photos/seed/158256/600/750"],
    variants: [],
    seoTitle: "",
    metaDescription: "",
    dateCreated: "May 21, 2026",
  },
  {
    id: "3",
    name: "Midnight Marble Epoxy Tray",
    slug: "midnight-marble-epoxy-tray",
    shortDescription: "Luxury serving tray.",
    fullDescription: "Serving tray with a dark marble finish.",
    category: "Accessories",
    price: 45000,
    salePrice: 0,
    inventory: 0,
    status: "Out of Stock",
    images: [],
    variants: [],
    seoTitle: "",
    metaDescription: "",
    dateCreated: "May 25, 2026",
  }
];

export const useAdminProductsStore = create<AdminProductsStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, product) => set((state) => ({
        products: state.products.map(p => p.id === id ? product : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      bulkDelete: (ids) => set((state) => ({
        products: state.products.filter(p => !ids.includes(p.id))
      })),
      bulkUpdateStatus: (ids, status) => set((state) => ({
        products: state.products.map(p => ids.includes(p.id) ? { ...p, status } : p)
      }))
    }),
    {
      name: "admin-products-storage"
    }
  )
);
