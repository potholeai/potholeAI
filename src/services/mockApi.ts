// Mock API service for development
export const mockApi = {
  async getIssues() {
    return {
      success: true,
      data: [
        {
          id: '1',
          description: 'Large pothole on MG Road causing traffic issues',
          severity: 'urgent',
          location: { lat: 28.4595, lng: 77.0266, address: 'MG Road, Gurugram' },
          status: 'pending',
          createdAt: new Date().toISOString(),
          photos: ['https://via.placeholder.com/300x200'],
          reportedBy: 'citizen',
          source: 'web'
        },
        {
          id: '2',
          description: 'Multiple small potholes near Cyber Hub',
          severity: 'moderate',
          location: { lat: 28.4089, lng: 77.0507, address: 'Cyber Hub, Gurugram' },
          status: 'in-progress',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          photos: ['https://via.placeholder.com/300x200'],
          reportedBy: 'citizen',
          source: 'twitter'
        }
      ]
    };
  },

  async createIssue(issueData: any) {
    return {
      success: true,
      data: {
        id: Date.now().toString(),
        ...issueData,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    };
  },

  async getStats() {
    return {
      success: true,
      data: {
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
        ]
      }
    };
  },

  async getBotStatus() {
    return {
      success: true,
      data: {
        isActive: true,
        lastPost: '2 hours ago',
        monthlyPosts: 23,
        monthlyLimit: 50,
        mentions: 156,
        responses: 142,
        apiUsage: {
          twitter: { used: 23, limit: 50 },
          openai: { used: 1250, limit: 2000 }
        }
      }
    };
  }
};
