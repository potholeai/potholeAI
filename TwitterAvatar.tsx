import React from 'react';
import { CheckCircle } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';

interface TwitterAvatarProps {
  src?: string;
  username: string;
  displayName: string;
  verified?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'warning' | 'error';
  showStatus?: boolean;
}

export const TwitterAvatar: React.FC<TwitterAvatarProps> = ({
  src,
  username,
  displayName,
  verified = false,
  size = 'md',
  status,
  showStatus = false
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <img
          src={src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
          alt={`@${username}`}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
        {showStatus && status && (
          <div className="absolute -bottom-1 -right-1">
            <StatusIndicator status={status} size="sm" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-200 truncate">
            {displayName}
          </span>
          {verified && (
            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
          )}
        </div>
        <span className="text-sm text-slate-400">@{username}</span>
      </div>
    </div>
  );
};
