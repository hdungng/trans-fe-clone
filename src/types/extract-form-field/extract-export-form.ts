import comboBoxData from "data/comboBoxInfo";
import { locationExportComboBoxData } from "data/location-code/location-export-comboBox";

export const generalFormFieldsControlExport =
    [
        { label: 'Số tờ khai tạm nhập tài xuất tương ứng', key: 'general_info.corresponding_temporary_import_export_declaration_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 0
        { label: 'Mã loại hình', key: 'general_info.export_type_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[0].data }, // 1
        { label: 'Cơ quan Hải quan', key: 'general_info.customs_agency_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[1].data }, // 2
        { label: 'Mã bộ phận xử lý tờ khai', key: 'general_info.declaration_processing_department_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[42].data }, // 3
        { label: 'Mã hiệu phương thức vận chuyển', key: 'general_info.transport_mode_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[4].data }, // 4
        { label: 'Nhập khẩu có thời hạn', key: 'general_info.limited_import', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 5
        { label: 'Ngày khai báo dự kiến', key: 'general_info.expected_declaration_date', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 6
        { label: 'Mã số thuế đơn vị xuất khẩu', key: 'general_info.exporter_tax_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 7
        { label: 'Tên đơn vị xuất khẩu', key: 'general_info.exporter_name', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 8
        { label: 'Mã bưu chính đơn vị xuất khẩu', key: 'general_info.exporter_postal_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 9
        { label: 'Địa chỉ đơn vị xuất khẩu', key: 'general_info.exporter_address', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 10
        { label: 'Điện thoại đơn vị xuất khẩu', key: 'general_info.exporter_phone', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 11
        { label: 'Mã người uỷ thác xuất khẩu', key: 'general_info.export_consignor_tax_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 12
        { label: 'Tên người uỷ thác xuất khẩu', key: 'general_info.export_consignor_name', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 13
        { label: 'Mã số thuế đơn vị nhập khẩu', key: 'general_info.importer_tax_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 14
        { label: 'Tên đơn vị nhập khẩu', key: 'general_info.importer_name', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 15
        { label: 'Mã bưu chính đơn vị nhập khẩu', key: 'general_info.importer_postal_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 16
        { label: 'Địa chỉ đơn vị nhập khẩu 1', key: 'general_info.importer_address_1', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 17
        { label: 'Địa chỉ đơn vị nhập khẩu 2', key: 'general_info.importer_address_2', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 18
        { label: 'Địa chỉ đơn vị nhập khẩu 3', key: 'general_info.importer_address_3', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 19
        { label: 'Địa chỉ đơn vị nhập khẩu 4', key: 'general_info.importer_address_4', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 20
        { label: 'Mã nước nhập khẩu', key: 'general_info.import_country_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[5].data }, // 21
        { label: 'Mã người khai hải quan', key: 'general_info.customs_declarant_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 22
        { label: 'Số vận đơn', key: 'general_info.bill_of_lading_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 23
        { label: 'Số lượng kiện', key: 'general_info.package_quantity', readOnly: false, required: true, type: 'number', method: 'export', options: [] }, // 24
        { label: 'Đơn vị của số lượng kiện', key: 'general_info.package_quantity_unit', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[6].data }, // 25
        { label: 'Tổng trọng lượng hàng (Gross)', key: 'general_info.total_gross_weight', readOnly: false, required: true, type: 'number', method: 'export', options: [] }, // 26
        { label: 'Đơn vị của tổng trọng lượng', key: 'general_info.gross_weight_unit', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[7].data }, // 27
        { label: 'Mã địa điểm lưu kho hàng chờ thông quan dự kiến', key: 'general_info.expected_warehouse_location_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[8].data }, // 28
        { label: 'Địa điểm nhận hàng cuối cùng', key: 'general_info.final_delivery_location', readOnly: false, required: true, type: 'comboBox', method: 'export', options: locationExportComboBoxData[1].data }, // 29
        // ////////////////////////////////////////
        { label: 'Tên địa điểm nhận hàng cuối cùng', key: 'general_info.final_delivery_location_name', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 30
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

        { label: 'Địa điểm xếp hàng', key: 'general_info.loading_location_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: locationExportComboBoxData[0].data }, // 31


        //  ////////////////////////////////////////
        { label: 'Tên địa điểm xếp hàng', key: 'general_info.loading_location_code_name', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 32
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        { label: 'Mã phương tiện vận chuyển', key: 'general_info.transport_vehicle_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 33
        { label: 'Tên phương tiện vận chuyển', key: 'general_info.transport_vehicle_name', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 34
        { label: 'Ngày hàng đi dự kiến', key: 'general_info.expected_departure_date', readOnly: false, required: true, type: 'date', method: 'export', options: [] }, // 35
        { label: 'Ký hiệu và số hiệu', key: 'general_info.package_symbol_and_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 36
        { label: 'Số hợp đồng', key: 'general_info.contract_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 37
        { label: 'Ngày hợp đồng', key: 'general_info.contract_date', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 38
        { label: 'Ngày hết hạn', key: 'general_info.contract_expiration_date', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 39
        { label: 'Mã giấy phép xuất khẩu 1', key: 'general_info.export_license_code_1', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[13].data }, // 40
        { label: 'Số giấy phép xuất khẩu 1', key: 'general_info.export_license_number_1', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 41
        { label: 'Mã giấy phép xuất khẩu 2', key: 'general_info.export_license_code_2', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[13].data }, // 42
        { label: 'Số giấy phép xuất khẩu 2', key: 'general_info.export_license_number_2', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 43
        { label: 'Mã giấy phép xuất khẩu 3', key: 'general_info.export_license_code_3', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[13].data }, // 44
        { label: 'Số giấy phép xuất khẩu 3', key: 'general_info.export_license_number_3', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 45
        { label: 'Mã giấy phép xuất khẩu 4', key: 'general_info.export_license_code_4', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[13].data }, // 46
        { label: 'Số giấy phép xuất khẩu 4', key: 'general_info.export_license_number_4', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 47
        { label: 'Mã giấy phép xuất khẩu 5', key: 'general_info.export_license_code_5', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[13].data }, // 48
        { label: 'Số giấy phép xuất khẩu 5', key: 'general_info.export_license_number_5', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 49
        { label: 'Phân loại hình thức hoá đơn', key: 'general_info.invoice_type', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[14].data }, // 50
        { label: 'Số tiếp nhận hoá đơn điện tử', key: 'general_info.electronic_invoice_receipt_number', readOnly: true, required: false, type: 'text', method: 'export', options: [] }, // 51
        { label: 'Số hoá đơn', key: 'general_info.invoice_number', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 52
        { label: 'Ngày phát hành', key: 'general_info.invoice_issue_date', readOnly: false, required: true, type: 'date', method: 'export', options: [] }, // 53
        { label: 'Phương thức thanh toán', key: 'general_info.payment_method', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[15].data }, // 54
        { label: 'Mã phân loại hoá đơn', key: 'general_info.invoice_price_type', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[16].data }, // 55
        { label: 'Điều kiện hoá đơn', key: 'general_info.invoice_condition', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[17].data }, // 56
        { label: 'Tổng trị giá hoá đơn', key: 'general_info.total_invoice_value', readOnly: false, required: true, type: 'number', method: 'export', options: [] }, // 57
        { label: 'Mã đồng tiền của hoá đơn', key: 'general_info.invoice_currency_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[18].data }, // 58
        { label: 'Trị giá tính thuế', key: 'general_info.taxable_value', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 59
        { label: 'Mã đồng tiền trị giá tính thuế', key: 'general_info.taxable_value_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[18].data }, // 60

        // ==========================================
        { label: 'Phân loại không cần quy đổi VNĐ', key: 'general_info.no_vnd_conversion', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 61
        { label: 'Tổng hệ số phân bổ trị giá tính thuế', key: 'general_info.total_tax_value_allocation_coefficient', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 62
        { label: 'Người nộp thuế', key: 'general_info.tax_payer', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[24].data }, // 63
        { label: 'Mã ngân hàng trả thuế thay', key: 'general_info.tax_payment_bank_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[27].data }, // 64
        { label: 'Năm phát hành hạn mức', key: 'general_info.credit_limit_issue_year', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 65
        { label: 'Ký hiệu chứng từ hạn mức', key: 'general_info.credit_limit_document_symbol', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 66
        { label: 'Số chứng từ hạn mức', key: 'general_info.credit_limit_document_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 67
        { label: 'Mã xác định thời hạn nộp thuế', key: 'general_info.tax_payment_deadline_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[26].data }, // 68
        { label: 'Mã ngân hàng bảo lãnh', key: 'general_info.guarantee_bank_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[27].data }, // 69
        { label: 'Năm phát hành bảo lãnh', key: 'general_info.guarantee_issue_year', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 70
        { label: 'Ký hiệu chứng từ bảo lãnh', key: 'general_info.guarantee_document_symbol', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 71
        { label: 'Số chứng từ bảo lãnh', key: 'general_info.guarantee_document_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 72

        // ================================
        { label: 'Phân loại đính kèm 1', key: 'general_info.attachment_type_1', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[28].data }, // 73
        { label: 'Số đính kèm 1', key: 'general_info.attachment_number_1', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 74
        { label: 'Phân loại đính kèm 2', key: 'general_info.attachment_type_2', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[28].data }, // 75
        { label: 'Số đính kèm 2', key: 'general_info.attachment_number_2', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 76
        { label: 'Phân loại đính kèm 3', key: 'general_info.attachment_type_3', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[28].data }, // 77
        { label: 'Số đính kèm 3', key: 'general_info.attachment_number_3', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 78

        // ================================
        { label: 'Ngày khởi hành vận chuyển', key: 'general_info.transport_departure_date', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 79
        { label: 'Mã địa điểm trung chuyển 1', key: 'general_info.transit_location_code_1', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[8].data }, // 80
        { label: 'Ngày đến địa điểm trung chuyển 1', key: 'general_info.transit_arrival_date_1', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 81
        { label: 'Ngày khởi hành đến địa điểm trung chuyển 1', key: 'general_info.transit_departure_date_1', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 82
        { label: 'Mã địa điểm trung chuyển 2', key: 'general_info.transit_location_code_2', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[8].data }, // 83
        { label: 'Ngày đến địa điểm trung chuyển 2', key: 'general_info.transit_arrival_date_2', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 84
        { label: 'Ngày khởi hành đến địa điểm trung chuyển 2', key: 'general_info.transit_departure_date_2', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 85
        { label: 'Mã địa điểm trung chuyển 3', key: 'general_info.transit_location_code_3', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[8].data }, // 86
        { label: 'Ngày đến địa điểm trung chuyển 3', key: 'general_info.transit_arrival_date_3', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 87
        { label: 'Ngày khởi hành đến địa điểm trung chuyển 3', key: 'general_info.transit_departure_date_3', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 88
        { label: 'Mã địa điểm đích cho vận chuyển bảo thuế', key: 'general_info.tax_transport_destination_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[8].data }, // 89
        { label: 'Ngày đến địa điểm đích cho vận chuyển bảo thuế', key: 'general_info.tax_transport_destination_arrival_date', readOnly: false, required: false, type: 'date', method: 'export', options: [] }, // 90

        // ================================
        { label: 'Ghi chú', key: 'general_info.notes', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 91
        { label: 'Số quản lý nội bộ doanh nghiệp', key: 'general_info.internal_management_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 92
    ];

export const containerControlExport =
    [
        // =========================================
        { label: 'Mã địa điểm xếp hàng lên xe chở hàng 1', key: 'container_info.loading_location_code_1', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[41].data }, // 0
        { label: 'Mã địa điểm xếp hàng lên xe chở hàng 2', key: 'container_info.loading_location_code_2', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[41].data }, // 1
        { label: 'Mã địa điểm xếp hàng lên xe chở hàng 3', key: 'container_info.loading_location_code_3', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[41].data }, // 2
        { label: 'Mã địa điểm xếp hàng lên xe chở hàng 4', key: 'container_info.loading_location_code_4', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[41].data }, // 3
        { label: 'Mã địa điểm xếp hàng lên xe chở hàng 5', key: 'container_info.loading_location_code_5', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[41].data }, // 4

        // =========================================
        { label: 'Tên địa điểm xếp hàng lên xe chở hàng', key: 'container_info.loading_location_name', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 5
        { label: 'Địa chỉ', key: 'container_info.address', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 6

        // =========================================
        { label: 'Số container 1', key: 'container_info.container_number_1', readOnly: false, required: false, type: 'true', method: 'export', options: [] }, // 7
        { label: 'Số container 2', key: 'container_info.container_number_2', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 8
        { label: 'Số container 3', key: 'container_info.container_number_3', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 9
        { label: 'Số container 4', key: 'container_info.container_number_4', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 10
        { label: 'Số container 5', key: 'container_info.container_number_5', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 11
        { label: 'Số container 6', key: 'container_info.container_number_6', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 12
        { label: 'Số container 7', key: 'container_info.container_number_7', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 13
        { label: 'Số container 8', key: 'container_info.container_number_8', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 14
        { label: 'Số container 9', key: 'container_info.container_number_9', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 15
        { label: 'Số container 10', key: 'container_info.container_number_10', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 16
        { label: 'Số container 11', key: 'container_info.container_number_11', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 17
        { label: 'Số container 12', key: 'container_info.container_number_12', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 18
        { label: 'Số container 13', key: 'container_info.container_number_13', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 19
        { label: 'Số container 14', key: 'container_info.container_number_14', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 20
        { label: 'Số container 15', key: 'container_info.container_number_15', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 21
        { label: 'Số container 16', key: 'container_info.container_number_16', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 22
        { label: 'Số container 17', key: 'container_info.container_number_17', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 23
        { label: 'Số container 18', key: 'container_info.container_number_18', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 24
        { label: 'Số container 19', key: 'container_info.container_number_19', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 25
        { label: 'Số container 20', key: 'container_info.container_number_20', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 26
        { label: 'Số container 21', key: 'container_info.container_number_21', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 27
        { label: 'Số container 22', key: 'container_info.container_number_22', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 28
        { label: 'Số container 23', key: 'container_info.container_number_23', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 29
        { label: 'Số container 24', key: 'container_info.container_number_24', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 30
        { label: 'Số container 25', key: 'container_info.container_number_25', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 31
        { label: 'Số container 26', key: 'container_info.container_number_26', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 32
        { label: 'Số container 27', key: 'container_info.container_number_27', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 33
        { label: 'Số container 28', key: 'container_info.container_number_28', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 34
        { label: 'Số container 29', key: 'container_info.container_number_29', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 35
        { label: 'Số container 30', key: 'container_info.container_number_30', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 36
        { label: 'Số container 31', key: 'container_info.container_number_31', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 37
        { label: 'Số container 32', key: 'container_info.container_number_32', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 38
        { label: 'Số container 33', key: 'container_info.container_number_33', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 39
        { label: 'Số container 34', key: 'container_info.container_number_34', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 40
        { label: 'Số container 35', key: 'container_info.container_number_35', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 41
        { label: 'Số container 36', key: 'container_info.container_number_36', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 42
        { label: 'Số container 37', key: 'container_info.container_number_37', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 43
        { label: 'Số container 38', key: 'container_info.container_number_38', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 44
        { label: 'Số container 39', key: 'container_info.container_number_39', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 45
        { label: 'Số container 40', key: 'container_info.container_number_40', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 46
        { label: 'Số container 41', key: 'container_info.container_number_41', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 47
        { label: 'Số container 42', key: 'container_info.container_number_42', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 48
        { label: 'Số container 43', key: 'container_info.container_number_43', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 49
        { label: 'Số container 44', key: 'container_info.container_number_44', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 50
        { label: 'Số container 45', key: 'container_info.container_number_45', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 51
        { label: 'Số container 46', key: 'container_info.container_number_46', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 52
        { label: 'Số container 47', key: 'container_info.container_number_47', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 53
        { label: 'Số container 48', key: 'container_info.container_number_48', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 54
        { label: 'Số container 49', key: 'container_info.container_number_49', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 55
        { label: 'Số container 50', key: 'container_info.container_number_50', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 56
    ];

export const productFormFieldsControlExport = [
    { label: 'Mã hàng', key: 'item_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: [] }, // 0
    { label: 'Tên hàng', key: 'item_name', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 1
    { label: 'Mã HS', key: 'hs_code', readOnly: false, required: true, type: 'text', method: 'export', options: [] }, // 2
    { label: 'Số lượng', key: 'quantity', readOnly: false, required: true, type: 'number', method: 'export', options: [] }, // 3
    { label: 'Mã nước xuất xứ', key: 'country_of_origin_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[5].data }, // 4
    { label: 'Đơn vị tính số lượng', key: 'quantity_unit', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[40].data }, // 5
    { label: 'Số lượng 2', key: 'secondary_quantity', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 6
    { label: 'Đơn vị tính số lượng 2', key: 'secondary_quantity_unit', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[40].data }, // 7
    { label: 'Đơn giá hoá đơn', key: 'invoice_unit_price', readOnly: false, required: true, type: 'number', method: 'export', options: [] }, // 8
    { label: 'Mã tiền đơn giá', key: 'unit_price_currency_code', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[18].data }, // 9
    { label: 'Đơn vị tính của đơn giá hoá đơn', key: 'invoice_unit_price_unit', readOnly: false, required: true, type: 'comboBox', method: 'export', options: comboBoxData[40].data }, // 10
    { label: 'Trị giá hoá đơn', key: 'invoice_value', readOnly: false, required: true, type: 'number', method: 'export', options: [] }, // 11
    { label: 'Trị giá tính thuế', key: 'taxable_value', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 12
    { label: 'Mã tiền Trị giá tính thuế', key: 'taxable_value_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[18].data }, // 13
    { label: 'Tỷ số xuất nhập khẩu (%)', key: 'export_import_ratio', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 14
    { label: 'Mức thuế tuyệt đối', key: 'absolute_tax_rate', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 15
    { label: 'Đơn vị tính mức thuế tuyệt đối', key: 'absolute_tax_rate_unit', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[40].data }, // 16
    { label: 'Mã tiền thuế tuyệt đối', key: 'absolute_tax_currency_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[18].data }, // 17
    { label: 'Tiền thuế xuất nhập khẩu', key: 'export_import_tax_amount', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 18
    { label: 'Mã miễn giảm/ Không chịu thuế xuất khẩu', key: 'export_tax_exemption_reduction_code', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[32].data }, // 19
    { label: 'Số tiền giảm thuế xuất khẩu', key: 'export_tax_reduction_amount', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 20
    { label: 'Số thứ tự hàng trên tờ khai tạm nhập tái xuất', key: 'item_sequence_on_temporary_import_export_declaration', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 21
    { label: 'Số đăng ký danh mục miền thuế xuất khẩu', key: 'export_tax_exemption_list_registration_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 22
    { label: 'Số dòng tương ứng trong danh mục miễn thuế xuất khẩu', key: 'corresponding_line_in_export_tax_exemption_list', readOnly: false, required: false, type: 'number', method: 'export', options: [] }, // 23
    { label: '(1) Mã văn bản pháp luật', key: 'legal_document_code_1', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[12].data }, // 24
    { label: '(2) Mã văn bản pháp luật', key: 'legal_document_code_2', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[12].data }, // 25
    { label: '(3) Mã văn bản pháp luật', key: 'legal_document_code_3', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[12].data }, // 26
    { label: '(4) Mã văn bản pháp luật', key: 'legal_document_code_4', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[12].data }, // 27
    { label: '(5) Mã văn bản pháp luật', key: 'legal_document_code_5', readOnly: false, required: false, type: 'comboBox', method: 'export', options: comboBoxData[12].data }, // 28
    { label: 'Số size', key: 'size_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 29
    { label: 'Số PO', key: 'po_number', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 30
    { label: 'Mã quản lý riêng ', key: 'private_management_code', readOnly: false, required: false, type: 'text', method: 'export', options: [] }, // 31
];

export function validationFormExport(yup: any) {
    return yup.object({
        //general information 
        general_info: yup.object({
            // corresponding_temporary_import_export_declaration_number: yup.string().nullable(),
            export_type_code: yup.string().required('Mã loại hình là bắt buộc'),
            customs_agency_code: yup.string().required('Cơ quan Hải quan là bắt buộc'),
            declaration_processing_department_code: yup.string().nullable(), // không bắt buộc
            transport_mode_code: yup.string().required('Mã hiệu phương thức vận chuyển là bắt buộc'),
            limited_import: yup.string().nullable(), // không bắt buộc
            expected_declaration_date: yup.date().nullable(),
            exporter_tax_code: yup.string().nullable(),
            exporter_name: yup.string().nullable(),
            exporter_postal_code: yup.string().nullable(),
            exporter_address: yup.string().nullable(),
            exporter_phone: yup.string().nullable(),
            export_consignor_tax_code: yup.string().nullable(),
            export_consignor_name: yup.string().nullable(),
            importer_tax_code: yup.string().nullable(),
            importer_name: yup.string().required('Tên đơn vị nhập khẩu là bắt buộc'),
            importer_postal_code: yup.string().nullable(),
            importer_address_1: yup.string().required('Địa chỉ đơn vị nhập khẩu 1 là bắt buộc'),
            importer_address_2: yup.string().required('Địa chỉ đơn vị nhập khẩu 2 là bắt buộc'),
            importer_address_3: yup.string().nullable(),
            importer_address_4: yup.string().nullable(),
            import_country_code: yup.string().required('Mã nước nhập khẩu là bắt buộc'),
            customs_declarant_code: yup.string().nullable(),
            bill_of_lading_number: yup.string().nullable(),
            package_quantity: yup.number().required('Số lượng kiện là bắt buộc'),
            package_quantity_unit: yup.string().required('Đơn vị của số lượng kiện là bắt buộc'),
            total_gross_weight: yup.number().required('Tổng trọng lượng hàng là bắt buộc'),
            gross_weight_unit: yup.string().required('Đơn vị của tổng trọng lượng là bắt buộc'),
            expected_warehouse_location_code: yup.string().nullable(),
            final_delivery_location: yup.string().required('Địa điểm nhận hàng cuối cùng là bắt buộc'),

            final_delivery_location_name: yup
                .string()
                .when('final_delivery_location', {
                    is: (final_delivery_location: string) =>
                        final_delivery_location === 'VNZZZ',
                    then: (schema: any) => schema.required('Tên địa điểm nhận hàng cuối cùng là bắt buộc'),
                    otherwise: (schema: any) => schema.notRequired(),
                }),

            loading_location_code: yup.string().required('Địa điểm xếp hàng là bắt buộc'),

            loading_location_code_name: yup
                .string()
                .when('loading_location_code', {
                    is: (loading_location_code: string) =>
                        loading_location_code === 'VNZZZ',
                    then: (schema: any) => schema.required('Tên địa điểm xếp hàng là bắt buộc'),
                    otherwise: (schema: any) => schema.notRequired(),
                }),
            transport_vehicle_code: yup.string().nullable(),
            transport_vehicle_name: yup.string().nullable(),
            expected_departure_date: yup.date().required('Ngày hàng đi dự kiến là bắt buộc'),
            package_symbol_and_number: yup.string().nullable(),
            contract_number: yup.string().nullable(),
            contract_date: yup.date().nullable(),
            contract_expiration_date: yup.date().nullable(),
            export_license_code_1: yup.string().nullable(),
            export_license_number_1: yup.string().nullable(),
            export_license_code_2: yup.string().nullable(),
            export_license_number_2: yup.string().nullable(),
            export_license_code_3: yup.string().nullable(),
            export_license_number_3: yup.string().nullable(),
            export_license_code_4: yup.string().nullable(),
            export_license_number_4: yup.string().nullable(),
            export_license_code_5: yup.string().nullable(),
            export_license_number_5: yup.string().nullable(),
            invoice_type: yup.string().required('Phân loại hình thức hoá đơn là bắt buộc'),
            electronic_invoice_receipt_number: yup.string().nullable(),
            invoice_number: yup.string().required('Số hoá đơn là bắt buộc'),
            invoice_issue_date: yup.date().required('Ngày phát hành là bắt buộc'),
            payment_method: yup.string().required('Phương thức thanh toán là bắt buộc'),
            invoice_price_type: yup.string().required('Mã phân loại hoá đơn là bắt buộc'),
            invoice_condition: yup.string().required('Điều kiện hoá đơn là bắt buộc'),
            total_invoice_value: yup.number().required('Tổng trị giá hoá đơn là bắt buộc'),
            invoice_currency_code: yup.string().required('Mã đồng tiền của hoá đơn là bắt buộc'),
            taxable_value: yup.number().nullable(),
            taxable_value_currency_code: yup.string().nullable(),
            no_vnd_conversion: yup.string().nullable(),
            total_tax_value_allocation_coefficient: yup.string().nullable(),
            tax_payer: yup.string().nullable(),
            tax_payment_bank_code: yup.string().nullable(),
            credit_limit_issue_year: yup.string().nullable(),
            credit_limit_document_symbol: yup.string().nullable(),
            credit_limit_document_number: yup.string().nullable(),
            tax_payment_deadline_code: yup.string().nullable(),
            guarantee_bank_code: yup.string().nullable(),
            guarantee_issue_year: yup.string().nullable(),
            guarantee_document_symbol: yup.string().nullable(),
            Guarantee_document_number: yup.string().nullable(),
            attachment_type_1: yup.string().nullable(),
            attachment_number_1: yup.string().nullable(),
            attachment_type_2: yup.string().nullable(),
            attachment_number_2: yup.string().nullable(),
            attachment_type_3: yup.string().nullable(),
            attachment_number_3: yup.string().nullable(),
            transport_departure_date: yup.string().nullable(),
            transit_location_code_1: yup.string().nullable(),
            transit_arrival_date_1: yup.string().nullable(),
            transit_departure_date_1: yup.string().nullable(),
            transit_location_code_2: yup.string().nullable(),
            transit_arrival_date_2: yup.string().nullable(),
            transit_departure_date_2: yup.string().nullable(),
            transit_location_code_3: yup.string().nullable(),
            transit_arrival_date_3: yup.string().nullable(),
            transit_departure_date_3: yup.string().nullable(),
            tax_transport_destination_code: yup.string().nullable(),
            tax_transport_destination_arrival_date: yup.string().nullable(),
            notes: yup.string().nullable(),
            internal_management_number: yup.string()
        }),
        container_info: yup.object({
            loading_location_code_1: yup.string().required('Mã địa điểm xếp hàng lên xe chở hàng 1 là bắt buộc'),
            loading_location_code_2: yup.string().nullable(),
            loading_location_code_3: yup.string().nullable(),
            loading_location_code_4: yup.string().nullable(),
            loading_location_code_5: yup.string().nullable(),
            loading_location_name: yup.string().required('Tên địa điểm xếp hàng lên xe chở hàng là bắt buộc'),
            address: yup.string().required('Địa chỉ là bắt buộc'),
            container_number_1: yup.string().nullable(),
            container_number_2: yup.string().nullable(),
            container_number_3: yup.string().nullable(),
            container_number_4: yup.string().nullable(),
            container_number_5: yup.string().nullable(),
            container_number_6: yup.string().nullable(),
            container_number_7: yup.string().nullable(),
            container_number_8: yup.string().nullable(),
            container_number_9: yup.string().nullable(),
            container_number_10: yup.string().nullable(),
            container_number_11: yup.string().nullable(),
            container_number_12: yup.string().nullable(),
            container_number_13: yup.string().nullable(),
            container_number_14: yup.string().nullable(),
            container_number_15: yup.string().nullable(),
            container_number_16: yup.string().nullable(),
            container_number_17: yup.string().nullable(),
            container_number_18: yup.string().nullable(),
            container_number_19: yup.string().nullable(),
            container_number_20: yup.string().nullable(),
            container_number_21: yup.string().nullable(),
            container_number_22: yup.string().nullable(),
            container_number_23: yup.string().nullable(),
            container_number_24: yup.string().nullable(),
            container_number_25: yup.string().nullable(),
            container_number_26: yup.string().nullable(),
            container_number_27: yup.string().nullable(),
            container_number_28: yup.string().nullable(),
            container_number_29: yup.string().nullable(),
            container_number_30: yup.string().nullable(),
            container_number_31: yup.string().nullable(),
            container_number_32: yup.string().nullable(),
            container_number_33: yup.string().nullable(),
            container_number_34: yup.string().nullable(),
            container_number_35: yup.string().nullable(),
            container_number_36: yup.string().nullable(),
            container_number_37: yup.string().nullable(),
            container_number_38: yup.string().nullable(),
            container_number_39: yup.string().nullable(),
            container_number_40: yup.string().nullable(),
            container_number_41: yup.string().nullable(),
            container_number_42: yup.string().nullable(),
            container_number_43: yup.string().nullable(),
            container_number_44: yup.string().nullable(),
            container_number_45: yup.string().nullable(),
            container_number_46: yup.string().nullable(),
            container_number_47: yup.string().nullable(),
            container_number_48: yup.string().nullable(),
            container_number_49: yup.string().nullable(),
            container_number_50: yup.string().nullable(),
        }),
    });
}