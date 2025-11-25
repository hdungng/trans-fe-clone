import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

// material-ui
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// third-party
import { ColumnDef } from '@tanstack/react-table';

// project imports
import IconButton from 'components/@extended/IconButton';
import DynamicTable, { ColumnFilterConfig, createFuzzyFilter } from 'components/common/DynamicTable';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { APIResponse } from 'types/response';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { Tooltip } from '@mui/material';
import { assignUser, getManagers } from 'api/managers';
import EditAccessDialog from './EditAccessDialog';

// ==============================|| User LIST ||============================== //

export default function UserAccessControlListPage() {
  const intl = useIntl();
  const [userUpdateId, setUserUpdateId] = useState<any>('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | undefined>(undefined);
  const [userData, setUserData] = useState<any | null>([]);

  const handleAddClick = () => {
    setEditingUser(undefined);
    setDialogOpen(true);
  };

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: any, { setSubmitting, setErrors }: any) => {
    try {
      const response: APIResponse = await assignUser(userUpdateId, data);

      if (response.status === "success") {
        fetchData();
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          message: intl.formatMessage({ id: 'user.create-success' }),
          close: true
        } as SnackbarProps);
        setDialogOpen(false);

      } else if (response.status === "error") {
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'error'
          },
          message: intl.formatMessage({ id: editingUser ? 'user.update-error' : 'user.create-error' }),
          close: true
        } as SnackbarProps);


        if (response.data.errors) {
          setErrors(response.data.errors);
        }
      }
    }
    catch (error) {
      console.log(error);

      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'error'
        },
        message: intl.formatMessage({ id: editingUser ? 'user.update-error' : 'user.create-error' }),
        close: true
      } as SnackbarProps);
    }
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: '#',
        meta: { className: 'cell-center' },
        enableGlobalFilter: false as any,
        cell: ({ row }) => row.index + 1
      },
      { header: intl.formatMessage({ id: 'user-access-control.table.column.name' }), accessorKey: 'full_name' },
      {
        id: 'users',
        header: intl.formatMessage({ id: 'user-access-control.table.column.user' }),
        accessorFn: (row) => ((row as any).users ?? []).join(', '),
        cell: ({ row }) => {
          const names = ((row.original as any).users ?? []) as string[];
          const MAX_VISIBLE = 5;
          const shown = names.slice(0, MAX_VISIBLE);
          const hiddenNames = names.slice(MAX_VISIBLE);

          return shown.length ? (
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              sx={{
                gap: 0.5,
                rowGap: 0.75,
                py: 0.5,
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                '& > *': { m: 0 }
              }}
            >
              {shown.map((n) => (
                <Chip key={n} label={n} size="small" sx={{ m: 0.25 }} />
              ))}
              {hiddenNames.length > 0 && (
                <Chip
                  label="…"
                  size="small"
                  variant="outlined"
                  sx={{ m: 0.25 }}
                  title={hiddenNames.join(', ')}
                />
              )}
            </Stack>
          ) : (
            <Typography variant="caption" color="text.secondary">
              —
            </Typography>
          );
        }
      },
      {
        id: 'userCount',
        header: intl.formatMessage({ id: 'user-access-control.table.column.user-count' }),
        accessorFn: (row) => ((row as any).users ?? []).length,
      },
      {
        header: intl.formatMessage({ id: 'user-access-control.table.column.actions' }),
        cell: ({ row }) => (
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Tooltip title={intl.formatMessage({ id: 'user.action.edit' })}>
              <IconButton
                color="primary"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setUserUpdateId(Number(row.original.id));
                  handleEditClick(row.original)
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      }
    ],
    [intl]
  );

  const fetchData = async () => {
    const response: any = await getManagers();

    if (response.status === 'success') {
      setUserData(response.data);
    } else {
      setUserData([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const columnFilterConfigs: ColumnFilterConfig = {
    email: 'includes',
    userCount: 'includes',
  };

  const fuzzyFilter = createFuzzyFilter(columnFilterConfigs);

  return (
    <>
      <DynamicTable
        {...{
          data: userData,
          searchMessage: intl.formatMessage({ id: 'user-access-control.table.search-placeholder' }),
          columns: columns,
          hasSearchBar: true,
          modalToggler: () => {
            handleAddClick();
          },
          showAddButton: false,
          filename: 'managers',
          fuzzyFilter
        }}
      >
      </DynamicTable>
      <EditAccessDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingUser}
      />
    </>
  );
}