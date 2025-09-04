import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import IssueDetailPage from './pages/IssueDetailPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
        </Routes>
      </motion.main>
    </div>
  );
}

export default App;
