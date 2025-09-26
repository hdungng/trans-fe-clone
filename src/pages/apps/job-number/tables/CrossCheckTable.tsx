import React, { useMemo, useCallback } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper,
    Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import { LabelKeyObject } from 'react-csv/lib/core';
import ExcelExport from 'components/third-party/react-table/ExcelExport';
import { useIntl } from 'react-intl';
import { normalizeString, normalizeStringArray } from 'utils/string';

const normalizeLabelKey = (value: string) => normalizeString(value)
    .replace(/:$/, '')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, ' ')
    .trim();

const CROSS_CHECK_LABEL_ID_MAP = [
    ['Hóa đơn (INV)', 'job-number.detail.crosscheck.tables.cross-check.row.invoice'],
    ['Packing List (PL)', 'job-number.detail.crosscheck.tables.cross-check.row.packing-list'],
    ['Vận đơn (BL)', 'job-number.detail.crosscheck.tables.cross-check.row.bill-of-lading'],
    ['Hợp đồng (SC)', 'job-number.detail.crosscheck.tables.cross-check.row.sales-contract'],
    ['Kết quả', 'job-number.detail.crosscheck.tables.cross-check.row.result'],
    ['Nhận xét', 'job-number.detail.crosscheck.tables.cross-check.row.remarks'],
    ['Tên người nhập khẩu/ nhận hàng', 'job-number.detail.crosscheck.tables.cross-check.field.importer-name'],
    ['Địa chỉ người nhập khẩu/ nhận hàng', 'job-number.detail.crosscheck.tables.cross-check.field.importer-address'],
    ['Tên người xuất khẩu', 'job-number.detail.crosscheck.tables.cross-check.field.exporter-name'],
    ['Địa chỉ người xuất khẩu', 'job-number.detail.crosscheck.tables.cross-check.field.exporter-address'],
    ['export_country_code', 'job-number.detail.crosscheck.tables.cross-check.field.export-country-code'],
    ['Tên người giao hàng', 'job-number.detail.crosscheck.tables.cross-check.field.shipper-name'],
    ['Địa chỉ người giao hàng', 'job-number.detail.crosscheck.tables.cross-check.field.shipper-address'],
    ['Tiền tệ', 'job-number.detail.crosscheck.tables.cross-check.field.currency'],
    ['Tổng giá trị lô hàng', 'job-number.detail.crosscheck.tables.cross-check.field.total-shipment-value'],
    ['Tổng trọng lượng (Gross)', 'job-number.detail.crosscheck.tables.cross-check.field.total-gross-weight'],
    ['Tổng trọng lượng (Net)', 'job-number.detail.crosscheck.tables.cross-check.field.total-net-weight'],
    ['Số hợp đồng', 'job-number.detail.crosscheck.tables.cross-check.field.contract-number'],
    ['Ngày hợp đồng', 'job-number.detail.crosscheck.tables.cross-check.field.contract-date'],
    ['Số hóa đơn', 'job-number.detail.crosscheck.tables.cross-check.field.invoice-number'],
    ['Ngày hóa đơn', 'job-number.detail.crosscheck.tables.cross-check.field.invoice-date'],
    ['Điều kiện giao hàng (Incoterm)', 'job-number.detail.crosscheck.tables.cross-check.field.delivery-terms'],
    ['Cảng xếp hàng', 'job-number.detail.crosscheck.tables.cross-check.field.port-of-loading'],
    ['Cảng dỡ hàng', 'job-number.detail.crosscheck.tables.cross-check.field.port-of-discharge'],
    ['Ngày khởi hành', 'job-number.detail.crosscheck.tables.cross-check.field.departure-date'],
    ['Tàu/hoặc chuyến bay', 'job-number.detail.crosscheck.tables.cross-check.field.vessel-or-flight'],
    ['Số vận đơn/HAWB', 'job-number.detail.crosscheck.tables.cross-check.field.bill-of-lading-number'],
    ['Ngày vận đơn', 'job-number.detail.crosscheck.tables.cross-check.field.bill-of-lading-date'],
    ['Điều kiện thanh toán', 'job-number.detail.crosscheck.tables.cross-check.field.payment-terms'],
    ['Thông tin ngân hàng', 'job-number.detail.crosscheck.tables.cross-check.field.bank-information'],
    ['Người thụ hưởng', 'job-number.detail.crosscheck.tables.cross-check.field.beneficiary'],
    ['Tổng số kiện', 'job-number.detail.crosscheck.tables.cross-check.field.total-packages'],
    ['Ký mã hiệu', 'job-number.detail.crosscheck.tables.cross-check.field.marks'],
    ['Ngày đến', 'job-number.detail.crosscheck.tables.cross-check.field.arrival-date'],
    ['Loại & số lượng container', 'job-number.detail.crosscheck.tables.cross-check.field.container-type-and-quantity'],
    ['Số delivery', 'job-number.detail.crosscheck.tables.cross-check.field.delivery-number'],
    ['Số shipment', 'job-number.detail.crosscheck.tables.cross-check.field.shipment-number'],
    ['Số container', 'job-number.detail.crosscheck.tables.cross-check.field.container-count'],
    ['Số niêm phong', 'job-number.detail.crosscheck.tables.cross-check.field.seal-number'],
    ['Điều kiện tính cước', 'job-number.detail.crosscheck.tables.cross-check.field.freight-terms'],
    ['Điểm đến cuối cùng', 'job-number.detail.crosscheck.tables.cross-check.field.final-destination'],
    ['Số MAWB', 'job-number.detail.crosscheck.tables.cross-check.field.mawb-number'],
    ['Giấy chứng nhận di chuyển', 'job-number.detail.crosscheck.tables.cross-check.field.movement-certificate'],
    ['Quốc gia của người xuất khẩu', 'job-number.detail.crosscheck.tables.cross-check.field.exporter-country'],
    ['Quốc gia người nhập khẩu/ nhận hàng', 'job-number.detail.crosscheck.tables.cross-check.field.importer-country'],
    ['Ngày xuất khẩu', 'job-number.detail.crosscheck.tables.cross-check.field.export-date'],
    ['Vessel\'s name/Aircraft etc: Phương tiện vận chuyển', 'job-number.detail.crosscheck.tables.cross-check.field.vessel-name-or-aircraft'],
    ['Mã thứ tự hàng hoá', 'job-number.detail.crosscheck.tables.cross-check.field.goods-sequence-code'],
    ['Ký hiệu và số hiệu bao bì', 'job-number.detail.crosscheck.tables.cross-check.field.package-marks-and-numbers'],
    ['Số lượng và loại bao bì; mô tả hàng hóa bao gồm mã HS (6 chữ số) và tên thương hiệu (nếu có). Tên công ty phát hành hóa đơn của bên thứ ba (nếu có)', 'job-number.detail.crosscheck.tables.cross-check.field.package-quantity-and-description'],
    ['Số lượng (Trọng lượng tổng hoặc đơn vị đo khác), và giá trị (FOB) khi áp dụng RVC (tham khảo Ghi chú mặt sau)', 'job-number.detail.crosscheck.tables.cross-check.field.quantity-and-value'],
    ['Tuyên bố của người xuất khẩu', 'job-number.detail.crosscheck.tables.cross-check.field.exporter-declaration'],
    ['Chứng nhận của Cơ quan cấp', 'job-number.detail.crosscheck.tables.cross-check.field.issuing-authority-certification'],
    ['Nội dung hóa đơn của bên thứ ba', 'job-number.detail.crosscheck.tables.cross-check.field.third-party-invoice-content'],
    ['Phát hành hồi tố', 'job-number.detail.crosscheck.tables.cross-check.field.retrospective-issue'],
    ['Ghi chú', 'job-number.detail.crosscheck.tables.cross-check.field.notes']
].reduce<Record<string, string>>((acc, [source, id]) => {
    acc[normalizeLabelKey(source)] = id;
    return acc;
}, {});
// Kiểu dữ liệu cho từng hàng
interface RowData {
    label: string;
    values: string[];
}

