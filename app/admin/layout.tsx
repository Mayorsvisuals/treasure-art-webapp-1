"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuthStore } from "@/store/useAdminAuthStore";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users, 
  LayoutTemplate, 
  Percent, 
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { PageTransition } from "@/components/ui/PageTransition";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Content", href: "/admin/homepage-content", icon: LayoutTemplate },
  { name: "Discounts", href: "/admin/discounts", icon: Percent },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAdminAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [mounted, isAuthenticated, pathname, router]);

  if (!mounted) {
    return <div className="min-h-screen bg-luxury-black"></div>;
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null; 
  }

  if (pathname === "/admin/login") {
    return <PageTransition>{children}</PageTransition>;
  }

  return (
    <div className="flex min-h-screen bg-luxury-black text-luxury-paper relative">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-luxury-black border-r border-luxury-charcoal transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}
      >
        <div className="h-20 flex flex-col items-center justify-center border-b border-luxury-charcoal px-6">
          <span className="font-serif text-xl tracking-widest text-luxury-gold uppercase">Admin</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-colors ${
                  isActive 
                    ? "bg-luxury-charcoal/30 text-luxury-gold border-l-2 border-luxury-gold" 
                    : "text-gray-400 hover:text-white hover:bg-luxury-charcoal/30 border-l-2 border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-luxury-charcoal">
          <button 
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-xs tracking-widest uppercase text-gray-400 hover:text-red-400 hover:bg-luxury-charcoal/30 transition-colors border-l-2 border-transparent"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-luxury-charcoal bg-luxury-black flex items-center px-6 lg:px-10 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-luxury-paper"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-xs tracking-widest uppercase text-gray-400">
              Administrative System
            </div>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center text-black font-serif border border-luxury-gold text-xs">
            TA
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
