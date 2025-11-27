// material-ui
import { useTheme } from '@mui/material/styles';
import { useIntl } from 'react-intl';

import { BarChart } from '@mui/x-charts/BarChart';
import { getJobNumberByDate } from 'api/dashboard';
import { useEffect, useMemo, useState } from 'react';
import { APIResponse } from 'types/response';

interface JobNumberDateChartProps {
  slot: 'week' | 'month';
  selectedUser?: string | number;
}

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function JobNumberBarChart({ slot, selectedUser }: JobNumberDateChartProps) {
  const theme = useTheme();
  const intl = useIntl();
  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };

  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const normalizeLabel = (label: string) =>
    label
      .normalize('NFC')
      .replace(/,/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const weekLabelMessages = useMemo(
    () => ({
      [normalizeLabel('Thứ Bảy')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.week.saturday',
        defaultMessage: 'Saturday'
      }),
      [normalizeLabel('Chủ Nhật')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.week.sunday',
        defaultMessage: 'Sunday'
      }),
      [normalizeLabel('Thứ Hai')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.week.monday',
        defaultMessage: 'Monday'
      }),
      [normalizeLabel('Thứ Ba')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.week.tuesday',
        defaultMessage: 'Tuesday'
      }),
      [normalizeLabel('Thứ Tư')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.week.wednesday',
        defaultMessage: 'Wednesday'
      }),
      [normalizeLabel('Thứ Năm')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.week.thursday',
        defaultMessage: 'Thursday'
      }),
      [normalizeLabel('Thứ Sáu')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.week.friday',
        defaultMessage: 'Friday'
      })
    }),
    [intl]
  );

  const monthLabelMessages = useMemo(
    () => ({
      [normalizeLabel('Tuần 1')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.month.week-1',
        defaultMessage: 'Week 1'
      }),
      [normalizeLabel('Tuần 2')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.month.week-2',
        defaultMessage: 'Week 2'
      }),
      [normalizeLabel('Tuần 3')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.month.week-3',
        defaultMessage: 'Week 3'
      }),
      [normalizeLabel('Tuần 4')]: intl.formatMessage({
        id: 'dashboard.charts.job-number-bar.month.week-4',
        defaultMessage: 'Week 4'
      })
    }),
    [intl]
  );

  const displayLabels = useMemo(() => {
    const messageMap = slot === 'week' ? weekLabelMessages : monthLabelMessages;

    return labels.map((label) => {
      const normalized = normalizeLabel(label);
      return messageMap[normalized] ?? label;
    });
  }, [labels, monthLabelMessages, slot, weekLabelMessages]);

  useEffect(() => {
    fetchData();
  }, [selectedUser, slot]);


  const fetchData = async () => {
    // API Extract
    const totalJobNumberDateResponse: APIResponse = await getJobNumberByDate(selectedUser);

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
      series={[
        {
          data,
          label: intl.formatMessage({ id: 'dashboard.charts.job-number-bar.series-label', defaultMessage: 'Job Numbers' })
        }
      ]}
      xAxis={[{ data: displayLabels, scaleType: 'band', disableLine: true, disableTicks: true, tickLabelStyle: axisFonstyle }]}
      yAxis={[{ position: 'none' }]}
      slotProps={{ bar: { rx: 5, ry: 5 } }}
      axisHighlight={{ x: 'none' }}
      margin={{ left: 20, right: 20 }}
      colors={[theme.palette.info.light]}
      sx={{ '& .MuiBarElement-root:hover': { opacity: 0.6 } }}
    />
  );
}