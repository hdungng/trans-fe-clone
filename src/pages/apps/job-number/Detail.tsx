import MainCard from 'components/MainCard';
import { Alert, AppBar, Dialog, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Toolbar, useTheme } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { JobNumber } from 'types/pages/job-number';
import { Box } from '@mui/material';
import { CloseCircleOutlined, DeleteOutlined, DownOutlined, FileOutlined, InfoCircleFilled, InfoCircleTwoTone, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { ClientType } from 'types/pages/client';
import { useNavigate, useParams } from 'react-router';
import { deleteJobNumber, getExtract, getJobNumberById, getProjectFiles } from 'api/job-number';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { loadInitialFiles } from 'utils/certificateUtil';
import { getClientDetail } from 'api/client';
import { formatDate, formatTime } from 'utils/formatDate';
import AlertDelete from 'components/common/AlertDelete';
import { IconButton } from '@mui/material';
import JobNumberEdit from './Edit';
import { ExportExtractResponse, ExtractResponse, ImportExtractResponse, ImportProduct } from 'types/pages/form-field';
import { Chip } from '@mui/material';
import ExpandTable from 'pages/apps/job-number/tables/ExpandTable';
import { ColumnDef } from '@tanstack/react-table';
import { CrossCheckTableDataProps } from 'types/table';
import { Tab } from '@mui/material';
import TabDetail1 from './tabs/import/detail/TabDetail1';
import TabDetail2 from './tabs/import/detail/TabDetail2';
import TabDetailExport1 from './tabs/export/detail/TabDetailExport1';
import TabDetailExport2 from './tabs/export/detail/TabDetailExport2';
import { getExtractProducts } from 'api/extract_product';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { APIResponse } from 'types/response';
import ProductCheckTable from './tables/ProductCheckTable';
import { DialogContent } from '@mui/material';
import CrossCheckTable from './tables/CrossCheckTable';
import { Skeleton } from '@mui/material';
import { isEmptyObject } from 'utils/object';
import { fetchCOCheckData, fetchCOCheckProduct, fetchCrossCheckProductWithMSL, fetchGeneralCheckData, fetchHCCheck, fetchProductCheckData, fetchSummaryIssues, fetchVFTACheck, getTimesJob } from './services/jobService';
import { getRexCodeCheck } from 'api/cross-check';
import { TextField } from '@mui/material';
import { useIntl } from 'react-intl';


export default function JobNumberDetailPage() {
    const { id } = useParams<{ id: string }>();
    const theme = useTheme();
    const intl = useIntl();

    const navigate = useNavigate();


    const [openEdit, setOpenEdit] = useState(false);

    const [jobNumberData, setJobNumberData] = useState<JobNumber>();

    const [initialGeneralCheckData, setInitialGeneralCheckData] = useState<ExtractResponse>();
    const [initialExtractValue, setInitialExtractValue] = useState<ExtractResponse>();
    const [generalCheckData, setGeneralCheckData] = useState<any>([]);
    const [productCheckData, setProductCheckData] = useState<any>([]);
    const [summaryIssues, setSummaryIssues] = useState<any>([]);

    const [COCheckData, setCOCheckData] = useState<any>([]);
    const [crossCheckMSLData, setCrossCheckMSLData] = useState<any>([]);
    const [COProductData, setCOProductData] = useState<any>([]);
    const [HCData, setHCData] = useState<any>([]);
    const [productData, setProductData] = useState<ImportProduct>();

    const [client, setClient] = useState<ClientType>();
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [tabValue, setTabValue] = useState(1);
    const [menuValue, setMenuValue] = useState(1);
    const [tabCrossCheckValue, setTabCrossCheckValue] = useState(1);

    const isImportProductTab = tabValue === 3 && (jobNumberData?.method === 'import') && Array.isArray(productData)
    const isExportProductTab = tabValue === 3 && (jobNumberData?.method === 'export') && Array.isArray(productData)

    const [seconds, setSeconds] = useState(0);
    const [secondsExtract, setSecondsExtract] = useState(0);
    const [uploadSec, setUploadSec] = useState(0);

    const isCOCheckDataNotExist = !COCheckData || !COCheckData.rows || COCheckData.rows.length === 0;
    const isGeneralCheckDataNotExist = !generalCheckData || !generalCheckData.rows || generalCheckData.rows.length === 0;
    const isProductCheckNotExist = !productCheckData || isEmptyObject(productCheckData) || productCheckData.length === 0;
    const isCOProductDataNotExist = COProductData.length === 0 || COProductData.every((item: any) => item.issues.length === 0);
    const isCrossCheckMSLDataExist = crossCheckMSLData.length === 0 || crossCheckMSLData.every((item: any) => item.issues.length === 0);
    const isHCNoData = !HCData || !HCData.rows || HCData.rows.length === 0;


    const [EVFTACheckData, setEVFTACheckData] = useState<any>([]);
    const [rexCodeData, setRexCodeData] = useState<string | null>(EVFTACheckData.rex_code);
    const [RESCodeStatus, setRESCodeStatus] = useState<any>();
    const [isRESLoading, setRESIsLoading] = useState<boolean>(false);
    const isEVFTACheckDataExist = Array.isArray(EVFTACheckData.comments) && EVFTACheckData.comments.length > 0;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (rexCodeData && jobNumberData) {
            await getRexCode(rexCodeData)
        }

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRexCodeData(e.target.value);
    };


    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleMenuChange = (_event: React.SyntheticEvent, newValue: number) => {
        setMenuValue(newValue);
    };

    const handleCrossCheckChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabCrossCheckValue(newValue);
    };

    const handleClickOpen = () => {
        setOpenEdit(true);
    };

    const handleClickDeleteOpen = () => {
        setOpenDelete(true);
    }

    const handleClose = () => {
        setOpenEdit(false);
        fetchJob(id ? id : "");
    };

    const handleDeleteClose = () => {
        setOpenDelete(!openDelete);
    };

    const columns = useMemo<ColumnDef<CrossCheckTableDataProps>[]>(
        () => [
            {
                id: 'id',
                header: () => null,
                cell: ({ row }) =>
                    row.getCanExpand() ? (
                        <IconButton
                            {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: { cursor: 'pointer' },
                            }}
                        >
                            {row.getIsExpanded() ? <DownOutlined /> : <RightOutlined />}
                        </IconButton>
                    ) : null,
            },
            {
                id: 'item_code',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.item-code' }),
                cell: ({ row }) => row.original.item_code,
            },
            {
                id: 'item_name',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.item-name' }),
                cell: ({ row }) => row.original.item_name,
                minSize: 740,
            },
            {
                id: 'hs_code',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.hs-code' }),
                cell: ({ row }) => row.original.hs_code,
            },
            {
                id: 'quantity',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.quantity' }),
                cell: ({ row }) => row.original.quantity,
            },
            {
                id: 'country_of_origin_code',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.country-of-origin' }),
                cell: ({ row }) => `${row.original.country_of_origin_code || ''} - ${getLabelByCode(comboBoxData[5].data, row.original.country_of_origin_code || '')}`,
            },
            {
                id: 'quantity_unit',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.quantity-unit' }),
                cell: ({ row }) => `${row.original.quantity_unit || ''} - ${getLabelByCode(comboBoxData[40].data, row.original.quantity_unit || '')}`,
            },
            {
                id: 'secondary_quantity',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.secondary-quantity' }),
                cell: ({ row }) => row.original.secondary_quantity,
            },
            {
                id: 'secondary_quantity_unit',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.secondary-quantity-unit' }),
                cell: ({ row }) => `${row.original.secondary_quantity_unit || ''} - ${getLabelByCode(comboBoxData[40].data, row.original.secondary_quantity_unit || '')}`,
            },
            {
                id: 'invoice_unit_price',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.invoice-unit-price' }),
                cell: ({ row }) => row.original.invoice_unit_price,
            },
            {
                id: 'unit_price_currency_code',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.unit-price-currency' }),
                cell: ({ row }) => `${row.original.unit_price_currency_code || ''} - ${getLabelByCode(comboBoxData[18].data, row.original.unit_price_currency_code || '')}`,
            },
            {
                id: 'invoice_unit_price_unit',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.invoice-unit-price-unit' }),
                cell: ({ row }) => `${row.original.invoice_unit_price_unit || ''} - ${getLabelByCode(comboBoxData[40].data, row.original.invoice_unit_price_unit || '')}`,
            },
            {
                id: 'invoice_value',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.invoice-value' }),
                cell: ({ row }) => row.original.invoice_value,
            },
            {
                id: 'taxable_value',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.taxable-value' }),
                cell: ({ row }) => row.original.taxable_value,
            },
            {
                id: 'taxable_value_currency_code',
                header: intl.formatMessage({ id: 'job-number.detail.products.column.taxable-value-currency' }),
                cell: ({ row }) => `${row.original.taxable_value_currency_code || ''} - ${getLabelByCode(comboBoxData[18].data, row.original.taxable_value_currency_code || '')}`,
            },
        ],
        [intl]
    );

    const deleteClientCallback = async () => {
        try {
            if (!id) return;
            const response: APIResponse = await deleteJobNumber(id);
            if (response.status === "success") {
                openSnackbar({
                    open: true,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    message: intl.formatMessage({ id: 'job-number.detail.notification.delete-success' }),
                    close: true
                } as SnackbarProps);
                handleDeleteClose();
                navigate('/job-number/list')
            }
        } catch (error: any) {
            openSnackbar({
                open: true,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                message: error.message || intl.formatMessage({ id: 'job-number.detail.notification.delete-error' }),
                close: true
            } as SnackbarProps);
            handleClose();
        }
    }

    let taxCode: string = "";

    useEffect(() => {
        if (!id) return;

        fetchJob(id);
    }, [id, menuValue]);

    const fetchJob = async (jobNumberId: string) => {
        setIsLoading(true);

        try {
            const response = await getJobNumberById(jobNumberId);
            taxCode = response.tax_code;
            setJobNumberData(response);
            fetchClient();
            const res = await getProjectFiles(response.id);
            const result = await loadInitialFiles(import.meta.env.VITE_APP_API_URL, res.data);
            setFiles(result);

            // API Cross check
            if (response.status === "crosschecked" || menuValue === 2) {
                await Promise.allSettled([
                    getTimesJob(jobNumberId, setUploadSec, "upload"),
                    getTimesJob(jobNumberId, setSeconds, "crosscheck"),
                    fetchGeneralCheckData(jobNumberId, setGeneralCheckData),
                    fetchProductCheckData(jobNumberId, setProductCheckData),
                    fetchCOCheckData(jobNumberId, setCOCheckData),
                    fetchSummaryIssues(jobNumberId, setSummaryIssues),
                    fetchCrossCheckProductWithMSL(jobNumberId, setCrossCheckMSLData),
                    fetchCOCheckProduct(jobNumberId, setCOProductData),
                    fetchHCCheck(jobNumberId, setHCData),
                ]);

                await fetchVFTACheck(jobNumberId, setEVFTACheckData)

                if (EVFTACheckData) {
                    setRexCodeData(EVFTACheckData.rex_code)
                    if (EVFTACheckData.rex_code) {
                        await getRexCode(EVFTACheckData.rex_code)
                    }
                }
            }

            // API Extract
            if (response.status === "completed") {
                const initialExtractRes = await getExtract(response.id, response.method);
                getTimesJob(jobNumberId, setSecondsExtract, "extract"),
                    setInitialGeneralCheckData(initialExtractRes.data);
                setInitialExtractValue(initialExtractRes.data);

                let productRes: any = await getExtractProducts(response.id, response.method);

                if (productRes.status === 'success')
                    setProductData(productRes.data);

            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClient = async () => {
        const response: APIResponse = await getClientDetail(taxCode);
        setClient(response.data);
    }

    const openFile = (file: File) => {
        if (!file) return;

        const fileElement = file as File;

        if (fileElement.type !== 'application/pdf') {
            return;
        }

        const blobUrl = URL.createObjectURL(fileElement);

        window.open(blobUrl, '_blank', 'noopener,noreferrer');

        setTimeout(() => URL.revokeObjectURL(blobUrl), 0);
    }

    const getRexCode = async (rexCodeData: string) => {
        if (jobNumberData?.id) {
            setRESIsLoading(true);
            const resCodeStatusRes = await getRexCodeCheck(jobNumberData?.id, rexCodeData);
            setRESCodeStatus(resCodeStatusRes)
            setRESIsLoading(false);
        }
    }

    return (
        <MainCard title="" sx={{ width: '100%' }} style={{ fontSize: '20px' }}>
            <Box sx={{ position: 'relative', marginBottom: 3 }}>
                <Stack direction='row' sx={{ gap: 1, alignItems: 'center', justifyContent: 'end', width: 1 }}>
                    <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleClickOpen}>
                        {intl.formatMessage({ id: 'job-number.detail.action.edit' })}
                    </Button>
                    <Button variant="contained" color="error" startIcon={<DeleteOutlined />} onClick={handleClickDeleteOpen}>
                        {intl.formatMessage({ id: 'job-number.detail.action.delete' })}
                    </Button>
                </Stack>
            </Box>


            {jobNumberData && <>
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        {intl.formatMessage({ id: 'job-number.detail.section.job-info' })}
                    </Typography>
                    <Grid container spacing={2} sx={{ marginTop: 5 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.name' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {jobNumberData.name}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.method' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {intl.formatMessage({ id: `job-number.method.${jobNumberData.method}` })}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.created-by' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {jobNumberData.full_name}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.created-at' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(jobNumberData.created_at, 'dd/MM/yyyy hh:mm:ss')}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.note' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {jobNumberData.note}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.customs-procedure' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {intl.formatMessage({ id: `job-number.customs-procedure.${jobNumberData.customs_procedure_type}` })}
                            </Typography>
                        </Grid>

                        {jobNumberData.customer !== null && jobNumberData.customer !== undefined &&
                            (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.customer' })}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {jobNumberData.customer}
                                    </Typography>
                                </Grid>
                            )
                        }
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.field.status' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {jobNumberData.status === 'new' && <Chip label={intl.formatMessage({ id: 'job-number.status.new' })} variant="light" color="warning" />}
                                {jobNumberData.status === 'ready' && <Chip label={intl.formatMessage({ id: 'job-number.status.ready' })} variant="light" color="info" />}
                                {jobNumberData.status === 'crosschecked' && <Chip label={intl.formatMessage({ id: 'job-number.status.crosschecked' })} variant="light" color="error" />}
                                {jobNumberData.status === 'completed' && <Chip label={intl.formatMessage({ id: 'job-number.status.completed' })} variant="light" color="success" />}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        {intl.formatMessage({ id: 'job-number.detail.section.company-info' })}
                    </Typography>
                    <Grid container spacing={2} sx={{ marginTop: 5 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.company.name' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {client?.company_name}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.company.tax-code' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {client?.tax_code}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.company.address' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {client?.address}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.company.international-name' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {client?.international_name}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.company.sap-code' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {client?.sap_code}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">{intl.formatMessage({ id: 'job-number.detail.company.short-name' })}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {client?.short_name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <AlertDelete title={jobNumberData.name} alertMethod={deleteClientCallback} open={openDelete} handleClose={handleDeleteClose} />

                <Tabs value={menuValue} onChange={handleMenuChange} sx={{ mb: 5 }}>
                    {["ready", "crosschecked", "completed"].indexOf(jobNumberData.status) >= 0 && <Tab label={intl.formatMessage({ id: 'job-number.detail.tabs.documents' })} value={1} />}
                    {["crosschecked", "completed"].indexOf(jobNumberData.status) >= 0 && <Tab label={intl.formatMessage({ id: 'job-number.detail.tabs.crosscheck' })} value={2} />}
                    {jobNumberData.status === "completed" && <Tab label={intl.formatMessage({ id: 'job-number.detail.tabs.extract' })} value={3} />}
                </Tabs>


                {isLoading &&
                    <>
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                        <Skeleton animation="wave" height={50} />
                    </>
                }
                {!isLoading && menuValue == 1 && files.length !== 0 && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{intl.formatMessage({ id: 'job-number.detail.documents.table.column.name' })}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {files.map((file, index) => (
                                    <TableRow key={index} hover sx={{ cursor: 'pointer' }} onClick={() => openFile(file)}>
                                        <TableCell><FileOutlined style={{ marginRight: 12 }} />{file.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
                }

                {!isLoading && menuValue == 2 &&
                    <>
                        <Tabs value={tabCrossCheckValue} onChange={handleCrossCheckChange} sx={{ mb: 3 }}>
                            <Tab disabled={isLoading} label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.documents' })} value={1} />
                            {!(isCOCheckDataNotExist && isCOProductDataNotExist) && <Tab disabled={isLoading} label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.coo' })} value={2} />}
                            {!isHCNoData && <Tab disabled={isLoading} label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.health' })} value={3} />}
                            {isEVFTACheckDataExist && <Tab label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.evfta' })} value={4} />}
                            {/* <Tab disabled={isLoading} label="Phytosanitary certificate" value={4} /> */}
                        </Tabs>
                        <React.Fragment>
                            <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                {intl.formatMessage({ id: 'job-number.detail.alert.document-duration' }, { duration: formatTime(uploadSec) })}
                            </Alert>
                            <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                {intl.formatMessage({ id: 'job-number.detail.alert.crosscheck-duration' }, { duration: formatTime(seconds) })}
                            </Alert>
                            {tabCrossCheckValue === 1 &&
                                (
                                    <React.Fragment>
                                        {isGeneralCheckDataNotExist ? (
                                            <></>
                                        ) : (
                                            <CrossCheckTable
                                                title={intl.formatMessage({ id: 'job-number.detail.crosscheck.general.title' })}
                                                columnHeaders={generalCheckData.headers}
                                                rowData={generalCheckData.rows}
                                            />
                                        )}

                                        {Array.isArray(summaryIssues) && summaryIssues.length > 0 && (
                                            <Stack spacing={1} sx={{ my: 2 }}>
                                                {summaryIssues.map((msg: string, index: number) => (
                                                    <Alert key={index} severity="warning" variant="outlined">
                                                        {msg}
                                                    </Alert>
                                                ))}
                                            </Stack>
                                        )}
                                        {!isProductCheckNotExist && <ProductCheckTable data={productCheckData} title={intl.formatMessage({ id: 'job-number.detail.crosscheck.product.title' })} />}


                                        {!isCrossCheckMSLDataExist && (
                                            <ProductCheckTable data={crossCheckMSLData} title={intl.formatMessage({ id: 'job-number.detail.crosscheck.master-list.title' })} />
                                        )}
                                    </React.Fragment>
                                )
                            }

                            {tabCrossCheckValue === 2 &&
                                (
                                    <React.Fragment>
                                        {!isCOCheckDataNotExist && <CrossCheckTable
                                            title={intl.formatMessage({ id: 'job-number.detail.crosscheck.coo.title' })}
                                            columnHeaders={COCheckData.headers}
                                            rowData={COCheckData.rows}
                                        />}

                                        {!isCOProductDataNotExist && (
                                            <ProductCheckTable data={COProductData} title={intl.formatMessage({ id: 'job-number.detail.crosscheck.coo.product.title' })} />
                                        )}
                                    </React.Fragment>
                                )
                            }
                            {
                                tabCrossCheckValue === 3 && (
                                    <>
                                        <React.Fragment>
                                            {isHCNoData ? (
                                                <></>
                                            ) : (
                                                <CrossCheckTable
                                                    title={intl.formatMessage({ id: 'job-number.detail.crosscheck.health.title' })}
                                                    columnHeaders={HCData.headers}
                                                    rowData={HCData.rows}
                                                />
                                            )}
                                        </React.Fragment>
                                    </>
                                )
                            }

                            {
                                tabCrossCheckValue === 4 && (
                                    <>
                                        {isEVFTACheckDataExist && (
                                            <>
                                                <Stack spacing={1} sx={{ my: 2 }}>
                                                    {EVFTACheckData.declaration && <Alert color="info" variant="border" icon={<InfoCircleFilled />}>
                                                        {EVFTACheckData.declaration}
                                                    </Alert>}

                                                    {EVFTACheckData.comments.map((msg: string, index: number) => (
                                                        <Alert key={index} severity="warning" variant="outlined">
                                                            {msg}
                                                        </Alert>
                                                    ))}
                                                </Stack>

                                                <MainCard title={intl.formatMessage({ id: 'job-number.detail.evfta.card.title' })} sx={{
                                                    marginTop: 3,
                                                }}>

                                                    <Box
                                                        component="form"
                                                        onSubmit={handleSubmit}
                                                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                                                    >
                                                        <TextField
                                                            placeholder={intl.formatMessage({ id: 'job-number.detail.evfta.rex.placeholder' })}
                                                            variant="outlined"
                                                            sx={{ width: '500px' }}
                                                            value={rexCodeData}
                                                            onChange={handleInputChange}
                                                        />
                                                        <Button
                                                            disabled={!rexCodeData}
                                                            type="submit"
                                                            loading={isRESLoading}
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            {intl.formatMessage({ id: 'job-number.detail.evfta.rex.submit' })}
                                                        </Button>
                                                    </Box>

                                                    {RESCodeStatus && <Typography variant="h6" sx={{ mt: 3 }} color={RESCodeStatus.status === "success" ? 'success' : 'error'} gutterBottom>
                                                        {RESCodeStatus.status === "success"
                                                            ? intl.formatMessage({ id: 'job-number.detail.evfta.rex.valid' })
                                                            : intl.formatMessage({ id: 'job-number.detail.evfta.rex.invalid' })}
                                                    </Typography>}
                                                </MainCard>
                                            </>
                                        )
                                        }
                                    </>
                                )
                            }

                        </React.Fragment>
                    </>
                }

                {!isLoading && menuValue == 3 &&
                    (jobNumberData?.status === 'completed') &&
                    <>
                        <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                            {intl.formatMessage({ id: 'job-number.detail.alert.extract-duration' }, { duration: formatTime(secondsExtract) })}
                        </Alert>

                        {(jobNumberData?.method === 'import') && <Tabs value={tabValue} onChange={handleChange} sx={{ mb: 5 }}>
                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.general-1' })} value={1} />
                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.general-2' })} value={2} />
                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.products' })} value={3} />
                        </Tabs>}

                        {(jobNumberData?.method === 'export') && <Tabs value={tabValue} onChange={handleChange} sx={{ mb: 5 }}>
                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.export.tabs.general' })} value={1} />
                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.export.tabs.container' })} value={2} />
                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.export.tabs.products' })} value={3} />
                        </Tabs>}


                        {tabValue === 1 && (jobNumberData?.method === 'import') && (
                            <TabDetail1 initialGeneralCheckData={initialGeneralCheckData as ImportExtractResponse} />
                        )}

                        {tabValue === 2 && (jobNumberData?.method === 'import') && (
                            <TabDetail2 initialGeneralCheckData={initialGeneralCheckData as ImportExtractResponse} />
                        )}

                        {isImportProductTab &&
                            (<ExpandTable columns={columns} data={productData} method='import' />)
                        }


                        {tabValue === 1 && (jobNumberData?.method === 'export') && (
                            <TabDetailExport1 initialGeneralCheckData={initialGeneralCheckData as ExportExtractResponse} />
                        )}

                        {tabValue === 2 && (jobNumberData?.method === 'export') && (
                            <TabDetailExport2 initialGeneralCheckData={initialGeneralCheckData as ExportExtractResponse} />
                        )}

                        {isExportProductTab &&
                            (<ExpandTable columns={columns} data={productData} method='export' />)
                        }
                    </>
                }


                <Dialog
                    fullScreen
                    scroll="paper"
                    open={openEdit}
                    onClose={handleClose}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseCircleOutlined />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {intl.formatMessage({ id: 'job-number.detail.dialog.edit-title' })}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent sx={{ position: 'relative' }}>
                        <Box sx={{ padding: 7 }}>
                            <JobNumberEdit mode='edit' jobNumberIdProp={jobNumberData.id} initialData={{
                                jobNumber: jobNumberData.name,
                                taxCode: client?.tax_code ? client?.tax_code : '',
                                method: jobNumberData.method,
                                note: jobNumberData.note ? jobNumberData.note : '',
                                customer: jobNumberData.customer ? jobNumberData.customer : undefined,
                                customs_procedure_type: jobNumberData.customs_procedure_type?.toString(),
                                ignore_masterlist: jobNumberData.ignore_masterlist,
                            }}
                                status={jobNumberData.status}
                                initialFileData={{
                                    files,
                                }}
                                initialExtractData={initialExtractValue}
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
            </>}
        </MainCard >

    );
};

