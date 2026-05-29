"use client";

import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="pb-16 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <div className="w-16 h-16 rounded-full border border-luxury-charcoal flex items-center justify-center bg-luxury-charcoal/30 mb-6">
        <Settings className="w-6 h-6 text-luxury-gold" />
      </div>
      <h1 className="font-serif text-3xl text-luxury-paper mb-2">Settings</h1>
      <p className="text-gray-400 font-light text-sm max-w-md mx-auto">This section is currently under development. Here you will be able to configure shop settings and change the administrative password.</p>
    </div>
  );
}
