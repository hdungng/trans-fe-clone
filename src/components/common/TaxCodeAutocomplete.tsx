import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import {
    Autocomplete,
    CircularProgress,
    InputLabel,
    SxProps,
    TextField,
} from '@mui/material';
import { getClientsByTaxCode } from 'api/client';
import { Theme } from '@mui/material';
import { useIntl } from 'react-intl';

interface TaxCodeAutocompleteProps {
    formik?: any;
    name: string;
    label?: string;
    required?: boolean;
    isReadOnly?: boolean;
    isFloating?: boolean;
    sx?: SxProps<Theme>;
    handleSelect: (event: any, value: any) => Promise<any>,
}

const TaxCodeAutocomplete: React.FC<TaxCodeAutocompleteProps> = ({
    formik,
    name,
    label,
    required = false,
    isReadOnly = false,
    isFloating = false,
    sx,
    handleSelect,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const intl = useIntl();

    const fetchOptions = useMemo(
        () =>
            debounce(async (query: string) => {
                if (!query) {
                    setOptions([]);
                    return;
                }

                setLoading(true);
                try {
                    const response = await getClientsByTaxCode(query);
                    if (response?.status === 'success') {
                        setOptions(response.data);
                    } else {
                        setOptions([]);
                    }
                } catch (err) {
                    console.error('Error fetching suggestions:', err);
                    setOptions([]);
                }
                setLoading(false);
            }, 700),
        [getClientsByTaxCode]
    );


    const debouncedSearch = useMemo(
        () =>
            debounce((raw: any) => {
                if (!raw) return handleSelect(null, null);
                const value = typeof raw === 'string' ? raw.trim() : raw;
                handleSelect(null, value);
            }, 300),
        []
    );

    useEffect(() => {
        fetchOptions(inputValue);
        return () => {
            fetchOptions.cancel();
        };
    }, [inputValue, fetchOptions]);

    return (
        // <Stack sx={{ gap: 1 }}>
        <>
            {label && <InputLabel required={required} id='taxCode' sx={{ mb: 1 }}>{label}</InputLabel>}
            <Autocomplete
                fullWidth
                options={options}
                loading={loading}
                loadingText={intl.formatMessage({ id: 'components.tax-code.loading', defaultMessage: 'Loading…' })}
                readOnly={isReadOnly}
                noOptionsText={intl.formatMessage({ id: 'components.tax-code.no-options', defaultMessage: 'No data available' })}
                freeSolo
                // onChange={handleSelect}
                value={formik?.values[name] || inputValue}
                filterOptions={(x) => x}
                sx={{ ...sx }}

                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                    debouncedSearch(newInputValue);
                    formik?.setFieldValue(name, newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id={name}
                        name={name}
                        placeholder={intl.formatMessage({
                            id: 'components.tax-code.placeholder',
                            defaultMessage: 'Enter tax code…',
                        })}
                        onChange={formik?.handleChange}
                        value={formik?.values[name]}
                        onBlur={formik?.handleBlur}
                        label={isFloating ? intl.formatMessage({ id: 'components.tax-code.label', defaultMessage: 'Tax code' }) : ''}
                        error={formik?.touched[name] && Boolean(formik?.errors[name])}
                        helperText={formik?.touched[name] && formik?.errors[name]}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </>
        // </Stack>
    );
};

export default TaxCodeAutocomplete;
