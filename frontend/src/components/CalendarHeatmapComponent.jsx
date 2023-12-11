import { Box } from '@mui/material';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const hardCodedData = [
  { date: '2023-12-01', count: 1 },
  { date: '2023-12-05', count: 1 },
  { date: '2023-12-10', count: 1 },
];

const CalendarHeatmapComponent = () => {
  return (
    <Box>
      <CalendarHeatmap
        startDate={new Date('2023-12-02')}
        endDate={new Date('2024-03-30')}
        values={hardCodedData}
        horizontal={true}
      />
    </Box>
  );
};

export default CalendarHeatmapComponent;
