import React, { useMemo } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { 
  Container, 
  Typography, 
  Box, 
  useMediaQuery, 
  IconButton,
  Paper,
  useTheme
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Import the theme context hook
import { useThemeContext } from '@/context/ThemeContext'; 

// Lazy load the components to improve performance
const HashtagTrendCard = dynamic(() => import('../../components/HashtagTrendCard'), {
  loading: () => <LoadingState />,
  ssr: false
});
const HashtagDropdown = dynamic(() => import('../../components/HashtagDropdown'), {
  ssr: false
});
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { useHashtagTrend } from '../../hooks/useHashtagTrend';

const HashtagInsightsPage: NextPage = () => {
  const router = useRouter();
  const { hashtag } = router.query;
  
  // Use the theme context instead of local state
  const { mode, toggleColorMode } = useThemeContext();
  const theme = useTheme();
  
  // Check if screen is mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Fetch hashtag trend data
  const { data, isLoading, error, retry } = useHashtagTrend(
    typeof hashtag === 'string' ? hashtag : undefined
  );
  
  // Memoize the current hashtag without # for dropdown
  const currentHashtag = useMemo(() => {
    return typeof hashtag === 'string' 
      ? hashtag.replace('#', '') 
      : '';
  }, [hashtag]);
  
  // Handle route change if hashtag is missing
  React.useEffect(() => {
    if (router.isReady && !hashtag) {
      router.push('/insights/uri');
    }
  }, [router, hashtag]);
  
  // Page title based on hashtag
  const pageTitle = useMemo(() => {
    return `Sentiment Analysis | ${hashtag ? `#${currentHashtag}` : 'Loading...'}`;
  }, [hashtag, currentHashtag]);
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Sentiment analysis for hashtag ${hashtag}`} />
      </Head>
      
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          {/* Header with page title and theme toggle */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4
          }}>
            <Typography 
              variant={isMobile ? 'h5' : 'h4'} 
              component="h1" 
              fontWeight="bold"
            >
              Hashtag Sentiment Insights
            </Typography>
            
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          
          {/* Hashtag dropdown (bonus feature) */}
          {currentHashtag && (
            <HashtagDropdown currentHashtag={currentHashtag} />
          )}
          
          {/* Main content */}
          <Paper 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'transparent' 
            }}
          >
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onRetry={retry} />
            ) : data ? (
              <HashtagTrendCard data={data} />
            ) : null}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default HashtagInsightsPage;