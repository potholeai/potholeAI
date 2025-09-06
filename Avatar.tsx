import React from 'react';
import { tv } from 'tailwind-variants';

const avatar = tv({
  base: 'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br font-medium text-white',
  variants: {
    size: {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

const statusIndicator = tv({
  base: 'absolute bottom-0 right-0 rounded-full border-2 border-slate-900',
  variants: {
    status: {
      online: 'bg-green-500',
      offline: 'bg-slate-500',
      busy: 'bg-red-500',
      away: 'bg-yellow-500'
    },
    size: {
      sm: 'w-2.5 h-2.5',
      md: 'w-3 h-3',
      lg: 'w-3.5 h-3.5',
      xl: 'w-4 h-4'
    }
  }
});

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  fallback?: string;
  gradient?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
  fallback,
  gradient = 'from-cyan-500 to-purple-500'
}) => {
  return (
    <div className={avatar({ size })}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          {fallback}
        </div>
      )}
      {status && (
        <div className={statusIndicator({ status, size })} />
      )}
    </div>
  );
};
