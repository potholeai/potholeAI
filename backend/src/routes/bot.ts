import express from 'express';
import { redisClient } from '../server.js';

const router = express.Router();

// Get bot status
router.get('/status', async (req, res) => {
  try {
    const status = await redisClient.get('bot:status') || 'active';
    const lastPost = await redisClient.get('bot:last_post') || new Date().toISOString();
    const monthlyPosts = await redisClient.get('bot:monthly_posts') || '0';
    const mentions = await redisClient.get('bot:mentions') || '0';
    const responses = await redisClient.get('bot:responses') || '0';

    res.json({
      success: true,
      data: {
        isActive: status === 'active',
        lastPost,
        monthlyPosts: parseInt(monthlyPosts),
        monthlyLimit: 50,
        mentions: parseInt(mentions),
        responses: parseInt(responses),
        apiUsage: {
          twitter: { used: parseInt(monthlyPosts), limit: 50 },
          openai: { used: 1250, limit: 2000 }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching bot status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bot status'
    });
  }
});

// Update bot configuration
router.post('/config', (req, res) => {
  // Bot configuration updates would go here
  res.json({
    success: true,
    message: 'Bot configuration updated'
  });
});

// Get bot analytics
router.get('/analytics', async (req, res) => {
  try {
    // Mock analytics data
    const analytics = {
      weeklyPosts: [
        { day: 'Mon', posts: 2, engagement: 45 },
        { day: 'Tue', posts: 1, engagement: 32 },
        { day: 'Wed', posts: 3, engagement: 67 },
        { day: 'Thu', posts: 2, engagement: 54 },
        { day: 'Fri', posts: 4, engagement: 89 },
        { day: 'Sat', posts: 1, engagement: 23 },
        { day: 'Sun', posts: 2, engagement: 41 }
      ],
      topHashtags: ['#PotholeGurugram', '#FixOurRoads', '#GurugramInfra'],
      responseTime: '2.3 minutes',
      successRate: 94.2
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching bot analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
});

export default router;
