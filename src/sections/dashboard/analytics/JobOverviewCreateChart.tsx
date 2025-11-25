import { useState } from 'react';
import { useIntl } from 'react-intl';

// material-ui
import Grid from '@mui/material/Grid';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import { getWeekOfMonth } from 'utils/formatDate';
import JobNumberBarChart from '../default/JobNumberBarChart';

export default function JobOverviewCreateChart() {
  const [slot, setSlot] = useState<'month' | 'week'>('week');
  const currentDate = new Date();
  const intl = useIntl();
  // const handleQuantity = (e: SelectChangeEvent) => {
  //   setQuantity(e.target.value as 'By margin' | 'By sales' | 'By volume');
  // };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: 'month' | 'week') => {
    if (newAlignment) setSlot(newAlignment);
  };

  const weekLabel =
    slot === 'week'
      ? intl.formatMessage({ id: 'dashboard.analytics.job-overview.week-label', defaultMessage: 'Week {week} ' }, {
          week: getWeekOfMonth(currentDate)
        })
      : '';

  const monthLabel = intl.formatMessage(
    { id: 'dashboard.analytics.job-overview.month-label', defaultMessage: 'Month {month}' },
    { month: currentDate.getMonth() + 1 }
  );

  return (
    <MainCard content={false}>
      <Grid>
        <Grid container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ alignItems: { xs: 'center', sm: 'flex-start' }, ml: { xs: 0, sm: 2 }, mt: 3 }}>
              <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }}>
                <Typography variant="h5">
                  {intl.formatMessage(
                    { id: 'dashboard.analytics.job-overview.title', defaultMessage: 'Job Number Statistics {period}' },
                    { period: `${weekLabel}${monthLabel}` }
                  )}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack
              direction="row"
              sx={{ gap: 1, alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' }, mt: 3, mr: { xs: 0, sm: 2 } }}
            >
              <ToggleButtonGroup exclusive onChange={handleChange} size="small" value={slot}>
                <ToggleButton disabled={slot === 'week'} value="week" sx={{ px: 2, py: 0.5 }}>
                  {intl.formatMessage({ id: 'dashboard.analytics.job-overview.toggle.week', defaultMessage: 'Week' })}
                </ToggleButton>
                <ToggleButton disabled={slot === 'month'} value="month" sx={{ px: 2, py: 0.5 }}>
                  {intl.formatMessage({ id: 'dashboard.analytics.job-overview.toggle.month', defaultMessage: 'Month' })}
                </ToggleButton>
              </ToggleButtonGroup>
              {/* <Select value={quantity} onChange={handleQuantity} size="small">
                <MenuItem value="By volume">By Volume</MenuItem>
                <MenuItem value="By margin">By Margin</MenuItem>
                <MenuItem value="By sales">By Sales</MenuItem>
              </Select> */}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ width: 1, pt: 1 }}>
        {/* <JobNumberDateChart slot={slot} /> */}
        <JobNumberBarChart slot={slot} />
      </Box>
    </MainCard>
  );
}