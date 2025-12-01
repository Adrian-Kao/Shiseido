import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
  gradient: string;
}

function MetricCard({ icon, title, value, change, positive, gradient }: MetricCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </div>
        </div>
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
