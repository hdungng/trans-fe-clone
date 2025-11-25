
import { Stack, InputLabel, TextField, Autocomplete, Box } from '@mui/material';
import { FastField, Field, FieldProps } from 'formik';
import { GridSize } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { convertDateString } from 'utils/formatDate';
import { useIntl } from 'react-intl';
import { formatFieldLabel } from './fieldLabels';

interface OptionField {
  code?: string;
  label?: string;
  date?: string;
  note?: string;
}

interface Field {
    key: string;
    label: string;
    readOnly?: boolean;
    required: boolean;
    type: string;
    method: string;
    options: OptionField[]
}


interface DynamicFieldProps {
    field: Field;
    gridSize?: GridSize;
    onChangeProp?: any;
}

export const FieldRenderer = ({ field, onChangeProp }: DynamicFieldProps) => {
    const intl = useIntl();
    const label = formatFieldLabel(field, intl);

    return (
        <>
            <Box component="span" sx={{ display: 'none' }}>
                {field.key}
            </Box>
            <Box component="span" sx={{ display: 'none' }}>
                {field.method}
            </Box>
            <Stack sx={{ gap: 1 }}>
                <InputLabel required={field.required}>{label}</InputLabel>

                <FastField name={field.key}>
                    {({ field: formikField, meta, form }: FieldProps) => {
                        const error = meta.touched && Boolean(meta.error);
                        const helperText = meta.touched && meta.error;

                        if (field.type === 'comboBox') {
                            const selectedOption =
                                field.options?.find((opt) => opt.code === formikField.value) || null;

                            return (
                                <Autocomplete
                                    fullWidth
                                    readOnly={field.readOnly}
                                    options={field.options ?? []}
                                    getOptionLabel={(option) =>
                                        [option.code, option.label].filter(Boolean).join(' - ')
                                    }
                                    noOptionsText={intl.formatMessage({ id: 'common.autocomplete.no-data', defaultMessage: 'No data' })}
                                    loadingText={intl.formatMessage({ id: 'common.autocomplete.loading', defaultMessage: 'Loading…' })}
                                    value={selectedOption}
                                    onChange={(_, selected) => {
                                        form.setFieldValue(field.key, selected?.code || '');
                                        if (onChangeProp !== null) onChangeProp(selected?.code);
                                    }}
                                    onBlur={() => form.setFieldTouched(field.key, true)}
                                    isOptionEqualToValue={(option, value) => option.code === value.code}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            {[option.code, option.label, option.date, option.note]
                                                .filter(Boolean)
                                                .join(' | ')}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name={field.key}
                                            error={error}
                                            helperText={helperText}
                                        />
                                    )}
                                />
                            );
                        }

                        if (field.type === 'date') {
                            return (
                                <DatePicker
                                    format="dd/MM/yyyy"
                                    value={formikField.value ? new Date(formikField.value) : null}
                                    onChange={(date) => {
                                        const formatted = date
                                            ? date.toLocaleString('en-US').split('T')[0]
                                            : '';
                                        form.setFieldValue(field.key, convertDateString(formatted));
                                    }}
                                    readOnly={field.readOnly}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: error,
                                            helperText: helperText,
                                            sx: {
                                                '& .MuiPickersSectionList-root': {
                                                    padding: '11px 0px',
                                                },
                                            },
                                        },
                                    }}
                                />
                            );
                        }

                        // Default input
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
        </>
    );
};