import { SystemStatusCard } from "./SystemStatusCard";
import { Database } from "lucide-react";

interface SupabaseStatusProps {
  status: 'healthy' | 'warning' | 'error';
  message: string;
}

export function SupabaseStatus({ status, message }: SupabaseStatusProps) {
  return (
    <SystemStatusCard 
      title="Supabase Client" 
      description="Verifies the connection state to the Supabase database."
      status={status}
      icon={<Database className="w-5 h-5" />}
    >
      <p className="text-sm text-luxury-paper font-medium">{message}</p>
    </SystemStatusCard>
  );
}
