import React, { useEffect, useState } from 'react';
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SxProps,
} from '@mui/material';
import { Theme } from '@mui/material';
import { getClientsTRASAS } from 'api/client';
import { FormHelperText } from '@mui/material';
import { useIntl } from 'react-intl';

interface TRASASCustomerSelectProps {
    formik?: any;
    name: string;
    label?: string;
    by?: string;
    required?: boolean;
    isReadOnly?: boolean;
    isFloating?: boolean;
    sx?: SxProps<Theme>;
    handleSelect?: (event: any, value: any) => Promise<any>,
}

const TRASASCustomerSelect: React.FC<TRASASCustomerSelectProps> = ({
    name,
    formik,
    label,
    required = false,
    by = 'id',
    isReadOnly = false,
    isFloating = false,
    sx,
    handleSelect
}) => {
    const intl = useIntl();
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | number | ''>(''); // Sử dụng useState để lưu giá trị đã chọn

    const [selectedOption, setSelectedOption] = useState<any | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const res = await getClientsTRASAS();
                if (mounted && res?.status === 'success') {
                    setOptions(res.data || []);
                } else if (mounted) {
                    setOptions([]);
                }
            } catch (e) {
                if (mounted) setOptions([]);
                console.error(e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        const selectedOption = options.find(o => {
            return by === 'id' ? o.id === selectedId : o.customer === selectedId;
        }) || null;
        setSelectedOption(selectedOption); // Cập nhật selectedOption khi selectedId thay đổi
    }, [selectedId, options]);

    const onChange = (event: any) => {
        const value = event.target.value;
        setSelectedId(value); // Cập nhật giá trị đã chọn
        formik?.setFieldValue(name, value);
        handleSelect && handleSelect(null, value);
    };

    return (
        <FormControl required={required} disabled={isReadOnly} sx={sx}>
            {label && (
                <InputLabel shrink={isFloating} id={`${name}-label`} required={required}>
                    {label ?? intl.formatMessage({ id: 'components.trasas-customer.label', defaultMessage: 'Customer' })}
                </InputLabel>
            )}
            <Select
                labelId={`${name}-label`}
                id={name}
                name={name}
                label={isFloating ? intl.formatMessage({ id: 'components.trasas-customer.label', defaultMessage: 'Customer' }) : ''}
                value={selectedId}
                onChange={onChange}
                displayEmpty
                renderValue={(value) => {
                    if (!value) return intl.formatMessage({ id: 'components.trasas-customer.placeholder', defaultMessage: 'Select customer' });
                    return selectedOption?.customer ?? value;
                }}
            >
                {loading && (
                    <MenuItem disabled>
                        <CircularProgress size={18} sx={{ mr: 1 }} />
                        {intl.formatMessage({ id: 'components.trasas-customer.loading', defaultMessage: 'Loading…' })}
                    </MenuItem>
                )}
                {!loading && options.length === 0 && (
                    <MenuItem disabled>{intl.formatMessage({ id: 'components.trasas-customer.no-options', defaultMessage: 'No data available' })}</MenuItem>
                )}
                {!loading &&
                    options.map((opt) => (
                        <MenuItem key={by === "id" ? opt.id : opt.customer} value={by === "id" ? opt.id : opt.customer}>
                            {opt.customer}
                        </MenuItem>
                    ))}
            </Select>
            {formik && formik.touched.customer && formik.errors.customer && (<FormHelperText error>{formik.errors.customer}</FormHelperText>)}
        </FormControl>
    );
};

export default TRASASCustomerSelect;