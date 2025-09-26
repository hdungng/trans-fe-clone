import React, { useMemo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { ClientFormData } from 'types/pages/client';
import { useIntl } from 'react-intl';


interface ClientFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ClientFormData, helpers: FormikHelpers<ClientFormData>) => void;
    initialData?: ClientFormData;
    isEdit?: boolean;
}
const TRASAS_TAX_CODE = '0304184415';

const ClientFormDialog: React.FC<ClientFormDialogProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
}) => {
    const intl = useIntl();
    const defaultValues: ClientFormData = {
        company_name: initialData?.company_name || '',
        tax_code: initialData?.tax_code || '',
        address: initialData?.address || '',
        sap_code: initialData?.sap_code || '',
        customer: initialData?.customer ?? undefined,
        international_name: initialData?.international_name || '',
        short_name: initialData?.short_name || '',
    };

    const validationSchema = useMemo(
        () =>
            Yup.object({
                company_name: Yup.string().required(intl.formatMessage({ id: 'client.form.validation.company-name-required' })),
                tax_code: Yup.string().required(intl.formatMessage({ id: 'client.form.validation.tax-code-required' })),
                address: Yup.string().required(intl.formatMessage({ id: 'client.form.validation.address-required' })),
                sap_code: Yup.string().nullable(),
                international_name: Yup.string().required(intl.formatMessage({ id: 'client.form.validation.international-name-required' })),
                customer: Yup.string()
                    .when('tax_code', {
                        is: (taxCode: string) => taxCode?.trim() === TRASAS_TAX_CODE,
                        then: (schema) => schema.required(intl.formatMessage({ id: 'client.form.validation.customer-required' })),
                        otherwise: (schema) => schema.notRequired()
                    }),
                short_name: Yup.string().nullable().notRequired(),
            }),
        [intl]
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{intl.formatMessage({ id: isEdit ? 'client.form.title.edit' : 'client.form.title.add' })}</DialogTitle>
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
                        <DialogContent dividers>
                            <Grid container spacing={3}>
                                <Grid size={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel required={true}>{intl.formatMessage({ id: 'client.form.label.company-name' })}</InputLabel>
                                        <TextField
                                            id="company_name"
                                            name="company_name"
                                            placeholder={intl.formatMessage({ id: 'client.form.placeholder.company-name' })}
                                            fullWidth
                                            value={formik.values.company_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                            helperText={formik.touched.company_name && formik.errors.company_name}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid size={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel required={true}>{intl.formatMessage({ id: 'client.form.label.tax-code' })}</InputLabel>
                                        <TextField
                                            id="tax_code"
                                            name="tax_code"
                                            placeholder={intl.formatMessage({ id: 'client.form.placeholder.tax-code' })}
                                            fullWidth
                                            value={formik.values.tax_code}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.tax_code && Boolean(formik.errors.tax_code)}
                                            helperText={formik.touched.tax_code && formik.errors.tax_code}
                                        />
                                    </Stack>
                                </Grid>
                                {formik.values.tax_code === TRASAS_TAX_CODE && <Grid size={12}>
                                    <Grid size={12}>
                                        <Stack sx={{ gap: 1 }}>
                                            <InputLabel required={true}>{intl.formatMessage({ id: 'client.form.label.customer' })}</InputLabel>
                                            <TextField
                                                id="customer"
                                                name="customer"
                                                placeholder={intl.formatMessage({ id: 'client.form.placeholder.customer' })}
                                                fullWidth
                                                value={formik.values.customer}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.customer && Boolean(formik.errors.customer)}
                                                helperText={formik.touched.customer && formik.errors.customer}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>}
                                <Grid size={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel required={true}>{intl.formatMessage({ id: 'client.form.label.address' })}</InputLabel>
                                        <TextField
                                            id="address"
                                            name="address"
                                            placeholder={intl.formatMessage({ id: 'client.form.placeholder.address' })}
                                            fullWidth
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.address && Boolean(formik.errors.address)}
                                            helperText={formik.touched.address && formik.errors.address}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid size={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>{intl.formatMessage({ id: 'client.form.label.sap-code' })}</InputLabel>
                                        <TextField
                                            id="sap_code"
                                            name="sap_code"
                                            placeholder={intl.formatMessage({ id: 'client.form.placeholder.sap-code' })}
                                            fullWidth
                                            value={formik.values.sap_code}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.sap_code && Boolean(formik.errors.sap_code)}
                                            helperText={formik.touched.sap_code && formik.errors.sap_code}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid size={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel required={true}>{intl.formatMessage({ id: 'client.form.label.international-name' })}</InputLabel>
                                        <TextField
                                            id="international_name"
                                            name="international_name"
                                            placeholder={intl.formatMessage({ id: 'client.form.placeholder.international-name' })}
                                            fullWidth
                                            value={formik.values.international_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.international_name && Boolean(formik.errors.international_name)}
                                            helperText={formik.touched.international_name && formik.errors.international_name}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid size={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel>{intl.formatMessage({ id: 'client.form.label.short-name' })}</InputLabel>
                                        <TextField
                                            id="short_name"
                                            name="short_name"
                                            placeholder={intl.formatMessage({ id: 'client.form.placeholder.short-name' })}
                                            fullWidth
                                            value={formik.values.short_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.short_name && Boolean(formik.errors.short_name)}
                                            helperText={formik.touched.short_name && formik.errors.short_name}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={onClose}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
                            <Button type="submit" variant="contained">
                                {intl.formatMessage({ id: isEdit ? 'client.form.button.submit.edit' : 'client.form.button.submit.add' })}
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

export default ClientFormDialog;