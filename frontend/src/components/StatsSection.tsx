import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Calendar, MapPin } from 'lucide-react';

interface StatsSectionProps {
  stats: {
    totalIssues: number;
    resolvedIssues: number;
    pendingIssues: number;
    avgResolutionTime: number;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const weeklyData = [
    { name: 'Mon', issues: 12, resolved: 8 },
    { name: 'Tue', issues: 19, resolved: 15 },
    { name: 'Wed', issues: 8, resolved: 12 },
    { name: 'Thu', issues: 15, resolved: 10 },
    { name: 'Fri', issues: 22, resolved: 18 },
    { name: 'Sat', issues: 7, resolved: 9 },
    { name: 'Sun', issues: 5, resolved: 7 }
  ];

  const monthlyTrend = [
    { month: 'Jan', issues: 45 },
    { month: 'Feb', issues: 52 },
    { month: 'Mar', issues: 38 },
    { month: 'Apr', issues: 61 },
    { month: 'May', issues: 55 },
    { month: 'Jun', issues: 67 }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
            <BarChart className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weekly Activity</h3>
            <p className="text-gray-600 dark:text-gray-400">Issues reported vs resolved</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="issues" fill="#f97316" name="Reported" />
            <Bar dataKey="resolved" fill="#16a34a" name="Resolved" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Trend</h3>
            <p className="text-gray-600 dark:text-gray-400">Issue reporting patterns</p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="issues" 
              stroke="#f97316" 
              strokeWidth={3}
              dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">This Month</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">New Reports</span>
              <span className="font-semibold text-gray-900 dark:text-white">67</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Resolved</span>
              <span className="font-semibold text-green-600 dark:text-green-400">52</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Resolution Rate</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">77.6%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Top Areas</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">MG Road</span>
              <span className="font-semibold text-red-600 dark:text-red-400">23 issues</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Cyber Hub</span>
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">18 issues</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Golf Course Road</span>
              <span className="font-semibold text-orange-600 dark:text-orange-400">15 issues</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
