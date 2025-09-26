import { Link, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';
import FirebaseRegister from 'sections/auth/jwt/AuthRegister';

// ================================|| JWT - REGISTER ||================================ //

export default function Register() {
  const { isLoggedIn } = useAuth();
  const intl = useIntl();

  const [searchParams] = useSearchParams();
  const auth = searchParams.get('auth'); // get auth and set route based on that

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">{intl.formatMessage({ id: 'auth.register.title' })}</Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/login' : auth ? `/${auth}/login?auth=jwt` : '/login'}
              variant="body1"
              sx={{ textDecoration: 'none' }}
              color="primary"
            >
              {intl.formatMessage({ id: 'auth.register.have-account' })}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <FirebaseRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
