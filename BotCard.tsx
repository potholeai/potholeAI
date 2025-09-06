import React from 'react';
import { Bot } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MessageCircle, Settings } from 'lucide-react';

interface BotCardProps {
  bot: Bot;
  isActive?: boolean;
  onSelect: (botId: string) => void;
  onConfigure?: (botId: string) => void;
}

export const BotCard: React.FC<BotCardProps> = ({
  bot,
  isActive,
  onSelect,
  onConfigure
}) => {
  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
      isActive 
        ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30' 
        : 'bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600'
    }`}>
      <div className="flex items-start gap-3">
        <Avatar
          src={bot.avatar}
          fallback={bot.name[0]}
          gradient={bot.color}
          status={bot.isOnline ? 'online' : 'offline'}
          size="lg"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-200 truncate">{bot.name}</h3>
            <Badge variant={bot.isOnline ? 'success' : 'default'}>
              {bot.isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
          
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">
            {bot.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {bot.capabilities.slice(0, 3).map((capability) => (
              <Badge key={capability} variant="primary" size="sm">
                {capability}
              </Badge>
            ))}
            {bot.capabilities.length > 3 && (
              <Badge variant="default" size="sm">
                +{bot.capabilities.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              onClick={() => onSelect(bot.id)}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onConfigure?.(bot.id)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
