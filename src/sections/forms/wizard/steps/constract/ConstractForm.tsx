// material-ui
import { Divider, FormControl, FormHelperText, MenuItem, Select, useTheme } from '@mui/material';
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
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// third-party
import { DatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import * as yup from 'yup';

// ==============================|| BASIC WIZARD - contracts ||============================== //

// Define the form values interface
interface ContractFormValues {
  contractNumber: string;
  taxCode: string;
  sellerName: string;
  sellerAddress: string;
  contractDate: Date;
  paymentTerms: string;
  deliveryTerms: string;
  contractDetails: string;
  allowableError: string;
  deliveryPort: string;
  receiptPort: string;
  currency: string;
  price: string;
  unit: string;
  totalVolume: string;
  saveContract: boolean;
  // Bank information
  sellerBeneficiary: string;
  sellerBankName: string;
  sellerBankAddress: string;
  sellerBankAccount: string;
  sellerSwiftCode: string;
  buyerBeneficiary: string;
  buyerBankName: string;
  buyerBankAddress: string;
  buyerBankAccount: string;
  buyerSwiftCode: string;
  // LC information
  lcNumber: string;
  lcDate: Date;
}

// Props interface
interface ContractsFormProps {
  initialValues?: ContractFormValues;
}

const validationSchema = yup.object({
  // contractNumber: yup.string().required('Số hợp đồng là bắt buộc'),
  // taxCode: yup.string().required('Mã số thuế là bắt buộc'),
  // sellerName: yup.string().required('Tên bên bán là bắt buộc'),
  // sellerAddress: yup.string().required('Địa chỉ bên bán là bắt buộc'),
  // contractDate: yup.date().required('Ngày kí hợp đồng là bắt buộc'),
  // paymentTerms: yup.string().required('Điều kiện thanh toán là bắt buộc'),
  // deliveryTerms: yup.string().required('Điều kiện giao hàng là bắt buộc'),
  // contractDetails: yup.string(),
  // allowableError: yup.string().required('Sai số cho phép là bắt buộc'),
  // deliveryPort: yup.string().required('Cảng giao hàng là bắt buộc'),
  // receiptPort: yup.string().required('Cảng nhận hàng là bắt buộc'),
  // currency: yup.string().required('Đồng tiền thanh toán là bắt buộc'),
  // price: yup.string().required('Đơn giá là bắt buộc'),
  // unit: yup.string().required('Đơn vị là bắt buộc'),
  // totalVolume: yup.string().required('Tổng khối lượng là bắt buộc'),
  // // Bank information validation
  // sellerBeneficiary: yup.string().required('Tên người thụ hưởng bên bán là bắt buộc'),
  // sellerBankName: yup.string().required('Tên ngân hàng bên bán là bắt buộc'),
  // sellerBankAddress: yup.string().required('Địa chỉ ngân hàng bên bán là bắt buộc'),
  // sellerBankAccount: yup.string().required('Số tài khoản ngân hàng bên bán là bắt buộc'),
  // sellerSwiftCode: yup.string().required('Swift Code bên bán là bắt buộc'),
  // buyerBeneficiary: yup.string().required('Tên người thụ hưởng bên mua là bắt buộc'),
  // buyerBankName: yup.string().required('Tên ngân hàng bên mua là bắt buộc'),
  // buyerBankAddress: yup.string().required('Địa chỉ ngân hàng bên mua là bắt buộc'),
  // buyerBankAccount: yup.string().required('Số tài khoản ngân hàng bên mua là bắt buộc'),
  // buyerSwiftCode: yup.string().required('Swift Code bên mua là bắt buộc'),
  // lcNumber: yup.string().required('Số LC là bắt buộc'),
  // lcDate: yup.date().nullable().required('Ngày tạo LC là bắt buộc')
});

const ContractsForm = forwardRef(({ initialValues }: ContractsFormProps, ref) => {
  const theme = useTheme();
  
  const formik = useFormik<ContractFormValues>({
    initialValues: {
      contractNumber: '',
      taxCode: '',
      sellerName: '',
      sellerAddress: '',
      contractDate: new Date(),
      paymentTerms: '',
      deliveryTerms: '',
      contractDetails: '',
      allowableError: '',
      deliveryPort: '',
      receiptPort: '',
      currency: '',
      price: '',
      unit: '',
      totalVolume: '',
      saveContract: false,
      // Bank information
      sellerBeneficiary: '',
      sellerBankName: '',
      sellerBankAddress: '',
      sellerBankAccount: '',
      sellerSwiftCode: '',
      buyerBeneficiary: '',
      buyerBankName: '',
      buyerBankAddress: '',
      buyerBankAccount: '',
      buyerSwiftCode: '',
      // LC information
      lcNumber: '',
      lcDate: new Date()
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

  // Expose formik methods to parent component through ref
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formik.handleSubmit();
      return formik.validateForm();
    },
    getValues: () => {
      return formik.values;
    },
    setValues: (values: ContractFormValues) => {
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
        Hợp đồng
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Số hợp đồng</InputLabel>
              <TextField 
                id="contractNumber" 
                name="contractNumber" 
                placeholder="2505/SW-MKS/01" 
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
            <InputLabel>Mã số thuế</InputLabel>
              <TextField 
                id="taxCode" 
                name="taxCode" 
                placeholder="0318950116" 
                fullWidth 
                value={formik.values.taxCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.taxCode && Boolean(formik.errors.taxCode)}
                helperText={formik.touched.taxCode && formik.errors.taxCode}
              />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Tên bên bán</InputLabel>
              <TextField 
                id="sellerName" 
                name="sellerName" 
                placeholder="Nhập tên bên bán" 
                fullWidth 
                value={formik.values.sellerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
                helperText={formik.touched.sellerName && formik.errors.sellerName}
              />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel>Địa chỉ bên bán</InputLabel>
              <TextField 
                id="sellerAddress" 
                name="sellerAddress" 
                placeholder="54, 6th Street, CityLand Residential Area, Ward 5, Go Vap District, Ho Chi Minh City, Vietnam" 
                fullWidth 
                value={formik.values.sellerAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerAddress && Boolean(formik.errors.sellerAddress)}
                helperText={formik.touched.sellerAddress && formik.errors.sellerAddress}
              />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="contractDate">Ngày kí hợp đồng</InputLabel>
              <DatePicker
                value={formik.values.contractDate}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  formik.setFieldValue('contractDate', newValue);
                }}
                onAccept={(newValue) => {
                  formik.setFieldValue('contractDate', newValue);
                  formik.setFieldTouched('contractDate', true);
                }}
                slotProps={{
                  textField: {
                    id: 'contractDate',
                    name: 'contractDate',
                    size: 'small',  
                    fullWidth: true,
                    error: formik.touched.contractDate && Boolean(formik.errors.contractDate),
                    helperText: formik.touched.contractDate && formik.errors.contractDate ? 
                      String(formik.errors.contractDate) : undefined,
                    placeholder: "Chọn ngày kí hợp đồng",
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
                <InputLabel>Điều kiện thanh toán</InputLabel>
                <TextField 
                  id="paymentTerms" 
                  name="paymentTerms" 
                  placeholder="Nhập điều kiện thanh toán" 
                  fullWidth 
                  value={formik.values.paymentTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.paymentTerms && Boolean(formik.errors.paymentTerms)}
                  helperText={formik.touched.paymentTerms && formik.errors.paymentTerms}
                />
              </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Điều kiện giao hàng</InputLabel>
                <TextField 
                  id="deliveryTerms" 
                  name="deliveryTerms" 
                  placeholder="Nhập điều kiện giao hàng" 
                  fullWidth 
                  value={formik.values.deliveryTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.deliveryTerms && Boolean(formik.errors.deliveryTerms)}
                  helperText={formik.touched.deliveryTerms && formik.errors.deliveryTerms}
                />
              </Stack>  
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Chi tiết hợp đồng</InputLabel>
                <Box sx={{ 
                  '.ql-container': {
                    height: '150px',
                    border: formik.touched.contractDetails && Boolean(formik.errors.contractDetails) ? 
                      `1px solid ${theme.palette.error.main}` : 
                      `1px solid ${theme.palette.grey['A800']}`,
                    borderTop: 'none',
                    borderBottomLeftRadius: '4px',
                    borderBottomRightRadius: '4px',
                  },
                  '.ql-toolbar': {
                    border: formik.touched.contractDetails && Boolean(formik.errors.contractDetails) ? 
                      `1px solid ${theme.palette.error.main}` : 
                      `1px solid ${theme.palette.grey['A800']}`,
                    borderBottom: 'none',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                  }
                }}>
                  <ReactQuill 
                    value={formik.values.contractDetails}
                    onChange={(content) => formik.setFieldValue('contractDetails', content)}
                    onBlur={() => formik.setFieldTouched('contractDetails', true)}
                  />
                </Box>
                {formik.touched.contractDetails && formik.errors.contractDetails && (
                  <FormHelperText error>{formik.errors.contractDetails}</FormHelperText>
                )}
              </Stack>  
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Sai số cho phép</InputLabel>
                <TextField 
                  id="allowableError" 
                  name="allowableError" 
                  placeholder="Nhập sai số cho phép" 
                  fullWidth 
                  value={formik.values.allowableError}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.allowableError && Boolean(formik.errors.allowableError)}
                  helperText={formik.touched.allowableError && formik.errors.allowableError}
                />
              </Stack>  
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Cảng giao hàng</InputLabel>
                <TextField 
                  id="deliveryPort" 
                  name="deliveryPort" 
                  placeholder="Nhập cảng giao hàng" 
                  fullWidth 
                  value={formik.values.deliveryPort}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.deliveryPort && Boolean(formik.errors.deliveryPort)}
                  helperText={formik.touched.deliveryPort && formik.errors.deliveryPort}
                />
              </Stack>  
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Cảng nhận hàng</InputLabel>
                <TextField 
                  id="receiptPort" 
                  name="receiptPort" 
                  placeholder="Nhập cảng nhận hàng" 
                  fullWidth 
                  value={formik.values.receiptPort}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.receiptPort && Boolean(formik.errors.receiptPort)}
                  helperText={formik.touched.receiptPort && formik.errors.receiptPort}
                />
              </Stack>  
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Đồng tiền thanh toán</InputLabel>
                <FormControl fullWidth>
                  <Select
                    name={`currency`}
                    value={formik.values.currency}
                    displayEmpty
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.currency && Boolean(formik.errors.currency)}
                >
                  <MenuItem value="" disabled>Chọn đồng tiền thanh toán</MenuItem>
                  {[
                    {id: 1, value: 'USD'},
                    {id: 2, value: 'EUR'},
                    {id: 3, value: 'GBP'},
                    {id: 4, value: 'JPY'},
                    {id: 5, value: 'CNY'},
                    {id: 6, value: 'VND'},
                  ].map((price) => (
                    <MenuItem key={price.id} value={price.value}>
                      {price.value}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.currency && formik.errors.currency && (
                  <FormHelperText error>{formik.errors.currency}</FormHelperText>
                )}
              </FormControl>
              </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Đơn giá</InputLabel>
                <TextField 
                  id="price" 
                  name="price" 
                  placeholder="Nhập đơn giá" 
                  fullWidth 
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Stack>  
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                {/* <InputLabel>Đơn vị</InputLabel>
                  <TextField 
                    id="unit" 
                    name="unit" 
                    placeholder="Nhập đơn vị" 
                    fullWidth 
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                    helperText={formik.touched.unit && formik.errors.unit}
                /> */}
                <InputLabel>Đơn vị</InputLabel>
                <FormControl fullWidth>
                  <Select
                    name={`unit`}
                    value={formik.values.unit}
                    displayEmpty
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                  >
                    <MenuItem value="" disabled>Chọn đơn vị</MenuItem>
                    {[
                      {id: 1, value: 'Tấn'},
                    ].map((price) => (
                      <MenuItem key={price.id} value={price.value}>
                        {price.value}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.unit && formik.errors.unit && (
                    <FormHelperText error>{formik.errors.unit}</FormHelperText>
                  )}
                </FormControl>
              </Stack>  
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel>Tổng khối lượng</InputLabel>
                <TextField 
                  id="totalVolume" 
                  name="totalVolume" 
                  placeholder="Nhập tổng khối lượng" 
                  fullWidth 
                  value={formik.values.totalVolume}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.totalVolume && Boolean(formik.errors.totalVolume)}
                  helperText={formik.touched.totalVolume && formik.errors.totalVolume}
                />
              </Stack>  
        </Grid>
        <Grid size={12}>
          <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  name="saveContract" 
                  checked={formik.values.saveContract}
                  onChange={formik.handleChange}
                />
              }
              label="Lưu hợp đồng này để sử dụng cho lần sau"
            />
          </Grid>
          
          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
              Thông tin về LC
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Số LC</InputLabel>
              <TextField 
                id="lcNumber" 
                name="lcNumber" 
                placeholder="Nhập số LC" 
                fullWidth 
                value={formik.values.lcNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lcNumber && Boolean(formik.errors.lcNumber)}
                helperText={formik.touched.lcNumber && formik.errors.lcNumber}
              />
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel htmlFor="lcDate">Ngày tạo LC</InputLabel>
              <DatePicker
                value={formik.values.lcDate}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  formik.setFieldValue('lcDate', newValue);
                }}
                onAccept={(newValue) => {
                  formik.setFieldValue('lcDate', newValue);
                  formik.setFieldTouched('lcDate', true);
                }}
                slotProps={{
                  textField: {
                    id: 'lcDate',
                    name: 'lcDate',
                    fullWidth: true,
                    size: 'small',  
                    error: formik.touched.lcDate && Boolean(formik.errors.lcDate),
                    helperText: formik.touched.lcDate && formik.errors.lcDate ? 
                      String(formik.errors.lcDate) : undefined,
                    placeholder: "Chọn ngày tạo LC",
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
          
          <Grid size={12}>
            <Divider />
          </Grid>

          <Grid size={12}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
              Thông tin ngân hàng
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên người thụ hưởng bên bán</InputLabel>
              <TextField 
                id="sellerBeneficiary" 
                name="sellerBeneficiary" 
                placeholder="Nhập tên người thụ hưởng bên bán" 
                fullWidth 
                value={formik.values.sellerBeneficiary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerBeneficiary && Boolean(formik.errors.sellerBeneficiary)}
                helperText={formik.touched.sellerBeneficiary && formik.errors.sellerBeneficiary}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên ngân hàng bên bán</InputLabel>
              <TextField 
                id="sellerBankName" 
                name="sellerBankName" 
                placeholder="Nhập tên ngân hàng bên bán" 
                fullWidth 
                value={formik.values.sellerBankName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerBankName && Boolean(formik.errors.sellerBankName)}
                helperText={formik.touched.sellerBankName && formik.errors.sellerBankName}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Địa chỉ ngân hàng bên bán</InputLabel>
              <TextField 
                id="sellerBankAddress" 
                name="sellerBankAddress" 
                placeholder="Nhập địa chỉ ngân hàng bên bán" 
                fullWidth 
                value={formik.values.sellerBankAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerBankAddress && Boolean(formik.errors.sellerBankAddress)}
                helperText={formik.touched.sellerBankAddress && formik.errors.sellerBankAddress}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Số tài khoản ngân hàng bên bán</InputLabel>
              <TextField 
                id="sellerBankAccount" 
                name="sellerBankAccount" 
                placeholder="Nhập số tài khoản ngân hàng bên bán" 
                fullWidth 
                value={formik.values.sellerBankAccount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerBankAccount && Boolean(formik.errors.sellerBankAccount)}
                helperText={formik.touched.sellerBankAccount && formik.errors.sellerBankAccount}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Swift Code bên bán</InputLabel>
              <TextField 
                id="sellerSwiftCode" 
                name="sellerSwiftCode" 
                placeholder="Nhập Swift Code bên bán" 
                fullWidth 
                value={formik.values.sellerSwiftCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sellerSwiftCode && Boolean(formik.errors.sellerSwiftCode)}
                helperText={formik.touched.sellerSwiftCode && formik.errors.sellerSwiftCode}
              />
            </Stack>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên người thụ hưởng bên mua</InputLabel>
              <TextField 
                id="buyerBeneficiary" 
                name="buyerBeneficiary" 
                placeholder="Nhập tên người thụ hưởng bên mua" 
                fullWidth 
                value={formik.values.buyerBeneficiary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.buyerBeneficiary && Boolean(formik.errors.buyerBeneficiary)}
                helperText={formik.touched.buyerBeneficiary && formik.errors.buyerBeneficiary}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Tên ngân hàng bên mua</InputLabel>
              <TextField 
                id="buyerBankName" 
                name="buyerBankName" 
                placeholder="Nhập tên ngân hàng bên mua" 
                fullWidth 
                value={formik.values.buyerBankName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.buyerBankName && Boolean(formik.errors.buyerBankName)}
                helperText={formik.touched.buyerBankName && formik.errors.buyerBankName}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, lg: 12 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Địa chỉ ngân hàng bên mua</InputLabel>
              <TextField 
                id="buyerBankAddress" 
                name="buyerBankAddress" 
                placeholder="Nhập địa chỉ ngân hàng bên mua" 
                fullWidth 
                value={formik.values.buyerBankAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.buyerBankAddress && Boolean(formik.errors.buyerBankAddress)}
                helperText={formik.touched.buyerBankAddress && formik.errors.buyerBankAddress}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Số tài khoản ngân hàng bên mua</InputLabel>
              <TextField 
                id="buyerBankAccount" 
                name="buyerBankAccount" 
                placeholder="Nhập số tài khoản ngân hàng bên mua" 
                fullWidth 
                value={formik.values.buyerBankAccount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.buyerBankAccount && Boolean(formik.errors.buyerBankAccount)}
                helperText={formik.touched.buyerBankAccount && formik.errors.buyerBankAccount}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Stack sx={{ gap: 1 }}>
              <InputLabel>Swift Code bên mua</InputLabel>
              <TextField 
                id="buyerSwiftCode" 
                name="buyerSwiftCode" 
                placeholder="Nhập Swift Code bên mua" 
                fullWidth 
                value={formik.values.buyerSwiftCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.buyerSwiftCode && Boolean(formik.errors.buyerSwiftCode)}
                helperText={formik.touched.buyerSwiftCode && formik.errors.buyerSwiftCode}
              />
            </Stack>
          </Grid>
          <Grid size={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  color="primary" 
                  name="saveContract" 
                  checked={formik.values.saveContract}
                  onChange={formik.handleChange}
                />
              }
              label="Lưu ngân hàng này để sử dụng cho lần sau"
          />
        </Grid>
      </Grid>
      </form>
    </LocalizationProvider>
  );
});

export default ContractsForm;