// Props cho component
interface CrossCheckTableProps {
    columnHeaders: LabelKeyObject[];
    rowData: RowData[];
    title?: string;
}

const CrossCheckTable: React.FC<CrossCheckTableProps> = ({ columnHeaders, rowData, title }) => {
    const intl = useIntl();

    const translateLabel = useCallback((label: string) => {
        if (!label) {
            return label;
        }

        const messageId = CROSS_CHECK_LABEL_ID_MAP[normalizeLabelKey(label)];

        return messageId ? intl.formatMessage({ id: messageId }) : label;
    }, [intl]);

    const translatedColumnHeaders = useMemo(() => columnHeaders.map((header) => ({
        ...header,
        label: translateLabel(header.label)
    })), [columnHeaders, translateLabel]);

    const newColumnHeaders = useMemo(() => [
        { label: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.cross-check.data-field' }), key: 'dataField' },
        ...translatedColumnHeaders
    ], [intl, translatedColumnHeaders]);

    const keywords = normalizeStringArray(["không", "chưa", "failed"]);

    // Từ khóa ngoại trừ
    const excludeKeywords = normalizeStringArray(["không ảnh hưởng", "không mâu thuẫn", "không phát hiện", "đủ điều kiện", "không có sai", "khớp đơn giá", "không lệch", "không ghi", "không bắt buộc", "không yêu cầu", "hoàn toàn khớp", "phù hợp", "không phải hóa hơn thứ ba."]);

    const translatedRowData = useMemo(() => rowData.map((row) => ({
        ...row,
        label: translateLabel(row.label)
    })), [rowData, translateLabel]);

    const data = useMemo(() => {
        if (translatedRowData.length === 0) {
            return [];
        }

        return translatedRowData.map((row) => {
            const rowValues: React.ReactNode[] = [row.label, ...row.values];
            const obj: Record<string, React.ReactNode> = {};

            newColumnHeaders.forEach((header, index) => {
                obj[header.key] = rowValues[index];
            });

            return obj;
        });
    }, [newColumnHeaders, translatedRowData]);

    return (
        <MainCard title={title} sx={{
            marginBottom: 2,
        }} secondary={<ExcelExport
            {...{
                data,
                filename: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.cross-check.export.filename' }),
                headers: newColumnHeaders,
            }}
        />}>
            <TableContainer component={Paper} variant="outlined" sx={{
                maxHeight: 750,
                position: 'sticky !important',
                top: 0,
                zIndex: (theme) => theme.zIndex.appBar + 5,
            }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ position: 'sticky !important' }}>
                                {intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.cross-check.data-field' })}
                            </TableCell>
                            {translatedColumnHeaders.map((header, idx) => (
                                <TableCell key={idx} align="center" sx={{ position: 'sticky !important' }}>
                                    {header.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {translatedRowData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{row.label}</TableCell>
                                {row.values.map((value: string, colIndex: number) => {
                                    let color = 'inherit';
                                    if (value === 'FAIL') color = 'red';
                                    else if (value === 'PASS') color = 'green';

                                    // Nếu value null/undefined thì fallback về chuỗi rỗng
                                    const safeValue: string = value ?? '';
                                    const normalizedIssue = normalizeString(value);

                                    const hasKeyword = keywords.some(keyword =>
                                        normalizedIssue.includes(keyword)
                                    );

                                    const hasExclude = excludeKeywords.some(keyword =>
                                        normalizedIssue.includes(keyword)
                                    );

                                    return (
                                        <TableCell
                                            key={colIndex}
                                            align="left"
                                            style={{
                                                color,
                                                fontWeight: (value === 'FAIL' || value === 'PASS') ? 'bold' : 'normal',
                                                whiteSpace: 'pre-line'
                                            }}
                                        >
                                            {safeValue.split(';').map((part, idx) => (
                                                <Typography
                                                    key={idx}
                                                    component="div"
                                                    sx={{
                                                        color: hasKeyword && !hasExclude ? "red" : "inherit",
                                                    }}
                                                >
                                                    {part}
                                                    {idx < safeValue.split(';').length - 1 && <br />}
                                                </Typography>
                                            ))}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard >
    );
};

export default CrossCheckTable;