// DocumentInfo.tsx
import React from 'react';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { useDefaultSettingPage } from '../DefaultSettingPageContext';
import { useIntl } from 'react-intl';
import useAuth from 'hooks/useAuth';

const TRASAS_TAX_CODE = '0304184415';


const DocumentInfo: React.FC = () => {
    const { state } = useDefaultSettingPage();
    const { user } = useAuth();
    const intl = useIntl();

    const {
        activeStep,
        documentName,
        method,
        filterClient,
        filterUserId,
        TRASASCustomerId,
        customsProcedureType
    } = state;

    const showMetaControls = activeStep === 1;
    if (!showMetaControls) return null;

    const isAdmin = user?.email === 'admin@gmail.com';

    return (
        <MainCard sx={{ mb: 3, p: 2.5 }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid size={{ md: 6, xs: 12 }}>
                    <Typography variant="h5">
                        {documentName ||
                            intl.formatMessage({
                                id: 'default-setting.meta.title',
                                defaultMessage: 'Document'
                            })}
                    </Typography>
                </Grid>

                <Grid size={{ md: 6, xs: 12 }}>
                    <Chip
                        label={
                            method === 'import'
                                ? intl.formatMessage({
                                    id: 'default-setting.method.import',
                                    defaultMessage: 'Import'
                                })
                                : intl.formatMessage({
                                    id: 'default-setting.method.export',
                                    defaultMessage: 'Export'
                                })
                        }
                        color={method === 'import' ? 'success' : 'primary'}
                        size="small"
                        sx={{ textTransform: 'uppercase' }}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
                {/* Method */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                        {intl.formatMessage({
                            id: 'default-setting.field.method',
                            defaultMessage: 'Operation'
                        })}
                    </Typography>
                    <Typography variant="body2">
                        {method === 'import'
                            ? intl.formatMessage({
                                id: 'default-setting.method.import',
                                defaultMessage: 'Import'
                            })
                            : intl.formatMessage({
                                id: 'default-setting.method.export',
                                defaultMessage: 'Export'
                            })}
                    </Typography>
                </Grid>

                {/* Tax code */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                        Tax code
                    </Typography>
                    <Typography variant="body2">{filterClient?.tax_code || '-'}</Typography>
                </Grid>

                {/* User (admin only) */}
                {isAdmin && (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                            User
                        </Typography>
                        <Typography variant="body2">{filterUserId || '-'}</Typography>
                    </Grid>
                )}

                {/* Customer (TRASAS) */}
                {filterClient?.tax_code === TRASAS_TAX_CODE && (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                            {intl.formatMessage({
                                id: 'default-setting.field.customer',
                                defaultMessage: 'Customer'
                            })}
                        </Typography>
                        <Typography variant="body2">{TRASASCustomerId || '-'}</Typography>
                    </Grid>
                )}

                {/* Customs procedure */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                        {intl.formatMessage({
                            id: 'default-setting.field.customs-procedure',
                            defaultMessage: 'Customs procedure type'
                        })}
                    </Typography>
                    <Typography variant="body2">
                        {customsProcedureType === 0 &&
                            intl.formatMessage({
                                id: 'default-setting.customs-procedure.business',
                                defaultMessage: 'Business, investment'
                            })}
                        {customsProcedureType === 1 &&
                            intl.formatMessage({
                                id: 'default-setting.customs-procedure.manufacturing',
                                defaultMessage: 'Export production'
                            })}
                        {customsProcedureType === 2 &&
                            intl.formatMessage({
                                id: 'default-setting.customs-procedure.processing',
                                defaultMessage: 'Processing'
                            })}
                        {customsProcedureType === 3 &&
                            intl.formatMessage({
                                id: 'default-setting.customs-procedure.export-processing',
                                defaultMessage: 'Export processing zone'
                            })}
                    </Typography>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default DocumentInfo;
