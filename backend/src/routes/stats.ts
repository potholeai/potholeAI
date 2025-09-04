import express from 'express';

const router = express.Router();

// Get dashboard statistics
router.get('/', (req, res) => {
  // Mock statistics - replace with actual database queries
  const stats = {
    totalIssues: 247,
    resolvedIssues: 189,
    pendingIssues: 58,
    avgResolutionTime: 12,
    weeklyData: [
      { name: 'Mon', issues: 12, resolved: 8 },
      { name: 'Tue', issues: 19, resolved: 15 },
      { name: 'Wed', issues: 8, resolved: 12 },
      { name: 'Thu', issues: 15, resolved: 10 },
      { name: 'Fri', issues: 22, resolved: 18 },
      { name: 'Sat', issues: 7, resolved: 9 },
      { name: 'Sun', issues: 5, resolved: 7 }
    ],
    monthlyTrend: [
      { month: 'Jan', issues: 45 },
      { month: 'Feb', issues: 52 },
      { month: 'Mar', issues: 38 },
      { month: 'Apr', issues: 61 },
      { month: 'May', issues: 55 },
      { month: 'Jun', issues: 67 }
    ],
    topAreas: [
      { area: 'MG Road', issues: 23, severity: 'urgent' },
      { area: 'Cyber Hub', issues: 18, severity: 'moderate' },
      { area: 'Golf Course Road', issues: 15, severity: 'moderate' },
      { area: 'Sohna Road', issues: 12, severity: 'low' },
      { area: 'NH-8', issues: 9, severity: 'urgent' }
    ]
  };

  res.json({
    success: true,
    data: stats
  });
});

// Get area-specific statistics
router.get('/areas', (req, res) => {
  const areaStats = [
    {
      area: 'MG Road',
      coordinates: { lat: 28.4595, lng: 77.0266 },
      totalIssues: 23,
      resolvedIssues: 15,
      avgResolutionTime: 8,
      severity: { urgent: 8, moderate: 10, low: 5 }
    },
    {
      area: 'Cyber Hub',
      coordinates: { lat: 28.4089, lng: 77.0507 },
      totalIssues: 18,
      resolvedIssues: 12,
      avgResolutionTime: 12,
      severity: { urgent: 3, moderate: 12, low: 3 }
    }
  ];

  res.json({
    success: true,
    data: areaStats
  });
});

export default router;
