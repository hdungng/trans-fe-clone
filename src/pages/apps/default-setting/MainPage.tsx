// MainPage.tsx
import { useEffect } from 'react';
import {
    CardContent,
    Typography,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import {
    getClientDetail,
    getDefaultSettingDocuments,
} from 'api/client';
import { APIResponse } from 'types/response';
import MainCard from 'components/MainCard';
import { mockFormImportDefault } from '../job-number/form/formik/ImportDefaultFormik';
import { mockFormExportDefault } from '../job-number/form/formik/ExportDefaultFormik';
import { useIntl } from 'react-intl';
import useAuth from 'hooks/useAuth';
import DocumentSelection from './components/DocumentSelection';
import DocumentInfo from './components/DocumentInfo';
import DefaultSettingForm from './components/DefaultSettingForm';
import { useDefaultSettingPage } from './DefaultSettingPageContext';
import { useDefaultSetting } from './DefaultSettingContext';

export interface DefaultSettingDocument {
    id: number;
    name: string;
    method: string;
    tax_code: string;
    customs_procedure_type: number;
    customer?: string | null;
    user_id?: number | null;
    import_type_code?: string;
    data: any;
}

export default function MainPage() {
    const intl = useIntl();
    const { user } = useAuth();
    const { state, dispatch } = useDefaultSettingPage();
    const { setDefaultSetting } = useDefaultSetting();

    const {
        filterClient,
        filterUserId,
        TRASASCustomerId,
        method,
        customsProcedureType,
        selectedDocument,
        activeStep
    } = state;

    useEffect(() => {
        setDefaultSetting((prev) => ({
            ...prev,
            client: filterClient,
            customsProcedureType,
            TRASASCustomerId: TRASASCustomerId || null,
            filterUserId: filterUserId || null
        }));
    }, [filterClient, customsProcedureType, TRASASCustomerId, filterUserId, setDefaultSetting]);

    useEffect(() => {
        const fetchDocuments = async () => {
            dispatch({ type: 'SET_DOCUMENT_LIST_LOADING', payload: true });
            try {
                const res: APIResponse = await getDefaultSettingDocuments();
                if (res?.status === 'success') {
                    dispatch({ type: 'SET_DOCUMENTS', payload: res.data || [] });
                } else {
                    dispatch({ type: 'SET_DOCUMENTS', payload: [] });
                }
            } finally {
                dispatch({ type: 'SET_DOCUMENT_LIST_LOADING', payload: false });
            }
        };
        fetchDocuments();
    }, [dispatch]);

    // Đồng bộ khi chọn document
    useEffect(() => {
        const syncWithDocument = async () => {
            if (!selectedDocument) {
                dispatch({
                    type: 'SET_DEFAULT_VALUES_DATA',
                    payload: method === 'import' ? mockFormImportDefault : mockFormExportDefault
                });
                dispatch({ type: 'SET_DOCUMENT_NAME', payload: '' });
                dispatch({ type: 'SET_FILTER_CLIENT', payload: null });
                dispatch({ type: 'SET_IMPORT_TYPE_CODE', payload: '' });
                return;
            }

            dispatch({ type: 'SET_METHOD', payload: selectedDocument.method });
            dispatch({ type: 'SET_TAB', payload: 1 });
            dispatch({
                type: 'SET_CUSTOMS_PROCEDURE_TYPE',
                payload: selectedDocument.customs_procedure_type
            });
            dispatch({
                type: 'SET_TRASAS_CUSTOMER_ID',
                payload: selectedDocument.customer || undefined
            });
            dispatch({
                type: 'SET_FILTER_USER_ID',
                payload: selectedDocument.user_id ?? undefined
            });
            dispatch({
                type: 'SET_DOCUMENT_NAME',
                payload: selectedDocument.name || ''
            });
            dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
            dispatch({
                type: 'SET_IMPORT_TYPE_CODE',
                payload:
                    selectedDocument.import_type_code ||
                    selectedDocument.data?.general_info?.import_type_code ||
                    ''
            });

            if (selectedDocument.data) {
                dispatch({
                    type: 'SET_DEFAULT_VALUES_DATA',
                    payload: selectedDocument.data
                });
            }

            dispatch({ type: 'SET_IS_LOADING', payload: true });
            try {
                const response: APIResponse = await getClientDetail(selectedDocument.tax_code);
                if (response?.status === 'success') {
                    dispatch({
                        type: 'SET_FILTER_CLIENT',
                        payload: response.data
                    });
                } else {
                    dispatch({ type: 'SET_FILTER_CLIENT', payload: null });
                }
            } finally {
                dispatch({ type: 'SET_IS_LOADING', payload: false });
            }
        };

        syncWithDocument();
    }, [selectedDocument, method, dispatch]);

    const isAdmin = user?.email === 'admin@gmail.com';
    const isRender = isAdmin ? filterClient && method && filterUserId : filterClient && method;
    const canShowForm = (activeStep === 1 && isRender) as boolean;
    const showMetaControls = activeStep === 1;

    return (
        <MainCard content={false} sx={{ mt: 5 }}>
            <CardContent sx={{ p: 3 }}>
                <MainCard>
                    <Typography variant="h5" sx={{ my: 3 }}>
                        {intl.formatMessage({
                            id: 'default-setting.section.default-values',
                            defaultMessage: 'Default parameter information'
                        })}
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                        <Step>
                            <StepLabel>
                                {intl.formatMessage({
                                    id: 'default-setting.step.select-document',
                                    defaultMessage: 'Select document'
                                })}
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>
                                {intl.formatMessage({
                                    id: 'default-setting.step.detail-document',
                                    defaultMessage: 'Document details'
                                })}
                            </StepLabel>
                        </Step>
                    </Stepper>

                    <Typography variant="h5" sx={{ mb: 3 }}>
                        {intl.formatMessage({
                            id: 'default-setting.section.input-info',
                            defaultMessage: 'Enter information'
                        })}
                    </Typography>

                    {!showMetaControls && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {intl.formatMessage({
                                id: 'default-setting.note.select-document-first',
                                defaultMessage:
                                    'Chọn hoặc tạo hồ sơ ở bước 1 trước khi cấu hình tham số.'
                            })}
                        </Typography>
                    )}

                    {/* STEP 0: chọn / tạo hồ sơ */}
                    {activeStep === 0 && (
                        <DocumentSelection
                            isAdmin={isAdmin}
                        />
                    )}

                    {/* Meta info card */}
                    <DocumentInfo />

                    {/* STEP 1: form */}
                    {activeStep === 1 && <DefaultSettingForm
                        canShowForm={canShowForm}
                        selectedDocument={selectedDocument}
                    />}

                    {activeStep === 1 && !canShowForm && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            {intl.formatMessage({
                                id: 'default-setting.note.fill-meta',
                                defaultMessage:
                                    'Chọn/nhập đầy đủ thông tin hồ sơ (mã số thuế, phương thức, người dùng, khách hàng, loại thủ tục, mã loại hình) để hiển thị form.'
                            })}
                        </Typography>
                    )}
                </MainCard>
            </CardContent>
        </MainCard>
    );
}
