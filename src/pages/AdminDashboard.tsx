import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Settings, Database, Activity, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const systemMetrics = [
    { icon: Shield, label: 'System Status', value: 'Healthy', color: 'green', trend: '+0.2%' },
    { icon: Users, label: 'Active Users', value: '1,234', color: 'blue', trend: '+12.5%' },
    { icon: Database, label: 'Total Issues', value: '247', color: 'orange', trend: '+8.3%' },
    { icon: Settings, label: 'Bot Uptime', value: '99.9%', color: 'purple', trend: '+0.1%' },
    { icon: Activity, label: 'API Calls', value: '15.2K', color: 'indigo', trend: '+5.7%' },
    { icon: TrendingUp, label: 'Resolution Rate', value: '76.4%', color: 'emerald', trend: '+3.2%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage PotholeAI system and bot configuration</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`inline-flex p-3 rounded-full bg-${metric.color}-100 dark:bg-${metric.color}-900 mb-4`}>
              <metric.icon className={`h-6 w-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
              </div>
              <div className={`text-sm font-medium ${
                metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Shield className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Advanced Admin Panel</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive system management and configuration tools.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-500">
          <div>Bot Configuration</div>
          <div>User Management</div>
          <div>Issue Moderation</div>
          <div>Analytics & Reports</div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
