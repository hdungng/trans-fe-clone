import MainCard from 'components/MainCard';
import {
    Alert,
    AppBar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import { JobNumber } from 'types/pages/job-number';
import { CloseCircleOutlined, DeleteOutlined, DownOutlined, DownloadOutlined, FileOutlined, InfoCircleFilled, InfoCircleTwoTone, PlusOutlined, RightOutlined } from '@ant-design/icons';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { ClientType } from 'types/pages/client';
import { useNavigate, useParams } from 'react-router';
import { deleteJobNumber, getExtract, getJobNumberById, getProjectFiles } from 'api/job-number';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { loadInitialFiles } from 'utils/certificateUtil';
import { exportExcelFile } from 'utils/excel';
import { getClientDetail, getClientsTRASAS } from 'api/client';
import { formatDate, formatTime } from 'utils/formatDate';
import AlertDelete from 'components/common/AlertDelete';
import JobNumberEdit from './Edit';
import { ExportExtractResponse, ExtractResponse, ImportExtractResponse, ImportProduct } from 'types/pages/form-field';
import ExpandTable from 'pages/apps/job-number/tables/ExpandTable';
import { ColumnDef } from '@tanstack/react-table';
import { CrossCheckTableDataProps } from 'types/table';
import TabDetail1 from './tabs/import/detail/TabDetail1';
import TabDetail2 from './tabs/import/detail/TabDetail2';
import TabDetailExport1 from './tabs/export/detail/TabDetailExport1';
import TabDetailExport2 from './tabs/export/detail/TabDetailExport2';
import { getExtractProducts } from 'api/extract_product';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { APIResponse } from 'types/response';
import ProductCheckTable from './tables/ProductCheckTable';
import CrossCheckTable from './tables/CrossCheckTable';
import { isEmptyObject } from 'utils/object';
import { downloadTotalInvoiceExcel, fetchCOCheckData, fetchCOCheckProduct, fetchCrossCheckProductWithMSL, fetchGeneralCheckData, fetchHCCheck, fetchProductCheckData, fetchSummaryIssues, fetchVFTACheck, getTimesJob } from './services/jobService';
import { getRexCodeCheck } from 'api/cross-check';
import { useIntl } from 'react-intl';
import CopyButton from 'components/common/CopyButton';
import { buildCrossCheckSheetConfigs } from './utils/crossCheckExport';


interface Customer {
    id: number;
    customer: string;
}

interface InfoBlockItem {
    label: string;
    value: React.ReactNode;
    fullWidth?: boolean;
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
    const displayValue =
        typeof value === 'string'
            ? value.trim() || '—'
            : value === null || value === undefined
                ? '—'
                : value;

    return (
        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.primary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 500 }}>
                {label}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                {displayValue}
            </Typography>
        </Stack>
    );
}

function InfoGrid({ items }: { items: InfoBlockItem[] }) {
    return (
        <Grid container spacing={2}>
            {items.map((item, index) => (
                <Grid key={`${item.label}-${index}`} size={{ xs: 12, sm: item.fullWidth ? 12 : 6 }}>
                    <InfoItem label={item.label} value={item.value} />
                </Grid>
            ))}
        </Grid>
    );
}

