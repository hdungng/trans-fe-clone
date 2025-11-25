import SupplierInfoTable from './SupplierInfoTable';
import Typography from '@mui/material/Typography';

// ==============================|| BASIC ORDER - SUPPLIER INFORMATION ||============================== //

export default function SupplierInformation() {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Thông tin nhà cung cấp
      </Typography>
      <SupplierInfoTable />
    </>
  );
}
