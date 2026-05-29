"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/useAdminAuthStore";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuthStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(password);
    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid administrative password.");
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-luxury-charcoal/10 border border-luxury-charcoal p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full border border-luxury-charcoal flex items-center justify-center bg-luxury-charcoal/30 mb-6">
            <Lock className="w-6 h-6 text-luxury-gold" />
          </div>
          <h1 className="font-serif text-2xl text-luxury-paper mb-2">Administrative Access</h1>
          <p className="text-gray-400 text-sm font-light">Please authenticate to continue to the backend.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Access Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-luxury-black border border-luxury-charcoal px-4 py-3 text-luxury-paper outline-none focus:border-luxury-gold transition-colors"
            />
          </div>

          {error && <div className="text-red-400 text-xs tracking-widest uppercase">{error}</div>}

          <button 
            type="submit" 
            className="w-full bg-white text-black py-4 text-xs tracking-widest uppercase font-bold hover:bg-luxury-gold transition-colors"
          >
            Authenticate
          </button>
        </form>
      </div>
      <div className="mt-8 text-xs text-gray-500 uppercase tracking-widest">
        Treasure Arts Backend System
      </div>
    </div>
  );
}