export default function JobNumberDetailPage() {
    const { id } = useParams<{ id: string }>();
    const theme = useTheme();
    const intl = useIntl();

    const navigate = useNavigate();


    const [openEdit, setOpenEdit] = useState(false);

    const [jobNumberData, setJobNumberData] = useState<JobNumber>();
    const [customerData, setCustomerData] = useState<Customer[]>([]);

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
    const [isExportingAll, setIsExportingAll] = useState(false);
    const [isExportingInvoice, setIsExportingInvoice] = useState(false);

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

    const crossCheckSheets = useMemo(
        () => buildCrossCheckSheetConfigs(intl, {
            documents: {
                general: !isGeneralCheckDataNotExist ? generalCheckData : null,
                products: !isProductCheckNotExist ? productCheckData : null,
                masterList: !isCrossCheckMSLDataExist ? crossCheckMSLData : null
            },
            coo: {
                crossCheck: !isCOCheckDataNotExist ? COCheckData : null,
                products: !isCOProductDataNotExist ? COProductData : null
            },
            health: {
                crossCheck: !isHCNoData ? HCData : null
            },
            evfta: isEVFTACheckDataExist ? {
                declaration: EVFTACheckData.declaration,
                comments: EVFTACheckData.comments
            } : undefined
        }),
        [
            intl,
            generalCheckData,
            isGeneralCheckDataNotExist,
            productCheckData,
            isProductCheckNotExist,
            crossCheckMSLData,
            isCrossCheckMSLDataExist,
            COCheckData,
            isCOCheckDataNotExist,
            COProductData,
            isCOProductDataNotExist,
            HCData,
            isHCNoData,
            EVFTACheckData,
            isEVFTACheckDataExist
        ]
    );

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

    const handleDownloadAll = async () => {
        if (!crossCheckSheets.length || isExportingAll) return;

        setIsExportingAll(true);
        const fallbackId = jobNumberData?.job_number ?? id ?? 'job';

        try {
            await exportExcelFile(`cross-check-${fallbackId}`, crossCheckSheets);
        } catch (error) {
            console.error(error);
            openSnackbar({
                open: true,
                message: intl.formatMessage({
                    id: 'job-number.detail.crosscheck.export-all.error',
                    defaultMessage: 'Không thể xuất Excel, vui lòng thử lại.'
                }),
                variant: 'alert',
                alert: { color: 'error' },
                close: true
            } as SnackbarProps);
        } finally {
            setIsExportingAll(false);
        }
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

    const handleExportInvoice = async () => {
        try {
            setIsExportingInvoice(true);
            let response : any = await downloadTotalInvoiceExcel(jobNumberData?.id || "", jobNumberData?.method || "export");
            if (response.status === "error") {
                openSnackbar({
                    open: true,
                    message: response.message.split(" cho project")[0],
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: true
                } as SnackbarProps);
            }
        } finally {
            setIsExportingInvoice(false);
        }
    };

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

            if (jobNumberData && jobNumberData.customer !== null && jobNumberData.customer !== undefined) {
                const res = await getClientsTRASAS()
                setCustomerData(res.data);
            }
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

    const statusChip = useMemo(() => {
        if (!jobNumberData) return null;

        let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';
        let labelId = '';

        switch (jobNumberData.status) {
            case 'new':
                color = 'warning';
                labelId = 'job-number.status.new';
                break;
            case 'ready':
                color = 'info';
                labelId = 'job-number.status.ready';
                break;
            case 'crosschecked':
                color = 'error';
                labelId = 'job-number.status.crosschecked';
                break;
            case 'completed':
                color = 'success';
                labelId = 'job-number.status.completed';
                break;
            default:
                break;
        }

        if (!labelId) {
            return null;
        }

        return <Chip variant="light" color={color} label={intl.formatMessage({ id: labelId })} />;
    }, [intl, jobNumberData]);

    const methodChip = useMemo(() => {
        if (!jobNumberData) return null;

        const methodColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' =
            jobNumberData.method === 'import' ? 'info' : 'success';

        return (
            <Chip
                variant="light"
                color={methodColor}
                label={intl.formatMessage({ id: `job-number.method.${jobNumberData.method}` })}
            />
        );
    }, [intl, jobNumberData]);

    const jobInfoItems = useMemo<InfoBlockItem[]>(() => {
        if (!jobNumberData) return [];

        const methodLabel = intl.formatMessage({ id: `job-number.method.${jobNumberData.method}` });
        const createdAtLabel = jobNumberData.created_at ? formatDate(jobNumberData.created_at, 'dd/MM/yyyy HH:mm:ss') : '';
        const customsLabel = jobNumberData.customs_procedure_type
            ? intl.formatMessage({ id: `job-number.customs-procedure.${jobNumberData.customs_procedure_type}` })
            : '';
        const customerName =
            jobNumberData.customer !== null && jobNumberData.customer !== undefined
                ? customerData.find((c: Customer) => c.id === jobNumberData.customer)?.customer || ''
                : '';

        const items: InfoBlockItem[] = [
            { label: intl.formatMessage({ id: 'job-number.detail.field.name' }), value: jobNumberData.name },
            { label: intl.formatMessage({ id: 'job-number.detail.field.method' }), value: methodChip ?? methodLabel },
            { label: intl.formatMessage({ id: 'job-number.detail.field.created-by' }), value: jobNumberData.full_name },
            { label: intl.formatMessage({ id: 'job-number.detail.field.created-at' }), value: createdAtLabel },
            { label: intl.formatMessage({ id: 'job-number.detail.field.customs-procedure' }), value: customsLabel },
        ];

        if (jobNumberData.customer !== null && jobNumberData.customer !== undefined) {
            items.push({
                label: intl.formatMessage({ id: 'job-number.detail.field.customer' }),
                value: customerName,
            });
        }

        items.push({
            label: intl.formatMessage({ id: 'job-number.detail.field.note' }),
            value: jobNumberData.note ?? '',
            fullWidth: true,
        });

        items.push({
            label: intl.formatMessage({ id: 'job-number.detail.field.status' }),
            value:
                statusChip ??
                intl.formatMessage({ id: `job-number.status.${jobNumberData.status as 'new' | 'ready' | 'crosschecked' | 'completed'}` }),
        });

        return items;
    }, [customerData, intl, jobNumberData, methodChip, statusChip]);

    const companyInfoItems = useMemo<InfoBlockItem[]>(
        () => [
            { label: intl.formatMessage({ id: 'job-number.detail.company.name' }), value: client?.company_name },
            { label: intl.formatMessage({ id: 'job-number.detail.company.tax-code' }), value: client?.tax_code },
            { label: intl.formatMessage({ id: 'job-number.detail.company.address' }), value: client?.address },
            { label: intl.formatMessage({ id: 'job-number.detail.company.international-name' }), value: client?.international_name },
            { label: intl.formatMessage({ id: 'job-number.detail.company.sap-code' }), value: client?.sap_code },
            { label: intl.formatMessage({ id: 'job-number.detail.company.short-name' }), value: client?.short_name },
        ],
        [client, intl]
    );

    const baseActionButtonSx = useMemo(
        () => ({
            minWidth: 140,
            fontWeight: 500,
            textTransform: 'none' as const,
            borderRadius: 1.5,
        }),
        []
    );

    const deleteActionButtonSx = useMemo(
        () => ({
            ...baseActionButtonSx,
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
            '&:hover': {
                borderColor: theme.palette.error.dark,
                backgroundColor: theme.palette.error.light,
            },
        }),
        [baseActionButtonSx, theme.palette.error.dark, theme.palette.error.light, theme.palette.error.main]
    );

    return (
        <MainCard content={false} sx={{ width: '100%' }}>
            <Box sx={{ p: { xs: 2.5, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    justifyContent="space-between"
                >
                    <Stack spacing={1} sx={{ width: '100%' }}>
                        <Typography variant="overline" color="text.secondary">
                            {intl.formatMessage({ id: 'job-number.detail.page-title', defaultMessage: 'Job Number Detail' })}
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }} flexWrap="wrap">
                            <Typography variant="h3" sx={{ wordBreak: 'break-word' }}>
                                {jobNumberData?.name ?? intl.formatMessage({ id: 'job-number.detail.section.job-info' })}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                                {statusChip}
                                {methodChip}
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                    >
                        <Button variant="outlined" startIcon={<PlusOutlined />} onClick={handleClickOpen} sx={baseActionButtonSx}>
                            {intl.formatMessage({ id: 'job-number.detail.action.edit' })}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteOutlined />}
                            onClick={handleClickDeleteOpen}
                            sx={deleteActionButtonSx}
                        >
                            {intl.formatMessage({ id: 'job-number.detail.action.delete' })}
                        </Button>
                    </Stack>
                </Stack>


                {jobNumberData && (
                    <>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 7 }}>
                                <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, height: '100%' }}>
                                    <Stack spacing={2}>
                                        <Typography variant="h6">
                                            {intl.formatMessage({ id: 'job-number.detail.section.job-info' })}
                                        </Typography>
                                        <InfoGrid items={jobInfoItems} />
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, height: '100%' }}>
                                    <Stack spacing={2}>
                                        <Typography variant="h6">
                                            {intl.formatMessage({ id: 'job-number.detail.section.company-info' })}
                                        </Typography>
                                        <InfoGrid items={companyInfoItems} />
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>

                        <AlertDelete title={jobNumberData.name} alertMethod={deleteClientCallback} open={openDelete} handleClose={handleDeleteClose} />

                        <Box sx={{ mt: 2 }}>
                            <Tabs value={menuValue} onChange={handleMenuChange} sx={{ mb: 3 }}>
                                {["ready", "crosschecked", "completed"].indexOf(jobNumberData.status) >= 0 && <Tab label={intl.formatMessage({ id: 'job-number.detail.tabs.documents' })} value={1} />}
                                {["crosschecked", "completed"].indexOf(jobNumberData.status) >= 0 && <Tab label={intl.formatMessage({ id: 'job-number.detail.tabs.crosscheck' })} value={2} />}
                                {jobNumberData.status === 'completed' && <Tab label={intl.formatMessage({ id: 'job-number.detail.tabs.extract' })} value={3} />}
                            </Tabs>

                            {isLoading && (
                                <Stack spacing={1.5}>
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                </Stack>
                            )}

                            {!isLoading && menuValue === 1 && files.length !== 0 && (
                                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{intl.formatMessage({ id: 'job-number.detail.documents.table.column.name' })}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {files.map((file, index) => (
                                                <TableRow key={index} hover sx={{ cursor: 'pointer' }} onClick={() => openFile(file)}>
                                                    <TableCell>
                                                        <FileOutlined style={{ marginRight: 12 }} />
                                                        {file.name}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}

                            {!isLoading && menuValue == 2 &&
                                <>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
                                        <Tabs value={tabCrossCheckValue} onChange={handleCrossCheckChange} sx={{ flexGrow: 1 }}>
                                            <Tab disabled={isLoading} label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.documents' })} value={1} />
                                            {!(isCOCheckDataNotExist && isCOProductDataNotExist) && <Tab disabled={isLoading} label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.coo' })} value={2} />}
                                            {!isHCNoData && <Tab disabled={isLoading} label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.health' })} value={3} />}
                                            {isEVFTACheckDataExist && <Tab label={intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.evfta' })} value={4} />}
                                            {/* <Tab disabled={isLoading} label="Phytosanitary certificate" value={4} /> */}
                                        </Tabs>
                                    </Box>
                                    <React.Fragment>
                                        <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                            {intl.formatMessage({ id: 'job-number.detail.alert.document-duration' }, { duration: formatTime(uploadSec) })}
                                        </Alert>
                                        <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                            {intl.formatMessage({ id: 'job-number.detail.alert.crosscheck-duration' }, { duration: formatTime(seconds) })}
                                        </Alert>

                                        <Stack direction='row' sx={{ gap: 1, alignItems: 'center', justifyContent: 'end', width: 1, marginBottom: 3 }}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<FileOutlined />}
                                                onClick={handleExportInvoice}
                                                disabled={isExportingInvoice}
                                            >
                                                {intl.formatMessage({ id: 'job-number.edit.process.button.export-total-invoice', defaultMessage: 'Export total invoice' })}
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<DownloadOutlined />}
                                                onClick={handleDownloadAll}
                                                disabled={isExportingAll || !crossCheckSheets.length}
                                            >
                                                {intl.formatMessage({ id: 'job-number.detail.crosscheck.actions.download-all', defaultMessage: 'Tải tất cả' })}
                                            </Button>
                                        </Stack>
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
                                                    <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mb: 1 }}>
                                                        <CopyButton
                                                            variant="icon"
                                                            tooltip="Copy"
                                                            tooltipCopied="Copied"
                                                            getText={() => Array.isArray(summaryIssues)
                                                                ? summaryIssues.filter(Boolean).map(s => String(s).trim()).join('\r\n')
                                                                : String(summaryIssues)
                                                                    .replace(/<br\s*\/?>/gi, '\r\n') // nếu có <br/>
                                                                    .replace(/\r?\n/g, '\r\n')       // chuẩn hóa newline
                                                            }
                                                        />
                                                    </Box>
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
                                            )}

                                        {tabCrossCheckValue === 2 && (
                                            <React.Fragment>
                                                {!isCOCheckDataNotExist && (
                                                    <CrossCheckTable
                                                        title={intl.formatMessage({ id: 'job-number.detail.crosscheck.coo.title' })}
                                                        columnHeaders={COCheckData.headers}
                                                        rowData={COCheckData.rows}
                                                    />
                                                )}

                                                {!isCOProductDataNotExist && (
                                                    <ProductCheckTable data={COProductData} title={intl.formatMessage({ id: 'job-number.detail.crosscheck.coo.product.title' })} />
                                                )}
                                            </React.Fragment>
                                        )}

                                        {tabCrossCheckValue === 3 && (
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
                                        )}

                                        {tabCrossCheckValue === 4 && (
                                            <>
                                                {isEVFTACheckDataExist && (
                                                    <>
                                                        <Stack spacing={1} sx={{ my: 2 }}>
                                                            {EVFTACheckData.declaration && (
                                                                <Alert color="info" variant="border" icon={<InfoCircleFilled />}>
                                                                    {EVFTACheckData.declaration}
                                                                </Alert>
                                                            )}

                                                            {EVFTACheckData.comments.map((msg: string, index: number) => (
                                                                <Alert key={index} severity="warning" variant="outlined">
                                                                    {msg}
                                                                </Alert>
                                                            ))}
                                                        </Stack>

                                                        <MainCard title={intl.formatMessage({ id: 'job-number.detail.evfta.card.title' })} sx={{ mt: 3 }}>
                                                            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                                                <TextField
                                                                    placeholder={intl.formatMessage({ id: 'job-number.detail.evfta.rex.placeholder' })}
                                                                    variant="outlined"
                                                                    sx={{ width: { xs: '100%', sm: 320, md: 420, lg: 500 } }}
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

                                                            {RESCodeStatus && (
                                                                <Typography variant="h6" sx={{ mt: 3 }} color={RESCodeStatus.status === 'success' ? 'success' : 'error'} gutterBottom>
                                                                    {RESCodeStatus.status === 'success'
                                                                        ? intl.formatMessage({ id: 'job-number.detail.evfta.rex.valid' })
                                                                        : intl.formatMessage({ id: 'job-number.detail.evfta.rex.invalid' })}
                                                                </Typography>
                                                            )}
                                                        </MainCard>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </React.Fragment>
                                </>
                            }

                            {!isLoading && menuValue === 3 && jobNumberData?.status === 'completed' && (
                                <>
                                    <Alert sx={{ mb: 2 }} color="info" variant="outlined" icon={<InfoCircleTwoTone twoToneColor={theme.palette.info.main} />}>
                                        {intl.formatMessage({ id: 'job-number.detail.alert.extract-duration' }, { duration: formatTime(secondsExtract) })}
                                    </Alert>

                                    {jobNumberData?.method === 'import' && (
                                        <Tabs value={tabValue} onChange={handleChange} sx={{ mb: 5 }}>
                                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.general-1' })} value={1} />
                                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.general-2' })} value={2} />
                                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.import.tabs.products' })} value={3} />
                                        </Tabs>
                                    )}

                                    {jobNumberData?.method === 'export' && (
                                        <Tabs value={tabValue} onChange={handleChange} sx={{ mb: 5 }}>
                                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.export.tabs.general' })} value={1} />
                                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.export.tabs.container' })} value={2} />
                                            <Tab label={intl.formatMessage({ id: 'job-number.detail.extract.export.tabs.products' })} value={3} />
                                        </Tabs>
                                    )}

                                    {tabValue === 1 && jobNumberData?.method === 'import' && (
                                        <TabDetail1 initialGeneralCheckData={initialGeneralCheckData as ImportExtractResponse} />
                                    )}

                                    {tabValue === 2 && jobNumberData?.method === 'import' && (
                                        <TabDetail2 initialGeneralCheckData={initialGeneralCheckData as ImportExtractResponse} />
                                    )}

                                    {isImportProductTab && <ExpandTable columns={columns} data={productData} method="import" />}

                                    {tabValue === 1 && jobNumberData?.method === 'export' && (
                                        <TabDetailExport1 initialGeneralCheckData={initialGeneralCheckData as ExportExtractResponse} />
                                    )}

                                    {tabValue === 2 && jobNumberData?.method === 'export' && (
                                        <TabDetailExport2 initialGeneralCheckData={initialGeneralCheckData as ExportExtractResponse} />
                                    )}

                                    {isExportProductTab && <ExpandTable columns={columns} data={productData} method="export" />}
                                </>
                            )}
                        </Box>

                        <Dialog fullScreen scroll="paper" open={openEdit} onClose={handleClose}>
                            <AppBar sx={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                        <CloseCircleOutlined />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        {intl.formatMessage({ id: 'job-number.detail.dialog.edit-title' })}
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <DialogContent sx={{ position: 'relative' }}>
                                <Box sx={{ padding: 7 }}>
                                    <JobNumberEdit
                                        mode='edit'
                                        jobNumberIdProp={jobNumberData.id}
                                        initialData={{
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
                    </>
                )}
            </Box>
        </MainCard>

    );
};

