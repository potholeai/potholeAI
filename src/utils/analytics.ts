// Simple analytics utility for tracking user interactions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, properties);
  }
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_name: pageName });
};

export const trackIssueReport = (severity: string, source: string) => {
  trackEvent('issue_reported', { severity, source });
};

export const trackBotInteraction = (type: string) => {
  trackEvent('bot_interaction', { interaction_type: type });
};
