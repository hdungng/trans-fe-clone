import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
// project imports
import MainCard from 'components/MainCard';
import ReportCard from 'components/cards/statistics/ReportCard';
import { BarChartOutlined, FileDoneOutlined, FileTextOutlined, PlusSquareOutlined } from '@ant-design/icons';
import JobOverviewCreateChart from 'sections/dashboard/analytics/JobOverviewCreateChart';
import RecentJobNumberTable from 'sections/dashboard/default/RecentJobNumberTable';
import JobNumberPieChart from 'sections/apps/invoice/JobNumberPieChart';
import { APIResponse } from 'types/response';
import { getTotalJobNumber } from 'api/dashboard';
import { getUsersWithJobNumber } from 'api/user';
import { UserType } from 'types/pages/user';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [totalJobNumber, setTotalJobNumber] = useState<any>();
  const [usersWithJobNumber, setUsersWithJobNumber] = useState<UserType[]>([]);
  const intl = useIntl();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // API Extract
    const [totalJobNumberResponse, usersWithJobNumberResponse]: APIResponse[] = await Promise.all([
      getTotalJobNumber(),
      getUsersWithJobNumber()
    ]);

    if (totalJobNumberResponse.status === 'success') setTotalJobNumber(totalJobNumberResponse.data);
    else setTotalJobNumber({});

    if (usersWithJobNumberResponse.status === 'success') setUsersWithJobNumber(usersWithJobNumberResponse.data);
    else setUsersWithJobNumber([]);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">
          {intl.formatMessage({ id: 'dashboard.default.job-number-overview', defaultMessage: 'Job Number Overview' })}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, lg: 3, sm: 6 }}>
        <ReportCard
          primary={totalJobNumber?.total || 0}
          secondary={intl.formatMessage({ id: 'dashboard.default.card.total-job-numbers', defaultMessage: 'Total Job Numbers' })}
          color="primary.light"
          iconPrimary={BarChartOutlined}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 3, sm: 6 }}>
        <ReportCard
          primary={totalJobNumber?.new || 0}
          secondary={intl.formatMessage({ id: 'job-number.status.new', defaultMessage: 'New' })}
          color="warning.main"
          iconPrimary={PlusSquareOutlined}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 3, sm: 6 }}>
        <ReportCard
          primary={totalJobNumber?.crosschecked || 0}
          secondary={intl.formatMessage({ id: 'job-number.status.crosschecked', defaultMessage: 'Cross-checked' })}
          color="error.main"
          iconPrimary={FileTextOutlined}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 3, sm: 6 }}>
        <ReportCard
          primary={totalJobNumber?.completed || 0}
          secondary={intl.formatMessage({ id: 'job-number.status.completed', defaultMessage: 'Extracted' })}
          color="success.main"
          iconPrimary={FileDoneOutlined}
        />
      </Grid>

      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      {/* row 2 */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <JobOverviewCreateChart userList={usersWithJobNumber} />
      </Grid>
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <JobNumberPieChart userList={usersWithJobNumber} />
      </Grid>
      {/* row 3 */}
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h5">
              {intl.formatMessage({ id: 'dashboard.default.recent-job-numbers', defaultMessage: 'Recent Job Numbers' })}
            </Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <RecentJobNumberTable userList={usersWithJobNumber} />
        </MainCard>
      </Grid>
      {/* <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid> */}
      {/* row 4 */}
      {/* <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <SaleReportCard />
      </Grid>
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                px: 2,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
            </ListItem>
            <ListItem
              component={ListItemButton}
              divider
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
            </ListItem>
            <ListItem
              component={ListItemButton}
              secondaryAction={
                <Stack sx={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ color: 'error.main', bgcolor: 'error.lighter' }}>
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
            </ListItem>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack sx={{ gap: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid> */}
    </Grid>
  );
}