import React, { useState, ChangeEvent } from 'react';
import { 
  Grid, 
  Stack, 
  TextField, 
  InputLabel, 
  Box, 
  Button, 
  Typography, 
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
  FormControl,
  InputAdornment,
  useTheme
} from '@mui/material';
import { PlusOutlined as AddIcon, DeleteOutlined as DeleteIcon } from '@ant-design/icons';
import { CalendarOutlined } from '@ant-design/icons';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

interface LoadingPlanListProps {
  products: ProductType[];
  onProductsChange: (products: ProductType[]) => void;
  errors: any;
  touched: any;
}

const LoadingPlanList: React.FC<LoadingPlanListProps> = ({
  products,
  onProductsChange,
  errors,
  touched
}) => {
  const theme = useTheme();

  // Add a new product
  const handleAddProduct = () => {
    const newProducts = [...products, {
      goodsName: '',
      factories: [{
        factoryName: '',
        quantity: '',
        price: '',
        loadingTimeFrom: null,
        loadingTimeTo: null
      }]
    }];
    onProductsChange(newProducts);
  };

  // Remove a product
  const handleRemoveProduct = (productIndex: number) => {
    const newProducts = [...products];
    newProducts.splice(productIndex, 1);
    onProductsChange(newProducts);
  };

  // Update product name
  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, productIndex: number) => {
    const newProducts = [...products];
    newProducts[productIndex].goodsName = event.target.value;
    onProductsChange(newProducts);
  };

  // Add a factory to a product
  const handleAddFactory = (productIndex: number) => {
    const newProducts = [...products];
    newProducts[productIndex].factories.push({
      factoryName: '',
      quantity: '',
      price: '',
      loadingTimeFrom: null,
      loadingTimeTo: null
    });
    onProductsChange(newProducts);
  };

  // Remove a factory from a product
  const handleRemoveFactory = (productIndex: number, factoryIndex: number) => {
    const newProducts = [...products];
    newProducts[productIndex].factories.splice(factoryIndex, 1);
    onProductsChange(newProducts);
  };

  // Update factory data
  const handleFactoryChange = (
    productIndex: number,
    factoryIndex: number,
    field: string,
    value: any
  ) => {
    const newProducts = [...products];
    newProducts[productIndex].factories[factoryIndex] = {
      ...newProducts[productIndex].factories[factoryIndex],
      [field]: value
    };
    onProductsChange(newProducts);
  };

  // Format currency
  const formatCurrency = (value: string) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        {products.map((product, productIndex) => (
          <Box 
            key={productIndex} 
            sx={{ 
              mb: 4,
              position: 'relative'
            }}
          >
            {/* Product header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Grid container>
                <Grid size={{ xs: 12, sm: 8, lg: 9 }}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel>Tên hàng hóa</InputLabel>
                    <TextField
                      name={`products[${productIndex}].goodsName`}
                      placeholder="Nhập tên hàng hóa"
                      fullWidth
                      value={product.goodsName}
                      onChange={(e) => handleProductNameChange(e, productIndex)}
                      error={touched[`products[${productIndex}].goodsName`] && Boolean(errors[`products[${productIndex}].goodsName`])}
                      helperText={touched[`products[${productIndex}].goodsName`] && errors[`products[${productIndex}].goodsName`]}
                    />
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 4, lg: 3 }} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Button 
                        variant="contained"
                        color="error"
                        disabled={products.length === 1}
                        onClick={() => handleRemoveProduct(productIndex)}
                        startIcon={<DeleteIcon />}
                        sx={{
                          minWidth: 40,
                          height: 40,
                          boxShadow: 2,
                          '&:hover': {
                            backgroundColor: '#d32f2f',
                          },
                          '& .MuiButton-startIcon': {
                            margin: 0
                          }
                        }}
                      />
                </Grid>
              </Grid>
            </Box>

            {/* Factories table */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">Danh sách xưởng sản xuất</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddFactory(productIndex)}
                  size="small"
                  sx={{
                    '& .MuiButton-startIcon': {
                      margin: 0
                    }
                  }}
                >
                  Thêm xưởng
                </Button>
              </Box>

              <Paper sx={{ width: '100%', overflow: 'hidden', mb: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="factories table">
                  <TableHead sx={{ bgcolor: theme.palette.secondary.lighter }}>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>STT</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Tên Xưởng/nhà máy</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Số lượng</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Đơn giá</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Thời gian đóng hàng (từ)</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Thời gian đóng hàng (đến)</TableCell>
                      <TableCell sx={{ color: theme.palette.secondary.dark }}>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {product.factories.map((factory, factoryIndex) => (
                      <TableRow key={factoryIndex}>
                        <TableCell>{factoryIndex + 1}</TableCell>
                        <TableCell>
                          <TextField
                            name={`products[${productIndex}].factories[${factoryIndex}].factoryName`}
                            placeholder="Nhập tên xưởng/nhà máy"
                            fullWidth
                            value={factory.factoryName}
                            onChange={(e) => handleFactoryChange(productIndex, factoryIndex, 'factoryName', e.target.value)}
                            error={touched[`products[${productIndex}].factories[${factoryIndex}].factoryName`] && 
                                  Boolean(errors[`products[${productIndex}].factories[${factoryIndex}].factoryName`])}
                            helperText={touched[`products[${productIndex}].factories[${factoryIndex}].factoryName`] && 
                                      errors[`products[${productIndex}].factories[${factoryIndex}].factoryName`]}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`products[${productIndex}].factories[${factoryIndex}].quantity`}
                            placeholder="Nhập số lượng"
                            type="number"
                            fullWidth
                            value={factory.quantity}
                            onChange={(e) => handleFactoryChange(productIndex, factoryIndex, 'quantity', e.target.value)}
                            error={touched[`products[${productIndex}].factories[${factoryIndex}].quantity`] && 
                                  Boolean(errors[`products[${productIndex}].factories[${factoryIndex}].quantity`])}
                            helperText={touched[`products[${productIndex}].factories[${factoryIndex}].quantity`] && 
                                      errors[`products[${productIndex}].factories[${factoryIndex}].quantity`]}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            name={`products[${productIndex}].factories[${factoryIndex}].price`}
                            placeholder="Nhập đơn giá"
                            type="number"
                            fullWidth
                            value={factory.price}
                            onChange={(e) => handleFactoryChange(productIndex, factoryIndex, 'price', e.target.value)}
                            error={touched[`products[${productIndex}].factories[${factoryIndex}].price`] && 
                                  Boolean(errors[`products[${productIndex}].factories[${factoryIndex}].price`])}
                            helperText={touched[`products[${productIndex}].factories[${factoryIndex}].price`] && 
                                      errors[`products[${productIndex}].factories[${factoryIndex}].price`]}
                          />
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            value={factory.loadingTimeFrom}
                            format="dd/MM/yyyy"
                            onChange={(newValue) => {
                              handleFactoryChange(productIndex, factoryIndex, 'loadingTimeFrom', newValue);
                            }}
                            onAccept={(newValue) => {
                              handleFactoryChange(productIndex, factoryIndex, 'loadingTimeFrom', newValue);
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                size: 'small',
                                name: `products[${productIndex}].factories[${factoryIndex}].loadingTimeFrom`,
                                error: touched[`products[${productIndex}].factories[${factoryIndex}].loadingTimeFrom`] && 
                                      Boolean(errors[`products[${productIndex}].factories[${factoryIndex}].loadingTimeFrom`]),
                                helperText: touched[`products[${productIndex}].factories[${factoryIndex}].loadingTimeFrom`] && 
                                          errors[`products[${productIndex}].factories[${factoryIndex}].loadingTimeFrom`],
                                placeholder: "Chọn thời gian bắt đầu",
                                sx: {
                                  '& .MuiInputBase-root': {
                                    height: '40px'
                                  }
                                }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <DatePicker
                            value={factory.loadingTimeTo}
                            format="dd/MM/yyyy"
                            onChange={(newValue) => {
                              handleFactoryChange(productIndex, factoryIndex, 'loadingTimeTo', newValue);
                            }}
                            onAccept={(newValue) => {
                              handleFactoryChange(productIndex, factoryIndex, 'loadingTimeTo', newValue);
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                size: 'small',
                                name: `products[${productIndex}].factories[${factoryIndex}].loadingTimeTo`,
                                error: touched[`products[${productIndex}].factories[${factoryIndex}].loadingTimeTo`] && 
                                      Boolean(errors[`products[${productIndex}].factories[${factoryIndex}].loadingTimeTo`]),
                                helperText: touched[`products[${productIndex}].factories[${factoryIndex}].loadingTimeTo`] && 
                                          errors[`products[${productIndex}].factories[${factoryIndex}].loadingTimeTo`],
                                placeholder: "Chọn thời gian kết thúc",
                                sx: {
                                  '& .MuiInputBase-root': {
                                    height: '40px'
                                  }
                                }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {product.factories.length > 1 && (
                            <Tooltip title="Xóa">
                              <IconButton 
                                color="error"
                                onClick={() => handleRemoveFactory(productIndex, factoryIndex)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
            
          </Box>
        ))}

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
          sx={{ 
            mt: 2,
            '& .MuiButton-startIcon': {
              margin: 0
            }
          }}
        >
          Thêm hàng hóa
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default LoadingPlanList; 