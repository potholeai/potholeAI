import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Layers } from 'lucide-react';

interface Issue {
  id: string;
  location: { lat: number; lng: number };
  severity: 'urgent' | 'moderate' | 'low';
  description: string;
  status: string;
}

interface MapSectionProps {
  issues: Issue[];
}

const MapSection: React.FC<MapSectionProps> = ({ issues }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'urgent': return 'bg-red-500';
      case 'moderate': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Issue Map</h2>
              <p className="text-gray-600 dark:text-gray-400">Real-time pothole reports across Gurugram</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{issues.length} active issues</span>
          </div>
        </div>
      </div>

      <div className="relative h-96 bg-gray-100 dark:bg-gray-700">
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">Interactive map will load here</p>
              <div className="flex flex-wrap justify-center gap-2">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`w-4 h-4 rounded-full ${getSeverityColor(issue.severity)} animate-pulse`}
                    title={issue.description}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Urgent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Moderate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Low Priority</span>
            </div>
          </div>
          <span className="text-gray-500 dark:text-gray-500">Click markers for details</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MapSection;
