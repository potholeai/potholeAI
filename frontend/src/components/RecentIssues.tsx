import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Issue {
  id: string;
  location: { lat: number; lng: number };
  severity: 'urgent' | 'moderate' | 'low';
  description: string;
  status: string;
  createdAt: string;
  photos: string[];
}

interface RecentIssuesProps {
  issues: Issue[];
}

const RecentIssues: React.FC<RecentIssuesProps> = ({ issues }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[severity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Issues</h3>
            <p className="text-gray-600">Latest pothole reports from citizens</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={issue.photos[0]}
                  alt="Pothole"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(issue.severity)}`}>
                    {issue.severity}
                  </span>
                  <div className="flex items-center text-gray-500">
                    {getStatusIcon(issue.status)}
                    <span className="ml-1 text-sm capitalize">{issue.status}</span>
                  </div>
                </div>
                
                <p className="text-gray-900 font-medium mb-2 line-clamp-2">
                  {issue.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{issue.location.lat.toFixed(4)}, {issue.location.lng.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</span>
                    <Eye className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {issues.length === 0 && (
        <div className="p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No recent issues reported</p>
        </div>
      )}
    </motion.div>
  );
};

export default RecentIssues;
