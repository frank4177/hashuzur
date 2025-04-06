// components/SentimentChart.tsx
import React, { useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";

type SentimentDataPoint = {
  date: string;
  sentiment: number;
};

interface SentimentChartProps {
  data: SentimentDataPoint[];
}

const SentimentChart: React.FC<SentimentChartProps> = React.memo(({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Format dates for display
  const formattedData = useMemo(() => {
    return data.map(point => ({
      sentiment: point.sentiment,
      // Format the date for display
      label: new Date(point.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }));
  }, [data]);

  const endingPositive = data[data.length - 1].sentiment > 0;
  const chartColor = endingPositive
    ? theme.palette.success.main
    : theme.palette.error.main;

  // Find min and max sentiment values
  const minSentiment = useMemo(
    () => Math.min(...data.map((d) => d.sentiment)),
    [data]
  );
  const maxSentiment = useMemo(
    () => Math.max(...data.map((d) => d.sentiment)),
    [data]
  );

  return (
    <Box sx={{ width: "100%", height: isMobile ? 250 : 350 }}>
      <LineChart
        // Use simple dataset with pre-formatted labels
        dataset={formattedData}
        series={[
          {
            dataKey: "sentiment",
            color: chartColor,
            area: true,
            showMark: !isMobile,
            highlightScope: {
              highlighted: "item",
              faded: "global",
            },
          },
        ]}
        // Use xAxis with custom labels
        xAxis={[{
          dataKey: "label",
          scaleType: "point",
        }]}
        yAxis={[
          {
            label: "Sentiment",
            min: Math.floor(minSentiment * 10) / 10 - 0.1, // Round down to nearest 0.1
            max: Math.ceil(maxSentiment * 10) / 10 + 0.1, // Round up to nearest 0.1
          },
        ]}
        sx={{
          ".MuiLineElement-root": {
            strokeWidth: 3,
          },
          ".MuiMarkElement-root": {
            stroke: chartColor,
            fill: theme.palette.background.paper,
            strokeWidth: 2,
          },
          ".MuiAreaElement-root": {
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
            hidden: true,
          },
        }}
        // // Enable zoom/pan for bonus requirement
        // enableAxisZoom={{
        //   x: true,
        //   y: false,
        // }}
        // Custom mark for min/max points
        slots={{
          legend: () => (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: theme.palette.error.main,
                  }}
                />
                <Typography variant="caption">
                  Min: {minSentiment.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: theme.palette.success.main,
                  }}
                />
                <Typography variant="caption">
                  Max: {maxSentiment.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ),
        }}
      />
    </Box>
  );
});

SentimentChart.displayName = "SentimentChart";

export default SentimentChart;