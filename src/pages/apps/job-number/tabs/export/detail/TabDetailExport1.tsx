import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { formatDate } from 'utils/formatDate';
import { ExportExtractResponse } from 'types/pages/form-field';
import { getLabelCustoms } from 'data/comboBoxCustom';
import { useIntl } from 'react-intl';

interface TabDetailExport1Props {
    initialGeneralCheckData: ExportExtractResponse | undefined;
}

const TabDetailExport1 = ({ initialGeneralCheckData }: TabDetailExport1Props) => {
    const intl = useIntl();
    const generalInfo = initialGeneralCheckData?.general_info as Record<string, any> | undefined;

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.declaration.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.declaration.operation-type' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[0].data, generalInfo?.export_type_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.declaration.customs-agency' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[1].data, generalInfo?.customs_agency_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.declaration.processing-department' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelCustoms(generalInfo?.customs_agency_code, generalInfo?.declaration_processing_department_code)}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.declaration.transport-mode' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[4].data, generalInfo?.transport_mode_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.declaration.limited-import' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.limited_import || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.declaration.expected-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo?.expected_declaration_date)}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.tax-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.exporter_tax_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.exporter_name || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.postal-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.exporter_postal_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.address' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.exporter_address || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.phone' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.exporter_phone || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.consignor-tax-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.export_consignor_tax_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.exporter.consignor-name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.export_consignor_name || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.importer.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.importer.tax-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.importer_tax_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.importer.name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.importer_name || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.importer.postal-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.importer_postal_code || '-'}
                    </Typography>
                </Grid>
                {[1, 2, 3, 4].map((index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`importer-address-${index}`}>
                        <Typography variant="subtitle2">
                            {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.importer.address' }, { index })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {generalInfo?.[`importer_address_${index}`] || '-'}
                        </Typography>
                    </Grid>
                ))}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.importer.country-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[5].data, generalInfo?.import_country_code || '-')}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.importer.customs-declarant-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.customs_declarant_code || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.section' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.bill_of_lading_number || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.package-quantity' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.package_quantity || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.package-unit' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[6].data, generalInfo?.package_quantity_unit) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.gross-weight' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.total_gross_weight || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.gross-weight-unit' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[7].data, generalInfo?.gross_weight_unit) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.expected-warehouse-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[8].data, generalInfo?.expected_warehouse_location_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.final-delivery-location' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[8].data, generalInfo?.final_delivery_location) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.bill-of-lading.loading-location' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[10].data, generalInfo?.loading_location_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.transport.vehicle-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.transport_vehicle_code || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.transport.vehicle-name' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo?.transport_vehicle_name || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.export.detail.transport.expected-departure-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo?.expected_departure_date)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TabDetailExport1;