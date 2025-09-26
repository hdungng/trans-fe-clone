import comboBoxData from "data/comboBoxInfo";

export const defaultProductFormFieldsControlExport = [
    { label: 'Mã hàng', key: 'product_info.item_code', readOnly: true, required: false, type: 'text', method: "export", options: [] }, // 0
    { label: 'Tên hàng', key: 'product_info.item_name', readOnly: true, required: false, type: 'text', method: "export", options: [] }, // 1
    { label: 'Mã HS', key: 'product_info.hs_code', readOnly: true, required: false, type: 'text', method: "export", options: [] }, // 2
    { label: 'Số lượng', key: 'product_info.quantity', readOnly: true, required: false, type: 'number', method: "export", options: [] }, // 3
    { label: 'Mã nước xuất xứ', key: 'product_info.country_of_origin_code', readOnly: true, required: false, type: 'comboBox', method: "export", options: comboBoxData[5].data }, // 4
    { label: 'Đơn vị tính số lượng', key: 'product_info.quantity_unit', readOnly: true, required: false, type: 'comboBox', method: "export", options: comboBoxData[40].data }, // 5
    { label: 'Số lượng 2', key: 'product_info.secondary_quantity', readOnly: true, required: false, type: 'number', method: "export", options: [] }, // 6
    { label: 'Đơn vị tính số lượng 2', key: 'product_info.secondary_quantity_unit', readOnly: true, required: false, type: 'comboBox', method: "export", options: comboBoxData[40].data }, // 7
    { label: 'Đơn giá hoá đơn', key: 'product_info.invoice_unit_price', readOnly: true, required: false, type: 'number', method: "export", options: [] }, // 8
    { label: 'Mã tiền đơn giá', key: 'product_info.unit_price_currency_code', readOnly: true, required: false, type: 'comboxBox', method: "export", options: comboBoxData[18].data }, // 9
    { label: 'Đơn vị tính của đơn giá hoá đơn', key: 'product_info.invoice_unit_price_unit', readOnly: true, required: false, type: 'comboBox', method: "export", options: comboBoxData[40].data }, // 10
    { label: 'Trị giá hoá đơn', key: 'product_info.invoice_value', readOnly: true, required: false, type: 'number', method: "export", options: [] }, // 11
    { label: 'Trị giá tính thuế', key: 'product_info.taxable_value', readOnly: true, required: false, type: 'number', method: "export", options: [] }, // 12
    { label: 'Mã tiền Trị giá tính thuế', key: 'product_info.taxable_value_currency_code', readOnly: true, required: false, type: 'comboBox', method: "export", options: comboBoxData[18].data }, // 13
    { label: 'Tỷ số xuất nhập khẩu (%)', key: 'product_info.export_import_ratio', readOnly: false, required: false, type: 'number', method: "export", options: [] }, // 14
    { label: 'Mức thuế tuyệt đối', key: 'product_info.absolute_tax_rate', readOnly: false, required: false, type: 'number', method: "export", options: [] }, // 15
    { label: 'Đơn vị tính mức thuế tuyệt đối', key: 'product_info.absolute_tax_rate_unit', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[40].data }, // 16
    { label: 'Mã tiền thuế tuyệt đối', key: 'product_info.absolute_tax_currency_code', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[18].data }, // 17
    { label: 'Tiền thuế xuất nhập khẩu', key: 'product_info.export_import_tax_amount', readOnly: false, required: false, type: 'number', method: "export", options: [] }, // 18
    { label: 'Mã miễn giảm/ Không chịu thuế xuất khẩu', key: 'product_info.export_tax_exemption_reduction_code', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[32].data }, // 19
    { label: 'Số tiền giảm thuế xuất khẩu', key: 'product_info.export_tax_reduction_amount', readOnly: false, required: false, type: 'number', method: "export", options: [] }, // 20
    { label: 'Số thứ tự hàng trên tờ khai tạm nhập tái xuất', key: 'product_info.item_sequence_on_temporary_import_export_declaration', readOnly: false, required: false, type: 'number', method: "export", options: [] }, // 21
    { label: 'Số đăng ký danh mục miền thuế xuất khẩu', key: 'product_info.export_tax_exemption_list_registration_number', readOnly: false, required: false, type: 'text', method: "export", options: [] }, // 22
    { label: 'Số dòng tương ứng trong danh mục miễn thuế xuất khẩu', key: 'product_info.corresponding_line_in_export_tax_exemption_list', readOnly: false, required: false, type: 'number', method: "export", options: [] }, // 23
    { label: '(1) Mã văn bản pháp luật', key: 'product_info.legal_document_code_1', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[12].data }, // 24
    { label: '(2) Mã văn bản pháp luật', key: 'product_info.legal_document_code_2', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[12].data }, // 25
    { label: '(3) Mã văn bản pháp luật', key: 'product_info.legal_document_code_3', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[12].data }, // 26
    { label: '(4) Mã văn bản pháp luật', key: 'product_info.legal_document_code_4', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[12].data }, // 27
    { label: '(5) Mã văn bản pháp luật', key: 'product_info.legal_document_code_5', readOnly: false, required: false, type: 'comboBox', method: "export", options: comboBoxData[12].data }, // 28
    { label: 'Số size', key: 'product_info.size_number', readOnly: false, required: false, type: 'text', method: "export", options: [] }, // 29
    { label: 'Số PO', key: 'product_info.po_number', readOnly: false, required: false, type: 'text', method: "export", options: [] }, // 30
    { label: 'Mã quản lý riêng ', key: 'product_info.private_management_code', readOnly: false, required: false, type: 'text', method: "export", options: [] }, // 31
];

