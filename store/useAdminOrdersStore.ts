import { create } from 'zustand';

export type PaymentStatus = 'pending' | 'confirmed' | 'failed' | 'refunded';
export type FulfillmentStatus = 'received' | 'processing' | 'ready_for_shipping' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface OrderTimelineEvent {
  id: string;
  status: FulfillmentStatus;
  date: string;
  note?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  total: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  };
  shippingInfo?: {
    cost?: number;
    courier?: string;
    trackingNumber?: string;
    notes?: string;
  };
  internalNotes?: string;
  timeline: OrderTimelineEvent[];
}

interface AdminOrdersStore {
  orders: AdminOrder[];
  updateOrderStatus: (id: string, status: FulfillmentStatus, note?: string) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus) => void;
  updateShippingInfo: (id: string, shippingInfo: AdminOrder['shippingInfo']) => void;
  updateInternalNotes: (id: string, notes: string) => void;
}

const mockOrders: AdminOrder[] = [
  {
    id: 'ord-1gh2',
    orderNumber: 'TA-1024',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+2348012345678',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    total: 125000,
    paymentStatus: 'confirmed',
    fulfillmentStatus: 'processing',
    items: [
      { id: 'item-1', productId: 'p1', productName: 'River Table Epoxy Resin (10kg)', quantity: 1, price: 125000, image: 'https://picsum.photos/seed/resin1/100/100' }
    ],
    shippingAddress: { street: '12 Admiralty Way', city: 'Lekki', state: 'Lagos', country: 'Nigeria' },
    timeline: [
      { id: 't1', status: 'received', date: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 't2', status: 'processing', date: new Date(Date.now() - 86400000 * 1).toISOString(), note: 'Payment verified via transfer.' }
    ]
  },
  {
    id: 'ord-3j9k',
    orderNumber: 'TA-1025',
    customerName: 'Michael Okon',
    email: 'm.okon@example.com',
    phone: '+2348023456789',
    date: new Date().toISOString(),
    total: 45000,
    paymentStatus: 'pending',
    fulfillmentStatus: 'received',
    items: [
      { id: 'item-2', productId: 'p2', productName: 'Color Pigment Set', quantity: 2, price: 22500, image: 'https://picsum.photos/seed/pigment/100/100' }
    ],
    shippingAddress: { street: 'Block 4, Flat 2, 1004 Estate', city: 'Victoria Island', state: 'Lagos', country: 'Nigeria' },
    timeline: [
      { id: 't3', status: 'received', date: new Date().toISOString() }
    ]
  }
];

export const useAdminOrdersStore = create<AdminOrdersStore>((set) => ({
  orders: mockOrders,
  updateOrderStatus: (id, status, note) => set((state) => ({
    orders: state.orders.map((order) => {
      if (order.id === id) {
        return {
          ...order,
          fulfillmentStatus: status,
          timeline: [
            ...order.timeline,
            {
              id: `evt-${Date.now()}`,
              status,
              date: new Date().toISOString(),
              note
            }
          ]
        };
      }
      return order;
    })
  })),
  updatePaymentStatus: (id, status) => set((state) => ({
    orders: state.orders.map((order) => order.id === id ? { ...order, paymentStatus: status } : order)
  })),
  updateShippingInfo: (id, shippingInfo) => set((state) => ({
    orders: state.orders.map((order) => order.id === id ? { ...order, shippingInfo: { ...order.shippingInfo, ...shippingInfo } } : order)
  })),
  updateInternalNotes: (id, notes) => set((state) => ({
    orders: state.orders.map((order) => order.id === id ? { ...order, internalNotes: notes } : order)
  }))
}));
