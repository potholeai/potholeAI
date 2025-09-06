import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: LucideIcon;
  color?: string;
  format?: 'number' | 'percentage' | 'time' | 'currency';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'text-cyan-400',
  format = 'number'
}) => {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'percentage':
        return `${val}%`;
      case 'time':
        return `${val}s`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <motion.p
            key={value}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-slate-200"
          >
            {formatValue(value)}
          </motion.p>
          {change !== undefined && (
            <p className={`text-sm mt-1 ${
              change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {change >= 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-slate-700/50 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
