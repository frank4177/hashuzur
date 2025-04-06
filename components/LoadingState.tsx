import React from 'react';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

// Loading state component with skeleton animation
const LoadingState: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={30} />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="text" width="30%" height={24} />
          <Box sx={{ ml: 'auto' }}>
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        </Box>
        
        {/* Chart skeleton */}
        <Skeleton variant="rectangular" height={250} width="100%" 
          sx={{ 
            borderRadius: 1,
            mb: 2
          }} 
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width="20%" height={24} />
          <Skeleton variant="text" width="20%" height={24} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(LoadingState);