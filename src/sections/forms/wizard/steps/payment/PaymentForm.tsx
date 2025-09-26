// material-ui
import { CalendarOutlined } from '@ant-design/icons';
import { 
  FormControl, 
  FormHelperText, 
  InputAdornment, 
  MenuItem, 
  Select, 
  useTheme,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider, Button } from '@mui/material';
import { PlusOutlined as AddIcon, DeleteOutlined as DeleteIcon } from '@ant-design/icons';

// third-party
import * as yup from 'yup';
import { useFormik, FormikErrors } from 'formik';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

// ==============================|| PAYMENT FORM - ADVANCE PAYMENT REQUESTS ||============================== //

// Define factory payment item interface
interface FactoryPaymentType {
  factoryName: string;
  quantity: string;
  price: string;
  amount: string;
}

// Define the form values interface
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
interface PaymentFormProps {
  initialValues?: PaymentFormValues;
}

const validationSchema = yup.object({
  // contractNumber: yup.string().required('Số hợp đồng là bắt buộc'),
  // bookingNumber: yup.string().required('Số booking là bắt buộc'),
  // advanceDate: yup.date().nullable().required('Ngày đề nghị tạm ứng là bắt buộc'),
  // paymentPurpose: yup.string().required('Mục đích tạm ứng là bắt buộc'),
  // factoryPayments: yup.array().of(
  //   yup.object().shape({
  //     factoryName: yup.string().required('Tên xưởng là bắt buộc'),
  //     quantity: yup.string().required('Số lượng là bắt buộc'),
  //     price: yup.string().required('Đơn giá là bắt buộc'),
  //   })
  // )
});

