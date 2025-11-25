import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Stack
} from '@mui/material';
import { DeleteOutlined } from '@ant-design/icons';

// Define a proper type for supplier row
interface SupplierRow {
  supplierName: string;
  transportCompanyName: string;
  coatingCompanyName: string;
  area: number;
  mass: number;
  purchasePrice: number;
  totalPrice: number;
  expectedDelivery: string;
  [key: string]: string | number; // Add index signature
}

const SupplierInfoTable: React.FC = () => {
  const [rows, setRows] = useState<SupplierRow[]>([
    {
      supplierName: '',
      transportCompanyName: '',
      coatingCompanyName: '',
      area: 1,
      mass: 0,
      purchasePrice: 0,
      totalPrice: 0,
      expectedDelivery: ''
    }
  ]);

  const handleInputChange = (index: number, field: keyof SupplierRow, value: string | number) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    if (field === 'mass' || field === 'purchasePrice') {
      updatedRows[index].totalPrice = updatedRows[index].mass * updatedRows[index].purchasePrice;
    }
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        supplierName: '',
        transportCompanyName: '',
        coatingCompanyName: '',
        area: 1,
        mass: 0,
        purchasePrice: 0,
        totalPrice: 0,
        expectedDelivery: ''
      }
    ]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const calculateTotal = (field: keyof SupplierRow) => {
    return rows
      .reduce((sum, row) => sum + (typeof row[field] === 'number' ? (row[field] as number) : 0), 0)
      .toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
  };

  const table_head = [
    'Tên nhà cung cấp',
    'Công ty vận chuyển',
    'Công ty phủ',
    'Khu vực',
    'Khối lượng',
    'Giá mua',
    'Thành tiền',
    'Ngày giao hàng dự kiến',
    'Hành động'
  ];

  return (
    <Box>
      {/* Button Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Danh sách nhà cung cấp
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          Thêm dòng
        </Button>
      </Stack>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {table_head.map((head, index) => (
                <TableCell key={index}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    type="text"
                    value={row.supplierName}
                    onChange={(e) => handleInputChange(index, 'supplierName', e.target.value)}
                    placeholder="Tên nhà cung cấp"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={row.transportCompanyName}
                    onChange={(e) => handleInputChange(index, 'transportCompanyName', e.target.value)}
                    placeholder="Công ty vận chuyển"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    value={row.coatingCompanyName}
                    onChange={(e) => handleInputChange(index, 'coatingCompanyName', e.target.value)}
                    placeholder="Công ty phủ"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Select 
                    value={row.area} 
                    onChange={(e) => handleInputChange(index, 'area', Number(e.target.value))} 
                    fullWidth
                  >
                    <MenuItem value={1}>Khu vực 1</MenuItem>
                    <MenuItem value={2}>Khu vực 2</MenuItem>
                    <MenuItem value={3}>Khu vực 3</MenuItem>
                    <MenuItem value={4}>Khu vực 4</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.mass}
                    onChange={(e) => handleInputChange(index, 'mass', Number(e.target.value))}
                    placeholder="1000"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.purchasePrice}
                    onChange={(e) => handleInputChange(index, 'purchasePrice', Number(e.target.value))}
                    placeholder="50000"
                    fullWidth
                  />
                </TableCell>
                <TableCell>{row.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    value={row.expectedDelivery}
                    onChange={(e) => handleInputChange(index, 'expectedDelivery', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteRow(index)}>
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography fontWeight="bold">Tổng:</Typography>
              </TableCell>
              <TableCell>{calculateTotal('mass')}</TableCell>
              <TableCell>{calculateTotal('purchasePrice')}</TableCell>
              <TableCell>{calculateTotal('totalPrice')}</TableCell>
              <TableCell colSpan={2} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SupplierInfoTable;
