// components/SentimentChart.tsx
import React, { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, useTheme, useMediaQuery, Typography } from '@mui/material';

type SentimentDataPoint = {
  date: string;
  sentiment: number;
};

interface SentimentChartProps {
  data: SentimentDataPoint[];
}

const SentimentChart: React.FC<SentimentChartProps> = React.memo(({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const chartData = useMemo(() => {
    return {
      xAxis: data.map(point => new Date(point.date).getTime()),
      series: [{
        data: data.map(point => point.sentiment),
        label: 'Sentiment',
        color: theme.palette.primary.main,
        area: true,
      }]
    };
  }, [data, theme.palette.primary.main]);


  const endingPositive = data[data.length - 1].sentiment > 0;
  const chartColor = endingPositive 
    ? theme.palette.success.main 
    : theme.palette.error.main;

  // Find min and max sentiment values
  const minSentiment = useMemo(() => Math.min(...data.map(d => d.sentiment)), [data]);
  const maxSentiment = useMemo(() => Math.max(...data.map(d => d.sentiment)), [data]);

  
  return (
    <Box sx={{ width: '100%', height: isMobile ? 250 : 350 }}>
      <LineChart
        series={[
          {
            ...chartData.series[0],
            color: chartColor,
            area: true,
            showMark: !isMobile,
            highlightScope: {
              highlighted: 'item',
              faded: 'global'
            },
          },
        ]}
        xAxis={[
          {
            data: chartData.xAxis,
            scaleType: 'time',
            valueFormatter: (value) => 
              new Date(value).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              }),
            // Enable zooming and panning
            disableLine: false,
            tickLabelStyle: {
              angle: 0,
              textAnchor: 'middle',
            },
          },
          
        ]}
        yAxis={[
          {
            label: 'Sentiment',
            min: Math.floor(minSentiment * 10) / 10 - 0.1, // Round down to nearest 0.1
            max: Math.ceil(maxSentiment * 10) / 10 + 0.1,  // Round up to nearest 0.1
          },
        ]}
        sx={{
          '.MuiLineElement-root': {
            strokeWidth: 3,
          },
          '.MuiMarkElement-root': {
            stroke: chartColor,
            fill: theme.palette.background.paper,
            strokeWidth: 2,
          },
          '.MuiAreaElement-root': {
            fill: `${chartColor}20`,
          },
        }}
        height={isMobile ? 220 : 320}
        margin={{
          left: 50,
          right: 20,
          top: 20,
          bottom: 30,
        }}
        slotProps={{
          legend: {
            hidden: true
          }
        }}
 
        axisHighlight={{
          x: 'line',
          y: 'line', 
        }}
        // Custom mark for min/max points
        slots={{
          legend: () => (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.error.main }} />
                <Typography variant="caption">Min: {minSentiment.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.success.main }} />
                <Typography variant="caption">Max: {maxSentiment.toFixed(2)}</Typography>
              </Box>
            </Box>
          )
        }}
      />
    </Box>
  );
});

SentimentChart.displayName = 'SentimentChart';

export default SentimentChart;