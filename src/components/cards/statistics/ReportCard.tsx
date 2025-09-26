// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import { GenericCardProps } from 'types/root';

// ==============================|| REPORT CARD ||============================== //

export default function ReportCard({ primary, secondary, iconPrimary, color }: GenericCardProps) {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <MainCard>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Stack sx={{ gap: 2 }}>
            <Typography variant="h2">{primary}</Typography>
            <Typography variant="body1" color="secondary">
              {secondary}
            </Typography>
          </Stack>
        </Grid>
        <Grid>
          <Typography variant="h1" sx={{ color }}>
            {primaryIcon}
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
}
