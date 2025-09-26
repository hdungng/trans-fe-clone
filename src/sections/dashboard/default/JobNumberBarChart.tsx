// material-ui
import { useTheme } from '@mui/material/styles';

import { BarChart } from '@mui/x-charts/BarChart';
import { getJobNumberByDate } from 'api/dashboard';
import { useEffect, useState } from 'react';
import { APIResponse } from 'types/response';

interface JobNumberDateChartProps {
  slot: 'week' | 'month';
}

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function JobNumberBarChart({ slot }: JobNumberDateChartProps) {
  const theme = useTheme();
  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };

  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, [slot]);


  const fetchData = async () => {
    // API Extract
    const totalJobNumberDateResponse: APIResponse = await getJobNumberByDate();

    if (totalJobNumberDateResponse.status === 'success')
      switch (slot) {
        case 'week':
          setLabels(totalJobNumberDateResponse.data[0].labels);
          setData(totalJobNumberDateResponse.data[0].data);
          break;
        case 'month':
          setLabels(totalJobNumberDateResponse.data[1].labels);
          setData(totalJobNumberDateResponse.data[1].data);
          break;
      }
  };

  return (
    <BarChart
      hideLegend
      height={380}
      series={[{ data, label: 'Job Numbers' }]}
      xAxis={[{ data: labels, scaleType: 'band', disableLine: true, disableTicks: true, tickLabelStyle: axisFonstyle }]}
      yAxis={[{ position: 'none' }]}
      slotProps={{ bar: { rx: 5, ry: 5 } }}
      axisHighlight={{ x: 'none' }}
      margin={{ left: 20, right: 20 }}
      colors={[theme.palette.info.light]}
      sx={{ '& .MuiBarElement-root:hover': { opacity: 0.6 } }}
    />
  );
}
