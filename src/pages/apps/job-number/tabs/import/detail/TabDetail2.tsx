import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { formatDate } from 'utils/formatDate';
import { ImportExtractResponse } from 'types/pages/form-field';
import { useIntl } from 'react-intl';

interface TabDetail2Props {
    initialGeneralCheckData: ImportExtractResponse | undefined;
}

const TabDetail2 = ({ initialGeneralCheckData }: TabDetail2Props) => {
    const intl = useIntl();
    const generalInfo2 = initialGeneralCheckData?.general_info_2 as Record<string, any> | undefined;

    const renderAdjustmentFields = (index: number) => (
        <React.Fragment key={`adjustment-${index}`}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2">
                    {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.adjustment.item-code' }, { index })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {getLabelByCode(comboBoxData[22].data, generalInfo2?.[`adjustment_item_code_${index}`]) || '-'}
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2">
                    {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.adjustment.item-type' }, { index })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {getLabelByCode(comboBoxData[18].data, generalInfo2?.[`adjustment_item_type_code_${index}`]) || '-'}
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2">
                    {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.adjustment.currency' }, { index })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {generalInfo2?.[`adjustment_item_currency_code_${index}`] || '-'}
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2">
                    {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.adjustment.value' }, { index })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {generalInfo2?.[`adjustment_item_value_${index}`] || '-'}
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="subtitle2">
                    {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.adjustment.coefficient' }, { index })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {generalInfo2?.[`total_allocation_coefficient_${index}`] || '-'}
                </Typography>
            </Grid>
        </React.Fragment>
    );

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.legal-documents.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.legal-documents.contract-number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.contract_number || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.legal-documents.contract-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo2?.contract_date)}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.legal-documents.contract-expiration' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo2?.contract_expiration_date)}
                    </Typography>
                </Grid>
                {[1, 2, 3, 4, 5].map((index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`other-legal-code-${index}`}>
                        <Typography variant="subtitle2">
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.legal-documents.code' }, { index })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {getLabelByCode(comboBoxData[12].data, generalInfo2?.[`other_legal_document_code_${index}`]) || '-'}
                        </Typography>
                    </Grid>
                ))}

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.import-license.title' })}
                    </Typography>
                </Grid>
                {[1, 2, 3, 4, 5].map((index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`import-license-${index}`}>
                        <Typography variant="subtitle2">
                            {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.import-license.item' }, { index })}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {getLabelByCode(comboBoxData[13].data, generalInfo2?.[`import_license_${index}`]) || '-'}
                        </Typography>
                    </Grid>
                ))}

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.type' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[14].data, generalInfo2?.invoice_type) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.electronic-receipt' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.electronic_invoice_receipt_number || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.invoice_number || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.issue-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo2?.invoice_issue_date)}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.payment-method' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[15].data, generalInfo2?.payment_method) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.price-type' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[16].data, generalInfo2?.invoice_price_type) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.price-condition' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[17].data, generalInfo2?.invoice_price_condition) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.total-value' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.total_invoice_value || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.invoice.currency' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[18].data, generalInfo2?.invoice_currency_code) || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.type' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[19].data, generalInfo2?.value_declaration_type_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.receipt-number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.comprehensive_value_declaration_receipt_number || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.currency' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[18].data, generalInfo2?.currency_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.base-price' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.base_price_for_adjustment || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-fee.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-fee.type' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[20].data, generalInfo2?.transport_fee_type_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-fee.currency' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[18].data, generalInfo2?.transport_fee_currency_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-fee.amount' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.transport_fee || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.insurance-fee.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.insurance-fee.type' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[21].data, generalInfo2?.insurance_fee_type_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.insurance-fee.currency' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[18].data, generalInfo2?.insurance_fee_currency_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.insurance-fee.amount' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.insurance_fee || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.insurance-fee.registration-number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.insurance_registration_number || '-'}
                    </Typography>
                </Grid>

                {[1, 2, 3, 4, 5].map((index) => renderAdjustmentFields(index))}

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.detail' }, { index: 5 })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.detail-description' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.value-declaration.total-coefficient' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.total_value_allocation_coefficient || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.tax-payer' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[24].data, generalInfo2?.tax_payer || '-')}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.reason-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[25].data, generalInfo2?.reason_code_for_bp_request || '-')}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.credit-issue-year' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.credit_limit_issue_year || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.credit-symbol' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.credit_limit_document_symbol || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.credit-number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.credit_limit_document_number || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.tax-deadline-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[26].data, generalInfo2?.tax_payment_deadline_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.bank-code' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[27].data, generalInfo2?.guarantee_bank_code) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.guarantee-issue-year' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.guarantee_issue_year || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.guarantee-symbol' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.guarantee_document_symbol || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.tax-guarantee.guarantee-number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.guarantee_document_number || '-'}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.attachments.title' })}
                    </Typography>
                </Grid>
                {[1, 2, 3].map((index) => (
                    <React.Fragment key={`attachment-${index}`}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.attachments.type' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {getLabelByCode(comboBoxData[28].data, generalInfo2?.[`attachment_type_${index}`]) || '-'}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.attachments.number' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {generalInfo2?.[`attachment_number_${index}`] || '-'}
                            </Typography>
                        </Grid>
                    </React.Fragment>
                ))}

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-info.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-info.first-warehouse-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo2?.first_warehouse_entry_date)}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transport-info.departure-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo2?.transport_departure_date)}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transit.title' })}
                    </Typography>
                </Grid>
                {[1, 2, 3].map((index) => (
                    <React.Fragment key={`transit-${index}`}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transit.location' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {getLabelByCode(comboBoxData[8].data, generalInfo2?.[`transit_location_${index}`]) || '-'}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transit.arrival-date' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(generalInfo2?.[`transit_arrival_date_${index}`])}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography variant="subtitle2">
                                {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transit.departure-date' }, { index })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(generalInfo2?.[`transit_departure_date_${index}`])}
                            </Typography>
                        </Grid>
                    </React.Fragment>
                ))}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transit.tax-destination' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {getLabelByCode(comboBoxData[8].data, generalInfo2?.tax_transport_destination) || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.transit.tax-arrival-date' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(generalInfo2?.tax_transport_destination_arrival_date)}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                    <Typography variant="h5" sx={{ marginY: 2 }}>
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.misc.title' })}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.misc.notes' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.notes_general_information_2 || '-'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="subtitle2">
                        {intl.formatMessage({ id: 'job-number.detail.extract.import.detail.misc.internal-number' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {generalInfo2?.internal_management_number_general_information_2 || '-'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TabDetail2;