import React from 'react';
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

interface NoteDialogFormData {
    note: string;
}
interface NoteDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: NoteDialogFormData, helpers: FormikHelpers<NoteDialogFormData>) => void;
    initialData?: NoteDialogFormData;
}
const validationSchema = Yup.object({
    note: Yup.string().required('Ghi chú là trường bắt buộc'),
});

const NoteDialog: React.FC<NoteDialogProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
}) => {
    const defaultValues: NoteDialogFormData = {
        note: initialData?.note || '',
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Cập nhật ghi chú</DialogTitle>
            <Formik
                initialValues={defaultValues}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange
                onSubmit={(values, actions) => {
                    onSubmit(values, actions);
                }}
                enableReinitialize
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent dividers>
                            <Grid container spacing={3}>
                                <Grid size={12}>
                                    <Stack sx={{ gap: 1 }}>
                                        <InputLabel required={true}>Ghi chú</InputLabel>
                                        <TextField
                                            id="note"
                                            name="note"
                                            placeholder="Nhập ghi chú"
                                            fullWidth
                                            value={formik.values.note}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.note && Boolean(formik.errors.note)}
                                            helperText={formik.touched.note && formik.errors.note}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={onClose}>Hủy</Button>
                            <Button type="submit" variant="contained">
                                Cập nhật
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog >
    );
};

export default NoteDialog;


