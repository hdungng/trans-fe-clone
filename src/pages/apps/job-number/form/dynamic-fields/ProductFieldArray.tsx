import React from 'react';
import {
    Grid,
    Stack,
    InputLabel,
    TextField,
    Autocomplete,
    MenuItem,
} from '@mui/material';
import { FastField, FieldProps } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import { useIntl } from 'react-intl';
import { formatFieldLabel } from './fieldLabels';

/** ------------ Kiểu dữ liệu ------------ */
export interface OptionField {
    code?: string;
    label?: string;
}

export interface FieldConfig {
    key: string;
    label: string;
    readOnly?: boolean;
    type: string;
    required: boolean;
    options?: OptionField[];
    method?: string;
}

export interface GridSize {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export interface ProductFormFieldsProps {
    /** Cấu hình từng ô input */
    fields: FieldConfig[];
    /** Vị trí phần tử trong FieldArray */
    index: number;
    /** Tên mảng FieldArray trong Formik values */
    arrayName: string;
    /** Kích thước lưới cho từng ô */
    gridSize?: GridSize;
}

/** ------------ Component ------------ */
const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
    fields,
    index,
    arrayName,
    gridSize = { xs: 12, sm: 6, lg: 3 },
}) => {
    const intl = useIntl();

    return (
        <Grid container spacing={2}>
            {fields.map((field) => {
                const fieldName = `${arrayName}[${index}].${field.key}`;
                const label = formatFieldLabel(
                    { ...field, method: field.method ?? 'import' },
                    intl,
                );

                return (
                    <Grid size={{ ...gridSize }} key={fieldName}>
                        <Stack sx={{ gap: 1 }}>
                            <InputLabel required={field.required}>{label}</InputLabel>
                            <FastField name={fieldName}>
                                {({ field: formikField, meta, form }: FieldProps) => {
                                    const error = meta.touched && Boolean(meta.error);
                                    const helperText = meta.touched && meta.error;
                                    /** ----- Autocomplete (comboBox) ----- */
                                    if (field.type === 'comboBox') {
                                        const selected =
                                            field.options?.find((opt) => opt.code === formikField.value) ||
                                            null;
                                        return (
                                            <Autocomplete
                                                fullWidth
                                                readOnly={field.readOnly}
                                                options={field.options ?? []}
                                                getOptionLabel={(opt) =>
                                                    [opt.code, opt.label].filter(Boolean).join(' - ')
                                                }
                                                value={selected}
                                                onChange={(_, sel) =>
                                                    form.setFieldValue(fieldName, sel?.code || '')
                                                }
                                                onBlur={() => form.setFieldTouched(fieldName, true)}
                                                isOptionEqualToValue={(opt, val) => opt.code === val.code}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={error}
                                                        helperText={helperText}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        );
                                    }

                                    /** ----- DatePicker ----- */
                                    if (field.type === 'date') {
                                        return (
                                            <DatePicker
                                                format="dd/MM/yyyy"
                                                value={
                                                    formikField.value ? new Date(formikField.value) : null
                                                }
                                                onChange={(d) => {
                                                    const iso = d ? d.toISOString().split('T')[0] : '';
                                                    form.setFieldValue(fieldName, iso);
                                                }}
                                                readOnly={field.readOnly}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error,
                                                        helperText,
                                                    },
                                                }}
                                            />
                                        );
                                    }

                                    /** ----- TextField select ----- */
                                    if (field.type === 'select') {
                                        return (
                                            <TextField
                                                {...formikField}
                                                select
                                                fullWidth
                                                inputProps={{ readOnly: field.readOnly }}
                                                error={error}
                                                helperText={helperText}
                                            >
                                                {(field.options ?? []).map((opt, idx) => (
                                                    <MenuItem key={idx} value={opt.code}>
                                                        {opt.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        );
                                    }
                                    /** ----- TextField mặc định ----- */
                                    return (
                                        <TextField
                                            {...formikField}
                                            type={field.type}
                                            fullWidth
                                            inputProps={{ readOnly: field.readOnly }}
                                            error={error}
                                            helperText={helperText}
                                        />
                                    );
                                }}
                            </FastField>
                        </Stack>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ProductFormFields;