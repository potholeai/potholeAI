import React from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface HashtagBadgeProps {
  hashtag: string;
  trending?: boolean;
  onClick?: () => void;
}

export const HashtagBadge: React.FC<HashtagBadgeProps> = ({
  hashtag,
  trending = false,
  onClick
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-colors ${
        trending
          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
      }`}
    >
      #{hashtag}
      {trending && <TrendingUp className="w-3 h-3" />}
    </motion.button>
  );
};
