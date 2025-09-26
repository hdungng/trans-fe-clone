import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { PieChart } from '@mui/x-charts';

// project imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import { Stack } from '@mui/material';

// ==============================|| INVOICE - PIE CHART ||============================== //

export default function InvoicePieChart() {
  const theme = useTheme();
  const data = [
    { value: 30, label: 'Mới', color: theme.palette.primary.main },
    { value: 28, label: 'Sẵn sàng', color: theme.palette.warning.main },
    { value: 22, label: 'Đã kiểm tra chéo', color: theme.palette.error.main },
    { value: 20, label: 'Đã trích xuất', color: theme.palette.success.main }
  ];

  //sx style
  const DotSize = { display: 'flex', alignItems: 'center', gap: 1 };
  const ExpenseSize = { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 500 };

  return (
    <MainCard>
      <Grid container alignItems="center" spacing={1}>
        <Stack sx={{ alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Typography variant='h5'>Trạng thái Job Number</Typography>
          </Stack>
        </Stack>
        <Grid size={12}>
          <PieChart
            hideLegend
            height={247}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            series={[
              {
                data,
                innerRadius: 60,
                outerRadius: 100,
                type: 'pie',
                highlightScope: { highlight: 'item' },
                valueFormatter: (value: any) => `${value.value}`
              }
            ]}
          />
        </Grid>
        <Grid size={12}>
          <Grid container>
            <Grid></Grid>
            <Grid sx={DotSize} size="grow">
              <Dot color="warning" size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Mới
              </Typography>
            </Grid>
            <Grid sx={ExpenseSize}>22</Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid container>
            <Grid></Grid>
            <Grid sx={DotSize} size="grow">
              <Dot color="success" size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Sẵn sàng
              </Typography>
            </Grid>
            <Grid sx={ExpenseSize}>50</Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid container>
            <Grid></Grid>
            <Grid sx={DotSize} size="grow">
              <Dot color="error" size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Đã kiểm tra chéo
              </Typography>
            </Grid>
            <Grid sx={ExpenseSize}>25</Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Grid container>
            <Grid></Grid>
            <Grid sx={DotSize} size="grow">
              <Dot sx={{ bgcolor: theme.palette.primary.main }} size={12} />
              <Typography variant="subtitle1" color="text.secondary">
                Đã trích xuất
              </Typography>
            </Grid>
            <Grid sx={ExpenseSize}>94</Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
}
