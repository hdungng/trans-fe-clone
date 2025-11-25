import { IntlShape } from 'react-intl';

type MessageConfig = {
    id: string;
    defaultMessage: string;
    values?: Record<string, any>;
};

type FieldLike = {
    key: string;
    label: string;
    method?: string;
};

const directFieldMessages: Record<string, MessageConfig> = {
    'general_info.corresponding_temporary_import_export_declaration_number': {
        id: 'job-number.extract.import.form.general-info.corresponding-temp-declaration-number',
        defaultMessage: 'Corresponding temporary import/export declaration number',
    },
    'general_info.import_type_code': {
        id: 'job-number.extract.import.form.general-info.import-type-code',
        defaultMessage: 'Operation type code',
    },
    'general_info.export_type_code': {
        id: 'job-number.extract.export.form.general-info.export-type-code',
        defaultMessage: 'Operation type code',
    },
    'general_info.customs_agency_code': {
        id: 'job-number.extract.import.form.general-info.customs-agency-code',
        defaultMessage: 'Customs agency',
    },
    'general_info.individual_organization_type': {
        id: 'job-number.extract.import.form.general-info.individual-organization-type',
        defaultMessage: 'Individual/organization classification',
    },
    'general_info.expected_declaration_date': {
        id: 'job-number.extract.import.form.general-info.expected-declaration-date',
        defaultMessage: 'Expected declaration date',
    },
    'general_info.declaration_processing_department_code': {
        id: 'job-number.extract.import.form.general-info.declaration-processing-department',
        defaultMessage: 'Declaration processing department code',
    },
    'general_info.transport_mode_code': {
        id: 'job-number.extract.import.form.general-info.transport-mode-code',
        defaultMessage: 'Transport mode code',
    },
    'general_info.limited_import': {
        id: 'job-number.extract.export.form.general-info.limited-import',
        defaultMessage: 'Limited-term import',
    },
    'general_info.importer_tax_code': {
        id: 'job-number.extract.import.form.general-info.importer-tax-code',
        defaultMessage: 'Importer tax code',
    },
    'general_info.importer_name': {
        id: 'job-number.extract.import.form.general-info.importer-name',
        defaultMessage: 'Importer name',
    },
    'general_info.importer_postal_code': {
        id: 'job-number.extract.import.form.general-info.importer-postal-code',
        defaultMessage: 'Importer postal code',
    },
    'general_info.importer_address': {
        id: 'job-number.extract.import.form.general-info.importer-address',
        defaultMessage: 'Importer address',
    },
    'general_info.importer_phone': {
        id: 'job-number.extract.import.form.general-info.importer-phone',
        defaultMessage: 'Importer phone number',
    },
    'general_info.import_consignor_tax_code': {
        id: 'job-number.extract.import.form.general-info.import-consignor-tax-code',
        defaultMessage: 'Import consignor tax code',
    },
    'general_info.import_consignor_name': {
        id: 'job-number.extract.import.form.general-info.import-consignor-name',
        defaultMessage: 'Import consignor name',
    },
    'general_info.exporter_tax_code': {
        id: 'job-number.extract.import.form.general-info.exporter-tax-code',
        defaultMessage: 'Exporter tax code',
    },
    'general_info.exporter_name': {
        id: 'job-number.extract.import.form.general-info.exporter-name',
        defaultMessage: 'Exporter name',
    },
    'general_info.exporter_postal_code': {
        id: 'job-number.extract.import.form.general-info.exporter-postal-code',
        defaultMessage: 'Exporter postal code',
    },
    'general_info.exporter_address': {
        id: 'job-number.extract.export.form.general-info.exporter-address',
        defaultMessage: 'Exporter address',
    },
    'general_info.export_country_code': {
        id: 'job-number.extract.import.form.general-info.export-country-code',
        defaultMessage: 'Export country code',
    },
    'general_info.exporter_phone': {
        id: 'job-number.extract.export.form.general-info.exporter-phone',
        defaultMessage: 'Exporter phone number',
    },
    'general_info.export_consignor_tax_code': {
        id: 'job-number.extract.export.form.general-info.export-consignor-tax-code',
        defaultMessage: 'Export consignor tax code',
    },
    'general_info.export_consignor_name': {
        id: 'job-number.extract.export.form.general-info.export-consignor-name',
        defaultMessage: 'Export consignor name',
    },
    'general_info.export_consignor_code': {
        id: 'job-number.extract.import.form.general-info.export-consignor-code',
        defaultMessage: 'Export consignor code',
    },
    'general_info.customs_declarant_code': {
        id: 'job-number.extract.import.form.general-info.customs-declarant-code',
        defaultMessage: 'Customs declarant code',
    },
    'automated_sea_port_customs_supervision_identifier': {
        id: 'job-number.extract.import.form.general-info.automated-seaport-identifier',
        defaultMessage: 'Automated seaport customs supervision ID',
    },
    'automated_air_port_customs_supervision_identifier': {
        id: 'job-number.extract.import.form.general-info.automated-airport-identifier',
        defaultMessage: 'Automated airport customs supervision ID',
    },
    'general_info.package_quantity': {
        id: 'job-number.extract.import.form.general-info.package-quantity',
        defaultMessage: 'Package quantity',
    },
    'general_info.import_country_code': {
        id: 'job-number.extract.export.form.general-info.import-country-code',
        defaultMessage: 'Import country code',
    },
    'general_info.package_quantity_unit': {
        id: 'job-number.extract.import.form.general-info.package-quantity-unit',
        defaultMessage: 'Package quantity unit',
    },
    'general_info.total_gross_weight': {
        id: 'job-number.extract.import.form.general-info.total-gross-weight',
        defaultMessage: 'Total gross weight',
    },
    'general_info.gross_weight_unit': {
        id: 'job-number.extract.import.form.general-info.gross-weight-unit',
        defaultMessage: 'Gross weight unit',
    },
    'general_info.expected_warehouse_location_code': {
        id: 'job-number.extract.import.form.general-info.expected-warehouse-location-code',
        defaultMessage: 'Expected bonded warehouse location code',
    },
    'general_info.final_delivery_location': {
        id: 'job-number.extract.export.form.general-info.final-delivery-location',
        defaultMessage: 'Final delivery location code',
    },
    'general_info.final_delivery_location_name': {
        id: 'job-number.extract.export.form.general-info.final-delivery-location-name',
        defaultMessage: 'Final delivery location name',
    },
    'general_info.package_symbol_and_number': {
        id: 'job-number.extract.import.form.general-info.package-symbol-and-number',
        defaultMessage: 'Package marks and numbers',
    },
    'general_info.bill_of_lading_number': {
        id: 'job-number.extract.export.form.general-info.bill-of-lading-number',
        defaultMessage: 'Bill of lading number',
    },
    'general_info.transport_vehicle_code': {
        id: 'job-number.extract.import.form.general-info.transport-vehicle-code',
        defaultMessage: 'Transport vehicle code',
    },
    'general_info.transport_vehicle_name': {
        id: 'job-number.extract.import.form.general-info.transport-vehicle-name',
        defaultMessage: 'Transport vehicle name',
    },
    'general_info.loading_location_code_name': {
        id: 'job-number.extract.export.form.general-info.loading-location-name',
        defaultMessage: 'Loading location name',
    },
    'general_info.expected_departure_date': {
        id: 'job-number.extract.export.form.general-info.expected-departure-date',
        defaultMessage: 'Expected departure date',
    },
    'general_info.arrival_date': {
        id: 'job-number.extract.import.form.general-info.arrival-date',
        defaultMessage: 'Arrival date',
    },
    'general_info.unloading_location_code': {
        id: 'job-number.extract.import.form.general-info.unloading-location-code',
        defaultMessage: 'Port of discharge code',
    },
    'general_info.loading_location_code': {
        id: 'job-number.extract.import.form.general-info.loading-location-code',
        defaultMessage: 'Port of loading code',
    },
    'general_info.container_quantity': {
        id: 'job-number.extract.import.form.general-info.container-quantity',
        defaultMessage: 'Container quantity',
    },
    'general_info.content_inspection_result_code': {
        id: 'job-number.extract.import.form.general-info.content-inspection-result-code',
        defaultMessage: 'Content inspection result code',
    },
    'general_info.contract_number': {
        id: 'job-number.extract.export.form.general-info.contract-number',
        defaultMessage: 'Contract number',
    },
    'general_info.contract_date': {
        id: 'job-number.extract.export.form.general-info.contract-date',
        defaultMessage: 'Contract date',
    },
    'general_info.contract_expiration_date': {
        id: 'job-number.extract.export.form.general-info.contract-expiration-date',
        defaultMessage: 'Contract expiration date',
    },
    'general_info_2.contract_number': {
        id: 'job-number.extract.import.form.general-info-2.contract-number',
        defaultMessage: 'Contract number',
    },
    'general_info_2.contract_date': {
        id: 'job-number.extract.import.form.general-info-2.contract-date',
        defaultMessage: 'Contract date',
    },
    'general_info_2.contract_expiration_date': {
        id: 'job-number.extract.import.form.general-info-2.contract-expiration-date',
        defaultMessage: 'Contract expiration date',
    },
    'general_info.invoice_type': {
        id: 'job-number.extract.export.form.general-info.invoice-type',
        defaultMessage: 'Invoice type',
    },
    'general_info.electronic_invoice_receipt_number': {
        id: 'job-number.extract.export.form.general-info.electronic-invoice-receipt-number',
        defaultMessage: 'Electronic invoice receipt number',
    },
    'general_info.invoice_number': {
        id: 'job-number.extract.export.form.general-info.invoice-number',
        defaultMessage: 'Invoice number',
    },
    'general_info.invoice_issue_date': {
        id: 'job-number.extract.export.form.general-info.invoice-issue-date',
        defaultMessage: 'Invoice issue date',
    },
    'general_info.payment_method': {
        id: 'job-number.extract.export.form.general-info.payment-method',
        defaultMessage: 'Payment method',
    },
    'general_info.invoice_price_type': {
        id: 'job-number.extract.export.form.general-info.invoice-price-type',
        defaultMessage: 'Invoice classification code',
    },
    'general_info.invoice_condition': {
        id: 'job-number.extract.export.form.general-info.invoice-condition',
        defaultMessage: 'Invoice condition',
    },
    'general_info.total_invoice_value': {
        id: 'job-number.extract.export.form.general-info.total-invoice-value',
        defaultMessage: 'Total invoice value',
    },
    'general_info.invoice_currency_code': {
        id: 'job-number.extract.export.form.general-info.invoice-currency-code',
        defaultMessage: 'Invoice currency code',
    },
    'general_info.taxable_value': {
        id: 'job-number.extract.export.form.general-info.taxable-value',
        defaultMessage: 'Taxable value',
    },
    'general_info.taxable_value_currency_code': {
        id: 'job-number.extract.export.form.general-info.taxable-value-currency-code',
        defaultMessage: 'Taxable value currency code',
    },
    'general_info.no_vnd_conversion': {
        id: 'job-number.extract.export.form.general-info.no-vnd-conversion',
        defaultMessage: 'No VND conversion',
    },
    'general_info.total_tax_value_allocation_coefficient': {
        id: 'job-number.extract.export.form.general-info.total-tax-value-allocation-coefficient',
        defaultMessage: 'Total tax value allocation coefficient',
    },
    'general_info.tax_payer': {
        id: 'job-number.extract.export.form.general-info.tax-payer',
        defaultMessage: 'Tax payer',
    },
    'general_info.tax_payment_bank_code': {
        id: 'job-number.extract.export.form.general-info.tax-payment-bank-code',
        defaultMessage: 'Tax payment bank code',
    },
    'general_info.credit_limit_issue_year': {
        id: 'job-number.extract.export.form.general-info.credit-limit-issue-year',
        defaultMessage: 'Credit limit issue year',
    },
    'general_info.credit_limit_document_symbol': {
        id: 'job-number.extract.export.form.general-info.credit-limit-document-symbol',
        defaultMessage: 'Credit limit document symbol',
    },
    'general_info.credit_limit_document_number': {
        id: 'job-number.extract.export.form.general-info.credit-limit-document-number',
        defaultMessage: 'Credit limit document number',
    },
    'general_info.tax_payment_deadline_code': {
        id: 'job-number.extract.export.form.general-info.tax-payment-deadline-code',
        defaultMessage: 'Tax payment deadline code',
    },
    'general_info.guarantee_bank_code': {
        id: 'job-number.extract.export.form.general-info.guarantee-bank-code',
        defaultMessage: 'Guarantee bank code',
    },
    'general_info.guarantee_issue_year': {
        id: 'job-number.extract.export.form.general-info.guarantee-issue-year',
        defaultMessage: 'Guarantee issue year',
    },
    'general_info.guarantee_document_symbol': {
        id: 'job-number.extract.export.form.general-info.guarantee-document-symbol',
        defaultMessage: 'Guarantee document symbol',
    },
    'general_info.guarantee_document_number': {
        id: 'job-number.extract.export.form.general-info.guarantee-document-number',
        defaultMessage: 'Guarantee document number',
    },
    'general_info_2.invoice_type': {
        id: 'job-number.extract.import.form.general-info-2.invoice-type',
        defaultMessage: 'Invoice type',
    },
    'general_info_2.electronic_invoice_receipt_number': {
        id: 'job-number.extract.import.form.general-info-2.electronic-invoice-receipt-number',
        defaultMessage: 'Electronic invoice receipt number',
    },
    'general_info.attachment_type_1': {
        id: 'job-number.extract.export.form.general-info.attachment-type-1',
        defaultMessage: 'Attachment type 1',
    },
    'general_info.attachment_number_1': {
        id: 'job-number.extract.export.form.general-info.attachment-number-1',
        defaultMessage: 'Attachment number 1',
    },
    'general_info.attachment_type_2': {
        id: 'job-number.extract.export.form.general-info.attachment-type-2',
        defaultMessage: 'Attachment type 2',
    },
    'general_info.attachment_number_2': {
        id: 'job-number.extract.export.form.general-info.attachment-number-2',
        defaultMessage: 'Attachment number 2',
    },
    'general_info.attachment_type_3': {
        id: 'job-number.extract.export.form.general-info.attachment-type-3',
        defaultMessage: 'Attachment type 3',
    },
    'general_info.attachment_number_3': {
        id: 'job-number.extract.export.form.general-info.attachment-number-3',
        defaultMessage: 'Attachment number 3',
    },
    'general_info_2.invoice_number': {
        id: 'job-number.extract.import.form.general-info-2.invoice-number',
        defaultMessage: 'Invoice number',
    },
    'general_info_2.invoice_issue_date': {
        id: 'job-number.extract.import.form.general-info-2.invoice-issue-date',
        defaultMessage: 'Invoice issue date',
    },
    'general_info_2.payment_method': {
        id: 'job-number.extract.import.form.general-info-2.payment-method',
        defaultMessage: 'Payment method',
    },
    'general_info.transport_departure_date': {
        id: 'job-number.extract.export.form.general-info.transport-departure-date',
        defaultMessage: 'Transport departure date',
    },
    'general_info_2.invoice_price_type': {
        id: 'job-number.extract.import.form.general-info-2.invoice-price-type',
        defaultMessage: 'Invoice classification code',
    },
    'general_info_2.invoice_price_condition': {
        id: 'job-number.extract.import.form.general-info-2.invoice-price-condition',
        defaultMessage: 'Invoice price condition',
    },
    'general_info_2.total_invoice_value': {
        id: 'job-number.extract.import.form.general-info-2.total-invoice-value',
        defaultMessage: 'Total invoice value',
    },
    'general_info_2.invoice_currency_code': {
        id: 'job-number.extract.import.form.general-info-2.invoice-currency-code',
        defaultMessage: 'Invoice currency code',
    },
    'general_info_2.value_declaration_type_code': {
        id: 'job-number.extract.import.form.general-info-2.value-declaration-type-code',
        defaultMessage: 'Value declaration type code',
    },
    'general_info_2.comprehensive_value_declaration_receipt_number': {
        id: 'job-number.extract.import.form.general-info-2.value-declaration-receipt-number',
        defaultMessage: 'Comprehensive value declaration receipt number',
    },
    'general_info_2.currency_code': {
        id: 'job-number.extract.import.form.general-info-2.currency-code',
        defaultMessage: 'Currency code',
    },
    'general_info_2.base_price_for_adjustment': {
        id: 'job-number.extract.import.form.general-info-2.base-price-for-adjustment',
        defaultMessage: 'Base price for adjustment',
    },
    'general_info_2.transport_fee_type_code': {
        id: 'job-number.extract.import.form.general-info-2.transport-fee-type-code',
        defaultMessage: 'Transport fee type code',
    },
    'general_info_2.transport_fee_currency_code': {
        id: 'job-number.extract.import.form.general-info-2.transport-fee-currency-code',
        defaultMessage: 'Transport fee currency code',
    },
    'general_info_2.transport_fee': {
        id: 'job-number.extract.import.form.general-info-2.transport-fee',
        defaultMessage: 'Transport fee amount',
    },
    'general_info_2.insurance_fee_type_code': {
        id: 'job-number.extract.import.form.general-info-2.insurance-fee-type-code',
        defaultMessage: 'Insurance fee type code',
    },
    'general_info_2.insurance_fee_currency_code': {
        id: 'job-number.extract.import.form.general-info-2.insurance-fee-currency-code',
        defaultMessage: 'Insurance fee currency code',
    },
    'general_info_2.insurance_fee': {
        id: 'job-number.extract.import.form.general-info-2.insurance-fee',
        defaultMessage: 'Insurance fee amount',
    },
    'general_info_2.insurance_registration_number': {
        id: 'job-number.extract.import.form.general-info-2.insurance-registration-number',
        defaultMessage: 'Insurance registration number',
    },
    'general_info_2.value_declaration_details': {
        id: 'job-number.extract.import.form.general-info-2.value-declaration-details',
        defaultMessage: 'Value declaration details',
    },
    'general_info_2.total_value_allocation_coefficient': {
        id: 'job-number.extract.import.form.general-info-2.total-value-allocation-coefficient',
        defaultMessage: 'Total allocation coefficient',
    },
    'general_info_2.tax_payer': {
        id: 'job-number.extract.import.form.general-info-2.tax-payer',
        defaultMessage: 'Tax payer',
    },
    'general_info_2.reason_code_for_bp_request': {
        id: 'job-number.extract.import.form.general-info-2.reason-code-for-bp-request',
        defaultMessage: 'BP request reason code',
    },
    'general_info_2.credit_limit_issue_year': {
        id: 'job-number.extract.import.form.general-info-2.credit-limit-issue-year',
        defaultMessage: 'Credit limit issue year',
    },
    'general_info_2.credit_limit_document_symbol': {
        id: 'job-number.extract.import.form.general-info-2.credit-limit-document-symbol',
        defaultMessage: 'Credit limit document symbol',
    },
    'general_info_2.credit_limit_document_number': {
        id: 'job-number.extract.import.form.general-info-2.credit-limit-document-number',
        defaultMessage: 'Credit limit document number',
    },
    'general_info_2.tax_payment_deadline_code': {
        id: 'job-number.extract.import.form.general-info-2.tax-payment-deadline-code',
        defaultMessage: 'Tax payment deadline code',
    },
    'general_info_2.guarantee_bank_code': {
        id: 'job-number.extract.import.form.general-info-2.guarantee-bank-code',
        defaultMessage: 'Guarantee bank code',
    },
    'general_info_2.guarantee_issue_year': {
        id: 'job-number.extract.import.form.general-info-2.guarantee-issue-year',
        defaultMessage: 'Guarantee issue year',
    },
    'general_info_2.guarantee_document_symbol': {
        id: 'job-number.extract.import.form.general-info-2.guarantee-document-symbol',
        defaultMessage: 'Guarantee document symbol',
    },
    'general_info_2.guarantee_document_number': {
        id: 'job-number.extract.import.form.general-info-2.guarantee-document-number',
        defaultMessage: 'Guarantee document number',
    },
    'general_info_2.first_warehouse_entry_date': {
        id: 'job-number.extract.import.form.general-info-2.first-warehouse-entry-date',
        defaultMessage: 'First warehouse entry date',
    },
    'general_info_2.transport_departure_date': {
        id: 'job-number.extract.import.form.general-info-2.transport-departure-date',
        defaultMessage: 'Transport departure date',
    },
    'general_info.tax_transport_destination_code': {
        id: 'job-number.extract.export.form.general-info.tax-transport-destination-code',
        defaultMessage: 'Bonded transport destination code',
    },
    'general_info.tax_transport_destination_arrival_date': {
        id: 'job-number.extract.export.form.general-info.tax-transport-destination-arrival-date',
        defaultMessage: 'Bonded transport destination arrival date',
    },
    'general_info_2.tax_transport_destination': {
        id: 'job-number.extract.import.form.general-info-2.tax-transport-destination',
        defaultMessage: 'Bonded transport destination',
    },
    'general_info_2.tax_transport_destination_arrival_date': {
        id: 'job-number.extract.import.form.general-info-2.tax-transport-destination-arrival-date',
        defaultMessage: 'Bonded transport arrival date',
    },
    'general_info.notes': {
        id: 'job-number.extract.export.form.general-info.notes',
        defaultMessage: 'Notes',
    },
    'general_info.internal_management_number': {
        id: 'job-number.extract.export.form.general-info.internal-management-number',
        defaultMessage: 'Enterprise internal management number',
    },
    'container_info.loading_location_name': {
        id: 'job-number.extract.export.form.container.loading-location-name',
        defaultMessage: 'Truck loading location name',
    },
    'container_info.address': {
        id: 'job-number.extract.export.form.container.address',
        defaultMessage: 'Address',
    },
    'general_info_2.notes_general_information_2': {
        id: 'job-number.extract.import.form.general-info-2.notes',
        defaultMessage: 'General information 2 notes',
    },
    'general_info_2.internal_management_number_general_information_2': {
        id: 'job-number.extract.import.form.general-info-2.internal-management-number',
        defaultMessage: 'Enterprise internal management number (General info 2)',
    },
    item_code: {
        id: 'job-number.extract.import.form.product.item-code',
        defaultMessage: 'Item code',
    },
    item_name: {
        id: 'job-number.extract.import.form.product.item-name',
        defaultMessage: 'Item name',
    },
    hs_code: {
        id: 'job-number.extract.import.form.product.hs-code',
        defaultMessage: 'HS code',
    },
    country_of_origin_code: {
        id: 'job-number.extract.import.form.product.country-of-origin-code',
        defaultMessage: 'Country of origin code',
    },
    quantity: {
        id: 'job-number.extract.import.form.product.quantity',
        defaultMessage: 'Quantity',
    },
    quantity_unit: {
        id: 'job-number.extract.import.form.product.quantity-unit',
        defaultMessage: 'Quantity unit',
    },
    secondary_quantity: {
        id: 'job-number.extract.import.form.product.secondary-quantity',
        defaultMessage: 'Secondary quantity',
    },
    secondary_quantity_unit: {
        id: 'job-number.extract.import.form.product.secondary-quantity-unit',
        defaultMessage: 'Secondary quantity unit',
    },
    invoice_unit_price: {
        id: 'job-number.extract.import.form.product.invoice-unit-price',
        defaultMessage: 'Invoice unit price',
    },
    unit_price_currency_code: {
        id: 'job-number.extract.import.form.product.unit-price-currency-code',
        defaultMessage: 'Unit price currency code',
    },
    invoice_unit_price_unit: {
        id: 'job-number.extract.import.form.product.invoice-unit-price-unit',
        defaultMessage: 'Invoice unit price unit',
    },
    invoice_value: {
        id: 'job-number.extract.import.form.product.invoice-value',
        defaultMessage: 'Invoice value',
    },
    taxable_value: {
        id: 'job-number.extract.import.form.product.taxable-value',
        defaultMessage: 'Taxable value',
    },
    taxable_value_currency_code: {
        id: 'job-number.extract.import.form.product.taxable-value-currency-code',
        defaultMessage: 'Taxable value currency code',
    },
    export_import_ratio: {
        id: 'job-number.extract.export.form.product.export-import-ratio',
        defaultMessage: 'Export/import ratio (%)',
    },
    export_import_tax_amount: {
        id: 'job-number.extract.export.form.product.export-import-tax-amount',
        defaultMessage: 'Export/import tax amount',
    },
    export_tax_exemption_reduction_code: {
        id: 'job-number.extract.export.form.product.export-tax-exemption-code',
        defaultMessage: 'Export tax exemption/reduction code',
    },
    export_tax_reduction_amount: {
        id: 'job-number.extract.export.form.product.export-tax-reduction-amount',
        defaultMessage: 'Export tax reduction amount',
    },
    import_tariff_code: {
        id: 'job-number.extract.import.form.product.import-tariff-code',
        defaultMessage: 'Import tariff code',
    },
    import_tax_rate: {
        id: 'job-number.extract.import.form.product.import-tax-rate',
        defaultMessage: 'Import tax rate (%)',
    },
    import_tax_amount: {
        id: 'job-number.extract.import.form.product.import-tax-amount',
        defaultMessage: 'Import tax amount',
    },
    absolute_tax_rate: {
        id: 'job-number.extract.import.form.product.absolute-tax-rate',
        defaultMessage: 'Absolute tax rate',
    },
    absolute_tax_rate_unit: {
        id: 'job-number.extract.import.form.product.absolute-tax-rate-unit',
        defaultMessage: 'Absolute tax rate unit',
    },
    absolute_tax_currency_code: {
        id: 'job-number.extract.import.form.product.absolute-tax-currency-code',
        defaultMessage: 'Absolute tax currency code',
    },
    absolute_tax_application_code: {
        id: 'job-number.extract.import.form.product.absolute-tax-application-code',
        defaultMessage: 'Absolute tax application code',
    },
    non_quota_code: {
        id: 'job-number.extract.import.form.product.non-quota-code',
        defaultMessage: 'Non-quota code',
    },
    item_sequence_on_temporary_import_export_declaration: {
        id: 'job-number.extract.import.form.product.temp-import-export-item-sequence',
        defaultMessage: 'Temporary import/export declaration item sequence',
    },
    import_tax_exemption_list_registration_number: {
        id: 'job-number.extract.import.form.product.import-tax-exemption-registration-number',
        defaultMessage: 'Import tax exemption list registration number',
    },
    corresponding_line_in_exemption_list: {
        id: 'job-number.extract.import.form.product.corresponding-line-in-exemption-list',
        defaultMessage: 'Corresponding line in exemption list',
    },
    import_tax_exemption_reduction_code: {
        id: 'job-number.extract.import.form.product.import-tax-exemption-code',
        defaultMessage: 'Import tax exemption/reduction code',
    },
    import_tax_reduction_amount: {
        id: 'job-number.extract.import.form.product.import-tax-reduction-amount',
        defaultMessage: 'Import tax reduction amount',
    },
    private_management_code: {
        id: 'job-number.extract.import.form.product.private-management-code',
        defaultMessage: 'Private management code',
    },
    export_tax_exemption_list_registration_number: {
        id: 'job-number.extract.export.form.product.export-tax-exemption-registration-number',
        defaultMessage: 'Export tax exemption list registration number',
    },
    corresponding_line_in_export_tax_exemption_list: {
        id: 'job-number.extract.export.form.product.corresponding-line-in-export-tax-exemption-list',
        defaultMessage: 'Corresponding line in export tax exemption list',
    },
    size_number: {
        id: 'job-number.extract.export.form.product.size-number',
        defaultMessage: 'Size number',
    },
    po_number: {
        id: 'job-number.extract.export.form.product.po-number',
        defaultMessage: 'PO number',
    },
};