export const defaultProductFormFieldsControlImport = [
    { label: 'Mã hàng', key: 'product_info.item_code', readOnly: true, required: false, type: 'text', method: "import", options: [] },
    { label: 'Tên hàng', key: 'product_info.item_name', readOnly: true, required: false, type: 'text', method: "import", options: [] },
    { label: 'Mã HS', key: 'product_info.hs_code', readOnly: true, required: false, type: 'text', method: "import", options: [] },
    { label: 'Mã nước xuất xứ', key: 'product_info.country_of_origin_code', readOnly: true, required: false, type: 'comboBox', method: "import", options: comboBoxData[5].data },
    { label: 'Số lượng', key: 'product_info.quantity', readOnly: true, required: false, type: 'number', method: "import", options: [] },
    { label: 'Đơn vị tính số lượng', key: 'product_info.quantity_unit', readOnly: true, required: false, type: 'comboBox', method: "import", options: comboBoxData[40].data },
    { label: 'Số lượng 2', key: 'product_info.secondary_quantity', readOnly: true, required: false, type: 'number', method: "import", options: [] },
    { label: 'Đơn vị tính số lượng 2', key: 'product_info.secondary_quantity_unit', readOnly: true, required: false, type: 'comboBox', method: "import", options: comboBoxData[6].data },
    { label: 'Đơn giá hoá đơn', key: 'product_info.invoice_unit_price', readOnly: true, required: false, type: 'number', method: "import", options: [] },
    { label: 'Mã tiền đơn giá', key: 'product_info.unit_price_currency_code', readOnly: true, required: false, type: 'comboBox', method: "import", options: comboBoxData[18].data },
    { label: 'Đơn vị tính của đơn giá hoá đơn', key: 'product_info.invoice_unit_price_unit', readOnly: true, required: false, type: 'comboBox', method: "import", options: comboBoxData[40].data },
    { label: 'Trị giá hoá đơn', key: 'product_info.invoice_value', readOnly: true, required: false, type: 'number', method: "import", options: [] },
    { label: 'Trị giá tính thuế', key: 'product_info.taxable_value', readOnly: true, required: false, type: 'number', method: "import", options: [] },
    { label: 'Mã tiền Trị giá tính thuế', key: 'product_info.taxable_value_currency_code', readOnly: true, required: false, type: 'comboBox', method: "import", options: comboBoxData[18].data },
    { label: 'Mã biểu thuế nhập khẩu', key: 'product_info.import_tariff_code', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[29].data },
    { label: 'Thuế suất nhập khẩu (%)', key: 'product_info.import_tax_rate', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: 'Tiền thuế nhập khẩu', key: 'product_info.import_tax_amount', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: '(1) Mã áp dụng biểu thuế tiêu thụ đặc biệt', key: 'product_info.special_consumption_tax_code_1', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[30].data },
    { label: '(1) Mã miễn/ giảm biểu thuế tiêu thụ đặc biệt', key: 'product_info.special_consumption_tax_exemption_reduction_code_1', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[31].data },
    { label: '(1) Số tiền giảm thuế tiêu thụ đặc biệt', key: 'product_info.special_consumption_tax_reduction_amount_1', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: '(2) Mã áp dụng biểu thuế môi trường', key: 'product_info.environmental_tax_code_2', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[33].data },
    { label: '(2) Mã miễn/ giảm biểu thuế môi trường', key: 'product_info.environmental_tax_exemption_reduction_code_2', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[34].data },
    { label: '(2) Số tiền giảm thuế môi trường', key: 'product_info.environmental_tax_reduction_amount_2', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: '(3) Mã áp dụng biểu thuế VAT', key: 'product_info.vat_tax_code_3', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[37].data },
    { label: '(3) Mã miễn/ giảm biểu thuế VAT', key: 'product_info.vat_tax_exemption_reduction_code_3', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[38].data },
    { label: '(3) Số Tiền giảm thuế VAT', key: 'product_info.vat_tax_reduction_amount_3', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: '(4) Mã áp dụng thuế suất/ Mức thuế', key: 'product_info.tax_rate_code_4', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[39].data },
    { label: '(4) Mã miễn/ giảm/ không chịu thuế', key: 'product_info.tax_exemption_reduction_code_4', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[32].data },
    { label: '(4) Số tiền giảm thuế', key: 'product_info.tax_reduction_amount_4', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: '(5) Mã áp dụng thuế suất/ Mức thuế', key: 'product_info.tax_rate_code_5', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[39].data },
    { label: '(5) Mã miễn/ giảm / không chịu thuế', key: 'product_info.tax_exemption_reduction_code_5', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[32].data },
    { label: '(5) Số tiền giảm thuế', key: 'product_info.tax_reduction_amount_5', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: 'Mức thuế tuyệt đối', key: 'product_info.absolute_tax_rate', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: 'Đơn vị tính thuế tuyệt đối', key: 'product_info.absolute_tax_rate_unit', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[40].data },
    { label: 'Mã tiền thuế tuyệt đối', key: 'product_info.absolute_tax_currency_code', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[18].data },
    { label: 'Mã áp dụng mức thuế tuyệt đối', key: 'product_info.absolute_tax_application_code', readOnly: false, required: false, type: 'comboBox', method: "import", options: comboBoxData[6].data },
    { label: 'Mã ngoài hạn nghạch', key: 'product_info.non_quota_code', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: '(1) Số mục khai khoản điều chỉnh', key: 'product_info.adjustment_item_sequence_1', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: '(2) Số mục khai khoản điều chỉnh', key: 'product_info.adjustment_item_sequence_2', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: '(3) Số mục khai khoản điều chỉnh', key: 'product_info.adjustment_item_sequence_3', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: '(4) Số mục khai khoản điều chỉnh', key: 'product_info.adjustment_item_sequence_4', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: '(5) Số mục khai khoản điều chỉnh', key: 'product_info.adjustment_item_sequence_5', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: 'Số TT hàng trên TK tạm nhập tái xuất', key: 'product_info.item_sequence_on_temporary_import_export_declaration', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: 'Số đăng ký danh mục miễn thuế NK', key: 'product_info.import_tax_exemption_list_registration_number', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: 'Số dòng tương ứng trong danh mục', key: 'product_info.corresponding_line_in_exemption_list', readOnly: false, required: false, type: 'text', method: "import", options: [] },
    { label: 'Mã miễn/ giảm/ không chịu thuế nhập khẩu', key: 'product_info.import_tax_exemption_reduction_code', readOnly: false, required: false, type: 'text', method: "import", options: comboBoxData[32].data },
    { label: 'Số tiền giảm thuế nhập khẩu', key: 'product_info.import_tax_reduction_amount', readOnly: false, required: false, type: 'number', method: "import", options: [] },
    { label: 'Mã quản lý riêng', key: 'product_info.private_management_code', readOnly: false, required: false, type: 'text', method: "import", options: [] }
];