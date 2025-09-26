// material-ui
import { CalendarOutlined } from '@ant-design/icons';
import { FormControl, FormHelperText, InputAdornment, MenuItem, Select, useTheme } from '@mui/material';
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
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Divider, Button } from '@mui/material';
import { PlusOutlined as AddIcon, DeleteOutlined as DeleteIcon } from '@ant-design/icons';


// third-party
import * as yup from 'yup';
import { useFormik } from 'formik';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

// project imports
import LoadingPlanList from './LoadingPlanList';

// ==============================|| BASIC WIZARD - logistics ||============================== //

// Define factory item interface
interface FactoryType {
  factoryName: string;
  quantity: string;
  price: string;
  loadingTimeFrom: Date | null;
  loadingTimeTo: Date | null;
}

// Define product interface
interface ProductType {
  goodsName: string;
  factories: FactoryType[];
}

// Define the form values interface
interface LogisticFormValues {
  // Thông tin hãng tàu
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
  // Kế hoạch đóng hàng
  selectedBookingCode: string;
  products: ProductType[];
  totalQuantity: string;
  totalPrice: string;
  averagePrice: string;
}

// Props interface
interface LogisticFormProps {
  initialValues?: LogisticFormValues;
}

const validationSchema = yup.object({
//   // Shipping company validation
//   bookingNumber: yup.string().required('Số booking là bắt buộc'),
//   bookingCode: yup.string().required('Code booking là bắt buộc'),
//   // Add other validations as needed
  
//   // Loading plan validation
//   products: yup.array().of(
//     yup.object().shape({
//       goodsName: yup.string().required('Tên hàng hóa là bắt buộc'),
//       factories: yup.array().of(
//         yup.object().shape({
//           factoryName: yup.string().required('Tên xưởng là bắt buộc'),
//           quantity: yup.string().required('Số lượng là bắt buộc'),
//           price: yup.string().required('Đơn giá là bắt buộc'),
//           loadingTimeFrom: yup.date().nullable().required('Thời gian đóng hàng bắt đầu là bắt buộc'),
//           loadingTimeTo: yup.date().nullable().required('Thời gian đóng hàng kết thúc là bắt buộc')
//         })
//       )
//     })
//   )
});