const PaymentForm = forwardRef(({ initialValues }: PaymentFormProps, ref) => {
  const theme = useTheme();
  
  const formik = useFormik<PaymentFormValues>({
    initialValues: initialValues || {
      contractNumber: '',
      bookingNumber: '',
      advanceDate: new Date(),
      paymentPurpose: '',
      factoryPayments: [
        {
          factoryName: '',
          quantity: '',
          price: '',
          amount: '0'
        }
      ],
      totalQuantity: '0',
      totalAmount: '0',
      notes: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  // Update form values when initialValues prop changes
  useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    }
  }, [initialValues]);

  // Available factories for dropdown (would come from API in real app)
  const availableFactories = [
    { id: 1, name: 'Xưởng A' },
    { id: 2, name: 'Xưởng B' },
    { id: 3, name: 'Xưởng C' },
    { id: 4, name: 'Xưởng D' }
  ];

  // Available prices (would come from API in real app)
  const availablePrices = [
    { id: 1, value: '100000' },
    { id: 2, value: '200000' },
    { id: 3, value: '300000' },
    { id: 4, value: '400000' }
  ];

  // Calculate amount when quantity or price changes
  useEffect(() => {
    const updatedPayments = formik.values.factoryPayments.map(payment => {
      const quantity = Number(payment.quantity) || 0;
      const price = Number(payment.price) || 0;
      const amount = (quantity * price).toString();
      return { ...payment, amount };
    });
    
    formik.setFieldValue('factoryPayments', updatedPayments);
  }, [formik.values.factoryPayments.map(p => p.quantity + p.price).join(',')]);

  // Calculate totals when factoryPayments change
  useEffect(() => {
    const payments = formik.values.factoryPayments;
    let totalQty = 0;
    let totalAmt = 0;
    
    // Calculate total quantity and amount
    payments.forEach(payment => {
      totalQty += Number(payment.quantity) || 0;
      totalAmt += Number(payment.amount) || 0;
    });
    
    formik.setFieldValue('totalQuantity', totalQty.toString());
    formik.setFieldValue('totalAmount', totalAmt.toString());
  }, [formik.values.factoryPayments]);

  // Add a new factory payment row
  const handleAddFactoryPayment = () => {
    formik.setFieldValue('factoryPayments', [
      ...formik.values.factoryPayments,
      {
        factoryName: '',
        quantity: '',
        price: '',
        amount: '0'
      }
    ]);
  };

  // Remove a factory payment row
  const handleRemoveFactoryPayment = (index: number) => {
    if (formik.values.factoryPayments.length > 1) {
      const updatedPayments = [...formik.values.factoryPayments];
      updatedPayments.splice(index, 1);
      formik.setFieldValue('factoryPayments', updatedPayments);
    }
  };

  // Format currency
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value));
  };

  // Helper function to safely access nested error fields
  const getNestedErrorMessage = (index: number, field: keyof FactoryPaymentType) => {
    const error = formik.errors.factoryPayments?.[index];
    if (error && typeof error !== 'string' && error[field]) {
      return String(error[field]);
    }
    return undefined;
  };

  // Helper function to check if a field has an error
  const hasNestedError = (index: number, field: keyof FactoryPaymentType) => {
    const touched = formik.touched.factoryPayments?.[index]?.[field];
    const error = getNestedErrorMessage(index, field);
    return touched && error !== undefined;
  };

  // Expose formik methods to parent component through ref
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formik.handleSubmit();
      return formik.validateForm();
    },
    getValues: () => {
      return formik.values;
    },
    setValues: (values: PaymentFormValues) => {
      formik.setValues(values);
    },
    isValid: () => {
      return formik.isValid;
    }
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Đề nghị tạm ứng
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Hợp đồng</InputLabel>
              <TextField 
                id="contractNumber" 
                name="contractNumber" 
                placeholder="Nhập số hợp đồng" 
                fullWidth 
                value={formik.values.contractNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contractNumber && Boolean(formik.errors.contractNumber)}
                helperText={formik.touched.contractNumber && formik.errors.contractNumber}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Số booking</InputLabel>
              <TextField 
                id="bookingNumber" 
                name="bookingNumber" 
                placeholder="Nhập số booking" 
                fullWidth 
                value={formik.values.bookingNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bookingNumber && Boolean(formik.errors.bookingNumber)}
                helperText={formik.touched.bookingNumber && formik.errors.bookingNumber}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="advanceDate">Ngày đề nghị</InputLabel>
              <DatePicker
                value={formik.values.advanceDate}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  formik.setFieldValue('advanceDate', newValue);
                }}
                onAccept={(newValue) => {
                  formik.setFieldValue('advanceDate', newValue);
                  formik.setFieldTouched('advanceDate', true);
                }}
                slotProps={{
                  textField: {
                    id: 'advanceDate',
                    name: 'advanceDate',
                    size: 'small',
                    fullWidth: true,
                    error: formik.touched.advanceDate && Boolean(formik.errors.advanceDate),
                    helperText: formik.touched.advanceDate && formik.errors.advanceDate ? 
                      String(formik.errors.advanceDate) : undefined,
                    placeholder: "Chọn ngày đề nghị",
                    sx: {
                      '& .MuiInputBase-root': {
                        height: '40px'
                      }
                    }
                  }
                }}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Mục đích tạm ứng</InputLabel>
              <TextField 
                id="paymentPurpose" 
                name="paymentPurpose" 
                placeholder="Nhập mục đích tạm ứng" 
                fullWidth 
                multiline
                rows={2}
                value={formik.values.paymentPurpose}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.paymentPurpose && Boolean(formik.errors.paymentPurpose)}
                helperText={formik.touched.paymentPurpose && formik.errors.paymentPurpose}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 3 }} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Danh sách xưởng và đơn giá
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={handleAddFactoryPayment}
              >
                Thêm xưởng
              </Button>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="factory payments table">
                <TableHead sx={{ bgcolor: theme.palette.secondary.lighter }}>
                  <TableRow>
                    <TableCell sx={{ color: theme.palette.secondary.dark }}>STT</TableCell>
                    <TableCell sx={{ color: theme.palette.secondary.dark }}>Tên Xưởng/nhà máy</TableCell>
                    <TableCell sx={{ color: theme.palette.secondary.dark }}>Số lượng</TableCell>
                    <TableCell sx={{ color: theme.palette.secondary.dark }}>Đơn giá</TableCell>
                    <TableCell sx={{ color: theme.palette.secondary.dark }}>Thành tiền</TableCell>
                    <TableCell sx={{ color: theme.palette.secondary.dark }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formik.values.factoryPayments.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <Select
                            name={`factoryPayments[${index}].factoryName`}
                            value={payment.factoryName}
                            displayEmpty
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={hasNestedError(index, 'factoryName')}
                          >
                            <MenuItem value="" disabled>Chọn xưởng</MenuItem>
                            {availableFactories.map((factory) => (
                              <MenuItem key={factory.id} value={factory.name}>
                                {factory.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {hasNestedError(index, 'factoryName') && (
                            <FormHelperText error>
                              {getNestedErrorMessage(index, 'factoryName')}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          name={`factoryPayments[${index}].quantity`}
                          type="number"
                          value={payment.quantity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          fullWidth
                          error={hasNestedError(index, 'quantity')}
                          helperText={getNestedErrorMessage(index, 'quantity')}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <Select
                            name={`factoryPayments[${index}].price`}
                            value={payment.price}
                            displayEmpty
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={hasNestedError(index, 'price')}
                          >
                            <MenuItem value="" disabled>Chọn đơn giá</MenuItem>
                            {availablePrices.map((price) => (
                              <MenuItem key={price.id} value={price.value}>
                                {formatCurrency(price.value)}
                              </MenuItem>
                            ))}
                          </Select>
                          {hasNestedError(index, 'price') && (
                            <FormHelperText error>
                              {getNestedErrorMessage(index, 'price')}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell>
                        {formik.values.factoryPayments.length > 1 && (
                          <Tooltip title="Xóa">
                            <IconButton 
                              color="error"
                              onClick={() => handleRemoveFactoryPayment(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                    <TableCell colSpan={2} align="right">
                      <Typography variant="subtitle1" fontWeight="bold">Tổng cộng:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">{formik.values.totalQuantity}</Typography>
                    </TableCell>
                    <TableCell />
                    <TableCell>
                      <Typography fontWeight="bold">{formatCurrency(formik.values.totalAmount)}</Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Ghi chú</InputLabel>
              <TextField 
                id="notes" 
                name="notes" 
                placeholder="Nhập ghi chú" 
                multiline
                rows={3}
                fullWidth 
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
});

export default PaymentForm;
