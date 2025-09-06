import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Send, Plus, Trash2 } from 'lucide-react';
import { ScheduledTweet } from '../../types/twitter';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

interface SchedulingPanelProps {
  scheduledTweets: ScheduledTweet[];
  onScheduleTweet: (content: string, scheduledFor: Date) => void;
  onDeleteScheduled: (id: string) => void;
}

export const SchedulingPanel: React.FC<SchedulingPanelProps> = ({
  scheduledTweets,
  onScheduleTweet,
  onDeleteScheduled
}) => {
  const [newTweet, setNewTweet] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSchedule = () => {
    if (newTweet && scheduledDate && scheduledTime) {
      const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`);
      onScheduleTweet(newTweet, scheduledFor);
      setNewTweet('');
      setScheduledDate('');
      setScheduledTime('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'sent': return 'success';
      case 'failed': return 'danger';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-200">Tweet Scheduler</h3>
        <Badge variant="primary" size="sm">
          {scheduledTweets.filter(t => t.status === 'scheduled').length} Scheduled
        </Badge>
      </div>

      {/* New Tweet Form */}
      <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
        <div className="mb-4">
          <textarea
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            maxLength={280}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-400">
              {newTweet.length}/280 characters
            </span>
            <div className={`text-xs ${
              newTweet.length > 280 ? 'text-red-400' : 'text-slate-400'
            }`}>
              {280 - newTweet.length} remaining
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-slate-400 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="pl-10"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-slate-400 mb-1">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSchedule}
          disabled={!newTweet || !scheduledDate || !scheduledTime || newTweet.length > 280}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Tweet
        </Button>
      </div>

      {/* Scheduled Tweets List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {scheduledTweets.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-400">No scheduled tweets</p>
          </div>
        ) : (
          scheduledTweets.map((tweet) => (
            <motion.div
              key={tweet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-700/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge variant={getStatusColor(tweet.status)} size="sm">
                  {tweet.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteScheduled(tweet.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-slate-200 text-sm mb-3 line-clamp-3">
                {tweet.content}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {tweet.scheduledFor.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {tweet.scheduledFor.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
