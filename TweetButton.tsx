import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TweetButtonProps {
  icon: LucideIcon;
  count?: number;
  active?: boolean;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const TweetButton: React.FC<TweetButtonProps> = ({
  icon: Icon,
  count,
  active = false,
  color = 'text-slate-400',
  onClick,
  disabled = false
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 p-2 rounded-full transition-colors ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : `hover:bg-slate-700/50 ${active ? color : 'text-slate-400 hover:' + color}`
      }`}
    >
      <Icon className="w-4 h-4" />
      {count !== undefined && count > 0 && (
        <span className="text-sm">{count > 999 ? '999+' : count}</span>
      )}
    </motion.button>
  );
};
