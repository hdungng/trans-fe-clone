import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| BASIC ORDER - COSTS ||============================== //

export default function Costs() {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Chi phí
      </Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Tổng cước biển + EBS (chưa VAT)</InputLabel>
            <TextField required id="seaFreight" name="seaFreight" placeholder="Tổng cước biển + EBS (chưa VAT)" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí từ nhà máy đến cảng</InputLabel>
            <TextField required id="factoryToPort" name="factoryToPort" placeholder="Chi phí từ nhà máy đến cảng" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí thuê kho tại cảng</InputLabel>
            <TextField required id="portStorage" name="portStorage" placeholder="Chi phí thuê kho tại cảng" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Trucking từ kho ra cảng (chưa VAT)</InputLabel>
            <TextField required id="trucking" name="trucking" placeholder="Trucking từ kho ra cảng (chưa VAT)" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí địa phương - Local charge (chưa VAT)</InputLabel>
            <TextField required id="localCharge" name="localCharge" placeholder="Chi phí địa phương - Local charge (chưa VAT)" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí hạ sớm</InputLabel>
            <TextField required id="earlyDropFee" name="earlyDropFee" placeholder="Phí hạ sớm" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí xếp dỡ tại cảng (THC)</InputLabel>
            <TextField required id="thcFee" name="thcFee" placeholder="Phí xếp dỡ tại cảng (THC)" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí chì</InputLabel>
            <TextField required id="sealFee" name="sealFee" placeholder="Phí chì" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí cơ sở hạ tầng</InputLabel>
            <TextField required id="infrastructureFee" name="infrastructureFee" placeholder="Phí cơ sở hạ tầng" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí hải quan giám sát</InputLabel>
            <TextField required id="customsSupervisionFee" name="customsSupervisionFee" placeholder="Phí hải quan giám sát" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí hun trùng theo cont</InputLabel>
            <TextField required id="fumigationPerContainer" name="fumigationPerContainer" placeholder="Phí hun trùng theo cont" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí hun trùng theo lô</InputLabel>
            <TextField required id="fumigationPerBatch" name="fumigationPerBatch" placeholder="Phí hun trùng theo lô" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí kiểm dịch</InputLabel>
            <TextField required id="quarantineFee" name="quarantineFee" placeholder="Phí kiểm dịch" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí T/T</InputLabel>
            <TextField required id="ttFee" name="ttFee" placeholder="Phí T/T" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí C/O</InputLabel>
            <TextField required id="coFee" name="coFee" placeholder="Phí C/O" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>DO</InputLabel>
            <TextField required id="doFee" name="doFee" placeholder="DO" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí pallet</InputLabel>
            <TextField required id="palletFee" name="palletFee" placeholder="Phí pallet" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí bao jumbo</InputLabel>
            <TextField required id="jumboBagFee" name="jumboBagFee" placeholder="Phí bao jumbo" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>AMS</InputLabel>
            <TextField required id="amsFee" name="amsFee" placeholder="AMS" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí đội hải quan</InputLabel>
            <TextField required id="customsTeamFee" name="customsTeamFee" placeholder="Phí đội hải quan" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Phí đội tiếp nhận HQ</InputLabel>
            <TextField required id="customsReceptionFee" name="customsReceptionFee" placeholder="Phí đội tiếp nhận HQ" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí đi thông quan</InputLabel>
            <TextField required id="clearanceFee" name="clearanceFee" placeholder="Chi phí đi thông quan" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí lãi vay</InputLabel>
            <TextField required id="loanInterestFee" name="loanInterestFee" placeholder="Chi phí lãi vay" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí lãi vay thuế VAT</InputLabel>
            <TextField required id="vatLoanInterestFee" name="vatLoanInterestFee" placeholder="Chi phí lãi vay thuế VAT" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí chênh lệch tỷ giá</InputLabel>
            <TextField
              required
              id="exchangeRateDifferenceFee"
              name="exchangeRateDifferenceFee"
              placeholder="Chi phí chênh lệch tỷ giá"
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>BIDV thu phí DHL</InputLabel>
            <TextField required id="bidvDhlFee" name="bidvDhlFee" placeholder="BIDV thu phí DHL" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>BIDV thu phí tiền về 0.125%</InputLabel>
            <TextField required id="bidvMoneyReturnFee" name="bidvMoneyReturnFee" placeholder="BIDV thu phí tiền về 0.125%" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí hoàn thuế (3% tổng giá trị hoàn)</InputLabel>
            <TextField required id="taxRefundFee" name="taxRefundFee" placeholder="Chi phí hoàn thuế (3% tổng giá trị hoàn)" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí QC</InputLabel>
            <TextField required id="qcFee" name="qcFee" placeholder="Chi phí QC" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí môi giới</InputLabel>
            <TextField required id="brokerageFee" name="brokerageFee" placeholder="Chi phí môi giới" fullWidth />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Chi phí quản lý DN chung</InputLabel>
            <TextField required id="generalManagementFee" name="generalManagementFee" placeholder="Chi phí quản lý DN chung" fullWidth />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
