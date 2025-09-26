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

interface TRASASCustomerSelectProps {
    formik?: any;
    name: string;
    label?: string;
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
    isReadOnly = false,
    isFloating = false,
    sx,
    handleSelect
}) => {
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
        const selectedOption = options.find(o => o.id === selectedId) || null;
        setSelectedOption(selectedOption); // Cập nhật selectedOption khi selectedId thay đổi
    }, [selectedId, options]);

    const onChange = (event: any) => {
        const value = event.target.value;
        setSelectedId(value); // Cập nhật giá trị đã chọn
        handleSelect && handleSelect(null, value);
    };

    return (
        <FormControl required={required} disabled={isReadOnly} sx={sx}>
            {label && <InputLabel shrink={isFloating} id={`${name}-label`} required={required}>{label}</InputLabel>}
            <Select
                labelId={`${name}-label`}
                id={name}
                name={name}
                label={isFloating ? 'Khách hàng' : ''}
                value={selectedId}
                onChange={onChange}
                displayEmpty
                renderValue={(value) => {
                    if (!value) return 'Chọn khách hàng';
                    return selectedOption?.customer ?? value;
                }}
            >
                {loading && (
                    <MenuItem disabled>
                        <CircularProgress size={18} sx={{ mr: 1 }} /> Đang tải...
                    </MenuItem>
                )}
                {!loading && options.length === 0 && (
                    <MenuItem disabled>Không có dữ liệu</MenuItem>
                )}
                {!loading &&
                    options.map((opt) => (
                        <MenuItem key={opt.id} value={opt.id}>
                            {opt.customer}
                        </MenuItem>
                    ))}
            </Select>
            {formik && formik.touched.customer && formik.errors.customer && (<FormHelperText error>{formik.errors.customer}</FormHelperText>)}
        </FormControl>
    );
};

export default TRASASCustomerSelect;
