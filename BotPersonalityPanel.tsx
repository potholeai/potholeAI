import React from 'react';
import { motion } from 'framer-motion';
import { BotPersonality } from '../../types/twitter';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusIndicator } from '../ui/StatusIndicator';

interface BotPersonalityPanelProps {
  personalities: BotPersonality[];
  activePersonalityId: string;
  onSelectPersonality: (personalityId: string) => void;
}

export const BotPersonalityPanel: React.FC<BotPersonalityPanelProps> = ({
  personalities,
  activePersonalityId,
  onSelectPersonality
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-200">Bot Personality</h3>
        <StatusIndicator status="online" pulse label="Active" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {personalities.map((personality) => (
          <motion.div
            key={personality.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              personality.id === activePersonalityId
                ? `bg-gradient-to-r ${personality.color} border-opacity-50`
                : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
            }`}
            onClick={() => onSelectPersonality(personality.id)}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{personality.emoji}</span>
              <div>
                <h4 className="font-medium text-slate-200">{personality.name}</h4>
                <p className="text-xs text-slate-400">{personality.tone}</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 mb-3 line-clamp-2">
              {personality.description}
            </p>
            
            <div className="flex items-center justify-between">
              <Badge 
                variant={personality.isActive ? 'success' : 'default'} 
                size="sm"
              >
                {personality.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <span className="text-xs text-slate-400">
                Temp: {personality.temperature}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1">
            Configure
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};
