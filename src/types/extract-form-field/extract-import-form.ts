import comboBoxData from "data/comboBoxInfo";
import { locationImportComboBoxData } from "data/location-code/location-import-comboBox";

export const generalFormFieldsControl1Import = [
    { label: 'Số tờ khai tạm nhập tài xuất tương ứng', key: 'general_info.corresponding_temporary_import_export_declaration_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 0
    { label: 'Mã loại hình', key: 'general_info.import_type_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[0].data }, // 1
    { label: 'Cơ quan Hải quan', key: 'general_info.customs_agency_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[1].data }, // 2
    { label: 'Phân loại cá nhân/tổ chức', key: 'general_info.individual_organization_type', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[2].data }, // 3
    { label: 'Ngày khai báo dự kiến', key: 'general_info.expected_declaration_date', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 4
    { label: 'Mã bộ phận xử lý tờ khai', key: 'general_info.declaration_processing_department_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[3].data }, // 5
    { label: 'Mã hiệu phương thức vận chuyển', key: 'general_info.transport_mode_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[4].data }, // 6
    { label: 'Mã số thuế đơn vị nhập khẩu', key: 'general_info.importer_tax_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 7
    { label: 'Tên đơn vị nhập khẩu', key: 'general_info.importer_name', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 8
    { label: 'Mã bưu chính đơn vị nhập khẩu', key: 'general_info.importer_postal_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 9
    { label: 'Địa chỉ đơn vị nhập khẩu', key: 'general_info.importer_address', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 10
    { label: 'Điện thoại đơn vị nhập khẩu', key: 'general_info.importer_phone', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 11
    { label: 'Mã người uỷ thác nhập khẩu', key: 'general_info.import_consignor_tax_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 12
    { label: 'Tên người uỷ thác nhập khẩu', key: 'general_info.import_consignor_name', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 13
    { label: 'Mã số thuế người xuất khẩu', key: 'general_info.exporter_tax_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 14
    { label: 'Tên đơn vị xuất khẩu', key: 'general_info.exporter_name', readOnly: false, required: true, type: 'text', method: 'import', options: [] }, // 15
    { label: 'Mã bưu chính đơn vị xuất khẩu', key: 'general_info.exporter_postal_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 16
    { label: 'Địa chỉ người xuất khẩu 1', key: 'general_info.exporter_address_1', readOnly: false, required: true, type: 'text', method: 'import', options: [] }, // 17
    { label: 'Địa chỉ người xuất khẩu 2', key: 'general_info.exporter_address_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 18
    { label: 'Địa chỉ người xuất khẩu 3', key: 'general_info.exporter_address_3', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 19
    { label: 'Địa chỉ người xuất khẩu 4', key: 'general_info.exporter_address_4', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 20
    { label: 'Mã nước xuất khẩu', key: 'general_info.export_country_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[5].data }, // 21
    { label: 'Mã người uỷ thác xuất khẩu', key: 'general_info.export_consignor_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 22
    { label: 'Mã người khai hải quan', key: 'general_info.customs_declarant_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 23
    { label: 'Khai báo số định danh cảng biển', key: 'automated_sea_port_customs_supervision_identifier', readOnly: false, required: false, type: 'checkbox', method: 'import', options: [] }, // 24
    { label: 'Khai báo số định danh cảng hàng không', key: 'automated_air_port_customs_supervision_identifier', readOnly: false, required: false, type: 'checkbox', method: 'import', options: [] }, // 25
    { label: 'Số vận đơn 1', key: 'general_info.bill_of_lading_number_1', readOnly: false, required: true, type: 'text', method: 'import', options: [] }, // 26
    { label: 'Ngày vận đơn 1', key: 'general_info.bill_of_lading_date_1', readOnly: false, required: true, type: 'date', method: 'import', options: [] }, // 27
    { label: 'Số MAWB 1', key: 'general_info.mawb_number_1', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 28
    { label: 'Năm MAWB 1', key: 'general_info.mawb_year_1', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 29
    { label: 'Số vận đơn 2', key: 'general_info.bill_of_lading_number_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 30
    { label: 'Ngày vận đơn 2', key: 'general_info.bill_of_lading_date_2', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 31
    { label: 'Số MAWB 2', key: 'general_info.mawb_number_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 32
    { label: 'Năm MAWB 2', key: 'general_info.mawb_year_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 33
    { label: 'Số vận đơn 3', key: 'general_info.bill_of_lading_number_3', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 34
    { label: 'Ngày vận đơn 3', key: 'general_info.bill_of_lading_date_3', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 35
    { label: 'Số MAWB 3', key: 'general_info.mawb_number_3', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 36
    { label: 'Năm MAWB 3', key: 'general_info.mawb_year_3', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 37
    { label: 'Số vận đơn 4', key: 'general_info.bill_of_lading_number_4', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 38
    { label: 'Ngày vận đơn 4', key: 'general_info.bill_of_lading_date_4', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 39
    { label: 'Số MAWB 4', key: 'general_info.mawb_number_4', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 40
    { label: 'Năm MAWB 4', key: 'general_info.mawb_year_4', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 41
    { label: 'Số vận đơn 5', key: 'general_info.bill_of_lading_number_5', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 42
    { label: 'Ngày vận đơn 5', key: 'general_info.bill_of_lading_date_5', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 43
    { label: 'Số MAWB 5', key: 'general_info.mawb_number_5', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 44
    { label: 'Năm MAWB 5', key: 'general_info.mawb_year_5', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 45
    { label: 'Số lượng kiện', key: 'general_info.package_quantity', readOnly: false, required: true, type: 'number', method: 'import', options: [] }, // 46
    { label: 'Đơn vị của số lượng kiện', key: 'general_info.package_quantity_unit', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[6].data }, // 47
    { label: 'Tổng trọng lượng hàng (Gross)', key: 'general_info.total_gross_weight', readOnly: false, required: true, type: 'number', method: 'import', options: [] }, // 48
    { label: 'Đơn vị của tổng trọng lượng', key: 'general_info.gross_weight_unit', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[7].data }, // 49
    { label: 'Mã địa điểm lưu kho hàng chờ thông quan dự kiến', key: 'general_info.expected_warehouse_location_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[8].data }, // 50
    { label: 'Ký hiệu và số hiệu bao bì', key: 'general_info.package_symbol_and_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 51
    { label: 'Mã phương tiện vận chuyển', key: 'general_info.transport_vehicle_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 52
    { label: 'Tên phương tiện vận chuyển', key: 'general_info.transport_vehicle_name', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 53
    { label: 'Ngày hàng đến', key: 'general_info.arrival_date', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 54
    { label: 'Địa điểm dỡ hàng', key: 'general_info.unloading_location_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: locationImportComboBoxData[0].data }, // 55
    { label: 'Địa điểm xếp hàng', key: 'general_info.loading_location_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: locationImportComboBoxData[1].data }, // 56
    { label: 'Số lượng container', key: 'general_info.container_quantity', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 57
    { label: 'Mã kết quả kiểm tra nội dung', key: 'general_info.content_inspection_result_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[11].data } // 58
];

export const generalFormFieldsControl2Import = [
    { label: 'Số hợp đồng', key: 'general_info_2.contract_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 0
    { label: 'Ngày hợp đồng', key: 'general_info_2.contract_date', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 1
    { label: 'Ngày hết hạn', key: 'general_info_2.contract_expiration_date', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 2
    { label: 'Mã văn bản pháp quy khác 1', key: 'general_info_2.other_legal_document_code_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[12].data }, // 3
    { label: 'Mã văn bản pháp quy khác 2', key: 'general_info_2.other_legal_document_code_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[12].data }, // 4
    { label: 'Mã văn bản pháp quy khác 3', key: 'general_info_2.other_legal_document_code_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[12].data }, // 5
    { label: 'Mã văn bản pháp quy khác 4', key: 'general_info_2.other_legal_document_code_4', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[12].data }, // 6
    { label: 'Mã văn bản pháp quy khác 5', key: 'general_info_2.other_legal_document_code_5', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[12].data }, // 7
    { label: 'Giấy phép nhập khẩu 1', key: 'general_info_2.import_license_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[13].data }, // 8
    { label: 'Giấy phép nhập khẩu 2', key: 'general_info_2.import_license_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[13].data }, // 9
    { label: 'Giấy phép nhập khẩu 3', key: 'general_info_2.import_license_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[13].data }, // 10
    { label: 'Giấy phép nhập khẩu 4', key: 'general_info_2.import_license_4', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[13].data }, // 11
    { label: 'Giấy phép nhập khẩu 5', key: 'general_info_2.import_license_5', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[13].data }, // 12
    { label: 'Phân loại hình thức hoá đơn', key: 'general_info_2.invoice_type', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[14].data }, // 13
    { label: 'Số tiếp nhận hoá đơn điện tử', key: 'general_info_2.electronic_invoice_receipt_number', readOnly: true, required: false, type: 'text', method: 'import', options: [] }, // 14
    { label: 'Số hoá đơn', key: 'general_info_2.invoice_number', readOnly: false, required: true, type: 'text', method: 'import', options: [] }, // 15
    { label: 'Ngày phát hành', key: 'general_info_2.invoice_issue_date', readOnly: false, required: true, type: 'date', method: 'import', options: [] }, // 16
    { label: 'Phương thức thanh toán', key: 'general_info_2.payment_method', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[15].data }, // 17
    { label: 'Mã phân loại hoá đơn', key: 'general_info_2.invoice_price_type', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[16].data }, // 18
    { label: 'Điều kiện giá hoá đơn', key: 'general_info_2.invoice_price_condition', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[17].data }, // 19
    { label: 'Tổng trị giá hoá đơn', key: 'general_info_2.total_invoice_value', readOnly: false, required: true, type: 'number', method: 'import', options: [] }, // 20
    { label: 'Mã đồng tiền của hoá đơn', key: 'general_info_2.invoice_currency_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 21
    { label: 'Mã phân loại khai trị giá', key: 'general_info_2.value_declaration_type_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[19].data }, // 22
    { label: 'Số tiếp nhận tờ khai trị giá tổng hợp', key: 'general_info_2.comprehensive_value_declaration_receipt_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 23
    { label: 'Mã tiền tệ', key: 'general_info_2.currency_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 24
    { label: 'Giá cơ sở để hiệu chỉnh giá', key: 'general_info_2.base_price_for_adjustment', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 25
    { label: 'Mã loại phí vận chuyển', key: 'general_info_2.transport_fee_type_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[20].data }, // 26
    { label: 'Mã tiền phí vận chuyển', key: 'general_info_2.transport_fee_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 27
    { label: 'Phí vận chuyển', key: 'general_info_2.transport_fee', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 28
    { label: 'Mã loại phí bảo hiểm', key: 'general_info_2.insurance_fee_type_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[21].data }, // 29
    { label: 'Mã tiền phí bảo hiểm', key: 'general_info_2.insurance_fee_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 30
    { label: 'Phí bảo hiểm', key: 'general_info_2.insurance_fee', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 31
    { label: 'Số đăng ký phí bảo hiểm', key: 'general_info_2.insurance_registration_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 32
    { label: 'Mã tên khoản điều chỉnh 1', key: 'general_info_2.adjustment_item_code_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[22].data }, // 33
    { label: 'Mã phân loại khoản điều chỉnh 1', key: 'general_info_2.adjustment_item_type_code_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[23].data }, // 34
    { label: 'Mã đồng tiền khoản điều chỉnh 1', key: 'general_info_2.adjustment_item_currency_code_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 35
    { label: 'Trị giá khoản điều chỉnh 1', key: 'general_info_2.adjustment_item_value_1', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 36
    { label: 'Tổng hệ số phân bổ 1', key: 'general_info_2.total_allocation_coefficient_1', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 37
    { label: 'Mã tên khoản điều chỉnh 2', key: 'general_info_2.adjustment_item_code_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[22].data }, // 38
    { label: 'Mã phân loại khoản điều chỉnh 2', key: 'general_info_2.adjustment_item_type_code_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[23].data }, // 39
    { label: 'Mã đồng tiền khoản điều chỉnh 2', key: 'general_info_2.adjustment_item_currency_code_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 40
    { label: 'Trị giá khoản điều chỉnh 2', key: 'general_info_2.adjustment_item_value_2', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 41
    { label: 'Tổng hệ số phân bổ 2', key: 'general_info_2.total_allocation_coefficient_2', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 42
    { label: 'Mã tên khoản điều chỉnh 3', key: 'general_info_2.adjustment_item_code_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[22].data }, // 43
    { label: 'Mã phân loại khoản điều chỉnh 3', key: 'general_info_2.adjustment_item_type_code_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[23].data }, // 44
    { label: 'Mã đồng tiền khoản điều chỉnh 3', key: 'general_info_2.adjustment_item_currency_code_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 45
    { label: 'Trị giá khoản điều chỉnh 3', key: 'general_info_2.adjustment_item_value_3', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 46
    { label: 'Tổng hệ số phân bổ 3', key: 'general_info_2.total_allocation_coefficient_3', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 47
    { label: 'Mã tên khoản điều chỉnh 4', key: 'general_info_2.adjustment_item_code_4', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[22].data }, // 48
    { label: 'Mã phân loại khoản điều chỉnh 4', key: 'general_info_2.adjustment_item_type_code_4', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[23].data }, // 49
    { label: 'Mã đồng tiền khoản điều chỉnh 4', key: 'general_info_2.adjustment_item_currency_code_4', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 50
    { label: 'Trị giá khoản điều chỉnh 4', key: 'general_info_2.adjustment_item_value_4', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 51
    { label: 'Tổng hệ số phân bổ 4', key: 'general_info_2.total_allocation_coefficient_4', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 52
    { label: 'Mã tên khoản điều chỉnh 5', key: 'general_info_2.adjustment_item_code_5', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[22].data }, // 53
    { label: 'Mã phân loại khoản điều chỉnh 5', key: 'general_info_2.adjustment_item_type_code_5', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[23].data }, // 54
    { label: 'Mã đồng tiền khoản điều chỉnh 5', key: 'general_info_2.adjustment_item_currency_code_5', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data }, // 55
    { label: 'Trị giá khoản điều chỉnh 5', key: 'general_info_2.adjustment_item_value_5', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 56
    { label: 'Tổng hệ số phân bổ 5', key: 'general_info_2.total_allocation_coefficient_5', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 57
    { label: 'Chi tiết khai trị giá', key: 'general_info_2.value_declaration_details', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 58
    { label: 'Tổng hệ số phân bổ trị giá', key: 'general_info_2.total_value_allocation_coefficient', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 59
    { label: 'Người nộp thuế', key: 'general_info_2.tax_payer', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[24].data }, // 60
    { label: 'Mã lý do đề nghị BP', key: 'general_info_2.reason_code_for_bp_request', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[25].data }, // 61
    { label: 'Năm phát hành hạn mức', key: 'general_info_2.credit_limit_issue_year', readOnly: false, required: false, type: 'number', method: 'import', options: [] }, // 62
    { label: 'Ký hiệu chứng từ hạn mức', key: 'general_info_2.credit_limit_document_symbol', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 63
    { label: 'Số chứng từ hạn mức', key: 'general_info_2.credit_limit_document_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 64
    { label: 'Mã xác định thời hạn nộp thuế', key: 'general_info_2.tax_payment_deadline_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[26].data }, // 65
    { label: 'Mã ngân hàng bảo lãnh', key: 'general_info_2.guarantee_bank_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[27].data }, // 66
    { label: 'Năm phát hành bảo lãnh', key: 'general_info_2.guarantee_issue_year', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 67
    { label: 'Ký hiệu chứng từ bảo lãnh', key: 'general_info_2.guarantee_document_symbol', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 68
    { label: 'Số chứng từ bảo lãnh', key: 'general_info_2.guarantee_document_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 69
    { label: 'Phân loại đính kèm 1', key: 'general_info_2.attachment_type_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[28].data }, // 70
    { label: 'Số đính kèm 1', key: 'general_info_2.attachment_number_1', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 71
    { label: 'Phân loại đính kèm 2', key: 'general_info_2.attachment_type_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[28].data }, // 72
    { label: 'Số đính kèm 2', key: 'general_info_2.attachment_number_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 73
    { label: 'Phân loại đính kèm 3', key: 'general_info_2.attachment_type_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[28].data }, // 74
    { label: 'Số đính kèm 3', key: 'general_info_2.attachment_number_3', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 75
    { label: 'Ngày được phép nhập kho đầu tiên', key: 'general_info_2.first_warehouse_entry_date', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 76
    { label: 'Ngày khởi hành vận chuyển', key: 'general_info_2.transport_departure_date', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 77
    { label: 'Địa điểm trung chuyển 1', key: 'general_info_2.transit_location_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[8].data }, // 78
    { label: 'Ngày đến địa điểm trung chuyển 1', key: 'general_info_2.transit_arrival_date_1', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 79
    { label: 'Ngày khởi hành tới địa điểm trung chuyển 1', key: 'general_info_2.transit_departure_date_1', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 80
    { label: 'Địa điểm trung chuyển 2', key: 'general_info_2.transit_location_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[8].data }, // 81
    { label: 'Ngày đến địa điểm trung chuyển 2', key: 'general_info_2.transit_arrival_date_2', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 82
    { label: 'Ngày khởi hành tới địa điểm trung chuyển 2', key: 'general_info_2.transit_departure_date_2', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 83
    { label: 'Địa điểm trung chuyển 3', key: 'general_info_2.transit_location_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[8].data }, // 84
    { label: 'Ngày đến địa điểm trung chuyển 3', key: 'general_info_2.transit_arrival_date_3', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 85
    { label: 'Ngày khởi hành tới địa điểm trung chuyển 3', key: 'general_info_2.transit_departure_date_3', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 86
    { label: 'Địa điểm đích cho vận chuyển bảo thuế', key: 'general_info_2.tax_transport_destination', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[8].data }, // 87
    { label: 'Ngày đến đích vận chuyển bảo thuế', key: 'general_info_2.tax_transport_destination_arrival_date', readOnly: false, required: false, type: 'date', method: 'import', options: [] }, // 88
    { label: 'Phần ghi chú Thông tin chung 2', key: 'general_info_2.notes_general_information_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] }, // 89
    { label: 'Số quản lý của nội bộ doanh nghiệp - Thông tin chung 2', key: 'general_info_2.internal_management_number_general_information_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] } // 90
];

export const productFormFieldsControlImport = [
    { label: 'Mã hàng', key: 'item_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: [] },
    { label: 'Tên hàng', key: 'item_name', readOnly: false, required: true, type: 'text', method: 'import', options: [] },
    { label: 'Mã HS', key: 'hs_code', readOnly: false, required: true, type: 'text', method: 'import', options: [] },
    { label: 'Mã nước xuất xứ', key: 'country_of_origin_code', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[5].data },
    { label: 'Số lượng', key: 'quantity', readOnly: false, required: true, type: 'number', method: 'import', options: [] },
    { label: 'Đơn vị tính số lượng', key: 'quantity_unit', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[40].data },
    { label: 'Số lượng 2', key: 'secondary_quantity', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: 'Đơn vị tính số lượng 2', key: 'secondary_quantity_unit', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[6].data },
    { label: 'Đơn giá hoá đơn', key: 'invoice_unit_price', readOnly: false, required: true, type: 'number', method: 'import', options: [] },
    { label: 'Mã tiền đơn giá', key: 'unit_price_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data },
    { label: 'Đơn vị tính của đơn giá hoá đơn', key: 'invoice_unit_price_unit', readOnly: false, required: true, type: 'comboBox', method: 'import', options: comboBoxData[40].data },
    { label: 'Trị giá hoá đơn', key: 'invoice_value', readOnly: false, required: true, type: 'number', method: 'import', options: [] },
    { label: 'Trị giá tính thuế', key: 'taxable_value', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: 'Mã tiền Trị giá tính thuế', key: 'taxable_value_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data },
    { label: 'Mã biểu thuế nhập khẩu', key: 'import_tariff_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[29].data },
    { label: 'Thuế suất nhập khẩu (%)', key: 'import_tax_rate', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: 'Tiền thuế nhập khẩu', key: 'import_tax_amount', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: '(1) Mã áp dụng biểu thuế tiêu thụ đặc biệt', key: 'special_consumption_tax_code_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[30].data },
    { label: '(1) Mã miễn/ giảm biểu thuế tiêu thụ đặc biệt', key: 'special_consumption_tax_exemption_reduction_code_1', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[31].data },
    { label: '(1) Số tiền giảm thuế tiêu thụ đặc biệt', key: 'special_consumption_tax_reduction_amount_1', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: '(2) Mã áp dụng biểu thuế môi trường', key: 'environmental_tax_code_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[33].data },
    { label: '(2) Mã miễn/ giảm biểu thuế môi trường', key: 'environmental_tax_exemption_reduction_code_2', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[34].data },
    { label: '(2) Số tiền giảm thuế môi trường', key: 'environmental_tax_reduction_amount_2', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: '(3) Mã áp dụng biểu thuế VAT', key: 'vat_tax_code_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[37].data },
    { label: '(3) Mã miễn/ giảm biểu thuế VAT', key: 'vat_tax_exemption_reduction_code_3', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[38].data },
    { label: '(3) Số Tiền giảm thuế VAT', key: 'vat_tax_reduction_amount_3', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: '(4) Mã áp dụng thuế suất/ Mức thuế', key: 'tax_rate_code_4', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[39].data },
    { label: '(4) Mã miễn/ giảm/ không chịu thuế', key: 'tax_exemption_reduction_code_4', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[32].data },
    { label: '(4) Số tiền giảm thuế', key: 'tax_reduction_amount_4', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: '(5) Mã áp dụng thuế suất/ Mức thuế', key: 'tax_rate_code_5', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[39].data },
    { label: '(5) Mã miễn/ giảm / không chịu thuế', key: 'tax_exemption_reduction_code_5', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[32].data },
    { label: '(5) Số tiền giảm thuế', key: 'tax_reduction_amount_5', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: 'Mức thuế tuyệt đối', key: 'absolute_tax_rate', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: 'Đơn vị tính thuế tuyệt đối', key: 'absolute_tax_rate_unit', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[40].data },
    { label: 'Mã tiền thuế tuyệt đối', key: 'absolute_tax_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[18].data },
    { label: 'Mã áp dụng mức thuế tuyệt đối', key: 'absolute_tax_application_code', readOnly: false, required: false, type: 'comboBox', method: 'import', options: comboBoxData[6].data },
    { label: 'Mã ngoài hạn nghạch', key: 'non_quota_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: '(1) Số mục khai khoản điều chỉnh', key: 'adjustment_item_sequence_1', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: '(2) Số mục khai khoản điều chỉnh', key: 'adjustment_item_sequence_2', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: '(3) Số mục khai khoản điều chỉnh', key: 'adjustment_item_sequence_3', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: '(4) Số mục khai khoản điều chỉnh', key: 'adjustment_item_sequence_4', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: '(5) Số mục khai khoản điều chỉnh', key: 'adjustment_item_sequence_5', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: 'Số TT hàng trên TK tạm nhập tái xuất', key: 'item_sequence_on_temporary_import_export_declaration', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: 'Số đăng ký danh mục miễn thuế NK', key: 'import_tax_exemption_list_registration_number', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: 'Số dòng tương ứng trong danh mục', key: 'corresponding_line_in_exemption_list', readOnly: false, required: false, type: 'text', method: 'import', options: [] },
    { label: 'Mã miễn/ giảm/ không chịu thuế nhập khẩu', key: 'import_tax_exemption_reduction_code', readOnly: false, required: false, type: 'text', method: 'import', options: comboBoxData[32].data },
    { label: 'Số tiền giảm thuế nhập khẩu', key: 'import_tax_reduction_amount', readOnly: false, required: false, type: 'number', method: 'import', options: [] },
    { label: 'Mã quản lý riêng', key: 'private_management_code', readOnly: false, required: false, type: 'text', method: 'import', options: [] }
];

export function validationFormImport(yup: any) {
    return yup.object({
        //general information 
        general_info: yup.object({
            customs_procedure_type: yup.number(),
            // corresponding_temporary_import_export_declaration_number: yup.string().nullable(),
            import_type_code: yup.string().required('Mã loại hình là bắt buộc'),
            customs_agency_code: yup.string().required('Cơ quan hải quan là bắt buộc'),
            individual_organization_type: yup.string().required('Phân loại tổ chức/cá nhân là bắt buộc'),
            expected_declaration_date: yup.date().nullable(),
            declaration_processing_department_code: yup.string().required('Mã bộ phận xử lý tờ khai là bắt buộc'),
            transport_mode_code: yup.string().required('Mã hiệu phương thức vận chuyển là bắt buộc'),
            importer_tax_code: yup.string().nullable(),
            importer_name: yup.string().nullable(),
            importer_postal_code: yup.string().nullable(),
            importer_address: yup.string().nullable(),
            importer_phone: yup.string().nullable(),
            import_consignor_tax_code: yup.string().nullable(),
            import_consignor_name: yup.string().nullable(),
            exporter_tax_code: yup.string().nullable(),
            exporter_name: yup.string().required('Tên đơn vị xuất khẩu là bắt buộc'),
            exporter_postal_code: yup.string().nullable(),
            exporter_address_1: yup.string().required('Địa chỉ của người xuất khẩu 1 là bắt buộc'),
            exporter_address_2: yup.string().nullable(),
            exporter_address_3: yup.string().nullable(),
            exporter_address_4: yup.string().nullable(),
            export_country_code: yup.string().required('Mã nước xuất khẩu là bắt buộc'),
            export_consignor_code: yup.string().nullable(),
            customs_declarant_code: yup.string().nullable(),
            automated_sea_port_customs_supervision_identifier: yup.bool().nullable(),
            automated_air_port_customs_supervision_identifier: yup.bool().nullable(),
            bill_of_lading_number_1: yup.string().required('Số vận đơn 1 là bắt buộc'),
            bill_of_lading_date_1: yup.date().required('Ngày vận đơn 1 là bắt buộc'),
            mawb_number_1: yup.string().nullable(),
            mawb_year_1: yup.string().nullable(),
            bill_of_lading_number_2: yup.string().nullable(),
            bill_of_lading_date_2: yup.date().nullable(),
            mawb_number_2: yup.string().nullable(),
            mawb_year_2: yup.number().nullable(),
            bill_of_lading_number_3: yup.string().nullable(),
            bill_of_lading_date_3: yup.date().nullable(),
            mawb_number_3: yup.string().nullable(),
            mawb_year_3: yup.string().nullable(),
            bill_of_lading_number_4: yup.string().nullable(),
            bill_of_lading_date_4: yup.date().nullable(),
            mawb_number_4: yup.string().nullable(),
            mawb_year_4: yup.string().nullable(),
            bill_of_lading_number_5: yup.string().nullable(),
            bill_of_lading_date_5: yup.date().nullable(),
            mawb_number_5: yup.string().nullable(),
            mawb_year_5: yup.string().nullable(),
            package_quantity: yup.number().required('Số lượng kiện là bắt buộc'),
            package_quantity_unit: yup.string().required('Đơn vị số lượng kiện là bắt buộc'),
            total_gross_weight: yup.number().required('Tổng trọng lượng hàng(Gross) là bắt buộc'),
            gross_weight_unit: yup.string().required('Đơn vị trọng lượng là bắt buộc'),
            expected_warehouse_location_code: yup.string().nullable(),
            package_symbol_and_number: yup.string().nullable(),
            transport_vehicle_code: yup.string().nullable(),
            transport_vehicle_name: yup.string().nullable(),
            arrival_date: yup.date().nullable(),
            unloading_location_code: yup.string().required('Địa điểm dỡ hàng là bắt buộc'),
            loading_location_code: yup.string().required('Địa điểm xếp hàng là bắt buộc'),
            container_quantity: yup.number().nullable(),
            content_inspection_result_code: yup.string().nullable(),
        }),
        general_info_2: yup.object({
            contract_number: yup.string().nullable(),
            contract_date: yup.date().nullable(),
            contract_expiration_date: yup.date().nullable(),
            other_legal_document_code_1: yup.string().nullable(),
            other_legal_document_code_2: yup.string().nullable(),
            other_legal_document_code_3: yup.string().nullable(),
            other_legal_document_code_4: yup.string().nullable(),
            other_legal_document_code_5: yup.string().nullable(),
            import_license_1: yup.string().nullable(),
            import_license_2: yup.string().nullable(),
            import_license_3: yup.string().nullable(),
            import_license_4: yup.string().nullable(),
            import_license_5: yup.string().nullable(),
            invoice_type: yup.string().required('Phân loại hình thức hóa đơn là bắt buộc'),
            electronic_invoice_receipt_number: yup.string().when('invoice_type', {
                is: 'D',
                then: (schema: any) => schema.required('Bắt buộc khi chọn D - Hóa đơn điện tử'),
                otherwise: (schema: any) => schema.notRequired(),
            }),
            invoice_number: yup.string().required('Số hóa đơn là bắt buộc'),
            invoice_issue_date: yup.date().required('Ngày phát hành là bắt buộc'),
            payment_method: yup.string().required('Phương thức thanh toán là bắt buộc'),
            invoice_price_type: yup.string().required('Mã phân loại hóa đơn là bắt buộc'),
            invoice_price_condition: yup.string().required('Điều kiện giá hóa đơn là bắt buộc'),
            total_invoice_value: yup.number().required('Tổng trị giá hóa đơn là bắt buộc'),
            invoice_currency_code: yup.string().required('Mã đồng tiền của hóa đơn là bắt buộc'),
            value_declaration_type_code: yup.string().nullable(),
            comprehensive_value_declaration_receipt_number: yup.string().nullable(),
            currency_code: yup.string().nullable(),
            base_price_for_adjustment: yup.number().nullable(),
            transport_fee_type_code: yup.string().when('invoice_price_condition', {
                is: (val: string) => /^E|^F/.test(val),
                then: (schema: any) => schema.required('Bắt buộc nếu điều kiện giao hàng bắt đầu bằng E hoặc F'),
                otherwise: (schema: any) => schema.notRequired(),
            }),
            transport_fee_currency_code: yup.string().when('invoice_price_condition', {
                is: (val: string) => /^E|^F/.test(val),
                then: (schema: any) => schema.required('Bắt buộc nếu điều kiện giao hàng bắt đầu bằng E hoặc F'),
                otherwise: (schema: any) => schema.notRequired(),
            }),
            transport_fee: yup.number().when('invoice_price_condition', {
                is: (val: string) => /^E|^F/.test(val),
                then: (schema: any) => schema.required('Bắt buộc nếu điều kiện giao hàng bắt đầu bằng E hoặc F'),
                otherwise: (schema: any) => schema.notRequired(),
            }),
            insurance_fee_type_code: yup.string().nullable(),
            insurance_fee_currency_code: yup.string().nullable(),
            insurance_fee: yup.number().nullable(),
            insurance_registration_number: yup.string().nullable(),
            adjustment_item_code_1: yup.string().nullable(),
            adjustment_item_type_code_1: yup.string().nullable(),
            adjustment_item_currency_code_1: yup.string().nullable(),
            adjustment_item_value_1: yup.number().nullable(),
            total_allocation_coefficient_1: yup.number().nullable(),
            adjustment_item_code_2: yup.string().nullable(),
            adjustment_item_type_code_2: yup.string().nullable(),
            adjustment_item_currency_code_2: yup.string().nullable(),
            adjustment_item_value_2: yup.number().nullable(),
            total_allocation_coefficient_2: yup.number().nullable(),
            adjustment_item_code_3: yup.string().nullable(),
            adjustment_item_type_code_3: yup.string().nullable(),
            adjustment_item_currency_code_3: yup.string().nullable(),
            adjustment_item_value_3: yup.number().nullable(),
            total_allocation_coefficient_3: yup.number().nullable(),
            adjustment_item_code_4: yup.string().nullable(),
            adjustment_item_type_code_4: yup.string().nullable(),
            adjustment_item_currency_code_4: yup.string().nullable(),
            adjustment_item_value_4: yup.number().nullable(),
            total_allocation_coefficient_4: yup.number().nullable(),
            adjustment_item_code_5: yup.string().nullable(),
            adjustment_item_type_code_5: yup.string().nullable(),
            adjustment_item_currency_code_5: yup.string().nullable(),
            adjustment_item_value_5: yup.number().nullable(),
            total_allocation_coefficient_5: yup.number().nullable(),
            value_declaration_details: yup.string().nullable(),
            total_value_allocation_coefficient: yup.number().nullable(),
            tax_payer: yup.string().nullable(),
            reason_code_for_bp_request: yup.string().nullable(),
            credit_limit_issue_year: yup.number().nullable(),
            credit_limit_document_symbol: yup.string().nullable(),
            credit_limit_document_number: yup.string().nullable(),
            tax_payment_deadline_code: yup.string().nullable(),
            guarantee_bank_code: yup.string().nullable(),
            guarantee_issue_year: yup.number().nullable(),
            guarantee_document_symbol: yup.string().nullable(),
            guarantee_document_number: yup.string().nullable(),
            attachment_type_1: yup.string().nullable(),
            attachment_number_1: yup.string().nullable(),
            attachment_type_2: yup.string().nullable(),
            attachment_number_2: yup.string().nullable(),
            attachment_type_3: yup.string().nullable(),
            attachment_number_3: yup.string().nullable(),
            first_warehouse_entry_date: yup.date().nullable(),
            transport_departure_date: yup.date().nullable(),
            transit_location_1: yup.string().nullable(),
            transit_arrival_date_1: yup.date().nullable(),
            transit_departure_date_1: yup.date().nullable(),
            transit_location_2: yup.string().nullable(),
            transit_arrival_date_2: yup.date().nullable(),
            transit_departure_date_2: yup.date().nullable(),
            transit_location_3: yup.string().nullable(),
            transit_arrival_date_3: yup.date().nullable(),
            transit_departure_date_3: yup.date().nullable(),
            tax_transport_destination: yup.string().nullable(),
            tax_transport_destination_arrival_date: yup.date().nullable(),
            notes_general_information_2: yup.string().nullable(),
            internal_management_number_general_information_2: yup.string().nullable(),
        }),
    });
}

export const markAllFieldsTouched = (values: any): any => {
    if (Array.isArray(values)) {
        return values.map(markAllFieldsTouched);
    } else if (typeof values === 'object' && values !== null) {
        return Object.keys(values).reduce((acc, key) => {
            acc[key] = markAllFieldsTouched(values[key]);
            return acc;
        }, {} as Record<string, any>);
    } else {
        return true; // Mark as touched
    }
};
