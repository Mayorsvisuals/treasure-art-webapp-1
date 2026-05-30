import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  storeLogoUrl: string;
  faviconUrl: string;
  defaultCurrency: string;
  storeTimezone: string;
}

export interface BusinessSettings {
  businessRegistrationName: string;
  supportEmail: string;
  supportPhoneNumber: string;
  whatsappNumber: string;
}

export interface ShippingSettings {
  localShippingFee: number;
  freeShippingThreshold: number;
  internationalShippingEnabled: boolean;
  storePickupEnabled: boolean;
}

export interface PaymentSettings {
  paystackPublicKey: string;
  paystackSecretKey: string;
  paymentEnabled: boolean;
}

export interface NotificationSettings {
  newOrderNotifications: boolean;
  customerSignupNotifications: boolean;
  contactFormNotifications: boolean;
  marketingNotifications: boolean;
}

export interface MaintenanceSettings {
  maintenanceModeEnabled: boolean;
}

export interface SettingsState {
  storeSettings: StoreSettings;
  businessSettings: BusinessSettings;
  shippingSettings: ShippingSettings;
  paymentSettings: PaymentSettings;
  notificationSettings: NotificationSettings;
  maintenanceSettings: MaintenanceSettings;
  
  updateStoreSettings: (data: Partial<StoreSettings>) => void;
  updateBusinessSettings: (data: Partial<BusinessSettings>) => void;
  updateShippingSettings: (data: Partial<ShippingSettings>) => void;
  updatePaymentSettings: (data: Partial<PaymentSettings>) => void;
  updateNotificationSettings: (data: Partial<NotificationSettings>) => void;
  updateMaintenanceSettings: (data: Partial<MaintenanceSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      storeSettings: {
        storeName: "Treasure Arts",
        storeTagline: "Premium Luxury Resin Art",
        storeLogoUrl: "",
        faviconUrl: "",
        defaultCurrency: "NGN",
        storeTimezone: "Africa/Lagos"
      },
      businessSettings: {
        businessRegistrationName: "Treasure Arts Ltd",
        supportEmail: "support@treasurearts.com",
        supportPhoneNumber: "+234 810 079 1114",
        whatsappNumber: "+234 810 079 1114"
      },
      shippingSettings: {
        localShippingFee: 5000,
        freeShippingThreshold: 100000,
        internationalShippingEnabled: false,
        storePickupEnabled: true
      },
      paymentSettings: {
        paystackPublicKey: "",
        paystackSecretKey: "",
        paymentEnabled: false
      },
      notificationSettings: {
        newOrderNotifications: true,
        customerSignupNotifications: true,
        contactFormNotifications: true,
        marketingNotifications: false
      },
      maintenanceSettings: {
        maintenanceModeEnabled: false
      },
      
      updateStoreSettings: (data) => set((state) => ({ storeSettings: { ...state.storeSettings, ...data } })),
      updateBusinessSettings: (data) => set((state) => ({ businessSettings: { ...state.businessSettings, ...data } })),
      updateShippingSettings: (data) => set((state) => ({ shippingSettings: { ...state.shippingSettings, ...data } })),
      updatePaymentSettings: (data) => set((state) => ({ paymentSettings: { ...state.paymentSettings, ...data } })),
      updateNotificationSettings: (data) => set((state) => ({ notificationSettings: { ...state.notificationSettings, ...data } })),
      updateMaintenanceSettings: (data) => set((state) => ({ maintenanceSettings: { ...state.maintenanceSettings, ...data } }))
    }),
    {
      name: 'treasure-arts-settings',
    }
  )
);
