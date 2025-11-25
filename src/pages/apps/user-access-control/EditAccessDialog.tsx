import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Chip,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import { useIntl } from 'react-intl';
import { getUsers } from 'api/user';
import { getManagerDetail } from 'api/managers';

interface EditAccessDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any, helpers: FormikHelpers<any>) => void;
  initialData?: any;
}

const EditAccessDialog: React.FC<EditAccessDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const intl = useIntl();

  const [userData, setUserData] = useState<any[]>([]);
  const [managerDetail, setManagerDetail] = useState<any | null>(null);

  // Giá trị mặc định của form
  const defaultValues: any = {
    users: managerDetail?.users ?? initialData?.users ?? [],
  };

  // Lấy danh sách users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users: any = await getUsers();
        if (users?.status === 'success') {
          // Lọc chỉ những user có role là "User"
          const filteredUsers = (users.data ?? []).filter(
            (u: any) => u.role === 'User'
          );
          setUserData(filteredUsers);
        } else {
          setUserData([]);
        }
      } catch {
        setUserData([]);
      }
    };

    if (open) fetchUsers();
  }, [open]);

  // Lấy chi tiết manager theo id
  useEffect(() => {
    const fetchManagerDetail = async () => {
      if (!open || !initialData?.id) return;
      try {
        const res: any = await getManagerDetail(initialData.id);
        if (res?.status === 'success') {
          setManagerDetail(res.data ?? null);
        } else {
          setManagerDetail(null);
        }
      } catch {
        setManagerDetail(null);
      }
    };
    fetchManagerDetail();
  }, [open, initialData?.id]);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        users: Yup.array().of(Yup.number()),
      }),
    [intl]
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Cập nhật quản lý người dùng</DialogTitle>

      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={(values, actions) => {
          onSubmit(values,
            actions
          );
        }}
        enableReinitialize
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel required>
                      {intl.formatMessage({ id: 'user-access-control.table.column.name' })}
                    </InputLabel>
                    <TextField
                      id="userName"
                      name="userName"
                      disabled
                      placeholder={intl.formatMessage({ id: 'client.form.placeholder.company-name' })}
                      fullWidth
                      value={
                        managerDetail?.full_name ??
                        initialData?.full_name ??
                        ''
                      }
                    />
                  </Stack>
                </Grid>

                <Grid size={12}>
                  <Stack sx={{ gap: 1 }}>
                    <InputLabel required>
                      Assign người dùng
                    </InputLabel>

                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      options={userData}
                      value={
                        (formik.values.users as number[])
                          .map((id: number) => userData.find((user) => user.id === id))
                          .filter((user: any) => user !== undefined)
                      }
                      onChange={(_, value) =>
                        formik.setFieldValue(
                          'users',
                          value.map((v: any) => v.id)
                        )
                      }
                      isOptionEqualToValue={(opt, val) => opt.id === val.id}
                      getOptionLabel={(option: any) => option.full_name}
                      renderTags={(value, getTagProps) =>
                        value.map((option: any, index: number) => (
                          <Chip
                            variant="outlined"
                            label={option.full_name}
                            {...getTagProps({ index })}
                            key={option.id}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={intl.formatMessage({ id: 'user-access-control.edit.placeholder' })}
                          error={formik.touched.users && Boolean(formik.errors.users)}
                          helperText={formik.touched.users && (formik.errors.users as string)}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>{intl.formatMessage({ id: 'common.cancel' })}</Button>
              <Button type="submit" variant="contained">
                {intl.formatMessage({ id: 'client.form.button.submit.edit' })}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditAccessDialog;
