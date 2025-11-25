// DefaultSettingForm.tsx
import React, { useEffect } from 'react';
import { Button, Skeleton, Stack, Tabs, Tab } from '@mui/material';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as yup from 'yup';
import ImportProductDefault from '../default-product/ImportProductDefault';
import ExtractImportTab1 from 'pages/apps/job-number/tabs/import/ExtractImportTab1';
import ExtractImportTab2 from 'pages/apps/job-number/tabs/import/ExtractImportTab2';
import ExtractTab1 from 'pages/apps/job-number/tabs/export/ExtractTab1';
import ExtractTab2 from 'pages/apps/job-number/tabs/export/ExtractTab2';
import ExportProductDefault from '../default-product/ExportProductDefault';
import { APIResponse } from 'types/response';
import { deleteDefaultSettingDocument, getClientDefaultValues, updateClientDefaultValue } from 'api/client';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import {
    generalFormFieldsControl1Import,
    generalFormFieldsControl2Import
} from 'types/extract-form-field/extract-import-form';
import {
    containerControlExport,
    generalFormFieldsControlExport
} from 'types/extract-form-field/extract-export-form';
import { useIntl } from 'react-intl';
import { useDefaultSettingPage } from '../DefaultSettingPageContext';
import { mockFormImportDefault } from 'pages/apps/job-number/form/formik/ImportDefaultFormik';
import { mockFormExportDefault } from 'pages/apps/job-number/form/formik/ExportDefaultFormik';

interface DefaultSettingFormSectionProps {
    canShowForm: boolean;
    selectedDocument: any;
}

