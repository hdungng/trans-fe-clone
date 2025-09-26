import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { PieChart } from '@mui/x-charts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

// project imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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


const STATUS_ORDER = ['new', 'ready', 'crosschecked', 'completed'] as const;
type KnownStatusKey = typeof STATUS_ORDER[number];
type StatusKey = KnownStatusKey | 'unknown';
type NormalizedDatum = { key: StatusKey; value: number; label: string; color: string };
// ==============================|| INVOICE - PIE CHART ||============================== //

export default function JobNumberPieChart() {
  const theme = useTheme();
  const statusOrder = STATUS_ORDER;
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

  const statusConfig: Record<StatusKey, { label: string; color: string }> = useMemo(
    () => ({
      new: {
        label: intl.formatMessage({ id: 'job-number.status.new', defaultMessage: 'New' }),
        color: theme.palette.warning.main
      },
      ready: {
        label: intl.formatMessage({ id: 'job-number.status.ready', defaultMessage: 'Ready' }),
        color: theme.palette.primary.main
      },
      crosschecked: {
        label: intl.formatMessage({ id: 'job-number.status.crosschecked', defaultMessage: 'Cross-checked' }),
        color: theme.palette.error.main
      },
      completed: {
        label: intl.formatMessage({ id: 'job-number.status.completed', defaultMessage: 'Extracted' }),
        color: theme.palette.success.main
      },
      unknown: {
        label: intl.formatMessage({ id: 'common.unknown', defaultMessage: 'Unknown' }),
        color: theme.palette.grey[500]
      }
    }),
    [
      intl,
      theme.palette.error.main,
      theme.palette.grey[500],
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ]
  );

  const normalizeStatusKey = (value?: string): KnownStatusKey | '' => {
    if (!value) return '';

    const sanitized = value
      .toString()
      .trim()
      .normalize('NFD')
      .replace(/[^\p{L}]/gu, '')
      .toLowerCase();

    switch (sanitized) {
      case 'moi':
      case 'new':
        return 'new';
      case 'sansang':
      case 'ready':
        return 'ready';
      case 'dakiemtracheo':
      case 'dackiemtracheo':
      case 'crosschecked':
        return 'crosschecked';
      case 'datrichxuat':
      case 'daextract':
      case 'extract':
      case 'extracted':
      case 'completed':
        return 'completed';
      default:
        return '';
    }
  };

  const normalizedData = useMemo<NormalizedDatum[]>(() => {
    const rawData = Array.isArray(totalJobNumber) ? totalJobNumber : [];

    return rawData.map((item: any) => {
      const candidates = [item?.key, item?.status, item?.label];
      const normalizedKey = candidates
        .map((candidate) => normalizeStatusKey(candidate))
        .find((candidate): candidate is KnownStatusKey => Boolean(candidate));
      const statusKey: StatusKey = normalizedKey ?? 'unknown';
      const config = statusConfig[statusKey];
      const numericValue = typeof item?.value === 'number' ? item.value : Number(item?.value) || 0;

      return {
        key: statusKey,
        value: numericValue,
        label: config.label,
        color: config.color
      };
    });
  }, [statusConfig, totalJobNumber]);

  const chartData: NormalizedDatum[] = [
    ...statusOrder.map((statusKey) => {
      const matched = normalizedData.find((item) => item.key === statusKey);
      const config = statusConfig[statusKey];

      return {
        key: statusKey,
        value: matched?.value ?? 0,
        label: config.label,
        color: config.color
      };
    }),
    ...normalizedData.filter((item) => !statusOrder.some((status) => status === item.key))
  ];

  //sx style
  const DotSize = { display: 'flex', alignItems: 'center', gap: 1 };
  const ExpenseSize = { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 500 };
  const total = chartData.reduce((acc: number, cur) => {
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
              label={intl.formatMessage({ id: 'dashboard.job-number-pie.select-user', defaultMessage: 'Select User' })}
            >
              <MenuItem value="all">
                {intl.formatMessage({ id: 'job-number.status.tabs.all', defaultMessage: 'All' })}
              </MenuItem>
              label="Select User"
            >
              <MenuItem value="all">All</MenuItem>
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
                  data: chartData.map((d) => ({
                    value: typeof d?.value === 'number' ? d.value : 0,
                    label: d?.label ?? '',
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
                  {statusConfig.new.label}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData.find((item) => item.key === 'new')?.value ?? 0}</Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid></Grid>
              <Grid sx={DotSize} size="grow">
                <Dot color="primary" size={12} />
                <Typography variant="subtitle1" color="text.secondary">
                  {statusConfig.ready.label}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData.find((item) => item.key === 'ready')?.value ?? 0}</Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid></Grid>
              <Grid sx={DotSize} size="grow">
                <Dot color="error" size={12} />
                <Typography variant="subtitle1" color="text.secondary">
                  {statusConfig.crosschecked.label}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData.find((item) => item.key === 'crosschecked')?.value ?? 0}</Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container>
              <Grid></Grid>
              <Grid sx={DotSize} size="grow">
                <Dot color="success" size={12} />
                <Typography variant="subtitle1" color="text.secondary">
                  {statusConfig.completed.label}
                </Typography>
              </Grid>
              <Grid sx={ExpenseSize}>{chartData.find((item) => item.key === 'completed')?.value ?? 0}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </LocalizationProvider>
  );
}
