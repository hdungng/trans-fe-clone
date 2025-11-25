import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

// material-ui
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { ColumnDef } from '@tanstack/react-table';

// project imports
import IconButton from 'components/@extended/IconButton';
// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
// import EyeOutlined from '@ant-design/icons/EyeOutlined';
// import PlusOutlined from '@ant-design/icons/PlusOutlined';
import DynamicTable, { ColumnFilterConfig, createFuzzyFilter } from 'components/common/DynamicTable';
import { UserFormData, UserType } from 'types/pages/user';
import { createUser, getUsers, updateUser, deleteUser } from 'api/user';
import UserFormDialog from './FormDialog';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import AlertDelete from 'components/common/AlertDelete';
import { extractMessagesFromErrors } from 'utils/validator';
import { APIResponse } from 'types/response';
import useAuth from 'hooks/useAuth';


// ==============================|| User LIST ||============================== //

export default function UserListPage() {
    const intl = useIntl();
    const { user } = useAuth();
    const isAdmin = user?.role === 'Admin';

    const [open, setOpen] = useState<boolean>(false);

    // const [UserModal, setUserModal] = useState<boolean>(false);
    const [userDeleteId, setUserDeleteId] = useState<any>('');
    const [userUpdateId, setUserUpdateId] = useState<any>('');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserFormData | undefined>(undefined);
    const [userData, setUserData] = useState<any | null>([]);

    let userDelete = userData.find((c: any) => c.id === userDeleteId);


    const handleClose = () => {
        setOpen(!open);
    };

    const handleAddClick = () => {
        setEditingUser(undefined);
        setDialogOpen(true);
    };

    const handleEditClick = (user: UserFormData) => {
        setEditingUser(user);
        setDialogOpen(true);
    };

    const handleSubmit = async (data: UserFormData, { setSubmitting, setErrors }: any) => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...dataToSend } = data;

        try {
            if (editingUser) {
                // setUsers(users.map(u => (u.email === editingUser.email ? data : u)));
                const response: APIResponse = await updateUser(dataToSend, userUpdateId);

                if (response.status === "success") {
                    fetchData();
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'user.update-success' }),
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
                        message: extractMessagesFromErrors(response.data.errors),
                        close: true
                    } as SnackbarProps);
                }

            } else {
                // setUsers([...users, data]);
                const response: APIResponse = await createUser(dataToSend);

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
        } catch (error) {
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

    const deleteUserCallback = async () => {
        try {
            // setUsers(users.map(u => (u.email === editingUser.email ? data : u)));
            const response: APIResponse = await deleteUser(userDeleteId);
            if (response.status === "success") {
                fetchData();
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    message: intl.formatMessage({ id: 'user.delete-success' }),
                    close: true
                } as SnackbarProps);
                handleClose();
            } else if (response.status === "error") {

                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    message: extractMessagesFromErrors(response.data.errors),
                    close: true
                } as SnackbarProps);
            }
        } catch (error) {
            console.log(error);

            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: intl.formatMessage({ id: 'user.delete-error' }),
                close: true
            } as SnackbarProps);
            handleClose();
        }
    }

    const columns = useMemo<ColumnDef<UserType>[]>(
        () => [
            {
                header: '#',
                meta: {
                    className: 'cell-center'
                },
                enableGlobalFilter: false,
                cell: ({ row }) => row.index + 1,
            },
            {
                header: intl.formatMessage({ id: 'user.form.label.email' }),
                accessorKey: 'email'
            },
            {
                header: intl.formatMessage({ id: 'user.table.full-name' }),
                accessorKey: 'full_name',
            },
            {
                header: intl.formatMessage({ id: 'user.table.role' }),
                accessorKey: 'role',
                enableGlobalFilter: false
            },
            {
                header: intl.formatMessage({ id: 'user.table.ip' }),
                accessorKey: 'ip',
                enableGlobalFilter: false
            },
            {
                header: intl.formatMessage({ id: 'user.table.actions' }),
                disableSortBy: true,
                cell: ({ row }) => {
                    return (
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
                            {isAdmin && <Tooltip title={intl.formatMessage({ id: 'user.action.delete' })}>
                                <IconButton
                                    color="error"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        setOpen(true);
                                        setUserDeleteId(Number(row.original.id));
                                    }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </Tooltip>}
                        </Stack>
                    );
                }
            }
        ],
        [intl]
    );

    const fetchData = async () => {
        const response: any = await getUsers();

        if (response.status === 'success') {
            const filteredData = response.data.filter(
                (user: any) => user.email !== 'admin@gmail.com'
            );
            setUserData(filteredData);
        } else {
            setUserData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])


    const columnFilterConfigs: ColumnFilterConfig = {
        email: 'includes',
        full_name: 'includes',
    };

    // Tạo fuzzy filter cho các cột bạn muốn
    const fuzzyFilter = createFuzzyFilter(columnFilterConfigs);

    return (
        <>
            <DynamicTable
                {...{
                    data: userData,
                    searchMessage: intl.formatMessage({ id: 'user.search.placeholder' }),
                    columns: columns,
                    hasSearchBar: true,
                    modalToggler: () => {
                        // setUserModal(true);
                        // selectedClient(null);
                        handleAddClick();
                    },
                    showAddButton: isAdmin,
                    filename: 'users',
                    fuzzyFilter
                }}
            >
            </DynamicTable>
            <AlertDelete title={userDelete?.full_name} alertMethod={deleteUserCallback} open={open} handleClose={handleClose} />
            <UserFormDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingUser}
                isEdit={!!editingUser}
            />
        </>
    );
}