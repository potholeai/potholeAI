
import { useState, useCallback, useEffect } from 'react';
import { Tweet, BotPersonality, ScheduledTweet, BotStatus, BotMetrics } from '../types/twitter';
import { 
  mockTweets, 
  mockPersonalities, 
  mockScheduledTweets, 
  mockBotStatus, 
  mockBotMetrics 
} from '../data/mockTwitterData';
import toast from 'react-hot-toast';

export const useTwitterBot = () => {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);
  const [personalities, setPersonalities] = useState<BotPersonality[]>(mockPersonalities);
  const [scheduledTweets, setScheduledTweets] = useState<ScheduledTweet[]>(mockScheduledTweets);
  const [botStatus, setBotStatus] = useState<BotStatus>(mockBotStatus);
  const [botMetrics, setBotMetrics] = useState<BotMetrics>(mockBotMetrics);
  const [isLoading, setIsLoading] = useState(false);

  const activePersonality = personalities.find(p => p.isActive) || personalities[0];

  // Simulate real-time tweet updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new tweets (simulate mentions)
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const newTweet: Tweet = {
          id: `tweet_${Date.now()}`,
          text: `Hey @potholeai, there's a new pothole on ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm St'][Math.floor(Math.random() * 4)]}! Can you help? #PotholeAlert`,
          author: {
            id: `user_${Date.now()}`,
            username: `user${Math.floor(Math.random() * 1000)}`,
            displayName: `User ${Math.floor(Math.random() * 1000)}`,
            avatar: '',
            verified: Math.random() < 0.1,
            followers: Math.floor(Math.random() * 1000),
            following: Math.floor(Math.random() * 500),
          },
          createdAt: new Date(),
          metrics: {
            likes: 0,
            retweets: 0,
            replies: 0,
            views: Math.floor(Math.random() * 100),
            engagementRate: 0
          },
          mentions: ['@potholeai'],
          hashtags: ['PotholeAlert'],
          sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as any,
          requiresResponse: true,
          responseStatus: 'pending'
        };

        setTweets(prev => [newTweet, ...prev.slice(0, 19)]); // Keep only 20 tweets
        
        // Update metrics
        setBotMetrics(prev => ({
          ...prev,
          totalMentions: prev.totalMentions + 1
        }));

        toast.success('New mention received!');
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshFeed = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success('Feed refreshed!');
  }, [