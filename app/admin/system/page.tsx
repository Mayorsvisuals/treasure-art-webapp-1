"use client";

import { useEffect, useState } from "react";
import { checkSystemHealth, SystemHealthStatus } from "@/lib/services/systemHealth";
import { EnvironmentStatus } from "@/components/admin/system/EnvironmentStatus";
import { SupabaseStatus } from "@/components/admin/system/SupabaseStatus";
import { FeatureFlagsStatus } from "@/components/admin/system/FeatureFlagsStatus";
import { ShieldCheck, RefreshCw } from "lucide-react";

export default function AdminSystemPage() {
  const [healthStatus, setHealthStatus] = useState<SystemHealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const status = await checkSystemHealth();
      setHealthStatus(status);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="pb-16 max-w-6xl">
      <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-paper mb-2 flex items-center gap-3">
             System Diagnostics
          </h1>
          <p className="text-gray-400 font-light text-sm">Monitor infrastructure health and integration status.</p>
        </div>
        <button 
          onClick={fetchHealth}
          disabled={loading}
          className="flex items-center gap-2 bg-[#0a0a0a] border border-luxury-charcoal text-luxury-paper px-4 py-2 text-xs uppercase tracking-widest font-bold hover:border-luxury-gold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Status
        </button>
      </div>

      {!healthStatus && loading && (
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-luxury-charcoal/10 border border-luxury-charcoal"></div>
          <div className="h-48 bg-luxury-charcoal/10 border border-luxury-charcoal"></div>
        </div>
      )}

      {healthStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnvironmentStatus {...healthStatus.envStatus} />
          <SupabaseStatus {...healthStatus.supabaseStatus} />
          <div className="md:col-span-2">
            <FeatureFlagsStatus flags={healthStatus.featureFlags} />
          </div>
        </div>
      )}
    </div>
  );
}
