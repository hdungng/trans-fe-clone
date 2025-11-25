import React, { useMemo, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Grid, Stack, InputLabel, TextField, Button,
    Tabs,
    Tab,
    FormControl,
    FormHelperText
} from '@mui/material';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { useIntl } from 'react-intl';

interface SchemaField {
    label: string;
    key: string;
    required?: boolean;
    type?: 'text' | 'number' | 'date' | 'textarea';
}

interface EditRowDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any, helpers: FormikHelpers<any>) => void;
    onUpdateByExcel: (data: any, helpers: FormikHelpers<any>) => void;
    initialData?: Record<string, any>;
    schemas: SchemaField[];
    isEdit?: boolean;
}

export const EditRowDialog: React.FC<EditRowDialogProps> = ({
    open,
    onClose,
    onSubmit,
    onUpdateByExcel,
    initialData = {},
    schemas,
    isEdit = false,
}) => {
    const intl = useIntl();
    // 1. Tạo defaultValues từ schemas và initialData
    const defaultValues = useMemo(() => {
        const iv: Record<string, any> = {};
        schemas.forEach(f => {
            // nếu initialData có, ưu tiên dùng, còn không dùng empty string
            iv[f.key] = initialData[f.key] ?? '';
        });
        return iv;
    }, [schemas, initialData]);

    const [tab, setTab] = useState(0);
    const [fileTouched, setFileTouched] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const validationSchema = useMemo(() => {
        const shape = schemas.reduce<Record<string, any>>((acc, field) => {
            let validator;
            switch (field.type) {
                case 'text':
                default:
                    validator = Yup.string().nullable();
                    break;
            }

            if (field.required) {
                validator = validator.required(intl.formatMessage({ id: 'master-list.row-dialog.validation.required' }));
            }

            acc[field.key] = validator;
            return acc;
        }, {});

        // Trả về một Yup schema hoàn chỉnh
        return Yup.object().shape(shape);
    }, [schemas, intl]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {intl.formatMessage({ id: isEdit ? 'master-list.row-dialog.edit-title' : 'master-list.row-dialog.add-title' })}
            </DialogTitle>


            {!isEdit && <Tabs value={tab} onChange={handleTabChange} sx={{ px: 3 }}>
                <Tab label={intl.formatMessage({ id: 'master-list.row-dialog.tab.manual' })} value={0} />
                <Tab label={intl.formatMessage({ id: 'master-list.row-dialog.tab.excel' })} value={1} />
            </Tabs>}

            {tab === 0 && <Box>
                <Formik
                    enableReinitialize
                    initialValues={defaultValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        onSubmit(values, actions)
                    }}
                >
                    {formik => (
                        <Form>
                            <DialogContent dividers>
                                <Grid container spacing={2}>
                                    {schemas.map(field => (
                                        <Grid size={6} key={field.key} sx={{ marginTop: 1 }}>
                                            <Stack spacing={1}>
                                                <InputLabel required={field.required}>
                                                    {field.label.split('\\n').map((t, i) => (
                                                        <div key={i}>{t}</div>
                                                    ))}
                                                </InputLabel>

                                                <Field name={field.key}>
                                                    {({ field: f, meta }: FieldProps) => {
                                                        const isError = Boolean(meta.touched && meta.error);
                                                        const commonProps = {
                                                            ...f,
                                                            fullWidth: true,
                                                            variant: 'outlined' as const,
                                                            error: isError,
                                                            helperText: isError ? meta.error : '',
                                                        };

                                                        switch (field.type) {
                                                            // case 'number':
                                                            //     return <TextField {...commonProps} type="number" />;
                                                            // case 'date':
                                                            //     return (
                                                            //         <TextField
                                                            //             {...commonProps}
                                                            //             type="date"
                                                            //             InputLabelProps={{ shrink: true }}
                                                            //         />
                                                            //     );
                                                            // case 'textarea':
                                                            //     return (
                                                            //         <TextField
                                                            //             {...commonProps}
                                                            //             multiline
                                                            //             minRows={3}
                                                            //         />
                                                            //     );
                                                            case 'text':
                                                            default:
                                                                // Nếu label có \n, bật multiline
                                                                const multiline = field.label.includes('\\n');
                                                                return (
                                                                    <TextField
                                                                        {...commonProps}
                                                                        multiline={multiline}
                                                                        placeholder={field.label}
                                                                        minRows={multiline ? 2 : 1}
                                                                    />
                                                                );
                                                        }
                                                    }}
                                                </Field>
                                            </Stack>
                                        </Grid>
                                    ))}
                                </Grid>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={onClose}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={formik.isSubmitting}
                                >
                                    {intl.formatMessage({ id: isEdit ? 'master-list.row-dialog.submit.edit' : 'master-list.row-dialog.submit.add' })}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Box>}

            {tab === 1 && <Box>
                <Formik
                    initialValues={{
                        file: null,
                        startLine: 1
                    }}
                    validationSchema={validationSchema}
                    validateOnBlur
                    validateOnChange
                    onSubmit={(values, actions) => {
                        onUpdateByExcel(values, actions);
                    }}
                    enableReinitialize
                >
                    {(formik) => {
                        return (
                            <form onSubmit={formik.handleSubmit}>
                                <DialogContent dividers>
                                    <Grid container>
                                        <Grid size={12}>
                                            <Stack sx={{ gap: 1.5, marginBottom: 1.5 }}>
                                                <InputLabel id="method" required>
                                                    {intl.formatMessage({ id: 'master-list.form.file-label' })}
                                                </InputLabel>

                                                <SingleFileUpload
                                                    setFieldValue={formik.setFieldValue}
                                                    file={formik.values.file}
                                                    setFileTouched={setFileTouched}
                                                    // setHasChanges={setHasChanges}
                                                    error={fileTouched && !!formik.errors.file}
                                                />

                                                <InputLabel sx={{ marginBottom: 1.5 }} required>
                                                    {intl.formatMessage({ id: 'master-list.form.start-line-label' })}
                                                </InputLabel>
                                                <FormControl fullWidth sx={{ marginBottom: 3 }}>
                                                    <TextField type='number' name='startLine' id="startLine" value={formik.values.startLine}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.startLine && Boolean(formik.errors.startLine)}
                                                        helperText={formik.touched.startLine && formik.errors.startLine} />
                                                </FormControl>

                                                {formik.errors.startLine && (
                                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                                        {fileTouched && formik.errors.startLine as string}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={onClose}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
                                    <Button type="submit" variant="contained">
                                        {intl.formatMessage({ id: isEdit ? 'master-list.row-dialog.submit.edit' : 'master-list.row-dialog.submit.add' })}
                                    </Button>
                                </DialogActions>
                            </form>
                        )
                    }}
                </Formik>
            </Box>}
        </Dialog>
    );
};