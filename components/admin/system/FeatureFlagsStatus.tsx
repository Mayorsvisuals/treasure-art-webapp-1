import { SystemStatusCard } from "./SystemStatusCard";
import { ToggleRight } from "lucide-react";

interface FeatureFlagsStatusProps {
  flags: Record<string, boolean>;
}

export function FeatureFlagsStatus({ flags }: FeatureFlagsStatusProps) {
  return (
    <SystemStatusCard 
      title="Feature Flags" 
      description="Current state of system migrations."
      status="healthy"
      icon={<ToggleRight className="w-5 h-5 text-blue-400" />}
    >
      <div className="space-y-3">
        {Object.entries(flags).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-inherit last:border-0 border-opacity-20 text-sm">
            <span className="font-mono text-xs text-luxury-paper">{key}</span>
            <span className={`px-2 py-1 text-xs uppercase tracking-widest font-bold ${value ? 'text-green-500 bg-green-500/10' : 'text-gray-400 bg-black/20'}`}>
              {value ? 'true' : 'false'}
            </span>
          </div>
        ))}
      </div>
    </SystemStatusCard>
  );
}
