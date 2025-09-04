import { TwitterApi } from 'twitter-api-v2';
import OpenAI from 'openai';
import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

// Initialize APIs
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

await redisClient.connect();

class PotholeAIBot {
  private rwClient = twitterClient.readWrite;
  private monthlyPostCount = 0;
  private readonly MONTHLY_LIMIT = 50;
  private readonly API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

  constructor() {
    this.initializeBot();
  }

  async initializeBot() {
    console.log('🤖 PotholeAI Bot starting...');
    
    // Load monthly post count from Redis
    const savedCount = await redisClient.get('bot:monthly_posts');
    this.monthlyPostCount = savedCount ? parseInt(savedCount) : 0;
    
    // Set up mention monitoring
    this.startMentionMonitoring();
    
    // Schedule weekly summary posts
    this.scheduleWeeklySummary();
    
    // Schedule monthly reset
    this.scheduleMonthlyReset();
    
    console.log('✅ PotholeAI Bot initialized successfully');
  }

  async startMentionMonitoring() {
    console.log('👂 Starting mention monitoring...');
    
    // Check for mentions every 5 minutes
    setInterval(async () => {
      try {
        await this.checkMentions();
      } catch (error) {
        console.error('Error checking mentions:', error);
      }
    }, 5 * 60 * 1000); // 5 minutes
  }

  async checkMentions() {
    if (this.monthlyPostCount >= this.MONTHLY_LIMIT) {
      console.log('⚠️ Monthly post limit reached, skipping mention check');
      return;
    }

    try {
      const mentions = await this.rwClient.v2.userMentionTimeline('potholeai', {
        max_results: 10,
        'tweet.fields': ['created_at', 'author_id', 'attachments'],
        'media.fields': ['url', 'type'],
        expansions: ['attachments.media_keys', 'author_id']
      });

      for (const tweet of mentions.data?.data || []) {
        await this.processMention(tweet);
      }
    } catch (error) {
      console.error('Error fetching mentions:', error);
    }
  }

  async processMention(tweet: any) {
    try {
      // Check if we've already processed this tweet
      const processed = await redisClient.get(`processed:${tweet.id}`);
      if (processed) return;

      console.log(`📨 Processing mention: ${tweet.text}`);

      // Extract location and description from tweet
      const analysis = await this.analyzeTweet(tweet.text);
      
      if (analysis.isPotholeReport) {
        // Create issue in database
        await this.createIssueFromTweet(tweet, analysis);
        
        // Reply to the tweet
        await this.replyToTweet(tweet.id, analysis);
        
        // Mark as processed
        await redisClient.set(`processed:${tweet.id}`, 'true', { EX: 86400 * 30 }); // 30 days
        
        // Update counters
        await this.updateCounters('mention_processed');
      }
    } catch (error) {
      console.error('Error processing mention:', error);
    }
  }

  async analyzeTweet(text: string) {
    try {
      const prompt = `
        Analyze this tweet to determine if it's reporting a pothole or road issue in Gurugram:
        
        Tweet: "${text}"
        
        Respond with JSON:
        {
          "isPotholeReport": boolean,
          "severity": "urgent" | "moderate" | "low",
          "location": "extracted location or null",
          "description": "cleaned description",
          "confidence": number (0-1)
        }
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.3
      });

      const analysis = JSON.parse(response.choices[0].message.content || '{}');
      return analysis;
    } catch (error) {
      console.error('Error analyzing tweet:', error);
      return { isPotholeReport: false, confidence: 0 };
    }
  }

  async createIssueFromTweet(tweet: any, analysis: any) {
    try {
      const issueData = {
        description: analysis.description || tweet.text,
        severity: analysis.severity || 'moderate',
        location: {
          address: analysis.location || 'Gurugram (location not specified)',
          lat: 28.4595, // Default Gurugram coordinates
          lng: 77.0266
        },
        source: 'twitter',
        tweetId: tweet.id,
        reportedBy: tweet.author_id
      };

      await axios.post(`${this.API_BASE_URL}/issues`, issueData);
      console.log('✅ Issue created from tweet');
    } catch (error) {
      console.error('Error creating issue from tweet:', error);
    }
  }

  async replyToTweet(tweetId: string, analysis: any) {
    if (this.monthlyPostCount >= this.MONTHLY_LIMIT) return;

    try {
      const replyText = this.generateReply(analysis);
      
      await this.rwClient.v2.reply(replyText, tweetId);
      
      this.monthlyPostCount++;
      await redisClient.set('bot:monthly_posts', this.monthlyPostCount.toString());
      await redisClient.set('bot:last_post', new Date().toISOString());
      
      console.log(`✅ Replied to tweet: ${replyText}`);
    } catch (error) {
      console.error('Error replying to tweet:', error);
    }
  }

  generateReply(analysis: any): string {
    const replies = [
      `Thank you for reporting this pothole issue! 🕳️ We've logged it in our system. Track progress at ${process.env.FRONTEND_URL} #FixOurRoads #GurugramInfra`,
      `Issue recorded! 📝 Your report helps make Gurugram's roads safer. Monitor updates at ${process.env.FRONTEND_URL} #PotholeGurugram`,
      `Thanks for being a responsible citizen! 🙏 We've added this to our tracking system. Check status at ${process.env.FRONTEND_URL} #RoadSafety`
    ];
    
    return replies[Math.floor(Math.random() * replies.length)];
  }

  scheduleWeeklySummary() {
    // Post weekly summary every Friday at 10 AM
    cron.schedule('0 10 * * 5', async () => {
      await this.postWeeklySummary();
    });
  }

  async postWeeklySummary() {
    if (this.monthlyPostCount >= this.MONTHLY_LIMIT) {
      console.log('⚠️ Monthly limit reached, skipping weekly summary');
      return;
    }

    try {
      // Fetch weekly stats
      const stats = await axios.get(`${this.API_BASE_URL}/stats`);
      const weeklyData = stats.data.data.weeklyData;
      
      const totalReports = weeklyData.reduce((sum: number, day: any) => sum + day.issues, 0);
      const totalResolved = weeklyData.reduce((sum: number, day: any) => sum + day.resolved, 0);
      
      const summaryText = `📊 Weekly Gurugram Roads Update:
      
🕳️ ${totalReports} new pothole reports
✅ ${totalResolved} issues resolved
📈 ${Math.round((totalResolved/totalReports)*100)}% resolution rate

Keep reporting! Together we can fix our roads. 
Track all issues: ${process.env.FRONTEND_URL}

#GurugramRoads #PotholeUpdate #FixOurRoads`;

      await this.rwClient.v2.tweet(summaryText);
      
      this.monthlyPostCount++;
      await redisClient.set('bot:monthly_posts', this.monthlyPostCount.toString());
      await redisClient.set('bot:last_post', new Date().toISOString());
      
      console.log('✅ Posted weekly summary');
    } catch (error) {
      console.error('Error posting weekly summary:', error);
    }
  }

  scheduleMonthlyReset() {
    // Reset monthly counter on the 1st of each month
    cron.schedule('0 0 1 * *', async () => {
      this.monthlyPostCount = 0;
      await redisClient.set('bot:monthly_posts', '0');
      console.log('🔄 Monthly post counter reset');
    });
  }

  async updateCounters(type: string) {
    try {
      const current = await redisClient.get(`bot:${type}`) || '0';
      await redisClient.set(`bot:${type}`, (parseInt(current) + 1).toString());
    } catch (error) {
      console.error('Error updating counters:', error);
    }
  }
}

// Start the bot
new PotholeAIBot();
