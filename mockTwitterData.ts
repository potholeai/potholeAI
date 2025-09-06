import { Tweet, BotPersonality, ScheduledTweet, BotStatus, BotMetrics } from '../types/twitter';

export const mockTweets: Tweet[] = [
  {
    id: '1',
    text: 'Just hit another pothole on Main Street! When will the city fix these roads? @potholeai #PotholeProblems #FixOurRoads',
    author: {
      id: 'user1',
      username: 'concerned_citizen',
      displayName: 'Sarah Johnson',
      avatar: '',
      verified: false,
      followers: 342,
      following: 189,
      bio: 'Local resident advocating for better infrastructure'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    metrics: {
      likes: 23,
      retweets: 8,
      replies: 5,
      views: 156,
      engagementRate: 23.1
    },
    mentions: ['@potholeai'],
    hashtags: ['PotholeProblems', 'FixOurRoads'],
    sentiment: 'negative',
    requiresResponse: true,
    responseStatus: 'pending'
  },
  {
    id: '2',
    text: 'Thanks @potholeai for the quick response about the pothole on Oak Avenue! The city actually fixed it within 48 hours. Amazing work! 🙌',
    author: {
      id: 'user2',
      username: 'happydriver',
      displayName: 'Mike Chen',
      avatar: '',
      verified: false,
      followers: 89,
      following: 234,
      bio: 'Daily commuter, weekend warrior'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    metrics: {
      likes: 67,
      retweets: 12,
      replies: 3,
      views: 289,
      engagementRate: 28.4
    },
    mentions: ['@potholeai'],
    sentiment: 'positive',
    requiresResponse: false,
    botResponse: 'Thank you for the feedback, Mike! We\'re thrilled to hear the pothole on Oak Avenue was fixed so quickly. Your reports help make our roads safer for everyone. Keep them coming! 🚗✨',
    responseStatus: 'sent'
  },
  {
    id: '3',
    text: 'The intersection at 5th and Broadway has a massive pothole that\'s been there for months. It\'s dangerous for cyclists! #BikesSafety #Infrastructure',
    author: {
      id: 'user3',
      username: 'cyclistadvocate',
      displayName: 'Alex Rivera',
      avatar: '',
      verified: true,
      followers: 2341,
      following: 567,
      bio: 'Cycling advocate | Urban planning enthusiast'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    metrics: {
      likes: 45,
      retweets: 18,
      replies: 12,
      views: 432,
      engagementRate: 17.4
    },
    hashtags: ['BikesSafety', 'Infrastructure'],
    sentiment: 'negative',
    requiresResponse: true,
    responseStatus: 'pending'
  }
];

export const mockPersonalities: BotPersonality[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal, informative responses with official tone',
    tone: 'Formal & Official',
    responseStyle: 'Detailed explanations with proper procedures',
    emoji: '🏛️',
    color: 'from-blue-500/20 to-indigo-500/20',
    systemPrompt: 'You are a professional city infrastructure bot. Respond formally with helpful information about reporting procedures.',
    temperature: 0.3,
    isActive: true
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Friendly, approachable responses with casual language',
    tone: 'Friendly & Approachable',
    responseStyle: 'Conversational with emojis and casual language',
    emoji: '😊',
    color: 'from-green-500/20 to-emerald-500/20',
    systemPrompt: 'You are a friendly neighborhood bot. Use casual language and emojis to help people with pothole reports.',
    temperature: 0.7,
    isActive: false
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Detailed technical information about road maintenance',
    tone: 'Technical & Detailed',
    responseStyle: 'Engineering details and maintenance procedures',
    emoji: '🔧',
    color: 'from-purple-500/20 to-violet-500/20',
    systemPrompt: 'You are a technical infrastructure expert. Provide detailed technical information about road maintenance and repair processes.',
    temperature: 0.4,
    isActive: false
  },
  {
    id: 'humorous',
    name: 'Humorous',
    description: 'Light-hearted responses with appropriate humor',
    tone: 'Light & Humorous',
    responseStyle: 'Witty responses while staying helpful',
    emoji: '😄',
    color: 'from-orange-500/20 to-red-500/20',
    systemPrompt: 'You are a witty bot that uses appropriate humor while helping with pothole reports. Keep it light but helpful.',
    temperature: 0.8,
    isActive: false
  }
];

export const mockScheduledTweets: ScheduledTweet[] = [
  {
    id: 'scheduled1',
    content: 'Good morning! 🌅 Remember to report any potholes you encounter during your commute. Every report helps make our roads safer! #MorningCommute #RoadSafety',
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    status: 'scheduled'
  },
  {
    id: 'scheduled2',
    content: 'Weekly reminder: The city has fixed 47 potholes this month thanks to your reports! Keep up the great work, community! 🛣️✨ #CommunityImpact',
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    status: 'scheduled'
  },
  {
    id: 'scheduled3',
    content: 'Pothole on Elm Street has been successfully repaired! Thanks to everyone who reported it. 🚧➡️✅',
    scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    status: 'sent'
  }
];

export const mockBotStatus: BotStatus = {
  isOnline: true,
  mode: 'auto',
  rateLimitStatus: 'normal',
  uptime: 86400, // 24 hours in seconds
  lastError: undefined
};

export const mockBotMetrics: BotMetrics = {
  totalTweets: 1247,
  totalReplies: 892,
  totalMentions: 156,
  engagementRate: 24.7,
  sentimentScore: 78.3,
  followersGained: 23,
  responseTime: 4.2,
  apiCallsRemaining: 847,
  lastActive: new Date()
};

export const mockEngagementData = [
  { date: '2024-01-01', tweets: 12, replies: 8, likes: 45, retweets: 23, mentions: 5 },
  { date: '2024-01-02', tweets: 15, replies: 12, likes: 67, retweets: 34, mentions: 8 },
  { date: '2024-01-03', tweets: 9, replies: 6, likes: 34, retweets: 18, mentions: 3 },
  { date: '2024-01-04', tweets: 18, replies: 15, likes: 89, retweets: 45, mentions: 12 },
  { date: '2024-01-05', tweets: 14, replies: 10, likes: 56, retweets: 28, mentions: 7 },
  { date: '2024-01-06', tweets: 21, replies: 18, likes: 102, retweets: 56, mentions: 15 },
  { date: '2024-01-07', tweets: 16, replies: 13, likes: 78, retweets: 39, mentions: 9 }
];
