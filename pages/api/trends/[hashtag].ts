import { NextApiRequest, NextApiResponse } from 'next';
import { mockTrendData } from '../../../mocks/trendData';
import { HashtagTrendData } from '../../../types';

// API route to fetch hashtag trend data
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HashtagTrendData | { error: string }>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simulate a slight delay to show loading states
  setTimeout(() => {
    const { hashtag } = req.query;
    
    // Convert hashtag to string and remove any # if present
    const hashtagKey = String(hashtag).replace('#', '').toLowerCase();
    
    // Check if hashtag exists in mock data
    if (!mockTrendData[hashtagKey]) {
      return res.status(404).json({ error: `Hashtag #${hashtagKey} not found` });
    }
    
    // Return the mock data for the requested hashtag
    return res.status(200).json(mockTrendData[hashtagKey]);
  }, 800); // 800ms delay to simulate network latency
}