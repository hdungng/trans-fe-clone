import { ReactNode, useContext, useEffect, useState, createContext } from 'react';
import { CardContent, FormControl, MenuItem, Select, Skeleton, Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { getClientDefaultValues, getClientDetail, updateClientDefaultValue } from 'api/client';
import { APIResponse } from 'types/response';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ExtractImportTab1 from '../job-number/tabs/import/ExtractImportTab1';
import ExtractImportTab2 from '../job-number/tabs/import/ExtractImportTab2';
import ImportProductDefault from './default-product/ImportProductDefault';
import ExtractTab1 from '../job-number/tabs/export/ExtractTab1';
import ExtractTab2 from '../job-number/tabs/export/ExtractTab2';
import ExportProductDefault from './default-product/ExportProductDefault';
import { containerControlExport, generalFormFieldsControlExport } from 'types/extract-form-field/extract-export-form';
import { generalFormFieldsControl1Import, generalFormFieldsControl2Import } from 'types/extract-form-field/extract-import-form';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import { InputLabel } from '@mui/material';
import TaxCodeAutocomplete from 'components/common/TaxCodeAutocomplete';
import TRASASCustomerSelect from 'components/common/TRASASCustomerSelect';
import { ClientType } from 'types/pages/client';
import { Alert } from '@mui/material';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { mockFormImportDefault } from '../job-number/form/formik/ImportDefaultFormik';
import { mockFormExportDefault } from '../job-number/form/formik/ExportDefaultFormik';
import { useIntl } from 'react-intl';

const TRASAS_TAX_CODE = '0304184415';


interface DefaultSettingData {
    client: any;
    customsProcedureType: number;
}

interface DefaultSettingContextType extends DefaultSettingData {
    setDefaultSetting: React.Dispatch<React.SetStateAction<DefaultSettingData>>;
}

const DefaultSettingContext = createContext<DefaultSettingContextType | null>(null);

export const DefaultSettingProvider = ({ children }: { children: ReactNode }) => {
    const [defaultSetting, setDefaultSetting] = useState<DefaultSettingData>({
        client: null,
        customsProcedureType: 1,
    });

    return (
        <DefaultSettingContext.Provider value={{ ...defaultSetting, setDefaultSetting }}>
            {children}
        </DefaultSettingContext.Provider>
    );
};

// Hook tiện lợi để dùng context
export const useDefaultSetting = () => {
    const context = useContext(DefaultSettingContext);
    if (!context) {
        throw new Error("useDefaultSetting must be used within a DefaultSettingProvider");
    }
    return context;
};

export default function MainPage() {


    const intl = useIntl();
    const [tab, setTab] = useState(1);

    const validationSchema = yup.object({});
    const generalFormFieldsExport1 = generalFormFieldsControlExport.map(field => ({ ...field, required: false }));
    const generalFormFieldsExport2 = containerControlExport.map(field => ({ ...field, required: false }));
    const [filterClient, setFilterClient] = useState<ClientType | null>(null);
    const [TRASASCustomerId, setTRASASCustomerId] = useState<number | undefined>(undefined);

    const generalFormFieldsImport1 = generalFormFieldsControl1Import.map(field => ({ ...field, required: false }));
    const generalFormFieldsImport2 = generalFormFieldsControl2Import.map(field => ({ ...field, required: false }));

    const [method, setMethod] = useState<string>('import');
    const [customsProcedureType, setCustomsProcedureType] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [defaultValuesData, setDefaultValuesData] = useState<any>(method === 'import' ? mockFormImportDefault : mockFormExportDefault);

    const { setDefaultSetting } = useDefaultSetting();


    useEffect(() => {
        setDefaultSetting(prev => ({
            ...prev,
            client: filterClient,
            customsProcedureType,
        }));
    }, [filterClient, customsProcedureType, setDefaultSetting]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (filterClient) {
                    const defaultValuesRes: APIResponse = await getClientDefaultValues(filterClient.tax_code, method, TRASASCustomerId, customsProcedureType);

                    if (defaultValuesRes.status === 'success') {
                        setDefaultValuesData(defaultValuesRes.data);
                    } else {
                        setDefaultValuesData(method === 'import' ? mockFormImportDefault : mockFormExportDefault);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();

    }, [filterClient, method, TRASASCustomerId, tab, customsProcedureType]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };


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

    return (
        <MainCard content={false} sx={{ mt: 5 }}>
            <CardContent sx={{ p: 3 }}>

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
                                onChange={(event) => {
                                    setMethod(event.target.value as string)
                                    setTab(1);
                                }}
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
                            <TaxCodeAutocomplete name='taxCode' isFloating={true} handleSelect={handleSelect} sx={{ width: { sm: 250 } }} />
                        </Stack>

                        {filterClient?.tax_code === TRASAS_TAX_CODE && <Stack sx={{ minWidth: { xs: '100%', sm: 'unset' } }}>
                            <TRASASCustomerSelect
                                name='customer'
                                label={intl.formatMessage({ id: 'default-setting.field.customer', defaultMessage: 'Customer' })}
                                isFloating={true}
                                sx={{ width: { sm: 300 } }}
                                handleSelect={handleSelectCustomer}
                            />
                        </Stack>}

                        <FormControl sx={{ width: { xs: '100%', sm: 300 } }}>
                            <InputLabel id="customsProcedureType">
                                {intl.formatMessage({ id: 'default-setting.field.customs-procedure', defaultMessage: 'Customs procedure type' })}
                            </InputLabel>
                            <Select
                                id='customsProcedureType'
                                value={customsProcedureType}
                                onChange={(event) => {
                                    setCustomsProcedureType(event.target.value as number)
                                    setTab(1);
                                }}
                                displayEmpty
                                slotProps={{
                                    input: {
                                        'aria-label': intl.formatMessage({ id: 'default-setting.aria.customs-procedure', defaultMessage: 'Select customs procedure type' })
                                    }
                                }}
                            >
                                <MenuItem value='0'>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.business', defaultMessage: 'Business, investment' })}
                                </MenuItem>
                                <MenuItem value='1'>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.manufacturing', defaultMessage: 'Export production' })}
                                </MenuItem>
                                <MenuItem value='2'>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.processing', defaultMessage: 'Processing' })}
                                </MenuItem>
                                <MenuItem value='3'>
                                    {intl.formatMessage({ id: 'default-setting.customs-procedure.export-processing', defaultMessage: 'Export processing zone' })}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </MainCard>


                {filterClient && method && <>
                    <MainCard>
                        <Typography variant='h5' sx={{ my: 3 }}>
                            {intl.formatMessage({ id: 'default-setting.section.default-values', defaultMessage: 'Default parameter information' })}
                        </Typography>

                        {
                            isLoading && (
                                <>
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                    <Skeleton animation="wave" height={50} />
                                </>
                            )
                        }

                        {!isLoading && <Alert
                            variant="border"
                            color="primary"
                            icon={<QuestionCircleOutlined />}
                            sx={{ my: 3 }}
                        >
                            {intl.formatMessage({ id: 'default-setting.alert.context-menu', defaultMessage: 'Right-click each field to update the AI instruction.' })}
                        </Alert>}


                        {
                            method === "import" && !isLoading &&
                            (
                                <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 5 }}>
                                    <Tab label={intl.formatMessage({ id: 'default-setting.tab.import.general1', defaultMessage: 'General information 1' })} value={1} />
                                    <Tab label={intl.formatMessage({ id: 'default-setting.tab.import.general2', defaultMessage: 'General information 2' })} value={2} />
                                    <Tab label={intl.formatMessage({ id: 'default-setting.tab.import.products', defaultMessage: 'Product list' })} value={3} />
                                </Tabs>
                            )
                        }

                        {
                            method === "export" && !isLoading &&
                            (
                                <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 5 }}>
                                    <Tab label={intl.formatMessage({ id: 'default-setting.tab.export.general', defaultMessage: 'General information' })} value={1} />
                                    <Tab label={intl.formatMessage({ id: 'default-setting.tab.export.container', defaultMessage: 'Container information' })} value={2} />
                                    <Tab label={intl.formatMessage({ id: 'default-setting.tab.export.products', defaultMessage: 'Product list' })} value={3} />
                                </Tabs>
                            )
                        }

                        {
                            method === "import" && !isLoading &&
                            <Formik
                                initialValues={defaultValuesData}
                                validationSchema={validationSchema}
                                validateOnBlur
                                validateOnChange
                                onSubmit={async (values, actions) => {
                                    // Submit cho Import
                                    if (filterClient) {
                                        const response: APIResponse = await updateClientDefaultValue(values, filterClient.tax_code, 'import', TRASASCustomerId, customsProcedureType);

                                        if (response.status === "success") {
                                            openSnackbar({
                                                open: true,
                                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                                variant: 'alert',
                                                alert: {
                                                    color: 'success'
                                                },
                                                message: intl.formatMessage({ id: 'default-setting.snackbar.update-success', defaultMessage: 'Default values updated successfully' }),
                                                close: true
                                            } as SnackbarProps);
                                        }
                                    }
                                }}
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

                                            <Stack
                                                direction="row"
                                                sx={{ marginY: 3, justifyContent: 'flex-end' }}
                                            >
                                                <Button type="submit" variant="contained">
                                                    {intl.formatMessage({ id: 'default-setting.button.update', defaultMessage: 'Update' })}
                                                </Button>
                                            </Stack>
                                        </form>
                                    </LocalizationProvider>
                                )}
                            </Formik>
                        }


                        {/* EXPORT */}
                        {
                            method === "export" && !isLoading &&
                            (
                                <Formik
                                    initialValues={defaultValuesData}
                                    validationSchema={validationSchema}
                                    validateOnBlur
                                    validateOnChange
                                    onSubmit={async (values, actions) => {
                                        if (filterClient) {
                                            const response: APIResponse = await updateClientDefaultValue(values, filterClient.tax_code, 'export', TRASASCustomerId, customsProcedureType);

                                            if (response.status === "success") {
                                                openSnackbar({
                                                    open: true,
                                                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                                    variant: 'alert',
                                                    alert: {
                                                        color: 'success'
                                                    },
                                                    message: intl.formatMessage({ id: 'default-setting.snackbar.update-success', defaultMessage: 'Default values updated successfully' }),
                                                    close: true
                                                } as SnackbarProps);
                                            }
                                        }
                                    }}
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
                                                <Stack
                                                    direction="row"
                                                    sx={{ marginY: 3, justifyContent: 'flex-end' }}
                                                >
                                                    <Button type="submit" variant="contained">
                                                        {intl.formatMessage({ id: 'default-setting.button.update', defaultMessage: 'Update' })}
                                                    </Button>
                                                </Stack>
                                            </form>
                                        </LocalizationProvider>
                                    )}
                                </Formik>
                            )
                        }
                    </MainCard>
                </>
                }
            </CardContent>
        </MainCard >
    )
}


