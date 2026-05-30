import { SystemStatusCard } from "./SystemStatusCard";
import { Server } from "lucide-react";

interface EnvironmentStatusProps {
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details: string[];
}

export function EnvironmentStatus({ status, message, details }: EnvironmentStatusProps) {
  return (
    <SystemStatusCard 
      title="Environment Configuration" 
      description="Checks if all required environment variables are present."
      status={status}
      icon={<Server className="w-5 h-5" />}
    >
      <div className="space-y-4">
        <p className="text-sm flex-1 text-luxury-paper font-medium">{message}</p>
        {details.length > 0 && (
          <div className="bg-black/20 p-3 rounded text-sm">
            <p className="font-bold mb-2">Missing Variables:</p>
            <ul className="list-disc list-inside text-red-400">
              {details.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SystemStatusCard>
  );
}
