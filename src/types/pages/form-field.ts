import { InitForm } from "./job-number";

export interface ImportGeneralType {
    import_type_code: string;
    customs_agency_code: string;
    individual_organization_type: string;
    expected_declaration_date: string;
    declaration_processing_department_code: string;
    transport_mode_code: string;
    importer_tax_code: string | null;
    importer_name: string;
    importer_postal_code: string | null;
    importer_address: string;
    importer_phone: string | null;
    import_consignor_tax_code: string;
    import_consignor_name: string;
    exporter_tax_code: string;
    exporter_name: string;
    exporter_postal_code: string | null;
    exporter_address_1: string;
    exporter_address_2: string | null;
    exporter_address_3: string;
    exporter_address_4: string;
    export_country_code: string;
    export_consignor_code: string;
    customs_declarant_code: string;
    automated_sea_port_customs_supervision_identifier: boolean;
    automated_air_port_customs_supervision_identifier: boolean;
    bill_of_lading_number_1: string;
    bill_of_lading_date_1: string;
    mawb_number_1: string | null;
    mawb_year_1: string | null;
    bill_of_lading_number_2: string;
    bill_of_lading_date_2: string;
    mawb_number_2: string;
    mawb_year_2: string;
    bill_of_lading_number_3: string;
    bill_of_lading_date_3: string;
    mawb_number_3: string;
    mawb_year_3: string;
    bill_of_lading_number_4: string;
    bill_of_lading_date_4: string;
    mawb_number_4: string;
    mawb_year_4: string;
    bill_of_lading_number_5: string;
    bill_of_lading_date_5: string;
    mawb_number_5: string;
    mawb_year_5: string;
    package_quantity: number | null;
    package_quantity_unit: string;
    total_gross_weight: number | null;
    gross_weight_unit: string;
    expected_warehouse_location_code: string;
    package_symbol_and_number: string;
    transport_vehicle_code: string;
    transport_vehicle_name: string;
    arrival_date: string;
    unloading_location_code: string;
    loading_location_code: string;
    container_quantity: number | null;
    content_inspection_result_code: string;
}


export interface ImportGeneral2Type {
    // 2.1
    contract_number: string | null;
    contract_date: string;
    contract_expiration_date: string | null;
    other_legal_document_code_1: string;
    other_legal_document_code_2: string;
    other_legal_document_code_3: string;
    other_legal_document_code_4: string;
    other_legal_document_code_5: string;
    import_license_1: string;
    import_license_2: string;
    import_license_3: string;
    import_license_4: string;
    import_license_5: string;
    invoice_type: string;
    electronic_invoice_receipt_number: string;
    invoice_number: string;
    invoice_issue_date: string;
    payment_method: string;
    invoice_price_type: string;
    invoice_price_condition: string;
    total_invoice_value: number | null;
    invoice_currency_code: string;
    value_declaration_type_code: string;
    comprehensive_value_declaration_receipt_number: string;
    currency_code: string;
    base_price_for_adjustment: number | null;
    transport_fee_type_code: string | null;
    transport_fee_currency_code: string | null;
    transport_fee: number | null;
    insurance_fee_type_code: string;
    insurance_fee_currency_code: string | null;
    insurance_fee: number | null;
    insurance_registration_number: string | null;
    adjustment_item_code_1: string;
    adjustment_item_type_code_1: string;
    adjustment_item_currency_code_1: string;
    adjustment_item_value_1: number | null;
    total_allocation_coefficient_1: number | null;
    adjustment_item_code_2: string;
    adjustment_item_type_code_2: string;
    adjustment_item_currency_code_2: string;
    adjustment_item_value_2: number | null;
    total_allocation_coefficient_2: number | null;
    adjustment_item_code_3: string;
    adjustment_item_type_code_3: string;
    adjustment_item_currency_code_3: string;
    adjustment_item_value_3: number | null;
    total_allocation_coefficient_3: number | null;
    adjustment_item_code_4: string;
    adjustment_item_type_code_4: string;
    adjustment_item_currency_code_4: string;
    adjustment_item_value_4: number | null;
    total_allocation_coefficient_4: number | null;
    adjustment_item_code_5: string;
    adjustment_item_type_code_5: string;
    adjustment_item_currency_code_5: string;
    adjustment_item_value_5: number | null;
    total_allocation_coefficient_5: number | null;
    value_declaration_details: string;
    total_value_allocation_coefficient: number | null;
    tax_payer: string;

    // 2.2
    reason_code_for_bp_request: string;
    credit_limit_issue_year: string;
    credit_limit_document_symbol: string;
    credit_limit_document_number: string;
    tax_payment_deadline_code: string;
    guarantee_bank_code: string | null;
    guarantee_issue_year: string | null;
    guarantee_document_symbol: string;
    guarantee_document_number: string;
    attachment_type_1: string;
    attachment_number_1: string | null;
    attachment_type_2: string;
    attachment_number_2: string;
    attachment_type_3: string;
    attachment_number_3: string;
    first_warehouse_entry_date: string;
    transport_departure_date: string;
    transit_location_1: string;
    transit_arrival_date_1: string | null;
    transit_departure_date_1: string | null;
    transit_location_2: string;
    transit_arrival_date_2: string;
    transit_departure_date_2: string;
    transit_location_3: string;
    transit_arrival_date_3: string;
    transit_departure_date_3: string;
    tax_transport_destination: string;
    tax_transport_destination_arrival_date: string;
    notes_general_information_2: string;
    internal_management_number_general_information_2: string;
}

