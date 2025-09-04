import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Settings, Database } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage PotholeAI system and bot configuration</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Shield, label: 'System Status', value: 'Healthy', color: 'green' },
          { icon: Users, label: 'Active Users', value: '1,234', color: 'blue' },
          { icon: Database, label: 'Total Issues', value: '247', color: 'orange' },
          { icon: Settings, label: 'Bot Uptime', value: '99.9%', color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`inline-flex p-3 rounded-full bg-${stat.color}-100 mb-4`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h2>
        <p className="text-gray-600 mb-6">
          Advanced configuration and management tools will be available here.
        </p>
        <div className="text-sm text-gray-500">
          Features: Bot configuration, User management, Issue moderation, Analytics
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
