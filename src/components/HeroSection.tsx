import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface HeroSectionProps {
  stats: {
    totalIssues: number;
    resolvedIssues: number;
    pendingIssues: number;
    avgResolutionTime: number;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Issues',
      value: stats.totalIssues,
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Resolved',
      value: stats.resolvedIssues,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Pending',
      value: stats.pendingIssues,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      label: 'Avg Resolution (days)',
      value: stats.avgResolutionTime,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            PotholeAI Gurugram
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Crowdsourced infrastructure monitoring for better roads. 
            Tag @potholeai or report directly to make your voice heard.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
