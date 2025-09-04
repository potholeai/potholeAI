import React, { useState } from 'react';
import { Accessibility, Type, Eye, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    highContrast: false,
    screenReader: false,
    reducedMotion: false
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Apply settings to document
    if (key === 'fontSize') {
      document.documentElement.style.fontSize = value === 'large' ? '1.2rem' : '1rem';
    }
    if (key === 'highContrast') {
      document.documentElement.classList.toggle('high-contrast', value);
    }
    if (key === 'reducedMotion') {
      document.documentElement.classList.toggle('reduce-motion', value);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Accessibility options"
      >
        <Accessibility className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Accessibility</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Font Size</span>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
                  >
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                  </select>
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">High Contrast</span>
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) => updateSetting('highContrast', e.target.checked)}
                    className="rounded"
                  />
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Reduced Motion</span>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                    className="rounded"
                  />
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityMenu;
