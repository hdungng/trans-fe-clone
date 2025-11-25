import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
// material-ui
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { ColumnDef } from '@tanstack/react-table';

// project imports
import IconButton from 'components/@extended/IconButton';
// types
import { createClient, deleteClient, getClients, updateClient } from 'api/client';

// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DynamicTable, { ColumnFilterConfig, createFuzzyFilter } from 'components/common/DynamicTable';
import { ClientFormData, ClientType } from 'types/pages/client';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import AlertDelete from 'components/common/AlertDelete';
import ClientFormDialog from './FormDialog';
// import { FormOutlined } from '@ant-design/icons';
import { APIResponse } from 'types/response';

// ==============================|| CUSTOMER LIST ||============================== //

export default function ClientListPage() {
    const intl = useIntl();
    const [open, setOpen] = useState<boolean>(false);
    const [clientDeleteId, setClientDeleteId] = useState<any>('');
    const [clientUpdateId, setClientUpdateId] = useState<any>('');
    const [clientData, setClientData] = useState<any | null>([]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<ClientFormData>();

    let clientDelete = clientData.find((c: any) => c.id === clientDeleteId);

    const handleClose = () => {
        setOpen(!open);
    };

    const handleAddClick = () => {
        setEditingClient(undefined);
        setDialogOpen(true);
    };

    const handleEditClick = (client: ClientFormData) => {
        setEditingClient(client);
        setDialogOpen(true);
    };

    const handleSubmit = async (data: ClientFormData, { setSubmitting, setErrors }: any) => {
        try {
            if (editingClient) {
                const response: APIResponse = await updateClient(data, clientUpdateId);

                if (response.status === "success") {
                    fetchData();
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'client.update-success' }),
                        close: true
                    } as SnackbarProps);
                    setDialogOpen(false);
                }
            } else {
                const response: APIResponse = await createClient(data);

                if (response.status === "success") {
                    fetchData();
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'client.create-success' }),
                        close: true
                    } as SnackbarProps);
                    setDialogOpen(false);
                }
            }
        } catch (error: any) {
            if (error.data.errors) {
                setErrors(error.data.errors);
            }

            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error',
                    sx: { whiteSpace: 'pre-line' }
                },
                message: intl.formatMessage({ id: editingClient ? 'client.update-error' : 'client.create-error' }),

                close: false
            } as SnackbarProps);
        }
    };

    const deleteClientCallback = async () => {
        try {
            const response: APIResponse = await deleteClient(clientDeleteId);
            if (response.status === "success") {
                fetchData();
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    message: intl.formatMessage({ id: 'client.delete-success' }),
                    close: true
                } as SnackbarProps);
                handleClose();
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
                message: intl.formatMessage({ id: 'client.delete-error' }),
                close: true
            } as SnackbarProps);
            handleClose();
        }
    }

    const columns = useMemo<ColumnDef<ClientType>[]>(
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
                header: intl.formatMessage({ id: 'client.table.company-name' }),
                accessorKey: 'company_name',
            },
            {
                header: intl.formatMessage({ id: 'client.table.tax-code' }),
                accessorKey: 'tax_code'
            },
            {
                header: intl.formatMessage({ id: 'client.table.address' }),
                accessorKey: 'address',
                enableGlobalFilter: false
            },
            {
                header: intl.formatMessage({ id: 'client.table.sap-code' }),
                accessorKey: 'sap_code',
                enableGlobalFilter: false
            },
            {
                header: intl.formatMessage({ id: 'client.table.international-name' }),
                accessorKey: 'international_name',
                enableGlobalFilter: false
            },
            {
                header: intl.formatMessage({ id: 'client.table.short-name' }),
                accessorKey: 'short_name',
                enableGlobalFilter: false
            },
            {
                header: intl.formatMessage({ id: 'client.table.customer' }),
                accessorKey: 'customer',
                enableGlobalFilter: false
            },
            {
                header: intl.formatMessage({ id: 'client.table.actions' }),
                disableSortBy: true,
                enableGlobalFilter: false,
                cell: ({ row }) => {
                    return (
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Tooltip title={intl.formatMessage({ id: 'client.action.edit' })}>
                                <IconButton
                                    color="primary"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        setClientUpdateId(Number(row.original.id));
                                        handleEditClick(row.original)
                                    }}
                                >
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={intl.formatMessage({ id: 'client.action.delete' })}>
                                <IconButton
                                    color="error"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        setOpen(true);
                                        setClientDeleteId(Number(row.original.id));
                                    }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    );
                },
            }
        ],
        [intl]
    );

    const fetchData = async () => {
        const clients: any = await getClients();
        setClientData(clients);

        if (clients.status === 'success') {
            setClientData(clients.data);
        } else {
            setClientData([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const columnConfigs: ColumnFilterConfig = {
        tax_code: 'startsWith',
        company_name: 'includes',
    };

    const fuzzyFilter = createFuzzyFilter(columnConfigs);


    return (
        <>
            <DynamicTable
                {...{
                    data: clientData,
                    columns: columns,
                    hasSearchBar: true,
                    searchMessage: intl.formatMessage({ id: 'client.search.placeholder' }),
                    modalToggler: () => {
                        // setCustomerModal(true);
                        // selectedClient(null);
                        handleAddClick();
                    },
                    filename: 'clients',
                    fuzzyFilter
                }}
            >
            </DynamicTable>

            <ClientFormDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingClient}
                isEdit={!!editingClient}
            />
            <AlertDelete title={clientDelete?.company_name} alertMethod={deleteClientCallback} open={open} handleClose={handleClose} />
        </>
    );
}