// material-ui
import Grid from '@mui/material/Grid';

// project imports
import BasicOrder from 'sections/forms/order/basic-order';

// ==============================|| FORMS ORDER ||============================== //

export default function FormsOrder() {
  return (
    <Grid container width="100%" spacing={2.5} justifyContent="center">
      <Grid size={{ xs: 12, md: 6, lg: 12 }}>
        <BasicOrder />
      </Grid>
    </Grid>
  );
}
