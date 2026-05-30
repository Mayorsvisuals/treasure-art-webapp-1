import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  photoUrl: string;
  rating: number;
  review: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
}

// Homepage Content
export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroBackgroundImageUrl: string;
  featuredProductsTitle: string;
  featuredCategoriesTitle: string;
  promotionalBannerText: string;
  announcementBarText: string;
}

export interface ContactInfo {
  businessName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  workingHours: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  pinterest: string;
  linkedin: string;
  youtube: string;
}

export interface StorePolicies {
  privacyPolicy: string;
  termsConditions: string;
  shippingPolicy: string;
  refundPolicy: string;
}

export interface ContentState {
  homepageContent: HomepageContent;
  testimonials: Testimonial[];
  faqs: FAQ[];
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  storePolicies: StorePolicies;
  
  // Actions
  updateHomepageContent: (data: Partial<HomepageContent>) => void;
  
  // Testimonial Actions
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  
  // FAQ Actions
  addFAQ: (faq: FAQ) => void;
  updateFAQ: (id: string, data: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  reorderFAQs: (faqs: FAQ[]) => void;
  
  // Settings Actions
  updateContactInfo: (data: Partial<ContactInfo>) => void;
  updateSocialLinks: (data: Partial<SocialLinks>) => void;
  updateStorePolicies: (data: Partial<StorePolicies>) => void;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      homepageContent: {
        heroTitle: "Luminous Epoxies & Resin Art",
        heroSubtitle: "Discover the perfect fusion of natural wood and vivid resin.",
        heroButtonText: "Shop the Collection",
        heroButtonLink: "/shop",
        heroBackgroundImageUrl: "https://images.unsplash.com/photo-1574047460167-28d8442cce42?q=80&w=2800&auto=format&fit=crop",
        featuredProductsTitle: "Signature Pieces",
        featuredCategoriesTitle: "Explore Collections",
        promotionalBannerText: "Free shipping on orders over ₦100,000",
        announcementBarText: "New Custom River Tables available to order",
      },
      testimonials: [
        {
          id: "t-1",
          name: "Victoria Adebayo",
          position: "Interior Designer",
          photoUrl: "",
          rating: 5,
          review: "The custom resin table we ordered completely transformed my client's living room. Exceptional craftsmanship."
        }
      ],
      faqs: [
        {
          id: "f-1",
          question: "How long does a custom project take?",
          answer: "Custom resin pieces typically take 3-5 weeks depending on the complexity and curing time.",
          displayOrder: 1
        }
      ],
      contactInfo: {
        businessName: "Treasure Arts & Resin",
        phoneNumber: "+234 810 079 1114",
        whatsappNumber: "+234 810 079 1114",
        email: "contact@treasurearts.com",
        address: "Lagos, Nigeria",
        workingHours: "Monday - Friday: 9am - 6pm",
      },
      socialLinks: {
        instagram: "https://instagram.com/treasurearts",
        facebook: "",
        tiktok: "",
        pinterest: "",
        linkedin: "",
        youtube: ""
      },
      storePolicies: {
        privacyPolicy: "Your privacy is important to us...",
        termsConditions: "By using this website, you agree to these terms...",
        shippingPolicy: "We ship nationwide across Nigeria...",
        refundPolicy: "Returns are accepted within 14 days of delivery..."
      },
      
      updateHomepageContent: (data) => set((state) => ({ homepageContent: { ...state.homepageContent, ...data }})),
      
      addTestimonial: (testimonial) => set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
      updateTestimonial: (id, data) => set((state) => ({ testimonials: state.testimonials.map((t) => t.id === id ? { ...t, ...data } : t) })),
      deleteTestimonial: (id) => set((state) => ({ testimonials: state.testimonials.filter((t) => t.id !== id) })),
      
      addFAQ: (faq) => set((state) => ({ faqs: [...state.faqs, faq] })),
      updateFAQ: (id, data) => set((state) => ({ faqs: state.faqs.map((f) => f.id === id ? { ...f, ...data } : f) })),
      deleteFAQ: (id) => set((state) => ({ faqs: state.faqs.filter((f) => f.id !== id) })),
      reorderFAQs: (faqs) => set({ faqs }),
      
      updateContactInfo: (data) => set((state) => ({ contactInfo: { ...state.contactInfo, ...data }})),
      updateSocialLinks: (data) => set((state) => ({ socialLinks: { ...state.socialLinks, ...data }})),
      updateStorePolicies: (data) => set((state) => ({ storePolicies: { ...state.storePolicies, ...data }})),
    }),
    {
      name: 'treasure-arts-content-storage',
    }
  )
);