const patternFieldMessages: { regex: RegExp; getMessage: (match: RegExpMatchArray) => MessageConfig }[] = [
    {
        regex: /^general_info\.exporter_address_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info.exporter-address',
            defaultMessage: 'Exporter address {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.importer_address_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.importer-address-indexed',
            defaultMessage: 'Importer address {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.bill_of_lading_number_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info.bill-of-lading-number',
            defaultMessage: 'Bill of lading number {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.bill_of_lading_date_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info.bill-of-lading-date',
            defaultMessage: 'Bill of lading date {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.mawb_number_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info.mawb-number',
            defaultMessage: 'MAWB number {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.mawb_year_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info.mawb-year',
            defaultMessage: 'MAWB year {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.other_legal_document_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.other-legal-document-code',
            defaultMessage: 'Other legal document code {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.import_license_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.import-license',
            defaultMessage: 'Import license {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.adjustment_item_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.adjustment-item-code',
            defaultMessage: 'Adjustment item name {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.adjustment_item_type_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.adjustment-item-type-code',
            defaultMessage: 'Adjustment item classification {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.adjustment_item_currency_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.adjustment-item-currency-code',
            defaultMessage: 'Adjustment currency {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.adjustment_item_value_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.adjustment-item-value',
            defaultMessage: 'Adjustment value {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.total_allocation_coefficient_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.total-allocation-coefficient-indexed',
            defaultMessage: 'Allocation coefficient {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.attachment_type_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.attachment-type',
            defaultMessage: 'Attachment type {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.attachment_number_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.attachment-number',
            defaultMessage: 'Attachment number {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.transit_location_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.transit-location',
            defaultMessage: 'Transit location {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.transit_arrival_date_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.transit-arrival-date',
            defaultMessage: 'Transit arrival date {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info_2\.transit_departure_date_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.general-info-2.transit-departure-date',
            defaultMessage: 'Transit departure date {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.export_license_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.export-license-code',
            defaultMessage: 'Export license code {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.export_license_number_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.export-license-number',
            defaultMessage: 'Export license number {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.attachment_type_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.attachment-type-indexed',
            defaultMessage: 'Attachment type {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.attachment_number_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.attachment-number-indexed',
            defaultMessage: 'Attachment number {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.transit_location_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.transit-location-code',
            defaultMessage: 'Transit location code {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.transit_arrival_date_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.transit-arrival-date',
            defaultMessage: 'Transit arrival date {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.transit_departure_date_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.transit-departure-date',
            defaultMessage: 'Transit departure date {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^general_info\.legal_document_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.general-info.legal-document-code',
            defaultMessage: 'Legal document code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^product_info\.legal_document_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.product.legal-document-code',
            defaultMessage: 'Legal document code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^container_info\.loading_location_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.container.loading-location-code',
            defaultMessage: 'Truck loading location code {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^container_info\.container_number_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.export.form.container.container-number',
            defaultMessage: 'Container number {index}',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?special_consumption_tax_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.special-consumption-tax-code',
            defaultMessage: 'Special consumption tax schedule code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?special_consumption_tax_exemption_reduction_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.special-consumption-tax-exemption-code',
            defaultMessage: 'Special consumption tax exemption/reduction code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?special_consumption_tax_reduction_amount_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.special-consumption-tax-reduction-amount',
            defaultMessage: 'Special consumption tax reduction amount ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?environmental_tax_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.environmental-tax-code',
            defaultMessage: 'Environmental tax schedule code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?environmental_tax_exemption_reduction_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.environmental-tax-exemption-code',
            defaultMessage: 'Environmental tax exemption/reduction code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?environmental_tax_reduction_amount_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.environmental-tax-reduction-amount',
            defaultMessage: 'Environmental tax reduction amount ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?vat_tax_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.vat-tax-code',
            defaultMessage: 'VAT schedule code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?vat_tax_exemption_reduction_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.vat-tax-exemption-code',
            defaultMessage: 'VAT exemption/reduction code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?vat_tax_reduction_amount_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.vat-tax-reduction-amount',
            defaultMessage: 'VAT reduction amount ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?tax_rate_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.tax-rate-code',
            defaultMessage: 'Tax rate/matrix code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?tax_exemption_reduction_code_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.tax-exemption-code',
            defaultMessage: 'Tax exemption/reduction code ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?tax_reduction_amount_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.tax-reduction-amount',
            defaultMessage: 'Tax reduction amount ({index})',
            values: { index: Number(match[1]) },
        }),
    },
    {
        regex: /^(?:product_info\.)?adjustment_item_sequence_(\d+)$/,
        getMessage: (match) => ({
            id: 'job-number.extract.import.form.product.adjustment-item-sequence',
            defaultMessage: 'Adjustment item sequence ({index})',
            values: { index: Number(match[1]) },
        }),
    },
];

export const formatFieldLabel = (field: FieldLike, intl: IntlShape): string => {
    if (!['import', 'export'].includes(field.method ?? '')) {
        return field.label;
    }

    const normalizedKey = field.key.startsWith('product_info.')
        ? field.key.replace('product_info.', '')
        : field.key;

    const direct = directFieldMessages[normalizedKey];
    if (direct) {
        return intl.formatMessage({ id: direct.id, defaultMessage: direct.defaultMessage }, direct.values);
    }

    for (const pattern of patternFieldMessages) {
        const match = normalizedKey.match(pattern.regex);
        if (match) {
            const descriptor = pattern.getMessage(match);
            return intl.formatMessage({ id: descriptor.id, defaultMessage: descriptor.defaultMessage }, descriptor.values);
        }
    }

    return field.label;
};