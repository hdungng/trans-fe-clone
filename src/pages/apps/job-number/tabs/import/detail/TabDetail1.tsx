import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { formatDate } from 'utils/formatDate';
import { ImportExtractResponse } from 'types/pages/form-field';
import { getLabelCustoms } from 'data/comboBoxCustom';
import { useIntl } from 'react-intl';

interface TabDetail1Props {
    initialGeneralCheckData: ImportExtractResponse | undefined;
}

const TabDetail1 = ({ initialGeneralCheckData }: TabDetail1Props) => {
    const intl = useIntl();
    const generalInfo = initialGeneralCheckData?.general_info as Record<string, any> | undefined;

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.operation-type' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[0].data, initialGeneralCheckData?.general_info?.import_type_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.customs-agency' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[1].data, initialGeneralCheckData?.general_info?.customs_agency_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.individual-organization' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[2].data, initialGeneralCheckData?.general_info?.individual_organization_type) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.expected-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(initialGeneralCheckData?.general_info?.expected_declaration_date)}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.processing-department' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelCustoms(
                            initialGeneralCheckData?.general_info?.customs_agency_code,
                            initialGeneralCheckData?.general_info?.declaration_processing_department_code
                        )}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.declaration.transport-mode' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[4].data, initialGeneralCheckData?.general_info?.transport_mode_code) || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.tax-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.importer_tax_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.importer_name || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.postal-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.importer_postal_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.address' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.importer_address || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.phone' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.importer_phone || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.consignor-tax-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.import_consignor_tax_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.importer.consignor-name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.import_consignor_name || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.tax-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.exporter_tax_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.exporter_name || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.postal-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.exporter_postal_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.address' }, { index: 1 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.exporter_address_1 || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.address' }, { index: 2 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.exporter_address_2 || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.address' }, { index: 3 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.exporter_address_3 || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.address' }, { index: 4 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.exporter_address_4 || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.country-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[5].data, initialGeneralCheckData?.general_info?.export_country_code || '-')}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.consignor-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.export_consignor_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.exporter.customs-declarant-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.customs_declarant_code || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.title' })}
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.seaport-identifier' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.automated_sea_port_customs_supervision_identifier || '-'}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.airport-identifier' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.automated_air_port_customs_supervision_identifier || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.bill-number' }, { index: 1 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.bill_of_lading_number_1 || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.bill-date' }, { index: 1 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(initialGeneralCheckData?.general_info?.bill_of_lading_date_1)}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.mawb-number' }, { index: 1 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.mawb_number_1 || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.mawb-year' }, { index: 1 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {initialGeneralCheckData?.general_info?.mawb_year_1 || '-'}
                    </Typography>
                </Grid>
                {[2, 3, 4, 5].map((index) => (
                    <React.Fragment key={`bill-set-${index}`}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.bill-number' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {generalInfo?.[`bill_of_lading_number_${index}`] || '-'}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.bill-date' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(generalInfo?.[`bill_of_lading_date_${index}`])}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.mawb-number' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {generalInfo?.[`mawb_number_${index}`] || '-'}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport.mawb-year' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {generalInfo?.[`mawb_year_${index}`] || '-'}
                            </Typography>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};

export default TabDetail1;