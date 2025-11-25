import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ClientType } from 'types/pages/client';
import MasterListDialog from './EditForm';
import MasterListTable, { Meta } from 'pages/apps/master-list/table/MasterListTable';
import { LabelKeyObject } from 'react-csv/lib/core';
import { Box, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Slide, Stack, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { CloseOutlined, DeleteOutlined, PlusOutlined, PullRequestOutlined, SearchOutlined } from '@ant-design/icons';
import TaxCodeAutocomplete from 'components/common/TaxCodeAutocomplete';
import { getClientDetail } from 'api/client';
import { addRow, addRowByExcel, deleteMasterList, deleteRow, downloadExcel, getColumns, getMasterListByTaxCode, getRow, updateMasterList, updateRow, uploadMasterList } from 'api/master-list';
import { APIResponse, APIResponsePagination } from 'types/response';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { extractMessagesFromErrors } from 'utils/validator';
import AlertDelete from 'components/common/AlertDelete';
import { EditRowDialog } from './table/EditRow';
import TRASASCustomerSelect from 'components/common/TRASASCustomerSelect';
import { Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';

const TRASAS_TAX_CODE = '0304184415';


export default function MasterListPage() {
    const intl = useIntl();
    const [method, setMethod] = useState<string>("import");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [columns, setColumns] = useState<LabelKeyObject[]>([]);
    const [masterListData, setMasterListData] = useState<any | null>([]);
    const [filterClient, setFilterClient] = useState<ClientType | null>(null);
    const [TRASASCustomerId, setTRASASCustomerId] = useState<number | undefined>(undefined);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(100);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>({});
    const [deleteRowId, setDeleteRowId] = useState<number>();
    const [updateRowId, setUpdateRowId] = useState<number>();


    const hasData = masterListData.length > 0 || searchTerm !== "";
    const isEditRow = Object.keys(selectedRow).length !== 0
    const handleSubmit = async (data: any) => {
        try {
            
            if (filterClient && hasData) {
                let response: APIResponse = await updateMasterList(method, filterClient?.tax_code, data.file, TRASASCustomerId, data.startLine);
                
                if (response.status === 'success') {

                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'master-list.notification.update-success' }),
                        close: true
                    } as SnackbarProps);
                    setOpenDialog(false);
                    setPageIndex(1);
                    fetchData();


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
            } else if (filterClient && !hasData) {

                let response: APIResponse = await uploadMasterList(method, filterClient?.tax_code, data.file, TRASASCustomerId, data.startLine);

                if (response.status === 'success') {

                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'master-list.notification.upload-success' }),
                        close: true
                    } as SnackbarProps);
                    setOpenDialog(false);
                    setPageIndex(1);
                    fetchData();

                } else if (response.status === "error") {
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        message: response.message,
                        close: true
                    } as SnackbarProps);
                }
            }
        } catch {
            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: hasData
                    ? intl.formatMessage({ id: 'master-list.notification.update-error' })
                    : intl.formatMessage({ id: 'master-list.notification.create-error' }),
                close: true
            } as SnackbarProps);
        }
    }

    const meta: Meta = {
        pageIndex,
        pageSize,
        totalCount,
        onPageChange: setPageIndex,
        onRowsPerPageChange: setPageSize,
    };

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
        setPageIndex(1);
    };

    const fetchData = async () => {
        if (filterClient) {

            if (filterClient.tax_code === TRASAS_TAX_CODE && !TRASASCustomerId) {
                // Nếu không có TRASASCustomerId thì không thực hiện gì và trả về dữ liệu rỗng
                setMasterListData([]);
                setColumns([]);
                setTotalCount(0);
                setPageIndex(1);
                return;
            }

            const columnsRes = await getColumns(filterClient?.tax_code, method, TRASASCustomerId);

            if (columnsRes.status === 'success') {
                setColumns(columnsRes.data);

                const masterListRes: APIResponsePagination = await getMasterListByTaxCode(filterClient?.tax_code, method, pageIndex, pageSize, searchTerm, TRASASCustomerId);


                if (masterListRes.status === 'success') {
                    setMasterListData(masterListRes.data);
                    setTotalCount(masterListRes.meta.total);
                    setPageIndex(masterListRes.meta.pageIndex);
                } else {
                    setMasterListData([]);
                    setColumns([]);
                    setTotalCount(0);
                    setPageIndex(1);
                }
            } else {
                setMasterListData([]);
                setColumns([]);
                setTotalCount(0);
                setPageIndex(1);
            }

        } else {
            setMasterListData([]);
            setColumns([]);
            setTotalCount(0);
            setPageIndex(1);
        }
    }

    useEffect(() => {

        fetchData();
    }, [filterClient, method, pageIndex, pageSize, searchTerm, totalCount, TRASASCustomerId])


    const handleSelect = async (event: any, value: any) => {
        if (!value) {
            setFilterClient(null);
            return;
        }
        try {
            const response: APIResponse = await getClientDetail(value);

            if (response.status === 'success') {
                setFilterClient(response.data);
            } else {
                setFilterClient(null);
            }
        } catch (error) {
            console.error('Error fetching selected item data:', error);
            setFilterClient(null);
        }
        setTRASASCustomerId(undefined)
    };

    const handleSelectCustomer = async (event: any, value: any) => {
        if (!value) {
            setTRASASCustomerId(undefined);
            return;
        }

        setTRASASCustomerId(value);
    }

    const handleEditClick = async (id: number | null) => {
        if (!filterClient) return;

        if (id === null) {
            setOpenEditDialog(true);
            setSelectedRow({});
            return;
        }
        const rowResponse: APIResponse = await getRow(filterClient?.tax_code, method, id, TRASASCustomerId);

        if (rowResponse.status === 'success') {
            setSelectedRow(rowResponse.data);
            setUpdateRowId(id);
        }
        setOpenEditDialog(true);
        return;
    };

    const handleDeleteClick = async (id: number) => {
        if (!filterClient) return;
        setOpenDeleteDialog(true);
        setDeleteRowId(id);
        return;
    };

    const handleDeleteMSLClick = async () => {
        if (!filterClient) return;
        setOpenDeleteDialog(true);
        return;
    };

    const updateRowsByExcelCallback = async (values: any, actions: any) => {

        if (!filterClient) return;

        let response: APIResponse = await addRowByExcel(method, filterClient?.tax_code, values.file, values.startLine, TRASASCustomerId);

        if (response.status === 'success') {

            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                message: intl.formatMessage({ id: 'master-list.notification.update-rows-success' }),
                close: true
            } as SnackbarProps);
            setOpenEditDialog(false);
            setPageIndex(1);
        } else {
            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: intl.formatMessage({ id: 'master-list.notification.excel-format-error' }),
                close: true
            } as SnackbarProps);
        }
    }

    const updateRowCallback = async (values: any, actions: any) => {
        if (!filterClient) return;


        if (isEditRow) {
            if (!filterClient || !updateRowId) return;
            try {
                const response: APIResponse = await updateRow(filterClient?.tax_code, method, updateRowId, values, TRASASCustomerId);

                if (response.status === 'success') {
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'master-list.notification.row-update-success' }),
                        close: true
                    } as SnackbarProps);
                    fetchData();
                    setOpenEditDialog(false);
                } else {
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
            } catch {
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    message: intl.formatMessage({ id: 'master-list.notification.row-update-error' }),
                    close: true
                } as SnackbarProps);
            }
        } else {
            try {
                const response: APIResponse = await addRow(filterClient?.tax_code, method, values, TRASASCustomerId);
                if (response.status === 'success') {
                    openSnackbar({
                        open: true,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        message: intl.formatMessage({ id: 'master-list.notification.row-create-success' }),
                        close: true
                    } as SnackbarProps);
                    fetchData();
                    setOpenEditDialog(false);

                } else {
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
            } catch {
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    message: intl.formatMessage({ id: 'master-list.notification.row-create-error' }),
                    close: true
                } as SnackbarProps);
            }
        }
    }

    const deleteRowCallback = async () => {
        if (!filterClient || !deleteRowId) return;

        try {
            const response: APIResponse = await deleteRow(filterClient?.tax_code, method, deleteRowId, TRASASCustomerId);
            if (response.status === "success") {
                fetchData();
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    message: intl.formatMessage({ id: 'master-list.notification.row-delete-success' }),
                    close: true
                } as SnackbarProps);
                setOpenDeleteDialog(false);
            }
        } catch {
            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: intl.formatMessage({ id: 'master-list.notification.row-delete-error' }),
                close: true
            } as SnackbarProps);
            setOpenDeleteDialog(false);
        }

        setDeleteRowId(undefined);
    }

    const deleteMasterlist = async () => {
        if (!filterClient) return;

        try {
            const response: APIResponse = await deleteMasterList(filterClient?.tax_code, method, TRASASCustomerId);
            if (response.status === "success") {
                fetchData();
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    message: intl.formatMessage({ id: 'master-list.notification.delete-success' }),
                    close: true
                } as SnackbarProps);
                setOpenDeleteDialog(false);
            }
        } catch {
            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: intl.formatMessage({ id: 'master-list.notification.delete-error' }),
                close: true
            } as SnackbarProps);
            setOpenDeleteDialog(false);
        }
    }

    const downloadFile = async () => {
        // Trình duyệt sẽ tự hiểu là phải tải về file chứ không hiển thị
        if (!filterClient) return;
        let res = await downloadExcel(filterClient?.tax_code, method, TRASASCustomerId)
        if (res.status === 'success') {
            let path = res.master_list_excel_path;
            window.location.href = `${import.meta.env.VITE_APP_API_URL}${path}`;
        }
    };

    return (
        <>
            <MasterListDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                methodProp={method}
                onSubmit={handleSubmit}
                isEdit={hasData}
            />

            <EditRowDialog onSubmit={updateRowCallback} onUpdateByExcel={updateRowsByExcelCallback} onClose={() => setOpenEditDialog(false)} open={openEditDialog} isEdit={isEditRow} initialData={selectedRow} schemas={columns} />

            <AlertDelete alertMethod={deleteRowId ? deleteRowCallback : deleteMasterlist} open={openDeleteDialog} handleClose={() => setOpenDeleteDialog(false)} />

            <MasterListTable
                columnHeaders={columns}
                rowData={masterListData}
                hasExcel={hasData}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                excelCallback={downloadFile}
                meta={meta}
                title={
                    <Stack sx={{ paddingRight: 2 }} direction={{ xs: 'column', sm: 'row' }} width='100%' justifyContent='space-between'>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={3} alignItems={{ xs: 'start', sm: 'center' }}>
                            <FormControl sx={{ width: { xs: '100%', sm: 200 } }}>
                                <InputLabel id="method">{intl.formatMessage({ id: 'master-list.method.label' })}</InputLabel>
                                <Select
                                    id='method'
                                    value={method}
                                    onChange={(event) => {
                                        setMethod(event.target.value as string)
                                        setPageIndex(1)
                                    }}
                                    displayEmpty
                                    slotProps={{ input: { 'aria-label': intl.formatMessage({ id: 'master-list.method.select-placeholder' }) } }}
                                >
                                    <MenuItem value='import'>{intl.formatMessage({ id: 'master-list.method.import' })}</MenuItem>
                                    <MenuItem value='export'>{intl.formatMessage({ id: 'master-list.method.export' })}</MenuItem>
                                </Select>
                            </FormControl>

                            <Stack sx={{ minWidth: { xs: '100%', sm: 'unset' } }}>
                                <TaxCodeAutocomplete name='taxCode' isFloating={true} handleSelect={handleSelect} sx={{ width: { sm: 200 } }} />
                            </Stack>

                            {filterClient?.tax_code === TRASAS_TAX_CODE && <Stack sx={{ minWidth: { xs: '100%', sm: 'unset' } }}>
                                <TRASASCustomerSelect
                                    name='customer'
                                    label={intl.formatMessage({ id: 'master-list.customer.label' })}
                                    isFloating={true}
                                    sx={{ width: { sm: 200 } }}
                                    handleSelect={handleSelectCustomer}
                                />
                            </Stack>}


                            <Slide direction="left" in={showSearch} mountOnEnter unmountOnExit>
                                <Box alignItems='center'
                                    sx={{
                                        position: "fixed",
                                        display: 'flex',
                                        top: 80,
                                        right: 30,
                                        bgcolor: "background.paper",
                                        boxShadow: 3,
                                        borderRadius: 1,
                                        p: 1,
                                        zIndex: 1200,
                                    }}
                                >
                                    {hasData && <TextField
                                        id="outlined-basic"
                                        label={intl.formatMessage({ id: 'master-list.search.label' })}
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        sx={{ width: { sm: 500 }, marginRight: 2 }}
                                    />}

                                    <IconButton color='secondary' onClick={() => setShowSearch((prev) => !prev)}>
                                        <CloseOutlined />
                                    </IconButton>
                                </Box>
                            </Slide>
                        </Stack>
                        {filterClient &&
                            <Stack sx={{ mt: { xs: 2, sm: 0 } }} direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems='center'>

                                {hasData && ((filterClient.tax_code === TRASAS_TAX_CODE && TRASASCustomerId)
                                    || filterClient.tax_code !== TRASAS_TAX_CODE) && (
                                        <ButtonGroup
                                            variant="text"
                                            aria-label={intl.formatMessage({ id: 'master-list.actions.group-aria-label' })}
                                            sx={{
                                                "& span": {
                                                    fontSize: "17px",
                                                },
                                            }}
                                        >
                                            <Tooltip title={intl.formatMessage({ id: 'master-list.action.search' })}>
                                                <Button key="one" onClick={() => setShowSearch((prev) => !prev)} sx={{ p: 1 }}>
                                                    <SearchOutlined />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip title={intl.formatMessage({ id: 'master-list.action.add-row' })}>
                                                <Button key="two" onClick={() => handleEditClick(null)} sx={{ p: 1 }}>
                                                    <PlusOutlined />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip title={intl.formatMessage({ id: 'master-list.action.delete-all' })}>
                                                <Button key="three" color="error" onClick={() => handleDeleteMSLClick()} sx={{ p: 1 }}>
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    )}

                                <Button variant="contained" startIcon={hasData ? <PullRequestOutlined /> : <PlusOutlined />} onClick={() => setOpenDialog(true)}>
                                    {intl.formatMessage({ id: hasData ? 'master-list.button.edit' : 'master-list.button.add' })}
                                </Button>
                            </Stack>
                        }
                    </Stack>
                }
            />
        </>
    );
}

