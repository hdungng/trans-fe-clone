import { Fragment, useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material';

// Define interfaces for form data from previous steps
interface FactoryType {
  factoryName: string;
  quantity: string;
  price: string;
  loadingTimeFrom: Date | null;
  loadingTimeTo: Date | null;
}

interface ProductType {
  goodsName: string;
  factories: FactoryType[];
}

interface ContractFormValues {
  contractNumber: string;
  contractDate: Date | null;
  signDate: Date | null;
  customer: string;
  contractType: string;
  paymentTerms: string;
  deliveryTerms: string;
  currency: string;
}

interface LogisticFormValues {
  bookingNumber: string;
  bookingCode: string;
  containerQuantity: string;
  etaDate: Date | null;
  etdDate: Date | null;
  shipName: string;
  forwarderName: string;
  shippingLineName: string;
  yardDate: Date | null;
  cutoffDate: Date | null;
  region: string;
  portName: string;
  cargoType: string;
  shippingNote: string;
  selectedBookingCode: string;
  products: ProductType[];
  totalQuantity: string;
  totalPrice: string;
  averagePrice: string;
}

interface FactoryPaymentType {
  factoryName: string;
  quantity: string;
  price: string;
  amount: string;
}

interface PaymentFormValues {
  contractNumber: string;
  bookingNumber: string;
  advanceDate: Date | null;
  paymentPurpose: string;
  factoryPayments: FactoryPaymentType[];
  totalQuantity: string;
  totalAmount: string;
  notes: string;
}

// Props interface
interface ReviewProps {
  contractData?: ContractFormValues;
  logisticData?: LogisticFormValues;
  paymentData?: PaymentFormValues;
}

// ==============================|| REVIEW COMPONENT ||============================== //

const Review = ({ contractData, logisticData, paymentData }: ReviewProps) => {
  const theme = useTheme();

  // Format date
  const formatDate = (date: Date | null): string => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (value: string): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value) || 0);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Xác nhận hợp đồng
      </Typography>

      {/* Contract Information */}
      {contractData && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin hợp đồng
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Số hợp đồng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {contractData.contractNumber || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Ngày hợp đồng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(contractData.contractDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Ngày ký:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(contractData.signDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Khách hàng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {contractData.customer || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Loại hợp đồng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {contractData.contractType || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Tiền tệ:</Typography>
              <Typography variant="body2" color="text.secondary">
                {contractData.currency || 'VND'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2">Điều khoản thanh toán:</Typography>
              <Typography variant="body2" color="text.secondary">
                {contractData.paymentTerms || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="subtitle2">Điều khoản giao hàng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {contractData.deliveryTerms || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Logistic Information */}
      {logisticData && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin logistics
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Số Booking:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.bookingNumber || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Code booking:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.bookingCode || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Số lượng cont:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.containerQuantity || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Ngày tàu đến (ETA):</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(logisticData.etaDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Ngày tàu đi (ETD):</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(logisticData.etdDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Tên tàu:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.shipName || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Forwarder:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.forwarderName || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Hãng tàu:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.shippingLineName || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Ngày vào bãi:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(logisticData.yardDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Ngày cutoff:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(logisticData.cutoffDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Khu vực:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.region || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Cảng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.portName || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Loại hàng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {logisticData.cargoType || 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          {/* Loading Plan Products */}
          {logisticData.products && logisticData.products.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Kế hoạch đóng hàng:
              </Typography>
              {logisticData.products.map((product, productIndex) => (
                <Box key={`product-${productIndex}`} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {product.goodsName || `Hàng hóa ${productIndex + 1}`}
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead sx={{ bgcolor: theme.palette.secondary.lighter }}>
                        <TableRow>
                          <TableCell sx={{ color: theme.palette.secondary.dark }}>STT</TableCell>
                          <TableCell sx={{ color: theme.palette.secondary.dark }}>Tên xưởng</TableCell>
                          <TableCell sx={{ color: theme.palette.secondary.dark }}>Số lượng</TableCell>
                          <TableCell sx={{ color: theme.palette.secondary.dark }}>Đơn giá</TableCell>
                          <TableCell sx={{ color: theme.palette.secondary.dark }}>Thời gian đóng hàng (từ)</TableCell>
                          <TableCell sx={{ color: theme.palette.secondary.dark }}>Thời gian đóng hàng (đến)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product.factories.map((factory, factoryIndex) => (
                          <TableRow key={`factory-${factoryIndex}`}>
                            <TableCell>{factoryIndex + 1}</TableCell>
                            <TableCell>{factory.factoryName || 'N/A'}</TableCell>
                            <TableCell>{factory.quantity || '0'}</TableCell>
                            <TableCell>{formatCurrency(factory.price)}</TableCell>
                            <TableCell>{formatDate(factory.loadingTimeFrom)}</TableCell>
                            <TableCell>{formatDate(factory.loadingTimeTo)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2">Tổng số lượng:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {logisticData.totalQuantity || '0'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2">Tổng tiền:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(logisticData.totalPrice)}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2">Đơn giá trung bình:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(logisticData.averagePrice)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      )}

      {/* Payment Information */}
      {paymentData && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Thông tin tạm ứng
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Số hợp đồng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {paymentData.contractNumber || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Số booking:</Typography>
              <Typography variant="body2" color="text.secondary">
                {paymentData.bookingNumber || 'N/A'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Typography variant="subtitle2">Ngày đề nghị tạm ứng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(paymentData.advanceDate)}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2">Mục đích tạm ứng:</Typography>
              <Typography variant="body2" color="text.secondary">
                {paymentData.paymentPurpose || 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          {/* Factory Payments */}
          {paymentData.factoryPayments && paymentData.factoryPayments.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Danh sách xưởng và đơn giá:
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead sx={{ bgcolor: theme.palette.secondary.lighter }}>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>STT</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Tên xưởng</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Số lượng</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Đơn giá</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentData.factoryPayments.map((payment, index) => (
                      <TableRow key={`payment-${index}`}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{payment.factoryName || 'N/A'}</TableCell>
                        <TableCell>{payment.quantity || '0'}</TableCell>
                        <TableCell>{formatCurrency(payment.price)}</TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                      <TableCell colSpan={2} align="right">
                        <Typography variant="subtitle2">Tổng cộng:</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">{paymentData.totalQuantity || '0'}</Typography>
                      </TableCell>
                      <TableCell />
                      <TableCell>
                        <Typography fontWeight="bold">{formatCurrency(paymentData.totalAmount)}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {paymentData.notes && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Ghi chú:</Typography>
              <Typography variant="body2" color="text.secondary">
                {paymentData.notes}
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* Submission notice */}
      <Paper sx={{ p: 2, bgcolor: theme.palette.warning.light, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ color: theme.palette.warning.dark }}>
          Vui lòng kiểm tra kỹ thông tin trước khi gửi. Nhấn nút "Hoàn thành" để xác nhận và lưu hợp đồng.
        </Typography>
      </Paper>
    </>
  );
};

export default Review;
