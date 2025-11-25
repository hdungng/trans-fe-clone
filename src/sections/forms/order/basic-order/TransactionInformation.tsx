import { AccordionDetails } from '@mui/material';
import { Accordion, AccordionSummary } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CaretDownOutlined } from '@ant-design/icons';
import { useState } from 'react';

// ==============================|| BASIC ORDER - TRANSACTION INFORMATION ||============================== //

export default function TransactionInformation() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Thông tin giao dịch
      </Typography>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<CaretDownOutlined />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6">Thông tin khách hàng</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tên Khách Hàng</InputLabel>
                <TextField required id="customerName" name="customerName" placeholder="Tên Khách Hàng" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Địa Điểm Nhận Hàng</InputLabel>
                <TextField required id="deliveryLocation" name="deliveryLocation" placeholder="Địa Điểm Nhận Hàng" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tên Nước Nhập Khẩu</InputLabel>
                <TextField required id="importCountry" name="importCountry" placeholder="Tên Nước Nhập Khẩu" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tên Hàng Hóa</InputLabel>
                <TextField required id="productName" name="productName" placeholder="Tên Hàng Hóa" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Phương Thức Giao Hàng</InputLabel>
                <TextField required id="deliveryMethod" name="deliveryMethod" placeholder="Phương Thức Giao Hàng" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Phương Thức Thanh Toán</InputLabel>
                <TextField required id="paymentMethod" name="paymentMethod" placeholder="Phương Thức Thanh Toán" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Đồng Tiền Thanh Toán</InputLabel>
                <TextField required id="currency" name="currency" placeholder="Đồng Tiền Thanh Toán" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Đơn Giá</InputLabel>
                <TextField required id="unitPrice" name="unitPrice" placeholder="Đơn Giá" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Đơn Vị</InputLabel>
                <TextField required id="unit" name="unit" placeholder="Đơn Vị" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Khối Lượng</InputLabel>
                <TextField required id="weight" name="weight" placeholder="Khối Lượng" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Loại Chất Lượng</InputLabel>
                <TextField required id="qualityType" name="qualityType" placeholder="Loại Chất Lượng" fullWidth />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<CaretDownOutlined />} aria-controls="panel2-content" id="panel2-header">
          <Typography variant="h6">Tỉ giá</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tỉ Giá Mua Vào USD/VND</InputLabel>
                <TextField required id="buyExchangeRate" name="buyExchangeRate" placeholder="Tỉ Giá Mua Vào USD/VND" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tỉ Giá Bán Ra USD/VND</InputLabel>
                <TextField required id="sellExchangeRate" name="sellExchangeRate" placeholder="Tỉ Giá Bán Ra USD/VND" fullWidth />
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<CaretDownOutlined />} aria-controls="panel3-content" id="panel3-header">
          <Typography variant="h6">Phương thức giao hàng</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Phương Thức Vận Chuyển</InputLabel>
                <TextField required id="transportMethod" name="transportMethod" placeholder="Phương Thức Vận Chuyển" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Phương Thức Đóng Hàng</InputLabel>
                <TextField required id="packingMethod" name="packingMethod" placeholder="Phương Thức Đóng Hàng" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Trọng Lượng Trên 1 Cont</InputLabel>
                <TextField required id="weightPerContainer" name="weightPerContainer" placeholder="Trọng Lượng Trên 1 Cont" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tổng Số Cont Tạm Tính</InputLabel>
                <TextField required id="totalContainers" name="totalContainers" placeholder="Tổng Số Cont Tạm Tính" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tổng Số Booking Tạm Tính</InputLabel>
                <TextField required id="totalBookings" name="totalBookings" placeholder="Tổng Số Booking Tạm Tính" fullWidth />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControlLabel
                control={<Checkbox color="primary" name="saveDetails" value="yes" />}
                label="Save these details for future orders"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
