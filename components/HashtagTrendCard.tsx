import React, { useMemo } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Chip, 
  Divider, 
  Typography, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SentimentChart from './SentimentChart';
import { HashtagTrendData, TrendDirection } from '../types';

interface HashtagTrendCardProps {
  data: HashtagTrendData;
}

const HashtagTrendCard: React.FC<HashtagTrendCardProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Calculate trend direction
  const { trendDirection, trendPercentage } = useMemo(() => {
    const firstSentiment = data.trend[0].sentiment;
    const lastSentiment = data.trend[data.trend.length - 1].sentiment;
    const difference = lastSentiment - firstSentiment;
    
    let direction: TrendDirection = 'neutral';
    if (difference > 0.05) direction = 'up';
    else if (difference < -0.05) direction = 'down';
    
    // Calculate percentage change for display
    let percentage = 0;
    if (firstSentiment !== 0) {
      percentage = (difference / Math.abs(firstSentiment)) * 100;
    } else {
      percentage = difference * 100; // if starting from zero, just show absolute change
    }
    
    return {
      trendDirection: direction,
      trendPercentage: Math.abs(percentage).toFixed(1)
    };
  }, [data.trend]);

  // Determine trend icon and color
  const { TrendIcon, trendColor } = useMemo(() => {
    let icon = TrendingFlatIcon;
    let color = theme.palette.info.main;
    
    if (trendDirection === 'up') {
      icon = TrendingUpIcon;
      color = theme.palette.success.main;
    } else if (trendDirection === 'down') {
      icon = TrendingDownIcon;
      color = theme.palette.error.main;
    }
    
    return { TrendIcon: icon, trendColor: color };
  }, [trendDirection, theme.palette]);

  // Calculate min and max sentiment for display
  const { minSentiment, maxSentiment } = useMemo(() => {
    const sentiments = data.trend.map(point => point.sentiment);
    return {
      minSentiment: Math.min(...sentiments).toFixed(2),
      maxSentiment: Math.max(...sentiments).toFixed(2)
    };
  }, [data.trend]);

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center', 
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {data.hashtag}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {data.range}
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mt: isMobile ? 2 : 0
          }}>
            <Chip
              icon={<TrendIcon />}
              label={`${trendDirection === 'neutral' ? 'Stable' : `${trendPercentage}% ${trendDirection === 'up' ? 'up' : 'down'}`}`}
              sx={{
                bgcolor: `${trendColor}20`,
                color: trendColor,
                fontWeight: 500,
                '& .MuiChip-icon': {
                  color: trendColor
                }
              }}
            />
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <SentimentChart data={data.trend} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 1 : 0
        }}>
          <Typography variant="body2" color="text.secondary">
            Lowest sentiment: <Box component="span" fontWeight="bold" color="error.main">{minSentiment}</Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Highest sentiment: <Box component="span" fontWeight="bold" color="success.main">{maxSentiment}</Box>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(HashtagTrendCard);