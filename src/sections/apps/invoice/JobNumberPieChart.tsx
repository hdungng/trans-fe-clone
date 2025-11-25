import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { PieChart } from '@mui/x-charts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

// project imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { APIResponse } from 'types/response';
import { getCurrentJobNumberByStatus } from 'api/dashboard';
import { InputLabel } from '@mui/material';
import { getUsersWithJobNumber } from 'api/user';
import { UserType } from 'types/pages/user';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TaxCodeAutocomplete from 'components/common/TaxCodeAutocomplete';
import { getClientDetail } from 'api/client';
import { ClientType } from 'types/pages/client';
import { useIntl } from 'react-intl';
// ==============================|| INVOICE - PIE CHART ||============================== //

export default function JobNumberPieChart() {
  const theme = useTheme();
  const [totalJobNumber, setTotalJobNumber] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [userList, setUserList] = useState<UserType[]>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [filterClient, setFilterClient] = useState<ClientType | null>(null);
  const intl = useIntl();

  useEffect(() => {
    fetchData();
  }, [selectedUser, selectedDate, filterClient]);


  const handleSelect = async (event: any, value: any) => {
    if (!value) {
      setFilterClient(null);
      return;
    }
    try {
      const response: APIResponse = await getClientDetail(value);

      if (response.status === 'success') {
        setFilterClient(response.data);
      } else {
        setFilterClient(null);
      }
    } catch (error) {
      console.error('Error fetching selected item data:', error);
      setFilterClient(null);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date ?? undefined);
  }

  const fetchData = async () => {
    // API Extract

    const userListRes: any = await getUsersWithJobNumber();

    if (userListRes.status === 'success')
      setUserList(userListRes.data)
    else
      setUserList([]);

    const totalJobNumberResponse: APIResponse = await getCurrentJobNumberByStatus(selectedUser, selectedDate, filterClient);

    if (totalJobNumberResponse.status === 'success')
      setTotalJobNumber(totalJobNumberResponse.data)
    else
      setTotalJobNumber({});
  };

  const handleChange = (event: any) => {
    setSelectedUser(event.target.value);
  }

  const chartData = (Array.isArray(totalJobNumber) ? totalJobNumber : []).map((item: any) => {
    let color;
    let label_id;

    switch (item.label) {
      case 'Mới':
        color = theme.palette.warning.main;
        label_id = 'job-number.status.new';
        break;
      case 'Sẵn sàng':
        color = theme.palette.primary.main;
        label_id = 'job-number.status.ready';
        break;
      case 'Đã kiểm tra chéo':
        color = theme.palette.error.main;
        label_id = 'job-number.status.crosschecked';
        break;
      case 'Đã trích xuất':
        color = theme.palette.success.main;
        label_id = 'job-number.status.completed';
        break;
      default:
        color = theme.palette.grey[500]; // fallback
        label_id = '';
    }
    return { ...item, color, label_id };
  });

  //sx style
  const DotSize = { display: 'flex', alignItems: 'center', gap: 1 };
  const ExpenseSize = { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 500 };
  const total = (Array.isArray(chartData) ? chartData : []).reduce((acc: number, cur: any) => {
    const v = typeof cur?.value === 'number' ? cur.value : 0;
    return acc + v;
  }, 0);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MainCard>
        <Grid container alignItems="center" spacing={1}>
          <Stack sx={{ alignItems: { xs: 'center', sm: 'flex-start' } }}>
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Typography variant="h5">
                {intl.formatMessage({ id: 'dashboard.job-number-pie.title', defaultMessage: 'Job Numbers by User' })}
              </Typography>
            </Stack>
          </Stack>
          <FormControl fullWidth sx={{ marginY: 3 }}>
            <InputLabel id="user-select">
              {intl.formatMessage({ id: 'dashboard.job-number-pie.select-user', defaultMessage: 'Select User' })}
            </InputLabel>
            <Select
              labelId="user-select"
              id="user-select"
              value={selectedUser ?? "all"}
              onChange={handleChange}
              label="Chọn User"
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

          <DatePicker
            format="dd/MM/yyyy"
            value={selectedDate}
            label={intl.formatMessage({ id: 'common.select-date', defaultMessage: 'Select Date' })}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  '& .MuiPickersSectionList-root': {
                    padding: '11px 0px',
                  },
                },
              },
            }}
          />

          <TaxCodeAutocomplete name='taxCode' isFloating={true} handleSelect={handleSelect} sx={{ mt: 3 }} />

          <Grid size={12} sx={{ position: 'relative', }}>
            <PieChart
              hideLegend
              height={247}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              series={[
                {
                  data: (chartData ?? []).map((d: any) => ({
                    // đảm bảo mỗi item luôn có value/label/color hợp lệ
                    value: typeof d?.value === 'number' ? d.value : 0,
                    label: intl.formatMessage({ id: d?.label_id, defaultMessage: 'Select Date' }) ?? '',
                    // label: d?.label ?? '',
                    color: d?.color ?? '#9e9e9e'
                  })),
                  innerRadius: 60,
                  outerRadius: 100,
                  type: 'pie',
                  highlightScope: { highlight: 'item' },
                  valueFormatter: (item: any) => `${item?.value ?? 0}`
                }
              ]}
            />
            {/* Label ở giữa */}
            <Typography
              variant="h2"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}
            >
              {total}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid></Grid>
              <Grid sx={DotSize} size="grow">
                <Dot color="warning" size={12} />
                <Typography variant="subtitle1" color="text.secondary">
                  {intl.formatMessage({ id: 'job-number.status.new', defaultMessage: 'New' })}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData?.[0]?.value ?? 0}</Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid></Grid>
              <Grid sx={DotSize} size="grow">
                <Dot color="primary" size={12} />
                <Typography variant="subtitle1" color="text.secondary">
                  {intl.formatMessage({ id: 'job-number.status.ready', defaultMessage: 'Extracted' })}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData?.[1]?.value ?? 0}</Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid></Grid>
              <Grid sx={DotSize} size="grow">
                <Dot color="error" size={12} />
                <Typography variant="subtitle1" color="text.secondary">
                  {intl.formatMessage({ id: 'job-number.status.crosschecked', defaultMessage: 'Cross-checked' })}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData?.[2]?.value ?? 0}</Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid></Grid>
              <Grid sx={DotSize} size="grow">
                <Dot color="success" size={12} />
                <Typography variant="subtitle1" color="text.secondary">
                  {intl.formatMessage({ id: 'job-number.status.completed', defaultMessage: 'Extracted' })}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData?.[3]?.value ?? 0}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </LocalizationProvider>
  );
}
