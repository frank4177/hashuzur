import React, { useCallback } from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Box,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { availableHashtags } from '../mocks/trendData';

interface HashtagDropdownProps {
  currentHashtag: string;
}

// Dropdown component to switch between hashtags
const HashtagDropdown: React.FC<HashtagDropdownProps> = ({ currentHashtag }) => {
  const router = useRouter();
  
  // Memoize the change handler to avoid unnecessary re-renders
  const handleChange = useCallback((event: SelectChangeEvent<string>) => {
    const newHashtag = event.target.value;
    router.push(`/insights/${newHashtag}`);
  }, [router]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Typography variant="body1" sx={{ mr: 2 }}>
        Switch hashtag:
      </Typography>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <Select
          value={currentHashtag}
          onChange={handleChange}
          displayEmpty
          variant="outlined"
        >
          {availableHashtags.map((hashtag) => (
            <MenuItem key={hashtag} value={hashtag}>
              #{hashtag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default React.memo(HashtagDropdown);