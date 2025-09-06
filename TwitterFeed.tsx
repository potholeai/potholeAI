import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tweet } from '../../types/twitter';
import { TweetCard } from './TweetCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { RefreshCw, Filter, Search, Zap } from 'lucide-react';

interface TwitterFeedProps {
  tweets: Tweet[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onBotResponse?: (tweetId: string) => void;
}

export const TwitterFeed: React.FC<TwitterFeedProps> = ({
  tweets,
  isLoading = false,
  onRefresh,
  onBotResponse
}) => {
  const [filter, setFilter] = useState<'all' | 'mentions' | 'responses' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        onRefresh?.();
      }, 30000); // Refresh every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh, onRefresh]);

  const filteredTweets = tweets.filter(tweet => {
    // Apply filter
    switch (filter) {
      case 'mentions':
        return tweet.mentions?.includes('@potholeai');
      case 'responses':
        return tweet.botResponse;
      case 'pending':
        return tweet.requiresResponse && !tweet.botResponse;
      default:
        return true;
    }
  }).filter(tweet => {
    // Apply search
    if (!searchQuery) return true;
    return tweet.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tweet.author.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pendingCount = tweets.filter(t => t.requiresResponse && !t.botResponse).length;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-200">Live Twitter Feed</h3>
            {pendingCount > 0 && (
              <Badge variant="warning" size="sm">
                <Zap className="w-3 h-3 mr-1" />
                {pendingCount} Pending
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'text-green-400' : 'text-slate-400'}
            >
              Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search tweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-1">
            {(['all', 'mentions', 'responses', 'pending'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="capitalize"
              >
                {filterType}
                {filterType === 'pending' && pendingCount > 0 && (
                  <Badge variant="warning" size="sm" className="ml-1">
                    {pendingCount}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Feed */}
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {filteredTweets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-400">
                {searchQuery || filter !== 'all' ? 'No tweets match your filters' : 'No tweets to display'}
              </p>
            </motion.div>
          ) : (
            filteredTweets.map((tweet) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <TweetCard
                  tweet={tweet}
                  onBotResponse={onBotResponse}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div><boltAction type="file" filePath="src/components/twitter/BotControlPanel.tsx">
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Settings, AlertTriangle, Zap, Clock } from 'lucide-react';
import { BotStatus, BotMetrics } from '../../types/twitter';
import { Button } from '../ui/Button';
import { StatusIndicator } from '../ui/StatusIndicator';
import { MetricCard } from '../ui/MetricCard';
import { Badge } from '../ui/Badge';

interface BotControlPanelProps {
  status: BotStatus;
  metrics: BotMetrics;
  onToggleBot: () => void;
  onChangeMode: (mode: 'auto' | 'manual' | 'paused') => void;
  onEmergencyStop: () => void;
}

export const BotControlPanel: React.FC<BotControlPanelProps> = ({
  status,
  metrics,
  onToggleBot,
  onChangeMode,
  onEmergencyStop
}) => {
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'auto': return 'success';
      case 'manual': return 'warning';
      case 'paused': return 'default';
      default: return 'default';
    }
  };

  const getRateLimitColor = (rateLimitStatus: string) => {
    switch (rateLimitStatus) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'limited': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-slate-200">Bot Control Center</h3>
          <StatusIndicator 
            status={status.isOnline ? 'online' : 'offline'} 
            pulse={status.isOnline}
            label={status.isOnline ? 'Online' : 'Offline'}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={getModeColor(status.mode)} size="sm">
            {status.mode.toUpperCase()}
          </Badge>
          <Badge variant={getRateLimitColor(status.rateLimitStatus)} size="sm">
            API: {status.rateLimitStatus}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Tweets"
          value={metrics.totalTweets}
          icon={Zap}
          color="text-blue-400"
        />
        <MetricCard
          title="Replies Sent"
          value={metrics.totalReplies}
          icon={Clock}
          color="text-green-400"
        />
        <MetricCard
          title="Engagement Rate"
          value={metrics.engagementRate}
          format="percentage"
          icon={AlertTriangle}
          color="text-purple-400"
        />
        <MetricCard
          title="API Calls Left"
          value={metrics.apiCallsRemaining}
          icon={Settings}
          color="text-orange-400"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Button
          variant={status.isOnline ? 'danger' : 'primary'}
          onClick={onToggleBot}
          className="flex-1 md:flex-none"
        >
          {status.isOnline ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Stop Bot
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Bot
            </>
          )}
        </Button>

        <div className="flex gap-1">
          {(['auto', 'manual', 'paused'] as const).map((mode) => (
            <Button
              key={mode}
              variant={status.mode === mode ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onChangeMode(mode)}
              className="capitalize"
            >
              {mode}
            </Button>
          ))}
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={onEmergencyStop}
          className="ml-auto"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Emergency Stop
        </Button>
      </div>

      {/* Status Messages */}
      {status.lastError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400 font-medium">Error</span>
          </div>
          <p className="text-sm text-red-300 mt-1">{status.lastError}</p>
        </motion.div>
      )}

      <div className="text-xs text-slate-400">
        Uptime: {Math.floor(status.uptime / 3600)}h {Math.floor((status.uptime % 3600) / 60)}m
      </div>
    </div>
  );
};
