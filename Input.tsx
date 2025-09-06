import React from 'react';
import { tv } from 'tailwind-variants';

const input = tv({
  base: 'w-full rounded-lg border bg-slate-800/50 backdrop-blur-sm px-3 py-2 text-slate-200 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900',
  variants: {
    variant: {
      default: 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500'
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
});

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <input
      className={input({ variant, size, className })}
      {...props}
    />
  );
};
