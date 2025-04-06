import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { HashtagTrendData } from '../types';

// Fetch data function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    // Parse error response
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch hashtag data');
  }
  
  return response.json();
};

// Custom hook to fetch and manage hashtag trend data
export const useHashtagTrend = (hashtag: string | undefined) => {
  // Normalized hashtag for API call
  const normalizedHashtag = hashtag ? hashtag.toLowerCase().replace('#', '') : '';
  
  // SWR hook for data fetching with caching and revalidation
  const { 
    data, 
    error, 
    isLoading, 
    isValidating, 
    mutate 
  } = useSWR<HashtagTrendData>(
    normalizedHashtag ? `/api/trends/${normalizedHashtag}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000, // 1 minute
    }
  );
  
  // Memoized retry function
  const retry = useCallback(() => {
    mutate();
  }, [mutate]);
  
  return {
    data,
    isLoading,
    isRefreshing: isValidating && !isLoading,
    error: error ? (error as Error).message : undefined,
    retry
  };
};