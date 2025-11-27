import { useEffect, useState } from 'react';
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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// project imports
import MainCard from 'components/MainCard';
import { getWeekOfMonth } from 'utils/formatDate';
import JobNumberBarChart from '../default/JobNumberBarChart';
import { getUsersWithJobNumber } from 'api/user';
import { APIResponse } from 'types/response';
import { UserType } from 'types/pages/user';

export default function JobOverviewCreateChart() {
  const [slot, setSlot] = useState<'month' | 'week'>('week');
  const [selectedUser, setSelectedUser] = useState<string | number>('all');
  const [userList, setUserList] = useState<UserType[]>([]);
  const currentDate = new Date();
  const intl = useIntl();
  // const handleQuantity = (e: SelectChangeEvent) => {
  //   setQuantity(e.target.value as 'By margin' | 'By sales' | 'By volume');
  // };

  const handleSlotChange = (event: React.MouseEvent<HTMLElement>, newAlignment: 'month' | 'week') => {
    if (newAlignment) setSlot(newAlignment);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const userListRes: APIResponse = await getUsersWithJobNumber();

    if (userListRes.status === 'success') setUserList(userListRes.data);
    else setUserList([]);
  };

  const handleChange = (event: any) => {
    setSelectedUser(event.target.value);
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
              <ToggleButtonGroup exclusive onChange={handleSlotChange} size="small" value={slot}>
                <ToggleButton disabled={slot === 'week'} value="week" sx={{ px: 2, py: 0.5 }}>
                  {intl.formatMessage({ id: 'dashboard.analytics.job-overview.toggle.week', defaultMessage: 'Week' })}
                </ToggleButton>
                <ToggleButton disabled={slot === 'month'} value="month" sx={{ px: 2, py: 0.5 }}>
                  {intl.formatMessage({ id: 'dashboard.analytics.job-overview.toggle.month', defaultMessage: 'Month' })}
                </ToggleButton>
              </ToggleButtonGroup>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel id="user-select">
                  {intl.formatMessage({ id: 'dashboard.job-number-pie.select-user', defaultMessage: 'Select User' })}
                </InputLabel>
                <Select
                  labelId="user-select"
                  id="user-select"
                  value={selectedUser ?? 'all'}
                  onChange={handleChange}
                  label="Chọn User"
                  size="small"
                >
                  <MenuItem value="all">
                    {intl.formatMessage({ id: 'job-number.status.tabs.all', defaultMessage: 'All' })}
                  </MenuItem>
                  {(userList ?? []).map((user: UserType) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ width: 1, pt: 1 }}>
        {/* <JobNumberDateChart slot={slot} /> */}
        <JobNumberBarChart selectedUser={selectedUser} slot={slot} />
      </Box>
    </MainCard>
  );
}