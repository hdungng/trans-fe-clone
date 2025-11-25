import React, { useMemo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { UserFormData } from 'types/pages/user';
import Avatar from 'components/@extended/Avatar';
import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { FormLoading } from './FormLoading';
import useAuth from 'hooks/useAuth';


interface UserFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData, helpers: FormikHelpers<UserFormData>) => void;
    initialData?: UserFormData;
    isEdit?: boolean;
    isLoading?: boolean;
    isProfileMode?: boolean;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
    isProfileMode = false,
    isLoading = false
}) => {
    const intl = useIntl();
    const { user } = useAuth();

    const defaultValues: UserFormData = {
        email: '',
        full_name: '',
        role: '1',
        password: '',
        confirmPassword: '',
        ...initialData,
    };

    const validationSchema = useMemo(
        () =>
            Yup.object({
                email: Yup.string()
                    .email(intl.formatMessage({ id: 'user.form.validation.email-invalid' }))
                    .required(intl.formatMessage({ id: 'user.form.validation.email-required' })),
                full_name: Yup.string().required(intl.formatMessage({ id: 'user.form.validation.full-name-required' })),
                role: Yup.string()
                    .oneOf(['Admin', 'User', 'Manager'], intl.formatMessage({ id: 'user.form.validation.role-required' }))
                    .required(intl.formatMessage({ id: 'user.form.validation.role-required' })),
                password: isEdit
                    ? Yup.string().min(6, intl.formatMessage({ id: 'user.form.validation.password-min' }))
                    : Yup.string()
                        .min(6, intl.formatMessage({ id: 'user.form.validation.password-min' }))
                        .required(intl.formatMessage({ id: 'user.form.validation.password-required' })),
                confirmPassword: isEdit
                    ? Yup.string().when('password', {
                        is: (password: string) => password && password.length > 0,
                        then: (schema) =>
                            schema
                                .oneOf([Yup.ref('password')], intl.formatMessage({ id: 'user.form.validation.confirm-password-mismatch' }))
                                .required(intl.formatMessage({ id: 'user.form.validation.confirm-password-required' })),
                        otherwise: (schema) => schema.notRequired()
                    })
                    : Yup.string()
                        .oneOf([Yup.ref('password')], intl.formatMessage({ id: 'user.form.validation.confirm-password-mismatch' }))
                        .required(intl.formatMessage({ id: 'user.form.validation.confirm-password-required' }))
            }),
        [intl, isEdit]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            {!isProfileMode && (
                <DialogTitle>{intl.formatMessage({ id: isEdit ? 'user.form.title.edit' : 'user.form.title.add' })}</DialogTitle>
            )}
            {isProfileMode && <DialogTitle>{intl.formatMessage({ id: 'user.form.title.profile' })}</DialogTitle>}
            <DialogContent>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    validateOnBlur
                    validateOnChange
                    onSubmit={(values, actions) => {
                        onSubmit(values, actions);
                    }}
                    enableReinitialize
                    context={{ isEdit }}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            {isLoading === true ? <FormLoading /> :
                                <>
                                    <DialogContent dividers>
                                        <Grid container spacing={2}>
                                            {(isEdit || isProfileMode) && (
                                                <Grid size={3}>
                                                    <Stack sx={{ gap: 1 }}>
                                                        <Avatar alt="profile user" size="xl">{formik.values.full_name.charAt(0)}</Avatar>
                                                        <Stack>
                                                            <Typography variant="h6">{formik.values.full_name}</Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {formik.values.role}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>)
                                            }
                                            <Grid size={isEdit || isProfileMode ? 9 : 12} container spacing={3}>
                                                {/* Email */}
                                                <Grid size={12}>
                                                    <Stack sx={{ gap: 1 }}>
                                                        <InputLabel required={true}>{intl.formatMessage({ id: 'user.form.label.email' })}</InputLabel>
                                                        <TextField
                                                            id="email"
                                                            name="email"
                                                            placeholder={intl.formatMessage({ id: 'user.form.placeholder.email' })}
                                                            fullWidth
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            disabled={isEdit}
                                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                                            helperText={formik.touched.email && formik.errors.email}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid size={12}>
                                                    <Stack sx={{ gap: 1 }}>
                                                        <InputLabel required={true}>{intl.formatMessage({ id: 'user.form.label.full-name' })}</InputLabel>
                                                        <TextField
                                                            id="full_name"
                                                            name="full_name"
                                                            placeholder={intl.formatMessage({ id: 'user.form.placeholder.full-name' })}
                                                            fullWidth
                                                            value={formik.values.full_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                                                            helperText={formik.touched.full_name && formik.errors.full_name}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid size={12}>
                                                    <Stack sx={{ gap: 1 }}>
                                                        <InputLabel required={true}>{intl.formatMessage({ id: 'user.form.label.role' })}</InputLabel>
                                                        <TextField
                                                            id="role"
                                                            name="role"
                                                            select
                                                            fullWidth
                                                            value={formik.values.role}
                                                            disabled={isProfileMode || user?.role !== 'Admin'}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.touched.role && Boolean(formik.errors.role)}
                                                            helperText={formik.touched.role && formik.errors.role}
                                                        >
                                                            <MenuItem value="1" disabled>
                                                                {intl.formatMessage({ id: 'user.form.placeholder.role' })}
                                                            </MenuItem>
                                                            <MenuItem value="Admin">Admin</MenuItem>
                                                            <MenuItem value="Manager">Manager</MenuItem>
                                                            <MenuItem value="User">User</MenuItem>
                                                        </TextField>
                                                    </Stack>
                                                </Grid>
                                                <Grid size={12}>
                                                    <Stack sx={{ gap: 1 }}>
                                                        <InputLabel required={isEdit ? false : true}>{intl.formatMessage({ id: 'user.form.label.password' })}</InputLabel>
                                                        <TextField
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            placeholder={intl.formatMessage({ id: 'user.form.placeholder.password' })}
                                                            fullWidth
                                                            value={formik.values.password}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                                            helperText={formik.touched.password && formik.errors.password}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid size={12}>
                                                    <Stack sx={{ gap: 1 }}>
                                                        <InputLabel required={isEdit ? false : true}>{intl.formatMessage({ id: 'user.form.label.confirm-password' })}</InputLabel>
                                                        <TextField
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            type="password"
                                                            placeholder={intl.formatMessage({ id: 'user.form.placeholder.confirm-password' })}
                                                            fullWidth
                                                            value={formik.values.confirmPassword}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </DialogContent>

                                </>
                            }
                            <DialogActions>
                                <Button onClick={onClose}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
                                <Button type="submit" variant="contained">
                                    {intl.formatMessage({ id: isEdit ? 'user.form.button.submit.edit' : 'user.form.button.submit.add' })}
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default UserFormDialog;