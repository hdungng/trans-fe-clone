// material-ui
import { Divider, FormControl, MenuItem, Select, FormHelperText, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// third-party
import { useFormik } from 'formik';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import * as yup from 'yup';
import { getClientDetail } from 'api/client';
import TaxCodeAutocomplete from 'components/common/TaxCodeAutocomplete';
import { InitForm, InitialFormProps } from 'types/pages/job-number';
import { ClientType } from 'types/pages/client';
import { checkDefaultValuesAndMST, createJobNumber, updateJobNumber } from 'api/job-number';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { APIResponse } from 'types/response';
import TRASASCustomerSelect from 'components/common/TRASASCustomerSelect';
import { Checkbox } from '@mui/material';
import { useIntl } from 'react-intl';


const TRASAS_TAX_CODE = '0304184415';

const createValidationSchema = (intl: ReturnType<typeof useIntl>) =>
    yup.object({
        jobNumber: yup
            .string()
            .required(intl.formatMessage({ id: 'job-number.edit.initial.validation.job-number', defaultMessage: 'Job number name is required' })),
        taxCode: yup
            .string()
            .required(intl.formatMessage({ id: 'job-number.edit.initial.validation.tax-code', defaultMessage: 'Tax code is required' })),
        method: yup
            .string()
            .required(intl.formatMessage({ id: 'job-number.edit.initial.validation.method', defaultMessage: 'Operation is required' })),
        customer: yup
            .number()
            .when('taxCode', {
                is: (taxCode: string) => taxCode?.trim() === TRASAS_TAX_CODE,
                then: (schema) =>
                    schema.required(
                        intl.formatMessage({ id: 'job-number.edit.initial.validation.customer', defaultMessage: 'Customer is required' })
                    ),
                otherwise: (schema) => schema.notRequired(),
            }),
        customs_procedure_type: yup
            .string()
            .required(intl.formatMessage({ id: 'job-number.edit.initial.validation.customs-procedure', defaultMessage: 'Customs procedure type is required' })),
        note: yup.string().nullable(),
    });

const InitialForm = forwardRef(({ initialFormValues, setInitialFormData, mode, setJobNumberId, jobNumberId, }: InitialFormProps, ref) => {
    const intl = useIntl();
    const validationSchema = useMemo(() => createValidationSchema(intl), [intl]);

    // const [loading, setLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
    const [isNext, setIsNext] = useState<Boolean>()

    const formik = useFormik<InitForm>({
        initialValues: {
            jobNumber: initialFormValues?.jobNumber ?? '',
            taxCode: initialFormValues?.taxCode ?? '',
            method: initialFormValues?.method ?? '',
            customer: initialFormValues?.customer ?? undefined,
            note: initialFormValues?.note ?? '',
            customs_procedure_type: initialFormValues?.customs_procedure_type ?? '',
            ignore_masterlist: initialFormValues?.ignore_masterlist ?? false,
        },
        validationSchema,
        onSubmit: async (values) => {
            setInitialFormData({
                jobNumber: values.jobNumber,
                taxCode: values.taxCode,
                method: values.method,
                customer: values?.customer,
                note: values.note,
                customs_procedure_type: values?.customs_procedure_type
            });

            const payload = values.taxCode === TRASAS_TAX_CODE
                ? values
                : { ...values, customer: undefined };

            setIsNext(false)
            try {
                if (mode === 'edit') {
                    const response: APIResponse = await updateJobNumber(jobNumberId, payload);

                    if (response.status === 'success') {
                        openSnackbar({
                            open: true,
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            message: intl.formatMessage({ id: 'job-number.edit.initial.notification.update-success', defaultMessage: 'Job number updated successfully' }),
                            close: true
                        } as SnackbarProps);
                        setJobNumberId(response.data.id);
                        setIsNext(true)
                    }
                } else {
                    const response: APIResponse = await createJobNumber(payload);


                    if (response.status === 'success') {
                        openSnackbar({
                            open: true,
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            message: intl.formatMessage({ id: 'job-number.edit.initial.notification.create-success', defaultMessage: 'Job number created successfully' }),
                            close: true
                        } as SnackbarProps);
                        setJobNumberId(response.data.id);
                        mode = 'edit';

                        setIsNext(true)
                    } else {
                        openSnackbar({
                            open: true,
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            message: response.message.message,
                            close: true
                        } as SnackbarProps);
                    }
                }

            } catch (error) {
                console.log(error);

                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    message:
                        mode === 'edit'
                            ? intl.formatMessage({ id: 'job-number.edit.initial.notification.update-error', defaultMessage: 'Failed to update job number' })
                            : intl.formatMessage({ id: 'job-number.edit.initial.notification.create-error', defaultMessage: 'Failed to create job number' }),
                    close: true
                } as SnackbarProps);

                return false;
            }
        }
    });

    useEffect(() => {
        if (initialFormValues) {
            formik.setValues(initialFormValues);
            handleSelect(null, initialFormValues.taxCode);
        }

    }, [initialFormValues]);

    useImperativeHandle(ref, () => ({
        submitForm: async () => {
            const isValid = await formik.validateForm().then(errors => Object.keys(errors).length === 0);

            if (!isValid) {
                formik.setTouched({
                    jobNumber: true,
                    taxCode: true,
                    method: true,
                    customer: true
                });
                return false;
            }

            let checkDefaultValue = await checkDefaultValuesAndMST(formik.values.taxCode, formik.values.method).then(res => res.data);

            if (!checkDefaultValue.result) {
                const userConfirmed = window.confirm(
                    intl.formatMessage(
                        { id: 'job-number.edit.initial.confirm.override-masterlist', defaultMessage: 'Warning: {message}, do you want to continue?' },
                        { message: checkDefaultValue.message }
                    )
                );

                if (userConfirmed)
                    await formik.submitForm();

            } else {
                await formik.submitForm();
            }

            return formik.isValid && isNext;
        },
        getValues: () => {
            return formik.values;
        },
        setValues: (values: InitForm) => {
            formik.setValues(values);
        },
        isValid: async () => {

            const isValid = await formik.validateForm().then(errors => Object.keys(errors).length === 0);

            if (!isValid) {
                formik.setTouched({
                    jobNumber: true,
                    taxCode: true,
                    method: true,
                    customer: true,
                    note: true
                });
                return false;
            }

            return formik.isValid && isNext;
        }
    }));

    const handleSelect = async (event: any, value: any) => {
        if (!value) {
            setSelectedClient(null);
            return;
        }
        try {
            const response: APIResponse = await getClientDetail(value);

            if (response.status === 'success') {
                setSelectedClient(response.data);
            } else {
                setSelectedClient(null);
            }
        } catch (error) {
            console.error('Error fetching selected item data:', error);
            setSelectedClient(null);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid size={{ xs: 12, sm: 12, lg: 7 }} container direction="column" spacing={2}
                        sx={theme => ({
                            borderRight: { xs: 0, md: `1px solid ${theme.palette.divider}` },
                            borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: 0 },
                            pr: { md: 5, xs: 0 },
                            mb: { xs: 4, md: 0 },
                            pb: { xs: 4, md: 0 }
                        })}>
                        <Grid>
                            <Typography variant="h5" gutterBottom >
                                {intl.formatMessage({ id: 'job-number.edit.initial.section.input-info', defaultMessage: 'Enter information' })}
                            </Typography>
                        </Grid>

                        <Divider sx={{ mb: 2 }} />
                        <Grid sx={{ mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <InputLabel required={true}>{intl.formatMessage({ id: 'job-number.edit.initial.field.job-number', defaultMessage: 'Job number name' })}</InputLabel>
                                <TextField
                                    id="jobNumber"
                                    name="jobNumber"
                                    placeholder={intl.formatMessage({ id: 'job-number.edit.initial.field.job-number.placeholder', defaultMessage: '2505/SW-MKS/01' })}
                                    fullWidth
                                    value={formik.values.jobNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.jobNumber && Boolean(formik.errors.jobNumber)}
                                    helperText={formik.touched.jobNumber && formik.errors.jobNumber}
                                />
                            </Stack>
                        </Grid>
                        <Grid sx={{ mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <InputLabel required={true}>{intl.formatMessage({ id: 'job-number.edit.initial.field.method', defaultMessage: 'Operation' })}</InputLabel>
                                <FormControl>
                                    <Select
                                        id="method"
                                        name='method'
                                        value={formik.values.method}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.method && Boolean(formik.errors.method)}
                                        readOnly={mode === 'edit'}
                                        displayEmpty
                                        slotProps={{ input: { 'aria-label': intl.formatMessage({ id: 'job-number.edit.initial.aria.method', defaultMessage: 'Select operation' }) } }}
                                    >
                                        <MenuItem value="" sx={{ color: 'text.secondary' }} disabled>
                                            {intl.formatMessage({ id: 'job-number.edit.initial.field.method.placeholder', defaultMessage: 'Select operation' })}
                                        </MenuItem>
                                        <MenuItem value='import'>{intl.formatMessage({ id: 'job-number.method.import', defaultMessage: 'Import' })}</MenuItem>
                                        <MenuItem value='export'>{intl.formatMessage({ id: 'job-number.method.export', defaultMessage: 'Export' })}</MenuItem>
                                    </Select>
                                    {formik.touched.method && formik.errors.method && (
                                        <FormHelperText error>{formik.errors.method}</FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid sx={{ mb: 2 }}>
                            <TaxCodeAutocomplete
                                formik={formik}
                                name="taxCode"
                                required={true}
                                label={intl.formatMessage({ id: 'job-number.edit.initial.field.tax-code', defaultMessage: 'Tax code' })}
                                handleSelect={handleSelect}
                            />
                        </Grid>
                        {formik.values.taxCode === "0304184415" && (
                            <Grid sx={{ mb: 2 }}>
                                <Stack sx={{ gap: 1 }}>
                                    <InputLabel required={true}>{intl.formatMessage({ id: 'job-number.edit.initial.field.customer', defaultMessage: 'Customer' })}</InputLabel>
                                    <TRASASCustomerSelect
                                        name='customer'
                                        formik={formik}
                                        isFloating={false}
                                        required={true}
                                    />
                                </Stack>
                            </Grid>
                        )}
                        <Grid sx={{ mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <InputLabel>{intl.formatMessage({ id: 'job-number.edit.initial.field.note', defaultMessage: 'Note' })}</InputLabel>
                                <TextField
                                    id="note"
                                    name="note"
                                    placeholder={intl.formatMessage({ id: 'job-number.edit.initial.field.note.placeholder', defaultMessage: 'Enter note…' })}
                                    fullWidth
                                    rows={2}
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.note && Boolean(formik.errors.note)}
                                    helperText={formik.touched.note && formik.errors.note}
                                />
                            </Stack>
                        </Grid>
                        <Grid sx={{ mb: 2 }}>
                            <Stack sx={{ gap: 1 }}>
                                <InputLabel required={true}>{intl.formatMessage({ id: 'job-number.edit.initial.field.customs-procedure', defaultMessage: 'Customs procedure type' })}</InputLabel>
                                <FormControl>
                                    <Select
                                        id="customs_procedure_type"
                                        name='customs_procedure_type'
                                        value={formik.values.customs_procedure_type}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.customs_procedure_type && Boolean(formik.errors.customs_procedure_type)}
                                        readOnly={mode === 'edit'}
                                        displayEmpty
                                        slotProps={{ input: { 'aria-label': intl.formatMessage({ id: 'job-number.edit.initial.aria.customs-procedure', defaultMessage: 'Select customs procedure type' }) } }}
                                    >
                                        <MenuItem value="" sx={{ color: 'text.secondary' }} disabled>
                                            {intl.formatMessage({ id: 'job-number.edit.initial.field.customs-procedure.placeholder', defaultMessage: 'Select customs procedure type' })}
                                        </MenuItem>
                                        <MenuItem value='0'>{intl.formatMessage({ id: 'job-number.customs-procedure.0', defaultMessage: 'Business & investment' })}</MenuItem>
                                        <MenuItem value='1'>{intl.formatMessage({ id: 'job-number.customs-procedure.1', defaultMessage: 'Export manufacturing' })}</MenuItem>
                                        <MenuItem value='2'>{intl.formatMessage({ id: 'job-number.customs-procedure.2', defaultMessage: 'Processing' })}</MenuItem>
                                        <MenuItem value='3'>{intl.formatMessage({ id: 'job-number.customs-procedure.3', defaultMessage: 'Export processing' })}</MenuItem>
                                    </Select>
                                    {formik.touched.customs_procedure_type && formik.errors.customs_procedure_type && (
                                        <FormHelperText error>{formik.errors.customs_procedure_type}</FormHelperText>
                                    )}
                                </FormControl>
                            </Stack>
                        </Grid>

                        <Grid sx={{ mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="ignore_masterlist"
                                        checked={formik.values.ignore_masterlist}
                                        onChange={() => formik.setFieldValue("ignore_masterlist", !formik.values.ignore_masterlist)}
                                        onBlur={formik.handleBlur}
                                    />
                                }
                                label={intl.formatMessage({ id: 'job-number.edit.initial.field.ignore-masterlist', defaultMessage: 'Skip Master List validation' })}
                            />
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, lg: 5 }} container direction="column" sx={{ pl: 3 }} spacing={2}>
                        <Grid>
                            <Typography variant="h5" gutterBottom>
                                {intl.formatMessage({ id: 'job-number.edit.initial.section.company-info', defaultMessage: 'Company information' })}
                            </Typography>
                        </Grid>
                        <Divider sx={{ mb: 2 }} />

                        <Grid>
                            <Stack spacing={2} sx={{ borderRadius: 2, bgcolor: 'background.paper' }}>
                                <Typography variant="body1" >{intl.formatMessage({ id: 'job-number.edit.initial.company.name', defaultMessage: 'Company name' })}</Typography>
                                <Typography variant="body1" color="text.secondary">{selectedClient?.company_name || '-'}</Typography>
                                <Typography variant="body1" >{intl.formatMessage({ id: 'job-number.edit.initial.company.tax-code', defaultMessage: 'Tax code' })}</Typography>
                                <Typography variant="body1" color="text.secondary">{selectedClient?.tax_code || '-'}</Typography>
                                <Typography variant="body1" >{intl.formatMessage({ id: 'job-number.edit.initial.company.address', defaultMessage: 'Address' })}</Typography>
                                <Typography variant="body1" color="text.secondary">{selectedClient?.address || '-'}</Typography>
                                <Typography variant="body1" >{intl.formatMessage({ id: 'job-number.edit.initial.company.international-name', defaultMessage: 'International name' })}</Typography>
                                <Typography variant="body1" color="text.secondary">{selectedClient?.international_name || '-'}</Typography>
                                <Typography variant="body1" >{intl.formatMessage({ id: 'job-number.edit.initial.company.sap-code', defaultMessage: 'Customer SAP code' })}</Typography>
                                <Typography variant="body1" color="text.secondary">{selectedClient?.sap_code || '-'}</Typography>
                                <Typography variant="body1" >{intl.formatMessage({ id: 'job-number.edit.initial.company.short-name', defaultMessage: 'Alternate name' })}</Typography>
                                <Typography variant="body1" color="text.secondary">{selectedClient?.short_name || '-'}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </LocalizationProvider>
    );
});

export default InitialForm;