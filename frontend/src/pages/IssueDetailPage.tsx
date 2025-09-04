import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, User } from 'lucide-react';

const IssueDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Issue #{id}</h1>
      </motion.div>

      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue Details</h2>
        <p className="text-gray-600">
          Detailed issue information and tracking will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default IssueDetailPage;
