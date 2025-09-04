import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Bot, BarChart3, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/admin', label: 'Admin', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-green-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PotholeAI</h1>
              <p className="text-xs text-gray-500">Gurugram Infrastructure Monitor</p>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-md">
              <Bot className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">@potholeai</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
