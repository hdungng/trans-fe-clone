import { useState, useEffect } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';
import { APIResponse } from 'types/response';
import { getJobNumberByDate } from 'api/dashboard';

interface JobNumberDateChartProps {
  slot: 'week' | 'month';
}

// ==============================|| ANALYTICS - INCOME ||============================== //

export default function JobNumberDateChart({ slot }: JobNumberDateChartProps) {
  const theme = useTheme();

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

  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };
  const line = theme.palette.divider;

  return (
    <LineChart
      hideLegend
      grid={{ horizontal: true, vertical: true }}
      xAxis={[{ data: labels, scaleType: 'point', disableLine: true, tickLabelStyle: { ...axisFonstyle, fontSize: 12 } }]}
      yAxis={[{ disableLine: true, disableTicks: true, tickLabelStyle: axisFonstyle, tickMaxStep: 20 }]}
      series={[
        {
          curve: 'linear',
          data,
          showMark: false,
          area: true,
          id: 'JobNumberDateChart',
          color: theme.palette.primary.main,
          label: 'Số Job Number',
          valueFormatter: (value: number | null) => `${value}`
        }
      ]}
      height={355}
      margin={{ top: 30, bottom: 25, left: 0, right: 22 }}
      sx={{
        '& .MuiLineElement-root': { strokeDasharray: '0', strokeWidth: 1 },
        '& .MuiAreaElement-series-JobNumberDateChart': { fill: `url('#myGradient3')`, paintOrder: 'stroke' },
        '& .MuiChartsAxis-directionX .MuiChartsAxis-tick': { stroke: line }
      }}
    >
      <defs>
        <linearGradient id="myGradient3" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor={alpha(theme.palette.primary.main, 0.2)} />
          <stop offset="80%" stopColor={alpha(theme.palette.background.default, 0.4)} />
        </linearGradient>
      </defs>
    </LineChart>
  );
}
