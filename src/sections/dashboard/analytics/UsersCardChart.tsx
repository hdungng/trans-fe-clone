// material-ui
import { alpha, useTheme } from '@mui/material/styles';

import { BarChart } from '@mui/x-charts/BarChart';

const data = [
  220, 190
];

const xAxisData = [
  '2025-03-26',
  '2025-04-21'
];

// ==============================|| ANALYTICS - USERS ||============================== //

export default function UsersCardChart() {
  const theme = useTheme();

  return (
    <BarChart
      hideLegend
      height={100}
      series={[{ data, label: 'Users', color: alpha(theme.palette.primary.main, 0.85) }]}
      xAxis={[{ id: 'usercard-x-axis', data: xAxisData, scaleType: 'band', position: 'none' }]}
      yAxis={[{ position: 'none' }]}
      axisHighlight={{ x: 'none' }}
      slotProps={{ tooltip: { trigger: 'item', sx: { '& .MuiChartsTooltip-root': { border: '1px solid ', borderColor: 'grey.200' } } } }}
      margin={{ top: -49, bottom: 0, left: 5, right: 5 }}
      sx={{ '& .MuiBarElement-root:hover': { opacity: 0.6 } }}
    />
  );
}
