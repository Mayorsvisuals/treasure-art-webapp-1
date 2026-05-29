import { Category, Product } from '@/types/product';

export const seededCategories: Category[] = [
  { id: 'c1', name: 'Resin Supplies', slug: 'supplies', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop' },
  { id: 'c2', name: 'Resin Jewelry', slug: 'jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
  { id: 'c3', name: 'Resin Interiors', slug: 'interiors', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop' },
  { id: 'c4', name: 'Architectural Resin', slug: 'architectural', image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=800&auto=format&fit=crop' },
  { id: 'c5', name: 'Outdoor Collection', slug: 'outdoor', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop' },
  { id: 'c6', name: 'Custom Luxury Projects', slug: 'custom', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop' },
];

export const seededProducts: Product[] = [
  {
    id: 'p1', slug: 'premium-epoxy-resin-kit', title: 'Premium Epoxy Resin Kit',
    description: 'High-gloss, UV-resistant, clear casting resin formulated for artists and craftsmen.',
    category: 'supplies', images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop'],
    price: 45000, type: 'standard', featured: true, stock: 50, tags: ['supplies', 'resin', 'kit']
  },
  {
    id: 'p2', slug: 'luxury-pigment-collection', title: 'Luxury Pigment Collection',
    description: 'A curated selection of 12 majestic metallic and iridescent mica powders.',
    category: 'supplies', images: ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop'],
    price: 25000, type: 'standard', featured: false, stock: 120, tags: ['supplies', 'pigment', 'color']
  },
  {
    id: 'p9', slug: 'preserved-floral-pack', title: 'Preserved Floral Pack',
    description: 'Delicate preserved botanicals ready to be immortalized in your custom resin art pieces.',
    category: 'supplies', images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop'],
    price: 15000, type: 'standard', featured: false, stock: 80, tags: ['supplies', 'floral', 'botanical']
  },
  {
    id: 'p10', slug: 'silicone-mold-set', title: 'Silicone Mold Set',
    description: 'Premium reusable silicone molds for creating immaculate geometric and organic resin volumes.',
    category: 'supplies', images: ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop'],
    price: 32000, type: 'standard', featured: false, stock: 45, tags: ['supplies', 'mold', 'tools']
  },
  {
    id: 'p3', slug: 'gold-flake-resin-earrings', title: 'Gold Flake Resin Earrings',
    description: 'Handcrafted resin earrings infused with 24k gold flakes. Suspended elegant design.',
    category: 'jewelry', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'],
    price: 15000, type: 'standard', featured: true, stock: 15, tags: ['jewelry', 'earrings', 'gold']
  },
  {
    id: 'p7', slug: 'emerald-resin-bangle', title: 'Emerald Resin Bangle',
    description: 'Deep emerald green resin formed into a sleek, monumental bangle.',
    category: 'jewelry', images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop'],
    price: 12000, type: 'standard', featured: false, stock: 20
  },
  {
    id: 'p11', slug: 'ocean-blue-pendant', title: 'Ocean Blue Pendant',
    description: 'A miniature seascape preserved in a crystal clear resin dome, set on a sterling silver chain.',
    category: 'jewelry', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'],
    price: 18000, type: 'standard', featured: true, stock: 12
  },
  {
    id: 'p4', slug: 'luxury-resin-center-table', title: 'Luxury Resin Center Table',
    description: 'A masterpiece of fluid resin art meeting structural elegance.',
    category: 'interiors', images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop'],
    price: 150000, type: 'configurable', featured: true, stock: 5,
    options: [
      { id: 'size', name: 'Size', variants: [
          { id: '60cm', name: '60cm Diameter', price_adjustment: 0 },
          { id: '90cm', name: '90cm Diameter', price_adjustment: 100000 },
          { id: '120cm', name: '120cm Diameter', price_adjustment: 150000 }
      ]}
    ],
    tags: ['interiors', 'table', 'furniture', 'configurable']
  },
  {
    id: 'p12', slug: 'marble-resin-dining-table', title: 'Marble Resin Dining Table',
    description: 'Extravagant dining table featuring a faux-marble resin flow over ancient reclaimed wood.',
    category: 'interiors', images: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop'],
    price: 450000, type: 'configurable', featured: true, stock: 2,
    options: [
      { id: 'length', name: 'Length', variants: [
          { id: '180cm', name: '180cm (6 Seater)', price_adjustment: 0 },
          { id: '240cm', name: '240cm (8 Seater)', price_adjustment: 200000 }
      ]}
    ]
  },
  {
    id: 'p13', slug: 'premium-resin-wall-clock', title: 'Premium Resin Wall Clock',
    description: 'Oversized wall clock with a geode-inspired resin face and gold-leaf indices.',
    category: 'interiors', images: ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop'],
    price: 85000, type: 'standard', featured: false, stock: 10
  },
  {
    id: 'p14', slug: 'decorative-resin-tray', title: 'Decorative Resin Tray',
    description: 'Functional art for your vanity or coffee table. Shimmering resin layered with brass handles.',
    category: 'interiors', images: ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop'],
    price: 35000, type: 'standard', featured: false, stock: 25
  },
  {
    id: 'p8', slug: 'luxury-resin-wash-basin', title: 'Luxury Resin Wash Basin',
    description: 'An architectural vessel sink cast from premium, impact-resistant resin.',
    category: 'architectural', images: ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop'],
    price: 220000, type: 'configurable', featured: true, stock: 8,
    options: [
      { id: 'color', name: 'Resin Color', variants: [
          { id: 'ocean-blue', name: 'Deep Ocean Blue', price_adjustment: 0 },
          { id: 'emerald', name: 'Verdant Emerald', price_adjustment: 0 }
      ]}
    ]
  },
  {
    id: 'p15', slug: 'resin-floor-tile-collection', title: 'Resin Floor Tile Collection',
    description: 'Seamless liquid resin flooring system for continuous, monolithic interior surfaces.',
    category: 'architectural', images: ['https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=1200&auto=format&fit=crop'],
    price: 150000, type: 'consultation', featured: false, stock: 999
  },
  {
    id: 'p5', slug: 'architectural-resin-panel', title: 'Architectural Resin Panel',
    description: 'Oversized resin wall art installation designed to be the focal anchor of high-end hotels.',
    category: 'architectural', images: ['https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=1200&auto=format&fit=crop'],
    price: 350000, type: 'configurable', featured: true, stock: 3,
    options: [
      { id: 'size', name: 'Panel Size', variants: [
          { id: 'med', name: '100cm x 100cm', price_adjustment: 0 },
          { id: 'large', name: '150cm x 150cm', price_adjustment: 150000 }
      ]}
    ]
  },
  {
    id: 'p16', slug: 'resin-terrace-table', title: 'Resin Terrace Table',
    description: 'UV-stabilized resin outdoor table designed to withstand the elements without yellowing.',
    category: 'outdoor', images: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop'],
    price: 180000, type: 'standard', featured: true, stock: 4
  },
  {
    id: 'p17', slug: 'outdoor-decorative-installation', title: 'Outdoor Decorative Installation',
    description: 'Weather-proof monolithic resin sculptures for high-end landscape architecture.',
    category: 'outdoor', images: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop'],
    price: 550000, type: 'consultation', featured: false, stock: 999
  },
  {
    id: 'p6', slug: 'hotel-resin-installation', title: 'Hotel Resin Installation',
    description: 'We orchestrate large-scale sculptural and functional resin installations for hospitality.',
    category: 'custom', images: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop'],
    price: 0, type: 'consultation', featured: true, stock: 999, tags: ['custom', 'commission', 'hotel']
  },
  {
    id: 'p18', slug: 'mansion-interior-project', title: 'Mansion Interior Project',
    description: 'Fully bespoke resin architectural integrations for luxury residential estates.',
    category: 'custom', images: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop'],
    price: 0, type: 'consultation', featured: true, stock: 999, tags: ['custom', 'mansion', 'residential']
  }
];
