# PotholeAI 🕳️🤖

A comprehensive blockchain and AI-powered platform for pothole reporting and road infrastructure management.

## 🏗️ Project Structure

### 🔗 Blockchain Infrastructure
- **Smart Contracts**: Ethereum-based pothole reporting system
- **Token System**: SimpleToken (SIM) for incentivizing reports
- **Deployment**: Base Sepolia testnet integration

### 🤖 AI Twitter Bot Dashboard
- **Real-time Monitoring**: Live Twitter feed for @potholeai mentions
- **Automated Responses**: 4 AI personalities for community engagement
- **Analytics**: Comprehensive engagement and performance metrics
- **Scheduling**: Tweet campaign management and automation

### 🎨 Frontend Applications
- **Web3 Interface**: Blockchain interaction and token management
- **Twitter Dashboard**: Social media automation and monitoring
- **Responsive Design**: Mobile-first with glassmorphism UI

## 🚀 Quick Start

### Blockchain Development
```bash
# Install dependencies
npm install

# Compile contracts (run in separate terminal)
# Note: Don't run npm run compile - use manual compilation

# Deploy to testnet
npm run deploy
```

### Twitter Bot Dashboard
```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Technology Stack

### Blockchain
- **Solidity ^0.8.0**: Smart contract development
- **Ethers.js v6**: Ethereum interaction library
- **Base Sepolia**: Layer 2 testnet deployment

### Frontend
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations

### Twitter Bot
- **Real-time Simulation**: Live mention monitoring
- **AI Personalities**: Context-aware response generation
- **Analytics Dashboard**: Engagement tracking
- **Scheduling System**: Campaign automation

## 🎯 Features

### Smart Contract Features
- ✅ ERC-20 Token (SimpleToken)
- ✅ Pothole reporting system
- ✅ Incentive mechanisms
- ✅ Base network deployment

### Twitter Bot Features
- ✅ Live mention monitoring
- ✅ 4 AI personalities (Professional, Casual, Technical, Humorous)
- ✅ Automated response generation
- ✅ Tweet scheduling and campaigns
- ✅ Real-time analytics dashboard
- ✅ Emergency controls and rate limiting
- ✅ Sentiment analysis
- ✅ Response queue management

## 🔧 Configuration

### Environment Variables
```env
# Blockchain
RPC_URL=https://sepolia.base.org
PRIVATE_KEY=your_private_key_here

# Twitter API (for production)
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

## 📊 Current Status

### Blockchain
- ✅ Smart contracts deployed
- ✅ Token system functional
- ✅ Base testnet integration

### Twitter Bot
- ✅ Dashboard interface complete
- ✅ Real-time simulation active
- ✅ AI personalities configured
- 🔄 Twitter API integration (pending)

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Smart Contract Deployment
```bash
# Compile contracts first (separate terminal)
node compile.js

# Deploy to testnet
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Repository**: https://github.com/potholeai/potholeai
- **Twitter**: @potholeai
- **Base Sepolia**: Testnet deployment

---

Built with ❤️ for better road infrastructure through blockchain and AI technology.