export interface ExportGeneralType {
    export_type_code: string | null,
    customs_agency_code: string | null,
    declaration_processing_department_code: string | null,
    limited_import: string | null,
    transport_mode_code: string | null,

    expected_declaration_date: string | null,
    exporter_tax_code: string | null,
    exporter_name: string | null,
    exporter_postal_code: string | null,
    exporter_address: string | null,
    exporter_phone: string | null,
    export_consignor_tax_code: string | null,
    export_consignor_name: string | null,
    importer_tax_code: string | null,
    importer_name: string | null,
    importer_postal_code: string | null,
    importer_address_1: string | null,
    importer_address_2: string | null,
    importer_address_3: string | null,
    importer_address_4: string | null,
    import_country_code: string | null,
    customs_declarant_code: string | null,
    bill_of_lading_number: string | null,
    package_quantity: number | null,
    package_quantity_unit: string | null,
    total_gross_weight: number | null,
    gross_weight_unit: string | null,
    expected_warehouse_location_code: string | null,
    final_delivery_location: string | null,
    final_delivery_location_name?: string | undefined,
    loading_location_code: string | null,
    loading_location_code_name?: string | undefined,
    transport_vehicle_code: string | null,
    transport_vehicle_name: string | null,
    expected_departure_date: string | null,
    package_symbol_and_number: string | null,
    contract_number: string | null,
    contract_date: string | null,
    contract_expiration_date: string | null,

    export_license_code_1: string | null,
    export_license_number_1: string | null,
    export_license_code_2: string | null,
    export_license_number_2: string | null,
    export_license_code_3: string | null,
    export_license_number_3: string | null,
    export_license_code_4: string | null,
    export_license_number_4: string | null,
    export_license_code_5: string | null,
    export_license_number_5: string | null,
    invoice_type: string | null,
    electronic_invoice_receipt_number: string | null,
    invoice_number: string | null,
    invoice_issue_date: string | null,
    payment_method: string | null,
    invoice_price_type: string | null,
    invoice_condition: string | null,
    total_invoice_value: number | null,
    invoice_currency_code: string,
    taxable_value: number | null,
    taxable_value_currency_code: string | null,
    no_vnd_conversion: string | null,
    total_tax_value_allocation_coefficient: string | null,
    tax_payer: string | null,
    tax_payment_bank_code: string | null,
    credit_limit_issue_year: string | null,
    credit_limit_document_symbol: string | null,
    credit_limit_document_number: string | null,
    tax_payment_deadline_code: string | null,
    guarantee_bank_code: string | null,
    guarantee_issue_year: string | null,
    guarantee_document_symbol: string | null,
    guarantee_document_number: string | null,
    attachment_type_1: string | null,
    attachment_number_1: string | null,
    attachment_type_2: string | null,
    attachment_number_2: string | null,
    attachment_type_3: string | null,
    attachment_number_3: string | null,
    transport_departure_date: string | null,
    transit_location_code_1: string | null,
    transit_arrival_date_1: string | null,
    transit_departure_date_1: string | null,
    transit_location_code_2: string | null,
    transit_arrival_date_2: string | null,
    transit_departure_date_2: string | null,
    transit_location_code_3: string | null,
    transit_arrival_date_3: string | null,
    transit_departure_date_3: string | null,
    tax_transport_destination_code: string | null,
    tax_transport_destination_arrival_date: string | null,
    notes: string | null,
    internal_management_number: string | null
}

export interface ExportContainerType {
    loading_location_code_1: string | null;
    loading_location_code_2: string | null;
    loading_location_code_3: string | null;
    loading_location_code_4: string | null;
    loading_location_code_5: string | null;
    loading_location_name: string | null;
    address: string | null;

    container_number_1: string | null;
    container_number_2: string | null;
    container_number_3: string | null;
    container_number_4: string | null;
    container_number_5: string | null;
    container_number_6: string | null;
    container_number_7: string | null;
    container_number_8: string | null;
    container_number_9: string | null;
    container_number_10: string | null;
    container_number_11: string | null;
    container_number_12: string | null;
    container_number_13: string | null;
    container_number_14: string | null;
    container_number_15: string | null;
    container_number_16: string | null;
    container_number_17: string | null;
    container_number_18: string | null;
    container_number_19: string | null;
    container_number_20: string | null;
    container_number_21: string | null;
    container_number_22: string | null;
    container_number_23: string | null;
    container_number_24: string | null;
    container_number_25: string | null;
    container_number_26: string | null;
    container_number_27: string | null;
    container_number_28: string | null;
    container_number_29: string | null;
    container_number_30: string | null;
    container_number_31: string | null;
    container_number_32: string | null;
    container_number_33: string | null;
    container_number_34: string | null;
    container_number_35: string | null;
    container_number_36: string | null;
    container_number_37: string | null;
    container_number_38: string | null;
    container_number_39: string | null;
    container_number_40: string | null;
    container_number_41: string | null;
    container_number_42: string | null;
    container_number_43: string | null;
    container_number_44: string | null;
    container_number_45: string | null;
    container_number_46: string | null;
    container_number_47: string | null;
    container_number_48: string | null;
    container_number_49: string | null;
    container_number_50: string | null;
}

