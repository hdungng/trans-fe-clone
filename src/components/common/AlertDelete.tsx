// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';

// project imports
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';
// assets
import DeleteFilled from '@ant-design/icons/DeleteFilled';


interface Props {
    title?: string;
    open: boolean;
    alertMethod: any;
    handleClose: () => void;
}

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertDelete({ title, open, alertMethod, handleClose }: Props) {
    const intl = useIntl();
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            keepMounted
            maxWidth="xs"
            aria-labelledby="column-delete-title"
            aria-describedby="column-delete-description"
            slots={{ transition: PopupTransition }}
        >
            <DialogContent sx={{ mt: 2, my: 1 }}>
                <Stack sx={{ gap: 3.5, alignItems: 'center' }}>
                    <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
                        <DeleteFilled />
                    </Avatar>
                    <Stack sx={{ gap: 2 }}>
                        <Typography variant="h4" align="center">
                            {intl.formatMessage({ id: 'alert.delete.title' })}
                        </Typography>
                        <Typography align="center">
                            {title
                                ? intl.formatMessage({ id: 'alert.delete.description.with-title' }, { title })
                                : intl.formatMessage({ id: 'alert.delete.description.no-title' })}
                        </Typography>
                    </Stack>

                    <Stack direction="row" sx={{ gap: 2, width: 1 }}>
                        <Button fullWidth onClick={handleClose} color="secondary" variant="outlined">
                            {intl.formatMessage({ id: 'common.cancel' })}
                        </Button>
                        <Button fullWidth color="error" variant="contained" onClick={alertMethod} autoFocus>
                            {intl.formatMessage({ id: 'alert.delete.confirm' })}
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}