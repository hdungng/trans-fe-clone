import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    CardContent,
    CircularProgress,
    Step,
    StepLabel,
    Stepper,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import { useIntl } from 'react-intl';
import {
    getClientCrossCheckGuidingAI,
    getClientDetail,
    getDefaultSettingDocuments,
    updateClientCrossCheckGuidingAI
} from 'api/client';
import { APIResponse } from 'types/response';
import TaxCodeAutocomplete from 'components/common/TaxCodeAutocomplete';
import TRASASCustomerSelect from 'components/common/TRASASCustomerSelect';
import useAuth from 'hooks/useAuth';
import { ClientType } from 'types/pages/client';
import UserAutocomplete from 'components/common/UserAutocomplete';
import {
    containerControlExport,
    generalFormFieldsControlExport,
} from 'types/extract-form-field/extract-export-form';
import {
    generalFormFieldsControl1Import,
    generalFormFieldsControl2Import,
} from 'types/extract-form-field/extract-import-form';
import ExtractImportTab1 from '../job-number/tabs/import/ExtractImportTab1';
import ExtractImportTab2 from '../job-number/tabs/import/ExtractImportTab2';
import ImportProductDefault from '../default-setting/default-product/ImportProductDefault';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ExportProductDefault from '../default-setting/default-product/ExportProductDefault';
import ExtractTab1 from '../job-number/tabs/export/ExtractTab1';
import ExtractTab2 from '../job-number/tabs/export/ExtractTab2';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import { mockFormImportDefault } from '../job-number/form/formik/ImportDefaultFormik';
import { mockFormExportDefault } from '../job-number/form/formik/ExportDefaultFormik';
import { useDefaultSetting } from '../default-setting/DefaultSettingContext';
import { DefaultSettingDocument, useDefaultSettingPage } from '../default-setting/DefaultSettingPageContext';

const TRASAS_TAX_CODE = '0304184415';

