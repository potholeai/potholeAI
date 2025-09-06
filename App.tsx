
import React, { useState } from 'react';
import { Menu, Zap, Globe, Bot } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Twitter Bot Components
import { Sidebar } from './components/layout/Sidebar';
import { TwitterFeed } from './components/twitter/TwitterFeed';
import { BotControlPanel } from './components/twitter/BotControlPanel';
import { BotPersonalityPanel } from './components/twitter/BotPersonalityPanel';
import { SchedulingPanel } from './components/twitter/SchedulingPanel';
import { EngagementChart } from './components/analytics/EngagementChart';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';

// Hooks and Data
import { useTwitterBot } from './hooks/useTwitterBot';
import { mockEngagementData } from './data/mockTwitterData';

type AppMode = 'twitter' | 'blockchain' | 'overview';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const {
    tweets,
    personalities,
    scheduledTweets,
    botStatus,
    botMetrics,
    isLoading,
    refreshFeed,
    generateBotResponse,
    toggleBot,
    changeBotMode,
    emergencyStop,
    selectPersonality,
    scheduleTweet,
    deleteScheduledTweet
  } = useTwitterBot();

  const renderOverview = () => (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          PotholeAI Platform
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Comprehensive blockchain and AI-powered platform for pothole reporting and road infrastructure management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-cyan-500/50 transition-all group"
          onClick={() => setAppMode('twitter')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-200">Twitter Bot Dashboard</h3>
              <p className="text-slate-400">@potholeai automation</p>
            </div>
          </div>
          <p className="text-slate-300 mb-4">
            Manage your Twitter bot with AI personalities, automated responses, and real-time analytics.
          </p>
          <div className="flex gap-2">
            <Badge variant="success" size="sm">Live Monitoring</Badge>
            <Badge variant="primary" size="sm">4 AI Personalities</Badge>
            <Badge variant="warning" size="sm">Auto Responses</Badge>
          </div>
        </div>

        <div 
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-green-500/50 transition-all group"
          onClick={() => setAppMode('blockchain')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-200">Blockchain Interface</h3>
              <p className="text-slate-400">Smart contracts & tokens</p>
            </div>
          </div>
          <p className="text-slate-300 mb-4">
            Interact with PotholeAI smart contracts, manage tokens, and deploy on Base network.
          </p>
          <div className="flex gap-2">
            <Badge variant="success" size="sm">Base Sepolia</Badge>
            <Badge variant="primary" size="sm">ERC-20 Token</Badge>
            <Badge variant="warning" size="sm">Smart Contracts</Badge>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Platform Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">{botMetrics.totalTweets}</div>
            <div className="text-sm text-slate-400">Total Tweets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{botMetrics.totalReplies}</div>
            <div className="text-sm text-slate-400">Bot Replies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">{botMetrics.engagementRate}%</div>
            <div className="text-sm text-slate-400">Engagement Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTwitterDashboard = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">
      {/* Left Column - Controls */}
      <div className="space-y-6">
        <BotControlPanel
          status={botStatus}
          metrics={botMetrics}
          onToggleBot={toggleBot}
          onChangeMode={changeBotMode}
          onEmergencyStop={emergencyStop}
        />
        
        <BotPersonalityPanel
          personalities={personalities}
          activePersonalityId={personalities.find(p => p.isActive)?.id || 'professional'}
          onSelectPersonality={selectPersonality}
        />
      </div>

      {/* Middle Column - Feed */}
      <div className="space-y-6">
        <TwitterFeed
          tweets={tweets}
          isLoading={isLoading}
          onRefresh={refreshFeed}
          onBotResponse={generateBotResponse}
        />
      </div>

      {/* Right Column - Analytics & Scheduling */}
      <div className="space-y-6">
        <EngagementChart data={mockEngagementData} />
        <SchedulingPanel
          scheduledTweets={scheduledTweets}
          onScheduleTweet={scheduleTweet}
          onDeleteScheduled={deleteScheduledTweet}
        />
      </div>
    </div>
  );

  const renderBlockchainInterface = () => (
    <div className="p-6">
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-200 mb-4">Blockchain Interface</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Smart contract interactions and token management will be integrated here.
        </p>
        <div className="space-y-4 max-w-md mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h4 className="font-medium text-slate-200 mb-2">SimpleToken (SIM)</h4>
            <p className="text-sm text-slate-400">ERC-20 token for incentivizing pothole reports</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h4 className="font-medium text-slate-200 mb-2">Base Sepolia Network</h4>
            <p className="text-sm text-slate-400">Layer 2 deployment for efficient transactions</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h4 className="font-medium text-slate-200 mb-2">Smart Contracts</h4>
            <p className="text-sm text-slate-400">Pothole