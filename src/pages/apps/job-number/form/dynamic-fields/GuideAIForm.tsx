import * as React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    InputLabel,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getClientGuidingAI, updateClientGuidingAI } from 'api/client';
import { useIntl } from 'react-intl';
import { useDefaultSetting } from 'pages/apps/default-setting/DefaultSettingContext';

type Props = {
    label: string;
    fieldKey: string;
    method: string;
};

export default function GuideAIForm({ label, fieldKey, method }: Props) {

    const { client, customsProcedureType, TRASASCustomerId, filterUserId } = useDefaultSetting();
    const intl = useIntl();

    const validationSchema = React.useMemo(
        () =>
            Yup.object({
                guide_text: Yup.string()
                    .trim(),
                customs_procedure_type: Yup.number().required(
                    intl.formatMessage({
                        id: 'guide-ai.validation.customs-procedure.required',
                        defaultMessage: 'Customs procedure type is required'
                    })
                ),
                field: Yup.string()
                    .trim()
                    .required(
                        intl.formatMessage({
                            id: 'guide-ai.validation.field.required',
                            defaultMessage: 'Field key is required'
                        })
                    )
            }),
        [intl]
    );

    const [response, setResponse] = React.useState<any>();

    const [initialGuide, setInitialGuide] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [fetchError, setFetchError] = React.useState<string | null>(null);

    // Gọi API GET khi mount để lấy dữ liệu ban đầu
    React.useEffect(() => {
        let isMounted = true;

        async function fetchGuide() {
            try {
                setLoading(true);
                setFetchError(null);

                if (client.id) {

                    const res = await getClientGuidingAI(client.id, fieldKey, method, customsProcedureType, TRASASCustomerId, filterUserId);

                    if (isMounted || res.status === "success") {
                        setInitialGuide(res.data?.guide_text ?? '');
                    }

                }
            } catch (e: any) {
                if (isMounted)
                    setFetchError(
                        e.response?.data?.message ||
                            e.message ||
                            intl.formatMessage({
                                id: 'guide-ai.error.unable-to-load',
                                defaultMessage: 'Unable to load data'
                            })
                    );
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchGuide();
        return () => {
            isMounted = false;
        };
    }, [client.id, fieldKey, intl, method]);

    if (loading) {
        return (
            <Box sx={{ padding: 3, textAlign: 'center' }}>
                <CircularProgress />
                <Typography sx={{ mt: 1 }}>
                    {intl.formatMessage({ id: 'guide-ai.loading', defaultMessage: 'Loading data...' })}
                </Typography>
            </Box>
        );
    }

    if (fetchError) {
        return (
            <Box sx={{ padding: 3 }}>
                <Alert severity="error">{fetchError}</Alert>
            </Box>
        );
    }

    return (
        <Formik
            initialValues={{ guide_text: initialGuide, customs_procedure_type: customsProcedureType, field: fieldKey }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
                try {
                    if (client.id) {
                        const res = await updateClientGuidingAI(client.id, values, method, TRASASCustomerId, filterUserId);
                        if (res.status === "success") {
                            setResponse(res)
                        }
                        setInitialGuide(values.guide_text);
                        resetForm({ values });
                    }
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleSubmit, getFieldProps, touched, errors, isSubmitting, status }) => (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >
                    <Typography variant="h4" sx={{ opacity: 0.9, mt: 2, mb: 3 }}>
                        {intl.formatMessage({
                            id: 'guide-ai.form.title',
                            defaultMessage: 'Update AI extraction guidelines'
                        })}
                    </Typography>

                    <InputLabel required>
                        {intl.formatMessage(
                            {
                                id: 'guide-ai.form.field-label',
                                defaultMessage: 'Extraction guidance for {label}'
                            },
                            { label }
                        )}
                    </InputLabel>

                    <TextField
                        id="guide-ai"
                        fullWidth
                        multiline
                        rows={20}
                        {...getFieldProps('guide_text')}
                        error={touched.guide_text && Boolean(errors.guide_text)}
                        helperText={touched.guide_text && errors.guide_text}
                    />

                    {response && (
                        <Alert severity={response.status === "success" ? 'success' : 'error'} sx={{ width: '100%' }}>
                            {response.message}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <CircularProgress size={20} />
                            ) : (
                                intl.formatMessage({
                                    id: 'guide-ai.form.save',
                                    defaultMessage: 'Save guidelines'
                                })
                            )}
                        </Button>
                    </Box>
                </Box>
            )}
        </Formik>
    );
}