export default function GuideAIPage() {
    const intl = useIntl();
    const { user } = useAuth();

    const { setDefaultSetting } = useDefaultSetting();
    const { state: defaultSettingState, dispatch: defaultSettingDispatch } = useDefaultSettingPage();

    const { documents, selectedDocument, activeStep, documentListLoading } = defaultSettingState;

    const [method, setMethod] = useState<'import' | 'export'>('import');
    const [filterClient, setFilterClient] = useState<ClientType | null>(null);
    const [filterUserId, setFilterUserId] = useState<number | undefined>(undefined);
    const [TRASASCustomerId, setTRASASCustomerId] = useState<string | undefined>(undefined);
    const [customsProcedureType, setCustomsProcedureType] = useState<number>(0);

    const [activeTab, setActiveTab] = useState<'extract' | 'crossCheck'>('crossCheck');
    const [crossCheckInstruction, setCrossCheckInstruction] = useState('');
    const [crossCheckLoading, setCrossCheckLoading] = useState(false);
    const [crossCheckError, setCrossCheckError] = useState<string | null>(null);
    const [crossCheckResponse, setCrossCheckResponse] = useState<any>(null);
    const [crossCheckSaving, setCrossCheckSaving] = useState(false);
    const [tab, setTab] = useState(1);


    const generalFormFieldsExport1 = generalFormFieldsControlExport.map(field => ({ ...field, required: false, readOnly: true }));
    const generalFormFieldsExport2 = containerControlExport.map(field => ({ ...field, required: false, readOnly: true }));
    const generalFormFieldsImport1 = generalFormFieldsControl1Import.map(field => ({ ...field, required: false, readOnly: true }));
    const generalFormFieldsImport2 = generalFormFieldsControl2Import.map(field => ({ ...field, required: false, readOnly: true }));


    useEffect(() => {
        setDefaultSetting(prev => ({
            ...prev,
            client: filterClient,
            customsProcedureType,
            TRASASCustomerId: TRASASCustomerId ?? null,
            filterUserId: filterUserId ?? null,
        }));
    }, [filterClient, customsProcedureType, TRASASCustomerId, filterUserId, setDefaultSetting]);

    useEffect(() => {
        let isMounted = true;

        const fetchDocuments = async () => {
            defaultSettingDispatch({ type: 'SET_DOCUMENT_LIST_LOADING', payload: true });

            try {
                const res: APIResponse = await getDefaultSettingDocuments();

                if (!isMounted) {
                    return;
                }

                defaultSettingDispatch({
                    type: 'SET_DOCUMENTS',
                    payload: res?.status === 'success' ? (res.data as DefaultSettingDocument[]) || [] : []
                });
            } finally {
                if (isMounted) {
                    defaultSettingDispatch({ type: 'SET_DOCUMENT_LIST_LOADING', payload: false });
                }
            }
        };

        fetchDocuments();

        return () => {
            isMounted = false;
        };
    }, [defaultSettingDispatch]);

    useEffect(() => {
        let isMounted = true;

        const syncWithDocument = async () => {
            if (!selectedDocument) {
                return;
            }

            setMethod(selectedDocument.method as 'import' | 'export');
            setTab(1);
            setActiveTab('extract');
            setCustomsProcedureType(selectedDocument.customs_procedure_type);
            setTRASASCustomerId(selectedDocument.customer ?? undefined);
            setFilterUserId(selectedDocument.user_id ?? undefined);

            defaultSettingDispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });

            try {
                const response: APIResponse = await getClientDetail(selectedDocument.tax_code);

                if (!isMounted) {
                    return;
                }

                if (response?.status === 'success') {
                    setFilterClient(response.data);
                } else {
                    setFilterClient(null);
                }
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setFilterClient(null);
            }
        };

        syncWithDocument();

        return () => {
            isMounted = false;
        };
    }, [defaultSettingDispatch, selectedDocument]);

    const handleSelectClient = async (_: any, value: any) => {
        if (!value) {
            setFilterClient(null);
            setTRASASCustomerId(undefined);
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

        setTRASASCustomerId(undefined);
    };

    const handleUserSelect = (_: any, value: any) => {
        if (!value) {
            setFilterUserId(undefined);
            return;
        }

        setFilterUserId(value);
    };

    const handleSelectCustomer = async (_: any, value: any) => {
        if (!value) {
            setTRASASCustomerId(undefined);
            return;
        }

        setTRASASCustomerId(value);
    };

    const handleSelectDefaultDocument = (event: any) => {
        const docId = event.target.value;

        if (!docId) {
            defaultSettingDispatch({ type: 'SET_SELECTED_DOCUMENT', payload: null });
            defaultSettingDispatch({ type: 'SET_DOCUMENT_NAME', payload: '' });
            defaultSettingDispatch({ type: 'SET_ACTIVE_STEP', payload: 0 });
            setFilterClient(null);
            setTRASASCustomerId(undefined);
            setFilterUserId(undefined);
            return;
        }

        const found = documents.find((doc) => doc.id === Number(docId)) || null;

        defaultSettingDispatch({ type: 'SET_SELECTED_DOCUMENT', payload: found });
        defaultSettingDispatch({ type: 'SET_DOCUMENT_NAME', payload: found?.name ?? '' });
    };

    const handleMoveToInputTab = () => {
        if (!selectedDocument) {
            return;
        }

        defaultSettingDispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
        setActiveTab('extract');
        setTab(1);
    };

    const handleMethodChange = (value: 'import' | 'export') => {
        setMethod(value);
    };

    const clientId = filterClient?.id ?? null;

    const isRender =
        user?.email === 'admin@gmail.com'
            ? Boolean(clientId && method && filterUserId)
            : Boolean(clientId && method);

    useEffect(() => {
        let isMounted = true;

        async function fetchCrossCheckGuide() {
            if (!clientId) {
                return;
            }

            try {
                setCrossCheckLoading(true);
                setCrossCheckError(null);
                setCrossCheckResponse(null);

                const res = await getClientCrossCheckGuidingAI(
                    clientId,
                    method,
                    TRASASCustomerId ?? null,
                    filterUserId ?? null
                );

                if (!isMounted) {
                    return;
                }

                if (res.status === 'success') {
                    setCrossCheckInstruction(res.data?.guide_text ?? '');
                } else {
                    setCrossCheckError(
                        res.message ??
                        intl.formatMessage({
                            id: 'guide-ai.error.unable-to-load',
                            defaultMessage: 'Unable to load data'
                        })
                    );
                }
            } catch (error: any) {
                if (!isMounted) {
                    return;
                }

                setCrossCheckError(
                    error?.response?.data?.message ||
                    error?.message ||
                    intl.formatMessage({
                        id: 'guide-ai.error.unable-to-load',
                        defaultMessage: 'Unable to load data'
                    })
                );
            } finally {
                if (isMounted) {
                    setCrossCheckLoading(false);
                }
            }
        }

        if (isRender) {
            fetchCrossCheckGuide();
        } else {
            setCrossCheckInstruction('');
            setCrossCheckError(null);
            setCrossCheckResponse(null);
        }

        return () => {
            isMounted = false;
        };
    }, [TRASASCustomerId, customsProcedureType, clientId, filterUserId, intl, isRender, method]);

    const handleSaveCrossCheck = async () => {
        if (!clientId) {
            return;
        }

        try {
            setCrossCheckSaving(true);
            setCrossCheckResponse(null);

            const res = await updateClientCrossCheckGuidingAI(
                clientId,
                {
                    guide_text: crossCheckInstruction,
                },
                method,
                TRASASCustomerId ?? null,
                filterUserId ?? null,
            );

            setCrossCheckResponse(
                res?.status
                    ? res
                    : {
                        status: 'error',
                        message:
                            res?.message ??
                            intl.formatMessage({
                                id: 'guide-ai.error.unable-to-save',
                                defaultMessage: 'Unable to save data'
                            }),
                    }
            );
        } catch (error: any) {
            setCrossCheckResponse({
                status: 'error',
                message:
                    error?.response?.data?.message ||
                    error?.message ||
                    intl.formatMessage({
                        id: 'guide-ai.error.unable-to-save',
                        defaultMessage: 'Unable to save data'
                    }),
            });
        } finally {
            setCrossCheckSaving(false);
        }
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <MainCard content={false} sx={{ mt: 5 }}>
            <CardContent sx={{ p: 3 }}>
                <MainCard sx={{ mb: 3 }}>
                    <Typography variant='h5' sx={{ mb: 3 }}>
                        {intl.formatMessage({
                            id: 'guide-ai.default-setting.section',
                            defaultMessage: 'Default Setting'
                        })}
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                        <Step>
                            <StepLabel>
                                {intl.formatMessage({
                                    id: 'guide-ai.default-setting.step.select',
                                    defaultMessage: 'Bước 1: Chọn Default Setting document'
                                })}
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>
                                {intl.formatMessage({
                                    id: 'guide-ai.default-setting.step.input',
                                    defaultMessage: 'Bước 2: Chuyển về màn hình nhập liệu'
                                })}
                            </StepLabel>
                        </Step>
                    </Stepper>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        gap={2}
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                    >
                        <FormControl
                            sx={{ width: { xs: '100%', sm: 360 } }}
                            disabled={documentListLoading || documents.length === 0}
                        >
                            <InputLabel id="guide-ai-default-setting-document-select">
                                {intl.formatMessage({
                                    id: 'guide-ai.default-setting.document',
                                    defaultMessage: 'Default Setting document'
                                })}
                            </InputLabel>
                            <Select
                                labelId="guide-ai-default-setting-document-select"
                                value={selectedDocument?.id ?? ''}
                                label={intl.formatMessage({
                                    id: 'guide-ai.default-setting.document',
                                    defaultMessage: 'Default Setting document'
                                })}
                                onChange={handleSelectDefaultDocument}
                                displayEmpty
                                slotProps={{
                                    input: {
                                        'aria-label': intl.formatMessage({
                                            id: 'guide-ai.default-setting.document.aria',
                                            defaultMessage: 'Select Default Setting document'
                                        })
                                    }
                                }}
                            >
                                <MenuItem value=''>
                                    {documentListLoading
                                        ? intl.formatMessage({
                                            id: 'guide-ai.default-setting.loading',
                                            defaultMessage: 'Đang tải hồ sơ...'
                                        })
                                        : intl.formatMessage({
                                            id: 'guide-ai.default-setting.placeholder',
                                            defaultMessage: 'Chọn hồ sơ mặc định'
                                        })}
                                </MenuItem>

                                {documents.map((doc) => (
                                    <MenuItem key={doc.id} value={doc.id}>
                                        {doc.name || `#${doc.id}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Stack direction='row' justifyContent='flex-end' sx={{ width: { xs: '100%', sm: 'auto' } }}>
                            <Button
                                variant='contained'
                                onClick={handleMoveToInputTab}
                                disabled={!selectedDocument}
                            >
                                {intl.formatMessage({
                                    id: 'guide-ai.default-setting.go-to-input',
                                    defaultMessage: 'Đi tới màn hình nhập liệu'
                                })}
                            </Button>
                        </Stack>
                    </Stack>

                    {documents.length === 0 && !documentListLoading && (
                        <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
                            {intl.formatMessage({
                                id: 'guide-ai.default-setting.empty',
                                defaultMessage: 'Chưa có hồ sơ mặc định nào, hãy tạo tại màn hình Default Setting.'
                            })}
                        </Typography>
                    )}
                </MainCard>

                <MainCard sx={{ mb: 3 }}>
                    <Typography variant='h5' sx={{ mb: 5 }}>
                        {intl.formatMessage({ id: 'default-setting.section.input-info', defaultMessage: 'Enter information' })}
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} gap={3} sx={{ mb: 5 }} alignItems={{ xs: 'start', sm: 'center' }}>
                        <FormControl sx={{ width: { xs: '100%', sm: 250 } }}>
                            <InputLabel id="method">
                                {intl.formatMessage({ id: 'default-setting.field.method', defaultMessage: 'Operation' })}
                            </InputLabel>
                            <Select
                                id='method'
                                value={method}
                                onChange={(event) => handleMethodChange(event.target.value as 'import' | 'export')}
                                displayEmpty
                                slotProps={{
                                    input: {
                                        'aria-label': intl.formatMessage({ id: 'default-setting.aria.method', defaultMessage: 'Select operation' })
                                    }
                                }}
                            >
                                <MenuItem value='import'>
                                    {intl.formatMessage({ id: 'default-setting.method.import', defaultMessage: 'Import' })}
                                </MenuItem>
                                <MenuItem value='export'>
                                    {intl.formatMessage({ id: 'default-setting.method.export', defaultMessage: 'Export' })}
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Stack sx={{ minWidth: { xs: '100%', sm: 'unset' } }}>
                            <TaxCodeAutocomplete name='taxCode' isFloating={true} handleSelect={handleSelectClient} sx={{ width: { sm: 250 } }} />
                        </Stack>

                        {user?.email === "admin@gmail.com" && (
                            <Stack sx={{ minWidth: { xs: '100%', sm: 'unset' } }}>
                                <UserAutocomplete name='user_id' isFloating={true} handleSelect={handleUserSelect} sx={{ width: { sm: 250 } }} />
                            </Stack>
                        )}

                        {filterClient?.tax_code === TRASAS_TAX_CODE && (
                            <Stack sx={{ minWidth: { xs: '100%', sm: 'unset' } }}>
                                <TRASASCustomerSelect
                                    name='customer'
                                    by='name'
                                    label={intl.formatMessage({ id: 'default-setting.field.customer', defaultMessage: 'Customer' })}
                                    isFloating={true}
                                    sx={{ width: { sm: 300 } }}
                                    handleSelect={handleSelectCustomer}
                                />
                            </Stack>
                        )}

                        <FormControl sx={{ width: { xs: '100%', sm: 300 } }}>
                            <InputLabel id="customsProcedureType">
                                {intl.formatMessage({ id: 'default-setting.field.customs-procedure', defaultMessage: 'Customs procedure type' })}
                            </InputLabel>
                            <Select
                                id='customsProcedureType'
                                value={customsProcedureType}
                                onChange={(event) => {
                                    setCustomsProcedureType(Number(event.target.value));
                                }}
                                displayEmpty
                                slotProps={{
                                    input: {
                                        'aria-label': intl.formatMessage({ id: 'default-setting.aria.customs-procedure', defaultMessage: 'Select customs procedure type' })
                                    }
                                }}
                            >
                                <MenuItem value={0}>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.business', defaultMessage: 'Business, investment' })}
                                </MenuItem>
                                <MenuItem value={1}>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.manufacturing', defaultMessage: 'Export production' })}
                                </MenuItem>
                                <MenuItem value={2}>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.processing', defaultMessage: 'Processing' })}
                                </MenuItem>
                                <MenuItem value={3}>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.export-processing', defaultMessage: 'Export processing zone' })}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </MainCard>

                {isRender && (
                    <MainCard>
                        <Typography variant='h5' sx={{ mb: 3 }}>
                            {intl.formatMessage({ id: 'guide-ai.section.heading', defaultMessage: 'AI guidance configuration' })}
                        </Typography>

                        <Tabs
                            value={activeTab}
                            onChange={(_, value) => setActiveTab(value as 'extract' | 'crossCheck')}
                            aria-label={intl.formatMessage({ id: 'guide-ai.tabs.label', defaultMessage: 'AI guidance tabs' })}
                            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
                        >
                            <Tab
                                value='crossCheck'
                                label={intl.formatMessage({ id: 'guide-ai.tab.cross-check', defaultMessage: 'Cross-check' })}
                                id='guide-ai-tab-cross-check'
                                aria-controls='guide-ai-panel-cross-check'
                            />
                            <Tab
                                value='extract'
                                label={intl.formatMessage({ id: 'guide-ai.tab.extract', defaultMessage: 'Extraction' })}
                                id='guide-ai-tab-extract'
                                aria-controls='guide-ai-panel-extract'
                            />
                        </Tabs>

                        {activeTab === 'extract' && (
                            <Box role='tabpanel' id='guide-ai-panel-extract' aria-labelledby='guide-ai-tab-extract'>
                                <Alert
                                    variant="border"
                                    color="primary"
                                    icon={<QuestionCircleOutlined />}
                                    sx={{ my: 3 }}
                                >
                                    {intl.formatMessage({ id: 'default-setting.alert.context-menu', defaultMessage: 'Right-click each field to update the AI instruction.' })}
                                </Alert>


                                {
                                    filterClient && method === "import" &&
                                    (
                                        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 5 }}>
                                            <Tab label={intl.formatMessage({ id: 'default-setting.tab.import.general1', defaultMessage: 'General information 1' })} value={1} />
                                            <Tab label={intl.formatMessage({ id: 'default-setting.tab.import.general2', defaultMessage: 'General information 2' })} value={2} />
                                            <Tab label={intl.formatMessage({ id: 'default-setting.tab.import.products', defaultMessage: 'Product list' })} value={3} />
                                        </Tabs>
                                    )
                                }

                                {
                                    filterClient && method === "export" &&
                                    (
                                        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 5 }}>
                                            <Tab label={intl.formatMessage({ id: 'default-setting.tab.export.general', defaultMessage: 'General information' })} value={1} />
                                            <Tab label={intl.formatMessage({ id: 'default-setting.tab.export.container', defaultMessage: 'Container information' })} value={2} />
                                            <Tab label={intl.formatMessage({ id: 'default-setting.tab.export.products', defaultMessage: 'Product list' })} value={3} />
                                        </Tabs>
                                    )
                                }

                                {
                                    filterClient && method === "import" &&
                                    <Formik
                                        initialValues={mockFormImportDefault}
                                        validateOnBlur
                                        validateOnChange
                                        onSubmit={() => { }}
                                        enableReinitialize
                                    >
                                        {(formik) => (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <form onSubmit={formik.handleSubmit}>
                                                    {method === "import" && tab === 1 && (
                                                        <ExtractImportTab1 generalFormFields1={generalFormFieldsImport1} isDefaultPage={true} />
                                                    )}
                                                    {method === "import" && tab === 2 && (
                                                        <ExtractImportTab2 generalFormFields2={generalFormFieldsImport2} isDefaultPage={true} />
                                                    )}
                                                    {method === "import" && tab === 3 && (
                                                        <ImportProductDefault />
                                                    )}

                                                    {/* <Stack
                                                direction="row"
                                                sx={{ marginY: 3, justifyContent: 'flex-end' }}
                                            >
                                                <Button type="submit" variant="contained">
                                                    {intl.formatMessage({ id: 'default-setting.button.update', defaultMessage: 'Update' })}
                                                </Button>
                                            </Stack> */}
                                                </form>
                                            </LocalizationProvider>
                                        )}
                                    </Formik>
                                }


                                {/* EXPORT */}
                                {
                                    filterClient && method === "export" &&
                                    (
                                        <Formik
                                            initialValues={mockFormExportDefault}
                                            onSubmit={() => { }}
                                            validateOnBlur
                                            validateOnChange
                                            enableReinitialize
                                        >
                                            {(formik) => (
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                    <form onSubmit={formik.handleSubmit}>
                                                        {method === "export" && tab === 1 && (
                                                            <ExtractTab1 generalFormFields1={generalFormFieldsExport1} isDefaultPage={true} />
                                                        )}
                                                        {method === "export" && tab === 2 && (
                                                            <ExtractTab2 generalFormFields2={generalFormFieldsExport2} isDefaultPage={true} />
                                                        )}
                                                        {method === "export" && tab === 3 && (
                                                            <ExportProductDefault />
                                                        )}
                                                        {/* <Stack
                                                direction="row"
                                                sx={{ marginY: 3, justifyContent: 'flex-end' }}
                                            >
                                                <Button type="submit" variant="contained">
                                                    {intl.formatMessage({ id: 'default-setting.button.update', defaultMessage: 'Update' })}
                                                </Button>
                                            </Stack> */}
                                                    </form>
                                                </LocalizationProvider>
                                            )}
                                        </Formik>
                                    )
                                }
                            </Box>

                        )}

                        {activeTab === 'crossCheck' && (
                            <Box role='tabpanel' id='guide-ai-panel-cross-check' aria-labelledby='guide-ai-tab-cross-check'>
                                {crossCheckLoading ? (
                                    <Box sx={{ padding: 3, textAlign: 'center' }}>
                                        <CircularProgress />
                                        <Typography sx={{ mt: 1 }}>
                                            {intl.formatMessage({ id: 'guide-ai.loading', defaultMessage: 'Loading data...' })}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={2}>
                                        <TextField
                                            id='guide-ai-cross-check'
                                            value={crossCheckInstruction}
                                            onChange={(event) => {
                                                setCrossCheckInstruction(event.target.value);
                                                if (crossCheckResponse) {
                                                    setCrossCheckResponse(null);
                                                }
                                            }}
                                            label={intl.formatMessage({ id: 'guide-ai.cross-check.label', defaultMessage: 'Cross-check guidance' })}
                                            placeholder={intl.formatMessage({ id: 'guide-ai.cross-check.placeholder', defaultMessage: 'Enter instructions for the cross-check process.' })}
                                            multiline
                                            minRows={6}
                                            fullWidth
                                        />

                                        {crossCheckResponse && (
                                            <Alert severity={crossCheckResponse.status === 'success' ? 'success' : 'error'}>
                                                {crossCheckResponse.message}
                                            </Alert>
                                        )}

                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant='contained'
                                                onClick={handleSaveCrossCheck}
                                                disabled={crossCheckSaving}
                                            >
                                                {crossCheckSaving ? (
                                                    <CircularProgress size={20} />
                                                ) : (
                                                    intl.formatMessage({ id: 'guide-ai.form.save', defaultMessage: 'Save guidelines' })
                                                )}
                                            </Button>
                                        </Box>
                                    </Stack>
                                )}
                            </Box>
                        )}
                    </MainCard>
                )
                }
            </CardContent >
        </MainCard >
    );
}