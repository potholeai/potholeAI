import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import MapSection from '../components/MapSection';
import StatsSection from '../components/StatsSection';
import RecentIssues from '../components/RecentIssues';
import ReportForm from '../components/ReportForm';
import BotStatus from '../components/BotStatus';

const LandingPage: React.FC = () => {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    avgResolutionTime: 0
  });

  useEffect(() => {
    // Fetch initial data
    fetchIssues();
    fetchStats();
  }, []);

  const fetchIssues = async () => {
    try {
      // Mock data for now
      const mockIssues = [
        {
          id: '1',
          location: { lat: 28.4595, lng: 77.0266 },
          severity: 'urgent',
          description: 'Large pothole on MG Road causing traffic issues',
          status: 'pending',
          createdAt: new Date().toISOString(),
          photos: ['https://via.placeholder.com/300x200']
        },
        {
          id: '2',
          location: { lat: 28.4089, lng: 77.0507 },
          severity: 'moderate',
          description: 'Multiple small potholes near Cyber Hub',
          status: 'in-progress',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          photos: ['https://via.placeholder.com/300x200']
        }
      ];
      setIssues(mockIssues);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats for now
      setStats({
        totalIssues: 247,
        resolvedIssues: 189,
        pendingIssues: 58,
        avgResolutionTime: 12
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection stats={stats} />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MapSection issues={issues} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsSection stats={stats} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <BotStatus />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <RecentIssues issues={issues} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ReportForm onSubmit={fetchIssues} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
