import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| BASIC ORDER - ANALYSIS SUMMARY ||============================== //

export default function AnalysisSummary() {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Tổng hợp phân tích
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Tổng doanh thu theo hợp đồng (chưa VAT)</InputLabel>
            <TextField required id="totalRevenue" name="totalRevenue" placeholder="Tổng doanh thu theo hợp đồng (chưa VAT)" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Điểm hòa vốn/giá bán min (chưa VAT)</InputLabel>
            <TextField required id="breakEvenPoint" name="breakEvenPoint" placeholder="Điểm hòa vốn/giá bán min (chưa VAT)" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Lợi nhuận kinh doanh thực (đã tính CPTC + CPQL)</InputLabel>
            <TextField
              required
              id="actualProfit"
              name="actualProfit"
              placeholder="Lợi nhuận kinh doanh thực (đã tính CPTC + CPQL)"
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Tỷ suất lợi nhuận</InputLabel>
            <TextField required id="profitMargin" name="profitMargin" placeholder="Tỷ suất lợi nhuận" fullWidth />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
