import { ReactNode } from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface SystemStatusCardProps {
  title: string;
  description: string;
  status: 'healthy' | 'warning' | 'error';
  children: ReactNode;
  icon?: ReactNode;
}

export function SystemStatusCard({ title, description, status, children, icon }: SystemStatusCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy': return 'border-green-500/50 bg-green-500/10 text-green-500';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500';
      case 'error': return 'border-red-500/50 bg-red-500/10 text-red-500';
    }
  };

  const StatusIcon = () => {
    switch (status) {
      case 'healthy': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className={`border p-6 ${getStatusColor()}`}>
      <div className="flex items-start gap-4 mb-4 border-b border-inherit pb-4">
        {icon || <StatusIcon />}
        <div className="flex-1">
          <h2 className="text-lg font-serif mb-1 flex items-center justify-between">
            <span className="text-luxury-paper">{title}</span>
            <span className="text-xs uppercase tracking-widest font-bold px-2 py-1 rounded bg-black/20">
              {status}
            </span>
          </h2>
          <p className="text-sm opacity-80">{description}</p>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
