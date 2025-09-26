import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import {
    Autocomplete,
    CircularProgress,
    InputLabel,
    Stack,
    SxProps,
    TextField,
} from '@mui/material';
import { Theme } from '@mui/material';
import { getUsersFilter } from 'api/user';

type UserOption = { id: string | number; full_name: string };

interface UserAutocompleteProps {
    formik?: any;
    name: string;
    label?: string;
    required?: boolean;
    isReadOnly?: boolean;
    isFloating?: boolean;
    sx?: SxProps<Theme>;
    handleSelect?: (event: any, value: string | number | null) => Promise<any> | void;
}

const UserAutocomplete: React.FC<UserAutocompleteProps> = ({
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
    const [options, setOptions] = useState<UserOption[]>([]);
    const [selectedOption, setSelectedOption] = useState<UserOption | null>(null);
    const [loading, setLoading] = useState(false);

    // Gọi API lấy options theo query (debounce)
    const fetchOptions = useMemo(
        () =>
            debounce(async (query: string) => {
                if (!query?.trim()) {
                    setOptions([]);
                    return;
                }
                setLoading(true);
                try {
                    const response = await getUsersFilter(query);

                    if (response?.status === 'success') {
                        const dataDTO = response.data.map((element: any) => ({
                            id: element.id,
                            full_name: element.full_name
                        }));

                        setOptions(dataDTO as UserOption[]);
                    } else {
                        setOptions([]);
                    }
                } catch (err) {
                    console.error('Error fetching suggestions:', err);
                    setOptions([]);
                } finally {
                    setLoading(false);
                }
            }, 500),
        []
    );

    // cleanup debounce
    useEffect(() => {
        return () => {
            fetchOptions.cancel();
        };
    }, [fetchOptions]);

    return (
        <Stack sx={{ gap: 1 }}>
            {label && <InputLabel required={required}>{label}</InputLabel>}

            <Autocomplete<UserOption, false, false, false>
                fullWidth
                options={options}
                loading={loading}
                readOnly={isReadOnly}
                noOptionsText="Không có dữ liệu"
                value={selectedOption}
                getOptionLabel={(option) => option?.full_name ?? ''}
                isOptionEqualToValue={(option, value) => String(option.id) === String(value.id)}
                filterOptions={(x) => x}
                sx={{ ...sx }}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                    fetchOptions(newInputValue);
                }}
                onChange={(_, newOption) => {
                    setSelectedOption(newOption);
                    const newId = newOption ? newOption.id : null;
                    formik?.setFieldValue(name, newId);
                    handleSelect?.(null, newId);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id={name}
                        name={name}
                        placeholder="Nhập Tên người dùng..."
                        label={isFloating ? 'Tên người dùng' : ''}
                        onBlur={formik?.handleBlur}
                        error={formik?.touched?.[name] && Boolean(formik?.errors?.[name])}
                        helperText={formik?.touched?.[name] && formik?.errors?.[name]}
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
        </Stack>
    );
};

export default UserAutocomplete;