export interface GeneralFormProps {
    initialFormValues?: ExtractResponse;
    setInitialFormData: (d: any) => void;
    setIsECUSLoading: (d: any) => void;
    handleNext?: () => void;
    jobNumberId: string;
    initStepData: InitForm;
    setErrorIndex?: (i: number | null) => void;
    mode: 'add' | 'edit';
}

export interface ImportProduct {
    item_code: string | null;
    item_name: string | null;
    hs_code: string | null;
    country_of_origin_code: string | null;
    quantity: number | null;
    quantity_unit: string | null;
    secondary_quantity: number | null;
    secondary_quantity_unit: string | null;
    invoice_unit_price: number | null;
    unit_price_currency_code: string | null;
    invoice_unit_price_unit: string | null;
    invoice_value: number | null;
    taxable_value: number | null;
    taxable_value_currency_code: string | null;
    import_tariff_code: string | null;
    import_tax_rate: number | null;
    import_tax_amount: number | null;
    special_consumption_tax_code_1: string | null;
    special_consumption_tax_exemption_reduction_code_1: string | null;
    special_consumption_tax_reduction_amount_1: number | null;
    environmental_tax_code_2: string | null;
    environmental_tax_exemption_reduction_code_2: string | null;
    environmental_tax_reduction_amount_2: number | null;
    vat_tax_code_3: string | null;
    vat_tax_exemption_reduction_code_3: string | null;
    vat_tax_reduction_amount_3: number | null;
    tax_rate_code_4: string | null;
    tax_exemption_reduction_code_4: string | null;
    tax_reduction_amount_4: number | null;
    tax_rate_code_5: string | null;
    tax_exemption_reduction_code_5: string | null;
    tax_reduction_amount_5: number | null;
    absolute_tax_rate: number | null;
    absolute_tax_rate_unit: string | null;
    absolute_tax_currency_code: string | null;
    absolute_tax_application_code: string | null;
    non_quota_code: string | null;
    adjustment_item_sequence_1: string | null;
    adjustment_item_sequence_2: string | null;
    adjustment_item_sequence_3: string | null;
    adjustment_item_sequence_4: string | null;
    adjustment_item_sequence_5: string | null;
    item_sequence_on_temporary_import_export_declaration: string | null;
    import_tax_exemption_list_registration_number: string | null;
    corresponding_line_in_exemption_list: string | null;
    import_tax_exemption_reduction_code: string | null;
    import_tax_reduction_amount: number | null;
    private_management_code: string | null;
}

export interface ExportProduct {
    item_code: string | null;
    item_name: string;
    hs_code: string;
    quantity: number | null;
    country_of_origin_code: string;
    quantity_unit: string;
    secondary_quantity: number | null;
    secondary_quantity_unit: string;
    invoice_unit_price: number | null;
    unit_price_currency_code: string;
    invoice_unit_price_unit: string;
    invoice_value: number | null;
    taxable_value: number | null;
    taxable_value_currency_code: string;
    export_import_ratio: number | null;
    absolute_tax_rate: number | null;
    absolute_tax_rate_unit: string | null;
    absolute_tax_currency_code: string | null;
    export_import_tax_amount: number | null;
    export_tax_exemption_reduction_code: string | null;
    export_tax_reduction_amount: number | null;
    item_sequence_on_temporary_import_export_declaration: number | null;
    export_tax_exemption_list_registration_number: string | null;
    corresponding_line_in_export_tax_exemption_list: number | null;
    legal_document_code_1: string | null;
    legal_document_code_2: string | null;
    legal_document_code_3: string | null;
    legal_document_code_4: string | null;
    legal_document_code_5: string | null;
    size_number: string | null;
    po_number: string | null;
    private_management_code: string | null;
}

export interface ExtractResponse {
    customs_procedure_type: number | null,
    item_code_option: boolean,
}
export interface ImportExtractResponse extends ExtractResponse {
    general_info: ImportGeneralType,
    general_info_2: ImportGeneral2Type;
}

export interface ExportExtractResponse extends ExtractResponse {
    general_info: ExportGeneralType,
    container_info: ExportContainerType;
}


export interface ImportDefaultResponse {
    general_info: ImportGeneralType,
    general_info_2: ImportGeneral2Type;
    item_code_option: boolean,
}

export interface ExportDefaultResponse {
    general_info: ExportGeneralType,
    container_info: ExportContainerType;
    item_code_option: boolean,
}

export interface DefaultResponse extends ExtractResponse {
    general_info_import: ImportGeneralType,
    general_info_2_import: ImportGeneral2Type;
    general_info_export: ExportGeneralType,
    container_info: ExportContainerType;
}