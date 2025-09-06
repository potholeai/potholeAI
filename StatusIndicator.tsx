import React from 'react';
import { motion } from 'framer-motion';
import { tv } from 'tailwind-variants';

const statusIndicator = tv({
  base: 'relative inline-flex rounded-full',
  variants: {
    status: {
      online: 'bg-green-500',
      offline: 'bg-slate-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      limited: 'bg-orange-500'
    },
    size: {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4'
    }
  },
  defaultVariants: {
    status: 'offline',
    size: 'md'
  }
});

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error' | 'limited';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  label?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size,
  pulse = false,
  label
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={statusIndicator({ status, size })} />
        {pulse && status === 'online' && (
          <motion.div
            className={`absolute inset-0 rounded-full bg-green-500 opacity-75`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.75, 0, 0.75]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
      {label && (
        <span className="text-sm text-slate-400 capitalize">{label}</span>
      )}
    </div>
  );
};