const DefaultSettingForm: React.FC<DefaultSettingFormSectionProps> = ({
    canShowForm,
    selectedDocument
}) => {
    const intl = useIntl();
    const { state, dispatch } = useDefaultSettingPage();

    const {
        filterClient,
        method,
        tab,
        isLoading,
        filterUserId,
        TRASASCustomerId,
        customsProcedureType,
        importTypeCode,
        defaultValuesData
    } = state;

    const validationSchema = yup.object({});

    const generalFormFieldsImport1 = generalFormFieldsControl1Import.map((field) => ({
        ...field,
        required: false
    }));
    const generalFormFieldsImport2 = generalFormFieldsControl2Import.map((field) => ({
        ...field,
        required: false
    }));
    const generalFormFieldsExport1 = generalFormFieldsControlExport.map((field) => ({
        ...field,
        required: false
    }));
    const generalFormFieldsExport2 = containerControlExport.map((field) => ({
        ...field,
        required: false
    }));

    const handleTabChange = (_: React.SyntheticEvent, value: number) => {
        dispatch({ type: 'SET_TAB', payload: value });
    };

    // Khi chọn client (và chưa có selectedDocument) → load default values
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'SET_IS_LOADING', payload: true });
            try {
                if (filterClient && !selectedDocument) {
                    const defaultValuesRes: APIResponse = await getClientDefaultValues(
                        filterClient.tax_code,
                        method,
                        TRASASCustomerId,
                        filterUserId,
                        customsProcedureType
                    );

                    if (defaultValuesRes.status === 'success') {
                        dispatch({
                            type: 'SET_DEFAULT_VALUES_DATA',
                            payload: defaultValuesRes.data
                        });
                    } else {
                        dispatch({
                            type: 'SET_DEFAULT_VALUES_DATA',
                            payload:
                                method === 'import'
                                    ? mockFormImportDefault
                                    : mockFormExportDefault
                        });
                    }
                }
            } finally {
                dispatch({ type: 'SET_IS_LOADING', payload: false });
            }
        };
        fetchData();
    }, [
        filterClient,
        method,
        TRASASCustomerId,
        tab,
        filterUserId,
        customsProcedureType,
        selectedDocument,
        dispatch
    ]);

    useEffect(() => {
        if (method === 'import') {
            const code = defaultValuesData?.general_info?.import_type_code || '';
            if (code !== importTypeCode) {
                dispatch({ type: 'SET_IMPORT_TYPE_CODE', payload: code });
            }
        }
    }, [defaultValuesData, method, importTypeCode, dispatch]);

    // useEffect(() => {
    //     if (method !== 'import') return;
    //     const next = { ...(defaultValuesData || {}) };
    //     next.general_info = { ...(defaultValuesData?.general_info || {}) };
    //     next.general_info.import_type_code = importTypeCode;
    //     dispatch({ type: 'SET_DEFAULT_VALUES_DATA', payload: next });
    // }, [importTypeCode, method]);

    return (
        <React.Fragment>
            {isLoading && (
                <>
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                    <Skeleton animation="wave" height={50} />
                </>
            )}

            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Button variant="text" onClick={() => dispatch({ type: 'SET_ACTIVE_STEP', payload: 0 })}>
                    {intl.formatMessage({
                        id: 'default-setting.button.back',
                        defaultMessage: 'Quay lại'
                    })}
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    onClick={async () => {
                        if (!selectedDocument) return;

                        const confirmDelete = window.confirm(
                            intl.formatMessage({
                                id: 'default-setting.confirm.delete',
                                defaultMessage: 'Bạn có chắc chắn muốn xóa hồ sơ này?'
                            })
                        );
                        if (!confirmDelete) return;

                        dispatch({ type: 'SET_IS_LOADING', payload: true });

                        try {
                            const res = await deleteDefaultSettingDocument(selectedDocument.id);

                            if (res?.status === 'success') {
                                // Xóa thành công → reset giao diện
                                dispatch({ type: 'SET_SELECTED_DOCUMENT', payload: null });
                                dispatch({ type: 'SET_ACTIVE_STEP', payload: 0 });

                                alert(
                                    intl.formatMessage({
                                        id: 'default-setting.delete.success',
                                        defaultMessage: 'Đã xóa hồ sơ thành công.'
                                    })
                                );
                            } else {
                                alert(
                                    intl.formatMessage({
                                        id: 'default-setting.delete.failed',
                                        defaultMessage: 'Xóa thất bại. Vui lòng thử lại.'
                                    })
                                );
                            }
                        } finally {
                            dispatch({ type: 'SET_IS_LOADING', payload: false });
                        }
                    }}
                >
                    {intl.formatMessage({
                        id: 'default-setting.button.delete',
                        defaultMessage: 'Xóa hồ sơ'
                    })}
                </Button>
            </Stack>

            {/* Tabs IMPORT */}
            {filterClient && method === 'import' && (
                <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 5 }}>
                    <Tab
                        label={intl.formatMessage({
                            id: 'default-setting.tab.import.general1',
                            defaultMessage: 'General information 1'
                        })}
                        value={1}
                    />
                    <Tab
                        label={intl.formatMessage({
                            id: 'default-setting.tab.import.general2',
                            defaultMessage: 'General information 2'
                        })}
                        value={2}
                    />
                    <Tab
                        label={intl.formatMessage({
                            id: 'default-setting.tab.import.products',
                            defaultMessage: 'Product list'
                        })}
                        value={3}
                    />
                </Tabs>
            )}

            {/* Tabs EXPORT */}
            {filterClient && method === 'export' && (
                <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 5 }}>
                    <Tab
                        label={intl.formatMessage({
                            id: 'default-setting.tab.export.general',
                            defaultMessage: 'General information'
                        })}
                        value={1}
                    />
                    <Tab
                        label={intl.formatMessage({
                            id: 'default-setting.tab.export.container',
                            defaultMessage: 'Container information'
                        })}
                        value={2}
                    />
                    <Tab
                        label={intl.formatMessage({
                            id: 'default-setting.tab.export.products',
                            defaultMessage: 'Product list'
                        })}
                        value={3}
                    />
                </Tabs>
            )}

            {/* IMPORT FORM */}
            {canShowForm && method === 'import' && (
                <Formik
                    initialValues={defaultValuesData}
                    validationSchema={validationSchema}
                    validateOnBlur
                    validateOnChange
                    onSubmit={async (values) => {
                        if (filterClient) {
                            const response: APIResponse = await updateClientDefaultValue(
                                values,
                                filterClient.tax_code,
                                'import',
                                TRASASCustomerId,
                                filterUserId,
                                customsProcedureType
                            );

                            if (response.status === 'success') {
                                openSnackbar({
                                    open: true,
                                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    message: intl.formatMessage({
                                        id: 'default-setting.snackbar.update-success',
                                        defaultMessage: 'Default values updated successfully'
                                    }),
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
                                {tab === 1 && (
                                    <ExtractImportTab1
                                        generalFormFields1={generalFormFieldsImport1}
                                        isDefaultPage={true}
                                    />
                                )}
                                {tab === 2 && (
                                    <ExtractImportTab2
                                        generalFormFields2={generalFormFieldsImport2}
                                        isDefaultPage={true}
                                    />
                                )}
                                {tab === 3 && <ImportProductDefault />}

                                <Stack
                                    direction="row"
                                    sx={{ marginY: 3, justifyContent: 'flex-end' }}
                                >
                                    <Button type="submit" variant="contained">
                                        {intl.formatMessage({
                                            id: 'default-setting.button.update',
                                            defaultMessage: 'Update'
                                        })}
                                    </Button>
                                </Stack>
                            </form>
                        </LocalizationProvider>
                    )}
                </Formik>
            )}

            {/* EXPORT FORM */}
            {canShowForm && method === 'export' && (
                <Formik
                    initialValues={defaultValuesData}
                    validationSchema={validationSchema}
                    validateOnBlur
                    validateOnChange
                    onSubmit={async (values) => {
                        if (filterClient) {
                            const response: APIResponse = await updateClientDefaultValue(
                                values,
                                filterClient.tax_code,
                                'export',
                                TRASASCustomerId,
                                filterUserId,
                                customsProcedureType
                            );

                            if (response.status === 'success') {
                                openSnackbar({
                                    open: true,
                                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    message: intl.formatMessage({
                                        id: 'default-setting.snackbar.update-success',
                                        defaultMessage: 'Default values updated successfully'
                                    }),
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
                                {tab === 1 && (
                                    <ExtractTab1
                                        generalFormFields1={generalFormFieldsExport1}
                                        isDefaultPage={true}
                                    />
                                )}
                                {tab === 2 && (
                                    <ExtractTab2
                                        generalFormFields2={generalFormFieldsExport2}
                                        isDefaultPage={true}
                                    />
                                )}
                                {tab === 3 && <ExportProductDefault />}

                                <Stack
                                    direction="row"
                                    sx={{ marginY: 3, justifyContent: 'flex-end' }}
                                >
                                    <Button type="submit" variant="contained">
                                        {intl.formatMessage({
                                            id: 'default-setting.button.update',
                                            defaultMessage: 'Update'
                                        })}
                                    </Button>
                                </Stack>
                            </form>
                        </LocalizationProvider>
                    )}
                </Formik>
            )}
        </ React.Fragment>
    );
};

export default DefaultSettingForm;
