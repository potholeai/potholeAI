import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Zap } from 'lucide-react';
import { Tweet } from '../../types/twitter';
import { TwitterAvatar } from '../ui/TwitterAvatar';
import { TweetButton } from '../ui/TweetButton';
import { HashtagBadge } from '../ui/HashtagBadge';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

interface TweetCardProps {
  tweet: Tweet;
  showActions?: boolean;
  onReply?: (tweetId: string) => void;
  onLike?: (tweetId: string) => void;
  onRetweet?: (tweetId: string) => void;
  onBotResponse?: (tweetId: string) => void;
}

export const TweetCard: React.FC<TweetCardProps> = ({
  tweet,
  showActions = true,
  onReply,
  onLike,
  onRetweet,
  onBotResponse
}) => {
  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getResponseStatusColor = (status?: string) => {
    switch (status) {
      case 'sent': return 'success';
      case 'failed': return 'danger';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-4 transition-all hover:border-slate-600 ${
        tweet.requiresResponse ? 'border-blue-500/30 bg-blue-500/5' : 'border-slate-700'
      }`}
    >
      <div className="flex gap-3">
        <TwitterAvatar
          src={tweet.author.avatar}
          username={tweet.author.username}
          displayName={tweet.author.displayName}
          verified={tweet.author.verified}
          size="md"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-slate-400">
              {formatDistanceToNow(tweet.createdAt, { addSuffix: true })}
            </span>
            {tweet.sentiment && (
              <Badge variant="default" size="sm">
                <span className={getSentimentColor(tweet.sentiment)}>
                  {tweet.sentiment}
                </span>
              </Badge>
            )}
            {tweet.requiresResponse && (
              <Badge variant="primary" size="sm">
                <Zap className="w-3 h-3 mr-1" />
                Needs Response
              </Badge>
            )}
            {tweet.responseStatus && (
              <Badge variant={getResponseStatusColor(tweet.responseStatus)} size="sm">
                {tweet.responseStatus}
              </Badge>
            )}
          </div>
          
          <p className="text-slate-200 mb-3 leading-relaxed">
            {tweet.text}
          </p>
          
          {tweet.hashtags && tweet.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tweet.hashtags.map((hashtag) => (
                <HashtagBadge key={hashtag} hashtag={hashtag} />
              ))}
            </div>
          )}
          
          {tweet.botResponse && (
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <span className="text-sm font-medium text-blue-400">Bot Response</span>
              </div>
              <p className="text-slate-300 text-sm">{tweet.botResponse}</p>
            </div>
          )}
          
          {showActions && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TweetButton
                  icon={MessageCircle}
                  count={tweet.metrics.replies}
                  onClick={() => onReply?.(tweet.id)}
                  color="text-blue-400"
                />
                <TweetButton
                  icon={Repeat2}
                  count={tweet.metrics.retweets}
                  onClick={() => onRetweet?.(tweet.id)}
                  color="text-green-400"
                />
                <TweetButton
                  icon={Heart}
                  count={tweet.metrics.likes}
                  onClick={() => onLike?.(tweet.id)}
                  color="text-red-400"
                />
                <TweetButton
                  icon={Share}
                  color="text-slate-400"
                />
              </div>
              
              <div className="flex items-center gap-2">
                {tweet.requiresResponse && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onBotResponse?.(tweet.id)}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Generate Response
                  </motion.button>
                )}
                <TweetButton
                  icon={MoreHorizontal}
                  color="text-slate-400"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
