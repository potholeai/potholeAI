import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Activity, MessageCircle, TrendingUp, AlertCircle } from 'lucide-react';

const BotStatus: React.FC = () => {
  const [botStats, setBotStats] = useState({
    isActive: true,
    lastPost: '2 hours ago',
    monthlyPosts: 23,
    monthlyLimit: 50,
    mentions: 156,
    responses: 142
  });

  const [apiUsage, setApiUsage] = useState({
    twitter: { used: 23, limit: 50 },
    openai: { used: 1250, limit: 2000 }
  });

  const getUsageColor = (used: number, limit: number) => {
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
    return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bot Status</h3>
            <p className="text-gray-600 dark:text-gray-400">@potholeai monitoring</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${botStats.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="font-medium text-gray-900 dark:text-white">
              {botStats.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last post: {botStats.lastPost}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Monthly Posts</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900 dark:text-white">
                {botStats.monthlyPosts}/{botStats.monthlyLimit}
              </div>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(botStats.monthlyPosts / botStats.monthlyLimit) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">Response Rate</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900 dark:text-white">
                {Math.round((botStats.responses / botStats.mentions) * 100)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {botStats.responses}/{botStats.mentions}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            API Usage
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">X API</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getUsageColor(apiUsage.twitter.used, apiUsage.twitter.limit)}`}>
                  {apiUsage.twitter.used}/{apiUsage.twitter.limit}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">OpenAI</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getUsageColor(apiUsage.openai.used, apiUsage.openai.limit)}`}>
                  {apiUsage.openai.used}/{apiUsage.openai.limit}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
            <div>
              <h5 className="font-medium text-orange-900 dark:text-orange-200">Next Scheduled Post</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Weekly summary scheduled for Friday at 10:00 AM
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BotStatus;