const LogisticForm = forwardRef(({ initialValues }: LogisticFormProps, ref) => {
  const theme = useTheme();
  
  const formik = useFormik<LogisticFormValues>({
    initialValues: {
      // Thông tin hãng tàu
      bookingNumber: '',
      bookingCode: '',
      containerQuantity: '',
      etaDate: new Date(),
      etdDate: new Date(),
      shipName: '',
      forwarderName: '',
      shippingLineName: '',
      yardDate: new Date(),
      cutoffDate: new Date(),
      region: '',
      portName: '',
      cargoType: '',
      shippingNote: '',
      // Kế hoạch đóng hàng
      selectedBookingCode: '',
      products: [
        {
          goodsName: '',
          factories: [
            {
              factoryName: '',
              quantity: '',
              price: '',
              loadingTimeFrom: new Date(),
              loadingTimeTo: new Date()
            }
          ]
        }
      ],
      totalQuantity: '',
      totalPrice: '',
      averagePrice: ''
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

  // Calculate totals when products change
  useEffect(() => {
    const products = formik.values.products;
    let totalQty = 0;
    let totalPrc = 0;
    
    // Calculate total quantity and price from all products and factories
    products.forEach(product => {
      product.factories.forEach(factory => {
        const qty = Number(factory.quantity) || 0;
        const price = Number(factory.price) || 0;
        
        totalQty += qty;
        totalPrc += qty * price;
      });
    });
    
    // Calculate average price
    const avgPrice = totalQty > 0 ? (totalPrc / totalQty) : 0;
    
    formik.setFieldValue('totalQuantity', totalQty.toString());
    formik.setFieldValue('totalPrice', totalPrc.toString());
    formik.setFieldValue('averagePrice', avgPrice.toFixed(2).toString());
  }, [formik.values.products]);

  // Handle products change
  const handleProductsChange = (products: ProductType[]) => {
    formik.setFieldValue('products', products);
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
    setValues: (values: LogisticFormValues) => {
      formik.setValues(values);
    },
    isValid: () => {
      return formik.isValid;
    }
  }));

  return (
   <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
          Thông tin hãng tàu
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Số Booking</InputLabel>
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
              <InputLabel>Code booking</InputLabel>
              <TextField 
                id="bookingCode" 
                name="bookingCode" 
                placeholder="Nhập code booking" 
                fullWidth 
                value={formik.values.bookingCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bookingCode && Boolean(formik.errors.bookingCode)}
                helperText={formik.touched.bookingCode && formik.errors.bookingCode}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Số lượng cont</InputLabel>
              <TextField 
                id="containerQuantity" 
                name="containerQuantity" 
                placeholder="Nhập số lượng cont" 
                fullWidth 
                value={formik.values.containerQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.containerQuantity && Boolean(formik.errors.containerQuantity)}
                helperText={formik.touched.containerQuantity && formik.errors.containerQuantity}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="etaDate">Ngày Tàu Đến bên khách (ETA)</InputLabel>
              <DatePicker
                value={formik.values.etaDate}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  formik.setFieldValue('etaDate', newValue);
                }}
                onAccept={(newValue) => {
                  formik.setFieldValue('etaDate', newValue);
                  formik.setFieldTouched('etaDate', true);
                }}
                slotProps={{
                  textField: {
                    id: 'etaDate',
                    name: 'etaDate',
                    size: 'small',
                    fullWidth: true,
                    error: formik.touched.etaDate && Boolean(formik.errors.etaDate),
                    helperText: formik.touched.etaDate && formik.errors.etaDate ? 
                      String(formik.errors.etaDate) : undefined,
                    placeholder: "Chọn ngày tàu đến",
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

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="etdDate">Ngày Tàu Chạy (ETD)</InputLabel>
              <DatePicker
                value={formik.values.etdDate}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  formik.setFieldValue('etdDate', newValue);
                }}
                onAccept={(newValue) => {
                  formik.setFieldValue('etdDate', newValue);
                  formik.setFieldTouched('etdDate', true);
                }}
                slotProps={{
                  textField: {
                    id: 'etdDate',
                    name: 'etdDate',
                    size: 'small',
                    fullWidth: true,
                    error: formik.touched.etdDate && Boolean(formik.errors.etdDate),
                    helperText: formik.touched.etdDate && formik.errors.etdDate ? 
                      String(formik.errors.etdDate) : undefined,
                    placeholder: "Chọn ngày tàu chạy",
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

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên Tàu</InputLabel>
              <TextField 
                id="shipName" 
                name="shipName" 
                placeholder="Nhập tên tàu" 
                fullWidth 
                value={formik.values.shipName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.shipName && Boolean(formik.errors.shipName)}
                helperText={formik.touched.shipName && formik.errors.shipName}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên Forwarder</InputLabel>
              <TextField 
                id="forwarderName" 
                name="forwarderName" 
                placeholder="Nhập tên forwarder" 
                fullWidth 
                value={formik.values.forwarderName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.forwarderName && Boolean(formik.errors.forwarderName)}
                helperText={formik.touched.forwarderName && formik.errors.forwarderName}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên Shipping Line</InputLabel>
              <TextField 
                id="shippingLineName" 
                name="shippingLineName" 
                placeholder="Nhập tên shipping line" 
                fullWidth 
                value={formik.values.shippingLineName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.shippingLineName && Boolean(formik.errors.shippingLineName)}
                helperText={formik.touched.shippingLineName && formik.errors.shippingLineName}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="yardDate">Ngày hạ bãi công đầu</InputLabel>
              <DatePicker
                value={formik.values.yardDate}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  formik.setFieldValue('yardDate', newValue);
                }}
                onAccept={(newValue) => {
                  formik.setFieldValue('yardDate', newValue);
                  formik.setFieldTouched('yardDate', true);
                }}
                slotProps={{
                  textField: {
                    id: 'yardDate',
                    name: 'yardDate',
                    size: 'small',
                    fullWidth: true,
                    error: formik.touched.yardDate && Boolean(formik.errors.yardDate),
                    helperText: formik.touched.yardDate && formik.errors.yardDate ? 
                      String(formik.errors.yardDate) : undefined,
                    placeholder: "Chọn ngày hạ bãi",
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

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="cutoffDate">Ngày cắt máng</InputLabel>
              <DatePicker
                value={formik.values.cutoffDate}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  formik.setFieldValue('cutoffDate', newValue);
                }}
                onAccept={(newValue) => {
                  formik.setFieldValue('cutoffDate', newValue);
                  formik.setFieldTouched('cutoffDate', true);
                }}
                slotProps={{
                  textField: {
                    id: 'cutoffDate',
                    name: 'cutoffDate',
                    size: 'small',
                    fullWidth: true,
                    error: formik.touched.cutoffDate && Boolean(formik.errors.cutoffDate),
                    helperText: formik.touched.cutoffDate && formik.errors.cutoffDate ? 
                      String(formik.errors.cutoffDate) : undefined,
                    placeholder: "Chọn ngày cắt máng",
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

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Miền/vùng</InputLabel>
              <TextField 
                id="region" 
                name="region" 
                placeholder="Nhập miền/vùng" 
                fullWidth 
                value={formik.values.region}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.region && Boolean(formik.errors.region)}
                helperText={formik.touched.region && formik.errors.region}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên cảng</InputLabel>
              <TextField 
                id="portName" 
                name="portName" 
                placeholder="Nhập tên cảng" 
                fullWidth 
                value={formik.values.portName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.portName && Boolean(formik.errors.portName)}
                helperText={formik.touched.portName && formik.errors.portName}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Loại hàng</InputLabel>
              <TextField 
                id="cargoType" 
                name="cargoType" 
                placeholder="Nhập loại hàng" 
                fullWidth 
                value={formik.values.cargoType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cargoType && Boolean(formik.errors.cargoType)}
                helperText={formik.touched.cargoType && formik.errors.cargoType}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Ghi chú</InputLabel>
              <TextField 
                id="shippingNote" 
                name="shippingNote" 
                placeholder="Nhập ghi chú" 
                multiline
                rows={3}
                fullWidth 
                value={formik.values.shippingNote}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.shippingNote && Boolean(formik.errors.shippingNote)}
                helperText={formik.touched.shippingNote && formik.errors.shippingNote}
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={{ xs: 12 }}>
            <Divider sx={{ mt: 3 }} />
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
          Kế hoạch đóng hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Số/code booking</InputLabel>
              <TextField 
                id="selectedBookingCode" 
                name="selectedBookingCode" 
                placeholder="Chọn code booking" 
                fullWidth 
                value={formik.values.selectedBookingCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.selectedBookingCode && Boolean(formik.errors.selectedBookingCode)}
                helperText={formik.touched.selectedBookingCode && formik.errors.selectedBookingCode}
              />
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Thông tin hàng hóa và xưởng sản xuất
              </Typography>
              <LoadingPlanList 
                products={formik.values.products}
                onProductsChange={handleProductsChange}
                errors={formik.errors}
                touched={formik.touched}
              />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <Divider  />
            <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 2 }}>
              Tổng hợp
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tổng lượng hàng</InputLabel>
              <TextField 
                id="totalQuantity" 
                name="totalQuantity" 
                placeholder="Tổng lượng hàng" 
                fullWidth 
                value={formik.values.totalQuantity}
                disabled
              />
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tổng giá</InputLabel>
              <TextField 
                id="totalPrice" 
                name="totalPrice" 
                placeholder="Tổng giá" 
                fullWidth 
                value={formik.values.totalPrice}
                disabled
              />
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 4, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Đơn giá trung bình/tấn hàng hóa</InputLabel>
              <TextField 
                id="averagePrice" 
                name="averagePrice" 
                placeholder="Đơn giá trung bình" 
                fullWidth 
                value={formik.values.averagePrice}
                disabled
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
});

export default LogisticForm;
