"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { GuidedAssistant } from "@/components/ui/GuidedAssistant";
import { PageTransition } from "@/components/ui/PageTransition";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const { maintenanceSettings } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isAdmin) {
    return <main className="flex-1 flex flex-col">{children}</main>;
  }

  // Prevent flash of content if maintenance is enabled by returning null until mounted, 
  // or we can allow the initial render. Let's just return standard if not mounted.
  if (mounted && maintenanceSettings.maintenanceModeEnabled) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen bg-luxury-black text-center p-6">
        <div className="max-w-md w-full border border-luxury-charcoal bg-[#0a0a0a] p-8 lg:p-12">
          <Wrench className="w-8 h-8 text-luxury-gold mx-auto mb-6" />
          <h1 className="text-2xl font-serif text-luxury-paper mb-4">Under Maintenance</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Treasure Arts is currently undergoing maintenance. Please check back soon.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="flex-1 flex flex-col">{children}</main>
      </PageTransition>
      <Footer />
      <WhatsAppFAB />
      <GuidedAssistant />
    </>
  );
}
