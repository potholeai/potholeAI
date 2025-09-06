import React from 'react';
import { Bot, Conversation } from '../../types';
import { BotCard } from '../chat/BotCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { 
  Search, 
  Plus, 
  MessageCircle, 
  Archive, 
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  bots: Bot[];
  conversations: Conversation[];
  currentBotId?: string;
  currentConversationId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectBot: (botId: string) => void;
  onSelectConversation: (conversationId: string) => void;
  onNewConversation: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  bots,
  conversations,
  currentBotId,
  currentConversationId,
  isOpen,
  onClose,
  onSelectBot,
  onSelectConversation,
  onNewConversation
}) => {
  const [activeTab, setActiveTab] = React.useState<'bots' | 'conversations'>('bots');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Dashboard
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-1 mt-3">
              <Button
                variant={activeTab === 'bots' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('bots')}
                className="flex-1"
              >
                Bots
                <Badge variant="default" size="sm" className="ml-2">
                  {bots.length}
                </Badge>
              </Button>
              <Button
                variant={activeTab === 'conversations' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('conversations')}
                className="flex-1"
              >
                Chats
                <Badge variant="default" size="sm" className="ml-2">
                  {conversations.length}
                </Badge>
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'bots' ? (
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={onNewConversation}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Bot
                </Button>
                
                {filteredBots.map((bot) => (
                  <BotCard
                    key={bot.id}
                    bot={bot}
                    isActive={bot.id === currentBotId}
                    onSelect={onSelectBot}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={onNewConversation}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
                
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      conversation.id === currentConversationId
                        ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => onSelectConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-2">
                      <MessageCircle className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-200 truncate text-sm">
                          {conversation.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {conversation.messages.length} messages
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(conversation.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {conversation.isArchived && (
                        <Archive className="w-3 h-3 text-slate-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
