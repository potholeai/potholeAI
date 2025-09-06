export interface Tweet {
  id: string;
  text: string;
  author: TwitterUser;
  createdAt: Date;
  metrics: TweetMetrics;
  isReply?: boolean;
  replyToId?: string;
  mentions?: string[];
  hashtags?: string[];
  media?: MediaAttachment[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  requiresResponse?: boolean;
  botResponse?: string;
  responseStatus?: 'pending' | 'sent' | 'failed' | 'skipped';
}

export interface TwitterUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  followers: number;
  following: number;
  bio?: string;
}

export interface TweetMetrics {
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  engagementRate: number;
}

export interface MediaAttachment {
  id: string;
  type: 'photo' | 'video' | 'gif';
  url: string;
  altText?: string;
}

export interface BotPersonality {
  id: string;
  name: string;
  description: string;
  tone: string;
  responseStyle: string;
  emoji: string;
  color: string;
  systemPrompt: string;
  temperature: number;
  isActive: boolean;
}

export interface ResponseTemplate {
  id: string;
  name: string;
  trigger: string[];
  template: string;
  personalityId: string;
  isActive: boolean;
  priority: number;
}

export interface ScheduledTweet {
  id: string;
  content: string;
  scheduledFor: Date;
  status: 'scheduled' | 'sent' | 'failed' | 'cancelled';
  media?: MediaAttachment[];
  threadTweets?: string[];
}

export interface BotMetrics {
  totalTweets: number;
  totalReplies: number;
  totalMentions: number;
  engagementRate: number;
  sentimentScore: number;
  followersGained: number;
  responseTime: number;
  apiCallsRemaining: number;
  lastActive: Date;
}

export interface BotStatus {
  isOnline: boolean;
  mode: 'auto' | 'manual' | 'paused';
  rateLimitStatus: 'normal' | 'warning' | 'limited';
  lastError?: string;
  uptime: number;
}
