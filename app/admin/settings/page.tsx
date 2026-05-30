"use client";

import { StoreSettingsForm } from "@/components/admin/settings/StoreSettingsForm";
import { BusinessSettingsForm } from "@/components/admin/settings/BusinessSettingsForm";
import { ShippingSettingsForm } from "@/components/admin/settings/ShippingSettingsForm";
import { PaymentSettingsForm } from "@/components/admin/settings/PaymentSettingsForm";
import { NotificationSettingsForm } from "@/components/admin/settings/NotificationSettingsForm";
import { MaintenanceSettings } from "@/components/admin/settings/MaintenanceSettings";
import { Settings, Building2, Truck, CreditCard, Bell, ShieldAlert } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="pb-16 max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-luxury-paper mb-2">Store Settings</h1>
        <p className="text-gray-400 font-light text-sm">Manage configuration and preferences for your storefront.</p>
      </div>

      <div className="space-y-8">
        <section className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-luxury-charcoal pb-4">
            <Settings className="w-5 h-5 text-luxury-gold" />
            <div>
              <h2 className="text-xl font-serif text-luxury-paper">Store Settings</h2>
              <p className="text-sm text-gray-400 mt-1">General appearance and regional format.</p>
            </div>
          </div>
          <StoreSettingsForm />
        </section>

        <section className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-luxury-charcoal pb-4">
            <Building2 className="w-5 h-5 text-luxury-gold" />
            <div>
              <h2 className="text-xl font-serif text-luxury-paper">Business Profile</h2>
              <p className="text-sm text-gray-400 mt-1">Official contact details and registration info.</p>
            </div>
          </div>
          <BusinessSettingsForm />
        </section>

        <section className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-luxury-charcoal pb-4">
            <Truck className="w-5 h-5 text-luxury-gold" />
            <div>
              <h2 className="text-xl font-serif text-luxury-paper">Shipping Rules</h2>
              <p className="text-sm text-gray-400 mt-1">Configure delivery fees and options.</p>
            </div>
          </div>
          <ShippingSettingsForm />
        </section>

        <section className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-luxury-charcoal pb-4">
            <CreditCard className="w-5 h-5 text-luxury-gold" />
            <div>
              <h2 className="text-xl font-serif text-luxury-paper">Payment Gateway</h2>
              <p className="text-sm text-gray-400 mt-1">Manage processing keys and configuration.</p>
            </div>
          </div>
          <PaymentSettingsForm />
        </section>

        <section className="bg-luxury-charcoal/10 border border-luxury-charcoal p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-luxury-charcoal pb-4">
            <Bell className="w-5 h-5 text-luxury-gold" />
            <div>
              <h2 className="text-xl font-serif text-luxury-paper">Notifications</h2>
              <p className="text-sm text-gray-400 mt-1">Control email and system alerts.</p>
            </div>
          </div>
          <NotificationSettingsForm />
        </section>

        <section className="bg-luxury-charcoal/10 border border-[#333] p-6 lg:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-luxury-charcoal pb-4">
            <ShieldAlert className="w-5 h-5 text-luxury-gold" />
            <div>
              <h2 className="text-xl font-serif text-luxury-paper">Maintenance</h2>
              <p className="text-sm text-gray-400 mt-1">Temporarily disable storefront access.</p>
            </div>
          </div>
          <MaintenanceSettings />
        </section>
      </div>
    </div>
  );
}
