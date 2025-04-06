# Hashtag Sentiment Insights

A Next.js application that visualizes sentiment analysis data for hashtags. This project was developed as a frontend engineer assessment.

## Overview of Approach

My approach to this assessment focused on creating a clean, performant, and visually appealing dashboard for hashtag sentiment analysis. I prioritized:

1. **Component Architecture**: Clean separation of concerns with specialized components for chart visualization, trend data display, error handling, and loading states.

2. **Performance Optimization**: Applied memoization techniques using React.memo, useMemo, and useCallback to prevent unnecessary re-renders, especially for the chart component which can be computationally expensive.

3. **User Experience**: Added visual indicators for trend direction, min/max values, and interactive elements to make the data more intuitive and accessible.

4. **Error Handling & Loading States**: Implemented comprehensive error handling with user-friendly error messages and intuitive loading states to provide feedback during data fetching.

5. **Responsiveness**: Ensured the application works well on all device sizes with responsive layouts and optimized visualizations for mobile.

## Screenshots/Demo

![Screenshot of Main Dashboard](screenshots/desktop.png)

![Screenshot of Dark Mode](screenshots/dark-mode.png)

![Screenshot of Mobile View](screenshots/mobile-view.png)

## Time Spent

Total time spent on this assessment: **1 hour 25 minutes**



## Features

- **Dynamic Route:** `/insights/[hashtag]` for viewing sentiment trends of specific hashtags
- **Interactive Chart:** Visualization of sentiment trends using `@mui/x-charts`
- **Responsive Design:** Mobile-friendly layout with optimized components
- **Dark Mode Support:** Toggle between light and dark themes
- **Performance Optimizations:**
  - React.memo for component memoization
  - useMemo and useCallback hooks for optimized rendering
  - Lazy loading with next/dynamic
  - SWR for data fetching with caching

## Bonus Features Implemented

- ✅ Hashtag dropdown to switch between different hashtags
- ✅ Min/max sentiment markers on the chart
- ✅ Dark mode support with theme toggle
- ✅ Lazy-loaded chart components with `next/dynamic`

## Tech Stack

- **Framework:** Next.js with TypeScript
- **UI Components:** Material UI
- **Data Visualization:** @mui/x-charts
- **Data Fetching:** SWR (stale-while-revalidate)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000/insights/uri](http://localhost:3000/insights/uri) in your browser

## Project Structure

```
/pages
  /insights/[hashtag].tsx - Main page with dynamic routing
  /api/trends/[hashtag].ts - API endpoint for hashtag data
/components
  HashtagTrendCard.tsx - Main card component showing trend data
  SentimentChart.tsx - Line chart component for visualization
  LoadingState.tsx - Skeleton loading component
  ErrorState.tsx - Error handling component
  HashtagDropdown.tsx - Dropdown for switching hashtags
/hooks
  useHashtagTrend.ts - Custom hook for data fetching
/mocks
  trendData.ts - Mock data for hashtag trends
/styles
  theme.ts - Theme configuration with dark mode support
/types
  index.ts - TypeScript type definitions
```

## Performance Considerations

- Component memoization with React.memo to prevent unnecessary re-renders
- useMemo for expensive calculations like trend direction and chart data preparation
- useCallback for event handlers to maintain reference stability
- SWR for intelligent data caching and revalidation
- Lazy loading of components that aren't needed for initial render