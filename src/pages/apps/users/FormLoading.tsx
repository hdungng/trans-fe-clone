import {
    DialogContent,
    Skeleton,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

export const FormLoading: React.FC<any> = () => {
    return (
        <DialogContent dividers>
            <Stack spacing={1}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <Stack sx={{ gap: 1 }}>
                            <Skeleton variant="circular" width={70} height={70} />
                            <Stack>
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid size={9} container spacing={3}>
                        <Grid size={12}>
                            <Skeleton variant="rectangular" height={47} />
                        </Grid>
                        <Grid size={12}>
                            <Skeleton variant="rectangular" height={47} />
                        </Grid>
                        <Grid size={12}>
                            <Skeleton variant="rectangular" height={47} />
                        </Grid>
                        <Grid size={12}>
                            <Skeleton variant="rectangular" height={47} />
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </DialogContent>
    )
}
