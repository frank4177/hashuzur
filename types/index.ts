export interface TrendDataPoint {
    date: string;
    sentiment: number;
  }
  
  export interface HashtagTrendData {
    hashtag: string;
    range: string;
    trend: TrendDataPoint[];
  }
  
  export type TrendDirection = 'up' | 'down' | 'neutral';