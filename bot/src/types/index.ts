export interface TweetData {
  id: string;
  text: string;
  author_id: string;
  created_at: string;
  attachments?: {
    media_keys: string[];
  };
}

export interface IssueAnalysis {
  isPotholeReport: boolean;
  severity: 'urgent' | 'moderate' | 'low';
  location: string | null;
  description: string;
  confidence: number;
}
