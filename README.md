# PotholeAI - Autonomous X Bot & Civic Dashboard

A comprehensive system for crowdsourced pothole reporting and infrastructure monitoring in Gurugram, India. Features an autonomous X (Twitter) bot (@potholeai) and a civic engagement dashboard.

## 🚀 Features

### 🤖 Autonomous X Bot
- **Smart Mention Processing**: Automatically detects and processes pothole reports tagged with @potholeai
- **AI-Powered Analysis**: Uses OpenAI to analyze tweet content and extract relevant information
- **Rate Limiting**: Respects X API free tier limits (50 posts/month)
- **Weekly Summaries**: Automated weekly statistics and insights posts
- **Real-time Responses**: Acknowledges citizen reports and provides tracking links

### 🗺️ Civic Dashboard
- **Interactive Map**: Visual representation of all reported issues across Gurugram
- **Real-time Statistics**: Live tracking of issues, resolution rates, and trends
- **Direct Reporting**: Web form for citizens to report issues directly
- **Issue Tracking**: Complete lifecycle tracking from report to resolution
- **Analytics**: Comprehensive insights and trends for policymakers

### 📊 Data Management
- **PostgreSQL Database**: Robust data storage for all issues and analytics
- **Redis Caching**: Fast data access and bot state management
- **Image Processing**: Automatic image optimization and storage
- **API Rate Limiting**: Protection against abuse and overuse

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **Recharts** for data visualization
- **Mapbox GL** for interactive maps

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** for data persistence
- **Redis** for caching and session management
- **Sharp** for image processing
- **Express Rate Limiting** for API protection

### Bot
- **Twitter API v2** for X integration
- **OpenAI GPT-3.5** for content analysis
- **Node-cron** for scheduled tasks
- **Redis** for state management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- X Developer Account
- OpenAI API Key
- Mapbox Account (for maps)

### Installation

1. **Clone and Install Dependencies**
```bash
git clone <your-repo>
cd potholeai-system
npm run install:all
```

2. **Environment Setup**
```bash
cp .env.example .env
# Fill in your API keys and database URLs
```

3. **Database Setup**
```bash
# Create PostgreSQL database
createdb potholeai

# Run migrations (implement as needed)
# npm run migrate
```

4. **Development**
```bash
# Start all services
npm run dev

# Or start individually
npm run dev:frontend  # http://localhost:5173
npm run dev:backend   # http://localhost:3001
npm run dev:bot       # Bot monitoring
```

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/potholeai
REDIS_URL=redis://localhost:6379

# X (Twitter) API
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
TWITTER_BEARER_TOKEN=your_bearer_token

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Mapbox
VITE_MAPBOX_TOKEN=your_mapbox_token

# App Configuration
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret

# Railway Configuration
RAILWAY_STATIC_URL=your_railway_url
```

## 🚀 Railway Deployment

### 1. Prepare for Deployment
```bash
# Build the project
npm run build

# Test production build locally
npm start
```

### 2. Deploy to Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy with automatic builds enabled

### 3. Database Setup on Railway
```bash
# Add PostgreSQL plugin in Railway
# Add Redis plugin in Railway
# Update DATABASE_URL and REDIS_URL in environment variables
```

## 📱 Usage

### For Citizens
1. **Twitter**: Tag @potholeai with your pothole report and photos
2. **Web**: Visit the dashboard and use the "Report Issue" form
3. **Track**: Monitor your reported issues on the interactive map

### For Administrators
1. Access admin dashboard at `/admin`
2. Monitor bot status and API usage
3. Review and update issue statuses
4. Analyze trends and generate reports

## 🤖 Bot Behavior

### Mention Processing
- Monitors @potholeai mentions every 5 minutes
- Uses AI to determine if tweet is a valid pothole report
- Extracts location, severity, and description
- Creates database entry and replies with confirmation

### Weekly Summaries
- Posts every Friday at 10:00 AM
- Includes weekly statistics and trends
- Encourages continued citizen participation
- Provides dashboard link for detailed tracking

### Rate Limiting
- Respects X API free tier (50 posts/month)
- Prioritizes citizen responses over automated posts
- Tracks usage in Redis for persistence
- Resets counter monthly

## 📊 API Endpoints

### Issues
- `GET /api/issues` - List all issues
- `POST /api/issues` - Create new issue
- `GET /api/issues/:id` - Get specific issue
- `PATCH /api/issues/:id/status` - Update issue status

### Statistics
- `GET /api/stats` - Dashboard statistics
- `GET /api/stats/areas` - Area-specific data

### Bot
- `GET /api/bot/status` - Bot status and metrics
- `GET /api/bot/analytics` - Bot performance data
- `POST /api/bot/config` - Update bot configuration

## 🔧 Configuration

### Bot Settings
- Monthly post limit: 50 (X API free tier)
- Mention check interval: 5 minutes
- Weekly summary: Fridays at 10:00 AM
- AI model: GPT-3.5-turbo for cost efficiency

### Image Processing
- Max file size: 10MB
- Supported formats: JPG, PNG, WebP
- Auto-resize: 800x600px max
- Compression: 80% quality

## 🚨 Monitoring

### Health Checks
- `/health` endpoint for service monitoring
- Redis connection monitoring
- Database connection verification
- Bot status tracking

### Logging
- Structured logging with timestamps
- Error tracking and alerting
- API usage monitoring
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Citizens of Gurugram for their participation
- OpenAI for AI capabilities
- X (Twitter) for API access
- Railway for hosting platform

## 📞 Support

For issues and questions:
- Create GitHub issue
- Contact: @potholeai on X
- Email: support@potholeai.com

---

**Made with ❤️ for better roads in Gurugram**
