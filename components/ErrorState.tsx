import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

// Error state component with retry button
const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <ErrorOutlineIcon
            color="error"
            sx={{ fontSize: 64, mb: 2 }}
          />
          
          <Typography variant="h5" gutterBottom align="center">
            Oops! Something went wrong
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {error || 'Failed to load hashtag trend data'}
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(ErrorState);