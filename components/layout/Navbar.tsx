"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, User, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/context/AuthContext";
import { SearchModal } from "@/components/ui/SearchModal";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { session } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-luxury-charcoal bg-luxury-black/90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-luxury-paper hover:text-luxury-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center">
              <span className="font-serif text-2xl font-bold tracking-widest text-luxury-gold">
                TREASURE ARTS
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs xl:text-sm tracking-wider uppercase">
              <Link
                href="/"
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/resin-supplies"
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                Supplies
              </Link>
              <Link
                href="/interiors"
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                Interiors
              </Link>
              <Link
                href="/custom-projects"
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                Custom
              </Link>
              <Link
                href="/about"
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                href={session ? "/account" : "/login"}
                className="hidden sm:block text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
              <Link
                href="/wishlist"
                className="hidden sm:block text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                <Heart className="h-5 w-5" />
              </Link>
              <Link
                href="/cart"
                className="relative text-luxury-paper hover:text-luxury-gold transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold text-[10px] font-bold text-luxury-black">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-luxury-black border-b border-luxury-charcoal py-4 px-4 flex flex-col space-y-4 uppercase tracking-widest text-sm">
            <Link
              href="/"
              className="text-luxury-paper hover:text-luxury-gold transition-colors py-2 border-b border-luxury-charcoal/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-luxury-paper hover:text-luxury-gold transition-colors py-2 border-b border-luxury-charcoal/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/resin-supplies"
              className="text-luxury-paper hover:text-luxury-gold transition-colors py-2 border-b border-luxury-charcoal/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resin Supplies
            </Link>
            <Link
              href="/interiors"
              className="text-luxury-paper hover:text-luxury-gold transition-colors py-2 border-b border-luxury-charcoal/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Interiors
            </Link>
            <Link
              href="/custom-projects"
              className="text-luxury-paper hover:text-luxury-gold transition-colors py-2 border-b border-luxury-charcoal/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Custom Projects
            </Link>
            <Link
              href="/about"
              className="text-luxury-paper hover:text-luxury-gold transition-colors py-2 border-b border-luxury-charcoal/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-luxury-paper hover:text-luxury-gold transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
