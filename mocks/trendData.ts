import { HashtagTrendData } from '../types';

// Mock data for hashtags
export const mockTrendData: Record<string, HashtagTrendData> = {
  uri: {
    hashtag: '#uri',
    range: 'Apr 1 - Apr 7, 2025',
    trend: [
      { date: '2025-04-01', sentiment: -0.2 },
      { date: '2025-04-02', sentiment: 0.0 },
      { date: '2025-04-03', sentiment: 0.1 },
      { date: '2025-04-04', sentiment: 0.3 },
      { date: '2025-04-05', sentiment: 0.2 },
      { date: '2025-04-06', sentiment: 0.4 },
      { date: '2025-04-07', sentiment: 0.5 }
    ]
  },
  nextjs: {
    hashtag: '#nextjs',
    range: 'Apr 1 - Apr 7, 2025',
    trend: [
      { date: '2025-04-01', sentiment: 0.3 },
      { date: '2025-04-02', sentiment: 0.4 },
      { date: '2025-04-03', sentiment: 0.5 },
      { date: '2025-04-04', sentiment: 0.6 },
      { date: '2025-04-05', sentiment: 0.5 },
      { date: '2025-04-06', sentiment: 0.4 },
      { date: '2025-04-07', sentiment: 0.3 }
    ]
  },
  react: {
    hashtag: '#react',
    range: 'Apr 1 - Apr 7, 2025',
    trend: [
      { date: '2025-04-01', sentiment: 0.1 },
      { date: '2025-04-02', sentiment: -0.1 },
      { date: '2025-04-03', sentiment: -0.2 },
      { date: '2025-04-04', sentiment: 0.0 },
      { date: '2025-04-05', sentiment: 0.2 },
      { date: '2025-04-06', sentiment: 0.3 },
      { date: '2025-04-07', sentiment: 0.4 }
    ]
  },
  typescript: {
    hashtag: '#typescript',
    range: 'Apr 1 - Apr 7, 2025',
    trend: [
      { date: '2025-04-01', sentiment: 0.2 },
      { date: '2025-04-02', sentiment: 0.3 },
      { date: '2025-04-03', sentiment: 0.1 },
      { date: '2025-04-04', sentiment: 0.0 },
      { date: '2025-04-05', sentiment: -0.1 },
      { date: '2025-04-06', sentiment: 0.0 },
      { date: '2025-04-07', sentiment: 0.2 }
    ]
  }
};

// List of available hashtags for the dropdown
export const availableHashtags = Object.keys(mockTrendData);