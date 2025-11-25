import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  CircularProgress,
  InputLabel,
  Stack,
  SxProps,
  TextField,
} from '@mui/material';
import { Theme } from '@mui/material';
import { getUsers } from 'api/user';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();

  // Gọi API MỘT LẦN khi mount (tải toàn bộ user hoặc danh sách đủ lớn để lọc client-side)
  useEffect(() => {
    let isActive = true;
    (async () => {
      setLoading(true);
      try {
        // Nếu API yêu cầu query bắt buộc, có thể truyền '' hoặc một ký tự wildcard tùy backend.
        const response : any = await getUsers();
        if (!isActive) return;

        if (response.status === 'success') {
          const dataDTO: UserOption[] = response.data.map((el: UserOption) => ({
            id: el.id,
            full_name: el.full_name,
          }));
          setOptions(dataDTO);

          // Nếu formik có sẵn giá trị id, sync selectedOption tương ứng
          const currentId = formik?.values?.[name];
          if (currentId != null) {
            const found = dataDTO.find((u) => String(u.id) === String(currentId)) || null;
            setSelectedOption(found);
          }
        } else {
          setOptions([]);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setOptions([]);
      } finally {
        if (isActive) setLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack sx={{ gap: 1 }}>
      {label && <InputLabel required={required}>{label}</InputLabel>}

      <Autocomplete<UserOption, false, false, false>
        fullWidth
        options={options}
        loading={loading}
        readOnly={isReadOnly}
        noOptionsText={intl.formatMessage({ id: 'components.tax-code.no-options', defaultMessage: 'No data available' })}
        value={selectedOption}
        getOptionLabel={(option) => option?.full_name ?? ''}
        isOptionEqualToValue={(option, value) => String(option.id) === String(value.id)}
        // Dùng filter mặc định của MUI để lọc theo label trên client
        sx={{ ...sx }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
          // KHÔNG gọi API ở đây nữa
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
            label={
              isFloating
                ? intl.formatMessage({ id: 'components.user.label', defaultMessage: 'User' })
                : ''
            }
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
