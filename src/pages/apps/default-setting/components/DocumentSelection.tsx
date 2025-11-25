// DocumentSelection.tsx
import React from 'react';
import {
    Stack,
    Tabs,
    Tab,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    TextField
} from '@mui/material';
import TaxCodeAutocomplete from 'components/common/TaxCodeAutocomplete';
import UserAutocomplete from 'components/common/UserAutocomplete';
import TRASASCustomerSelect from 'components/common/TRASASCustomerSelect';
import comboBoxData from 'data/comboBoxInfo';
import { useIntl } from 'react-intl';
import { useDefaultSettingPage } from '../DefaultSettingPageContext';
import { getClientDetail } from 'api/client';
import { APIResponse } from 'types/response';
import { ClientType } from 'types/pages/client';

const TRASAS_TAX_CODE = '0304184415';

interface DocumentSelectionProps {
    isAdmin: boolean;
}

const DocumentSelection: React.FC<DocumentSelectionProps> = ({
    isAdmin
}) => {
    const intl = useIntl();
    const { state, dispatch } = useDefaultSettingPage();

    const {
        documentSelectionTab,
        documents,
        selectedDocument,
        documentName,
        documentListLoading,
        method,
        customsProcedureType,
        filterClient,
        importTypeCode,
        filterUserId,
        defaultValuesData
    } = state;

    // Tính toán điều kiện cho nút "Tiếp tục"
    const isRender = isAdmin ? filterClient && method && filterUserId : filterClient && method;
    const isNewMetaReady =
        documentName.trim() &&
        filterClient &&
        method &&
        (method === 'import' ? !!importTypeCode : true) &&
        (!isAdmin || !!filterUserId);

    const proceedDisabled =
        documentSelectionTab === 'existing' ? !selectedDocument : !isNewMetaReady;


    const handleSelect = async (_event: any, value: any) => {
        if (!value) {
            dispatch({ type: 'SET_FILTER_CLIENT', payload: null });
            return;
        }
        try {
            const response: APIResponse = await getClientDetail(value);
            if (response.status === 'success') {
                dispatch({
                    type: 'SET_FILTER_CLIENT',
                    payload: response.data as ClientType
                });
            } else {
                dispatch({ type: 'SET_FILTER_CLIENT', payload: null });
            }
        } catch (error) {
            console.error('Error fetching selected item data:', error);
            dispatch({ type: 'SET_FILTER_CLIENT', payload: null });
        }
        dispatch({ type: 'SET_TRASAS_CUSTOMER_ID', payload: undefined });
    };

    const handleUserSelect = async (_event: any, value: any) => {
        if (!value) {
            dispatch({ type: 'SET_FILTER_USER_ID', payload: undefined });
            return;
        }
        dispatch({ type: 'SET_FILTER_USER_ID', payload: value });
    };

    const handleSelectCustomer = async (_event: any, value: any) => {
        if (!value) {
            dispatch({ type: 'SET_TRASAS_CUSTOMER_ID', payload: undefined });
            return;
        }
        dispatch({ type: 'SET_TRASAS_CUSTOMER_ID', payload: value });
    };

    return (
        <Stack spacing={3} sx={{ mb: 4 }}>
            <Tabs
                value={documentSelectionTab}
                onChange={(_, val) => {
                    dispatch({ type: 'SET_DOCUMENT_SELECTION_TAB', payload: val });
                    if (val === 'existing') {
                        dispatch({ type: 'SET_DOCUMENT_NAME', payload: '' });
                    } else {
                        dispatch({ type: 'SET_SELECTED_DOCUMENT', payload: null });
                    }
                }}
                sx={{ mb: 1 }}
            >
                <Tab
                    value="existing"
                    label={intl.formatMessage({
                        id: 'default-setting.tab.document.existing',
                        defaultMessage: 'Chọn hồ sơ đã tạo'
                    })}
                />
                <Tab
                    value="new"
                    label={intl.formatMessage({
                        id: 'default-setting.tab.document.new',
                        defaultMessage: 'Tạo mới'
                    })}
                />
            </Tabs>

            {/* EXISTING DOCUMENT */}
            {documentSelectionTab === 'existing' && (
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                    <FormControl
                        sx={{ width: { xs: '100%', sm: 320 } }}
                        disabled={documentListLoading || documents.length === 0}
                    >
                        <InputLabel id="default-setting-document-select">
                            {intl.formatMessage({
                                id: 'default-setting.field.document',
                                defaultMessage: 'Hồ sơ'
                            })}
                        </InputLabel>
                        <Select
                            labelId="default-setting-document-select"
                            value={selectedDocument?.id ?? ''}
                            label={intl.formatMessage({
                                id: 'default-setting.field.document',
                                defaultMessage: 'Hồ sơ'
                            })}
                            onChange={(event) => {
                                const docId = Number(event.target.value);
                                const found = documents.find((doc) => doc.id === docId) || null;

                                dispatch({
                                    type: 'SET_SELECTED_DOCUMENT',
                                    payload: found
                                });

                                if (found?.name) {
                                    dispatch({
                                        type: 'SET_DOCUMENT_NAME',
                                        payload: found.name
                                    });
                                }
                            }}
                        >
                            {documents.map((doc) => (
                                <MenuItem key={doc.id} value={doc.id}>
                                    {doc.name || `#${doc.id}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Stack direction="row" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            onClick={() => {
                                dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 });
                            }}
                            disabled={proceedDisabled}
                        >
                            {intl.formatMessage({
                                id: 'default-setting.button.continue',
                                defaultMessage: 'Continue'
                            })}
                        </Button>
                    </Stack>
                </Stack>
            )}

            {/* NEW DOCUMENT */}
            {documentSelectionTab === 'new' && (
                <Grid container spacing={2}>
                    {/* Document name */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InputLabel sx={{ mb: 1 }}>
                            {intl.formatMessage({
                                id: 'default-setting.field.document-name',
                                defaultMessage: 'Tên hồ sơ'
                            })}
                        </InputLabel>
                        <TextField
                            fullWidth
                            value={documentName}
                            onChange={(event) => {
                                dispatch({ type: 'SET_SELECTED_DOCUMENT', payload: null });
                                dispatch({
                                    type: 'SET_DOCUMENT_NAME',
                                    payload: event.target.value
                                });
                            }}
                            placeholder={intl.formatMessage({
                                id: 'default-setting.placeholder.document-name',
                                defaultMessage: 'Nhập tên hồ sơ mới'
                            })}
                        />
                    </Grid>

                    {/* Method */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InputLabel id="method" sx={{ mb: 1 }}>
                            {intl.formatMessage({
                                id: 'default-setting.field.method',
                                defaultMessage: 'Operation'
                            })}
                        </InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="method"
                                value={method}
                                onChange={(event) => {
                                    const nextMethod = event.target.value as string;
                                    dispatch({ type: 'SET_METHOD', payload: nextMethod });
                                    if (nextMethod !== 'import') {
                                        dispatch({
                                            type: 'SET_IMPORT_TYPE_CODE',
                                            payload: ''
                                        });
                                    }
                                }}
                                displayEmpty
                            >
                                <MenuItem value="import">
                                    {intl.formatMessage({
                                        id: 'default-setting.method.import',
                                        defaultMessage: 'Import'
                                    })}
                                </MenuItem>
                                <MenuItem value="export">
                                    {intl.formatMessage({
                                        id: 'default-setting.method.export',
                                        defaultMessage: 'Export'
                                    })}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Customs Procedure */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InputLabel id="customsProcedureType" sx={{ mb: 1 }}>
                            {intl.formatMessage({
                                id: 'default-setting.field.customs-procedure',
                                defaultMessage: 'Customs procedure type'
                            })}
                        </InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="customsProcedureType"
                                value={customsProcedureType}
                                onChange={(event) =>
                                    dispatch({
                                        type: 'SET_CUSTOMS_PROCEDURE_TYPE',
                                        payload: event.target.value as unknown as number
                                    })
                                }
                                displayEmpty
                            >
                                <MenuItem value={0}>
                                    {intl.formatMessage({
                                        id: 'default-setting.customs-procedure.business',
                                        defaultMessage: 'Business, investment'
                                    })}
                                </MenuItem>
                                <MenuItem value={1}>
                                    {intl.formatMessage({
                                        id: 'default-setting.customs-procedure.manufacturing',
                                        defaultMessage: 'Export production'
                                    })}
                                </MenuItem>
                                <MenuItem value={2}>
                                    {intl.formatMessage({
                                        id: 'default-setting.customs-procedure.processing',
                                        defaultMessage: 'Processing'
                                    })}
                                </MenuItem>
                                <MenuItem value={3}>
                                    {intl.formatMessage({
                                        id: 'default-setting.customs-procedure.export-processing',
                                        defaultMessage: 'Export processing zone'
                                    })}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Tax code */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <InputLabel sx={{ mb: 1 }}>Mã số thuế</InputLabel>
                        <TaxCodeAutocomplete name="taxCode" handleSelect={handleSelect} />
                    </Grid>

                    {/* User Autocomplete (Admin only) */}
                    {isAdmin && (
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InputLabel sx={{ mb: 1 }}>Người dùng</InputLabel>
                            <UserAutocomplete name="user_id" handleSelect={handleUserSelect} />
                        </Grid>
                    )}

                    {/* TRASAS Customer Select */}
                    {filterClient?.tax_code === TRASAS_TAX_CODE && (
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InputLabel sx={{ mb: 1 }}>
                                {intl.formatMessage({
                                    id: 'default-setting.field.customer',
                                    defaultMessage: 'Customer'
                                })}
                            </InputLabel>

                            <TRASASCustomerSelect
                                name="customer"
                                by="name"
                                isFloating={true}
                                handleSelect={handleSelectCustomer}
                            />
                        </Grid>
                    )}

                    {/* Import type code */}
                    {method === 'import' && (
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <InputLabel id="importTypeCode" sx={{ mb: 1 }}>
                                {intl.formatMessage({
                                    id: 'default-setting.field.import-type-code',
                                    defaultMessage: 'Mã loại hình'
                                })}
                            </InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    id="importTypeCode"
                                    value={importTypeCode}
                                    onChange={(event) => {
                                        const code = event.target.value as string;
                                        dispatch({ type: 'SET_IMPORT_TYPE_CODE', payload: code });

                                        dispatch({
                                            type: 'SET_DEFAULT_VALUES_DATA',
                                            payload: {
                                                ...defaultValuesData,
                                                general_info: {
                                                    ...(defaultValuesData?.general_info || {}),
                                                    import_type_code: code
                                                }
                                            }
                                        });
                                    }}
                                    displayEmpty
                                >
                                    {comboBoxData[0].data.map((opt) => (
                                        <MenuItem key={opt.code} value={opt.code}>
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}

                    <Grid size={{ xs: 12 }}>
                        <Stack justifyContent="flex-end" direction="row">
                            <Button
                                variant="contained"
                                onClick={() => dispatch({ type: 'SET_ACTIVE_STEP', payload: 1 })}
                                disabled={proceedDisabled || !isRender}
                            >
                                {intl.formatMessage({
                                    id: 'default-setting.button.continue',
                                    defaultMessage: 'Tiếp tục'
                                })}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            )
            }
        </Stack >
    );
};

export default DocumentSelection;
