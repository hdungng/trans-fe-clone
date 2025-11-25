// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// third-party
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { FormHelperText } from '@mui/material';
import { UploadFileForm, UploadFilesFormProps } from 'types/pages/job-number';
import { getProjectFiles, uploadFilesToJobNumber } from 'api/job-number';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import MultiFileUploadJob from 'components/third-party/dropzone/MultiFileJob';
import { arraysEqual } from 'utils/array';
import { APIResponse } from 'types/response';
import { useIntl } from 'react-intl';


const createValidationSchema = (intl: ReturnType<typeof useIntl>) =>
    Yup.object({
        files: Yup.array()
            .of(
                Yup.mixed<File>().test(
                    'fileType',
                    intl.formatMessage({
                        id: 'job-number.edit.upload.validation.file-type',
                        defaultMessage: 'Files must be PDF, Excel, CSV, or Word (DOC/DOCX)',
                    }),
                    (value) =>
                        value &&
                        (
                            value.type === 'application/pdf' ||
                            value.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // xlsx
                            value.type === 'application/vnd.ms-excel' || // xls
                            value.type === 'text/csv' ||
                            value.type === 'application/vnd.ms-excel.sheet.binary.macroEnabled.12' || // xlsb
                            value.type === 'application/vnd.ms-excel.sheet.macroEnabled.12' || // ✅ xlsm
                            value.type === 'application/msword' || // doc
                            value.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
                        )
                )
            )
            .required(
                intl.formatMessage({
                    id: 'job-number.edit.upload.validation.required',
                    defaultMessage: 'Supporting documents are required',
                })
            ),
    });




const CertificateUploadForm = forwardRef(({ jobNumberId, initialValues, setFileUploadData, mode }: UploadFilesFormProps, ref) => {
    const intl = useIntl();
    const validationSchema = useMemo(() => createValidationSchema(intl), [intl]);
    const [list] = useState(false);
    // State để theo dõi xem người dùng đã chọn file chưa
    const [fileTouched, setFileTouched] = useState(false);

    let hasChanges: boolean = false;


    const formik = useFormik<UploadFileForm>({
        initialValues: {
            files: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setFileTouched(true);
            setFileUploadData({
                files: values.files
            });
            try {
                if (values.files != null && hasChanges) {
                    const response: APIResponse = await uploadFilesToJobNumber(jobNumberId, values.files);
                    if (response.status === "success") {
                        openSnackbar({
                            open: true,
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            message: intl.formatMessage({ id: 'job-number.edit.upload.notification.update-success', defaultMessage: 'Supporting documents updated successfully' }),
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
                            ? intl.formatMessage({ id: 'job-number.edit.upload.notification.update-error', defaultMessage: 'Failed to update supporting documents' })
                            : intl.formatMessage({ id: 'job-number.edit.upload.notification.create-error', defaultMessage: 'Failed to upload supporting documents' }),
                    close: true
                } as SnackbarProps);
            }
        }
    });

    const initialSnapshot = useRef<UploadFileForm>({
        files: initialValues?.files ?? null
    });

    useEffect(() => {
        if (initialValues) {
            formik.setValues(initialValues);
            fetchFilesPath(jobNumberId);
        }
    }, [initialValues]);

    useEffect(() => {
        if ((initialSnapshot.current.files?.length === 0)) {
            hasChanges = true;
        }

        if (!(initialSnapshot.current.files?.length === 0)
            && formik.values.files && !arraysEqual(initialSnapshot.current.files || [], formik.values.files)) {
            hasChanges = true;
        }

    }, [formik]);

    const fetchFilesPath = async (jobNumberId: string) => {
        return await getProjectFiles(jobNumberId);
    }

    useImperativeHandle(ref, () => ({
        submitForm: async () => {
            const errors = await formik.validateForm();
            if (Object.keys(errors).length === 0) {

                formik.handleSubmit();
                return { isValidFormUpload: formik.validateForm(), isChanged: hasChanges }
            }
            return false;
        },
        getValues: () => formik.values,
        isValid: () => {
            return formik.isValid;
        },
    }));

    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 2 }}>
                {intl.formatMessage({ id: 'job-number.edit.upload.title', defaultMessage: 'Upload documents' })}
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Stack sx={{ gap: 1 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid size={12}>
                                    <Stack sx={{ gap: 1.5, alignItems: 'center' }}>
                                        <MultiFileUploadJob
                                            showList={list}
                                            setFieldValue={formik.setFieldValue}
                                            files={formik.values.files}
                                            setFileTouched={setFileTouched}
                                            // setHasChanges={setHasChanges}
                                            error={fileTouched && !!formik.errors.files}
                                        />
                                    </Stack>
                                    {formik.errors.files && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {fileTouched && (formik.errors.files as string)}
                                        </FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                        </form>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
});

export default CertificateUploadForm;