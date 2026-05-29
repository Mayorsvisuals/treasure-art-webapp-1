"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { GuidedAssistant } from "@/components/ui/GuidedAssistant";
import { PageTransition } from "@/components/ui/PageTransition";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 flex flex-col">{children}</main>;
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
