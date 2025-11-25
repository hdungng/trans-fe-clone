import React, { useEffect, useMemo, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { FormHelperText } from '@mui/material';
import { TextField } from '@mui/material';
import { useIntl } from 'react-intl';

interface MasterListData {
    file: File | null,
    startLine: number
}

interface MasterListDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: MasterListData, helpers: FormikHelpers<MasterListData>) => void;
    initialData?: MasterListData;
    methodProp: string;
    isEdit?: boolean;
}
const SUPPORTED_FORMATS = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
];


const MasterListDialog: React.FC<MasterListDialogProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
    methodProp,
    isEdit = false,
}) => {
    const intl = useIntl();
    const defaultValues: MasterListData = {
        file: null,
        startLine: 1,
    };
    const [fileTouched, setFileTouched] = useState(false);
    const [method, setMethod] = useState<string>(methodProp);
    useEffect(() => {
        setMethod(methodProp);
    }, [methodProp]);

    const validationSchema = useMemo(() => Yup.object().shape({
        file: Yup
            .mixed()
            .required(intl.formatMessage({ id: 'master-list.form.validation.file-required' }))
            .test(
                "fileFormat",
                intl.formatMessage({ id: 'master-list.form.validation.file-format' }),
                value => value && SUPPORTED_FORMATS.includes((value as File).type)
            ),
        startLine: Yup.number()
            .required(intl.formatMessage({ id: 'master-list.form.validation.start-line-required' })),
    }), [intl]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>
                {intl.formatMessage({ id: isEdit ? 'master-list.dialog.edit-title' : 'master-list.dialog.add-title' })}
            </DialogTitle>
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
                {(formik) => {
                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <DialogContent dividers>
                                <Grid container>
                                    <Grid size={12}>
                                        <InputLabel sx={{ marginBottom: 1.5 }} required>
                                            {intl.formatMessage({ id: 'master-list.method.label' })}
                                        </InputLabel>
                                        <FormControl fullWidth sx={{ marginBottom: 3 }}>
                                            <Select id="method" value={method} onChange={(e) => setMethod(e.target.value)} readOnly>
                                                <MenuItem value='import'>{intl.formatMessage({ id: 'master-list.method.import' })}</MenuItem>
                                                <MenuItem value='export'>{intl.formatMessage({ id: 'master-list.method.export' })}</MenuItem>
                                            </Select>
                                        </FormControl>

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
                                        </Stack>

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
                                    </Grid>
                                </Grid>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={onClose}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
                                <Button type="submit" variant="contained">
                                    {intl.formatMessage({ id: isEdit ? 'master-list.button.edit' : 'master-list.button.add' })}
                                </Button>
                            </DialogActions>
                        </form>
                    )
                }}
            </Formik>
        </Dialog >
    );
};

export default MasterListDialog;