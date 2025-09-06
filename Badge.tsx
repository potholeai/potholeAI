import React from 'react';
import { tv } from 'tailwind-variants';

const badge = tv({
  base: 'inline-flex items-center rounded-full font-medium',
  variants: {
    variant: {
      default: 'bg-slate-700 text-slate-200',
      primary: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30',
      success: 'bg-green-500/20 text-green-300 border border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
      danger: 'bg-red-500/20 text-red-300 border border-red-500/30'
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm'
  }
});

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  size,
  children,
  className
}) => {
  return (
    <span className={badge({ variant, size, className })}>
      {children}
    </span>
  );
};
