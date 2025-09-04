import React, { useState } from 'react';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ExportData: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async (format: 'csv' | 'json' | 'pdf') => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data export
      const data = {
        totalIssues: 247,
        resolvedIssues: 189,
        pendingIssues: 58,
        exportDate: new Date().toISOString(),
        issues: [
          {
            id: '1',
            description: 'Large pothole on MG Road',
            severity: 'urgent',
            status: 'pending',
            location: 'MG Road, Gurugram',
            createdAt: new Date().toISOString()
          }
        ]
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `potholeai-report-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(`Report exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
          <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Export Data</h3>
          <p className="text-gray-600 dark:text-gray-400">Download transparency reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { format: 'csv', icon: FileText, label: 'CSV Report', desc: 'Spreadsheet format' },
          { format: 'json', icon: BarChart3, label: 'JSON Data', desc: 'Raw data format' },
          { format: 'pdf', icon: FileText, label: 'PDF Report', desc: 'Formatted report' }
        ].map(({ format, icon: Icon, label, desc }) => (
          <motion.button
            key={format}
            onClick={() => exportData(format as 'csv' | 'json' | 'pdf')}
            disabled={isExporting}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className="h-8 w-8 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{desc}</div>
          </motion.button>
        ))}
      </div>

      {isExporting && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Generating report...</span>
        </div>
      )}
    </div>
  );
};

export default ExportData;
