import { create } from 'zustand';

export type CustomerStatus = 'new' | 'returning' | 'vip' | 'custom_project' | 'wholesale' | 'inactive';
export type LeadType = 'custom_project' | 'architectural' | 'interior_design' | 'resin_supply_bulk' | 'none';

export interface CustomerNote {
  id: string;
  type: 'sales' | 'consultation' | 'follow_up' | 'delivery' | 'general';
  content: string;
  date: string;
}

export interface ConsultationRequest {
  id: string;
  type: LeadType;
  status: 'pending' | 'contacted' | 'quoted' | 'closed';
  date: string;
  details: string;
}

export interface CustomerTimelineEvent {
  id: string;
  type: 'account_created' | 'order_placed' | 'consultation_requested' | 'note_added' | 'status_changed';
  date: string;
  description: string;
}

export interface CustomerOrderSummary {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  leadType: LeadType;
  dateJoined: string;
  lifetimeValue: number;
  ordersCount: number;
  addresses: {
    id: string;
    type: 'shipping' | 'billing';
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  }[];
  notes: CustomerNote[];
  consultations: ConsultationRequest[];
  timeline: CustomerTimelineEvent[];
  orderHistory: CustomerOrderSummary[];
}

interface AdminCustomersStore {
  customers: AdminCustomer[];
  updateCustomerStatus: (id: string, status: CustomerStatus) => void;
  addCustomerNote: (id: string, note: Omit<CustomerNote, 'id' | 'date'>) => void;
  updateConsultationStatus: (customerId: string, consultationId: string, status: ConsultationRequest['status']) => void;
}

const mockCustomers: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Victoria Adebayo",
    email: "victoria.a@example.com",
    phone: "+2348123456789",
    status: "vip",
    leadType: "none",
    dateJoined: new Date(Date.now() - 86400000 * 120).toISOString(),
    lifetimeValue: 350000,
    ordersCount: 4,
    addresses: [
      { id: 'addr-1', type: 'shipping', street: '12 Isaac John St', city: 'Ikeja', state: 'Lagos', country: 'Nigeria' }
    ],
    notes: [
      { id: 'note-1', type: 'sales', content: 'Prefers dark colors for resin art.', date: new Date(Date.now() - 86400000 * 100).toISOString() }
    ],
    consultations: [],
    timeline: [
      { id: 't1', type: 'account_created', date: new Date(Date.now() - 86400000 * 120).toISOString(), description: 'Account registered' },
      { id: 't2', type: 'order_placed', date: new Date(Date.now() - 86400000 * 110).toISOString(), description: 'Placed first order TA-914285' }
    ],
    orderHistory: [
      { id: 'ord-1', orderNumber: 'TA-914285', date: new Date(Date.now() - 86400000 * 110).toISOString(), total: 85000, status: 'delivered' }
    ]
  },
  {
    id: "cust-2",
    name: "Michael Chen",
    email: "m.chen99@example.com",
    phone: "+2348034567890",
    status: "new",
    leadType: "custom_project",
    dateJoined: new Date(Date.now() - 86400000 * 2).toISOString(),
    lifetimeValue: 125000,
    ordersCount: 1,
    addresses: [
      { id: 'addr-2', type: 'shipping', street: 'Plot 4, Admiralty Way', city: 'Lekki', state: 'Lagos', country: 'Nigeria' }
    ],
    notes: [],
    consultations: [
      { id: 'cons-1', type: 'custom_project', status: 'contacted', date: new Date(Date.now() - 86400000 * 1).toISOString(), details: 'Looking for a custom river table for dining room.' }
    ],
    timeline: [
      { id: 't3', type: 'account_created', date: new Date(Date.now() - 86400000 * 2).toISOString(), description: 'Account registered' },
      { id: 't4', type: 'consultation_requested', date: new Date(Date.now() - 86400000 * 1).toISOString(), description: 'Requested custom project consultation' }
    ],
    orderHistory: [
      { id: 'ord-2', orderNumber: 'TA-219401', date: new Date(Date.now() - 86400000 * 2).toISOString(), total: 125000, status: 'processing' }
    ]
  },
  {
    id: "cust-3",
    name: "Sarah Johnson",
    email: "sarah.j.design@example.com",
    phone: "+2348145678901",
    status: "wholesale",
    leadType: "architectural",
    dateJoined: new Date(Date.now() - 86400000 * 60).toISOString(),
    lifetimeValue: 650000,
    ordersCount: 2,
    addresses: [
      { id: 'addr-3', type: 'billing', street: 'Block A, 1004 Estate', city: 'Victoria Island', state: 'Lagos', country: 'Nigeria' }
    ],
    notes: [
      { id: 'note-2', type: 'consultation', content: 'Architectural firm looking for bulk resin panels.', date: new Date(Date.now() - 86400000 * 50).toISOString() }
    ],
    consultations: [
      { id: 'cons-2', type: 'architectural', status: 'quoted', date: new Date(Date.now() - 86400000 * 50).toISOString(), details: 'Needs 50 sq meters of resin panels.' }
    ],
    timeline: [
      { id: 't5', type: 'account_created', date: new Date(Date.now() - 86400000 * 60).toISOString(), description: 'Account registered' }
    ],
    orderHistory: []
  }
];

export const useAdminCustomersStore = create<AdminCustomersStore>((set) => ({
  customers: mockCustomers,
  updateCustomerStatus: (id, status) => set((state) => ({
    customers: state.customers.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status,
          timeline: [
            ...c.timeline,
            { id: `t-${Date.now()}`, type: 'status_changed', date: new Date().toISOString(), description: `Status changed to ${status.replace('_', ' ')}` }
          ]
        };
      }
      return c;
    })
  })),
  addCustomerNote: (id, note) => set((state) => ({
    customers: state.customers.map((c) => {
      if (c.id === id) {
        const newNote: CustomerNote = { ...note, id: `note-${Date.now()}`, date: new Date().toISOString() };
        return {
          ...c,
          notes: [...c.notes, newNote],
          timeline: [
            ...c.timeline,
            { id: `t-${Date.now()}`, type: 'note_added', date: new Date().toISOString(), description: `Added a ${note.type} note` }
          ]
        };
      }
      return c;
    })
  })),
  updateConsultationStatus: (customerId, consultationId, status) => set((state) => ({
    customers: state.customers.map((c) => {
      if (c.id === customerId) {
        return {
          ...c,
          consultations: c.consultations.map(cons => cons.id === consultationId ? { ...cons, status } : cons)
        };
      }
      return c;
    })
  }))
}));
