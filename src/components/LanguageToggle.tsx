import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageToggle: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
    localStorage.setItem('language', language === 'en' ? 'hi' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
