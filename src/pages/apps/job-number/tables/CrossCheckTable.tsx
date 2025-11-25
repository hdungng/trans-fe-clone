import React, { useMemo } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper,
    Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import CopyButton from 'components/common/CopyButton';
import { LabelKeyObject } from 'react-csv/lib/core';
import ExcelExport from 'components/third-party/react-table/ExcelExport';
import { useIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';
import { normalizeString } from 'utils/string';
import { Box } from '@mui/material';

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
export interface CrossCheckRowData {
    label: string;
    values: string[];
}

// Props cho component
interface CrossCheckTableProps {
    columnHeaders: LabelKeyObject[];
    rowData: CrossCheckRowData[];
    title?: string;
}

export const stripCrossCheckMarkers = (text: string) => text.replace(/(?:b|r)\[([\s\S]*?)\]/gi, "$1");

export const translateCrossCheckLabel = (intl: IntlShape, label: string) => {
    if (!label) return label;
    const messageId = CROSS_CHECK_LABEL_ID_MAP[normalizeLabelKey(label)];
    return messageId ? intl.formatMessage({ id: messageId }) : label;
};

export const prepareCrossCheckDataset = (
    intl: IntlShape,
    columnHeaders: LabelKeyObject[],
    rowData: CrossCheckRowData[]
) => {
    const translatedColumnHeaders = columnHeaders.map((header) => ({
        ...header,
        label: translateCrossCheckLabel(intl, header.label),
    }));

    const translatedRowData = rowData.map((row) => ({
        ...row,
        label: translateCrossCheckLabel(intl, row.label),
    }));

    const excelHeaders = [
        {
            label: intl.formatMessage({
                id: "job-number.detail.crosscheck.tables.cross-check.data-field",
            }),
            key: "dataField",
        },
        ...translatedColumnHeaders,
    ];

    const excelRows = translatedRowData.map((row) => {
        const rowValues: (string | React.ReactNode)[] = [
            stripCrossCheckMarkers(String(row.label ?? "")),
            ...row.values.map((v: string) => stripCrossCheckMarkers(String(v ?? ""))),
        ];
        const obj: Record<string, string | React.ReactNode> = {};
        excelHeaders.forEach((header, index) => {
            obj[header.key] = rowValues[index] as string;
        });
        return obj;
    });

    return { translatedColumnHeaders, translatedRowData, excelHeaders, excelRows };
};

const CrossCheckTable: React.FC<CrossCheckTableProps> = ({ columnHeaders, rowData, title }) => {
    const intl = useIntl();

    const {
        translatedColumnHeaders,
        translatedRowData,
        excelHeaders,
        excelRows,
    } = useMemo(() => prepareCrossCheckDataset(intl, columnHeaders, rowData), [intl, columnHeaders, rowData]);

    const highlightTagged = (text: string) => {
        const regex = /(b|r)\[([\s\S]*?)\]/gi;
        const nodes: React.ReactNode[] = [];
        let lastIndex = 0;
        let m: RegExpExecArray | null;

        while ((m = regex.exec(text)) !== null) {
            const [full, tag, inner] = m;
            const start = m.index;
            const end = start + full.length;

            if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

            nodes.push(
                <Box
                    key={`${start}-${end}`}
                    component="span"
                    sx={{
                        color: tag.toLowerCase() === "b" ? "primary.main" : "error.main",
                        fontWeight: 600,
                    }}
                >
                    {inner}
                </Box>
            );

            lastIndex = end;
        }
        if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
        return nodes;
    };

    const plainText = useMemo(() => {
        if (translatedRowData.length === 0) return '';

        const rawHeader = [
            String(intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.cross-check.data-field' })),
            ...translatedColumnHeaders.map((h) => String(h.label ?? ''))
        ];
        const rawRows: string[][] = translatedRowData.map((row) => [
            String(row.label ?? ''),
            ...row.values.map((v: string) =>
                String(v ?? '')
                    .split(';')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .join('<br>')
            ),
        ]);

        const visibleLen = (val: string) => {
            const clean = stripCrossCheckMarkers(val).replace(/\r?\n/g, ' ');
            // ignore <br> when measuring width; take longest visual line
            const parts = clean.split('<br>');
            return parts.length ? Math.max(...parts.map((s) => s.length)) : 0;
        };

        const renderCell = (val: string) =>
            stripCrossCheckMarkers(val)
                .replace(/\r?\n/g, ' ') // normalize real newlines
                .replace(/\|/g, '\\|'); // escape pipes, keep existing <br>

        const widths: number[] = rawHeader.map((h, idx) => {
            const maxRow = Math.max(0, ...rawRows.map((r) => visibleLen(r[idx] ?? '')));
            return Math.max(visibleLen(h), maxRow, 3);
        });

        const extraFor = (val: string) => Math.max(0, renderCell(val).length - visibleLen(val));
        const extraMax: number[] = rawHeader.map((h, idx) =>
            Math.max(0, extraFor(h), ...rawRows.map((r) => extraFor(r[idx] ?? '')))
        );

        const pad = (text: string, width: number, extraTarget: number) => {
            const rendered = renderCell(text);
            const vis = visibleLen(text);
            const extra = Math.max(0, rendered.length - vis);
            const padSize = Math.max(0, width - vis + (extraTarget - extra));
            return rendered + ' '.repeat(padSize);
        };

        const mdHeader = `| ${rawHeader.map((h, i) => pad(h, widths[i], extraMax[i])).join(' | ')} |`;
        const sepCells = rawHeader.map((h, i) => {
            const rendered = renderCell(h);
            const vis = visibleLen(h);
            const extra = Math.max(0, rendered.length - vis);
            const padSize = Math.max(0, widths[i] - vis + (extraMax[i] - extra));
            return '-'.repeat(rendered.length + padSize);
        });
        const mdSep = `| ${sepCells.join(' | ')} |`;
        const mdRows = rawRows.map((r) => `| ${r.map((c, i) => pad(c, widths[i], extraMax[i])).join(' | ')} |`);

        return [mdHeader, mdSep, ...mdRows].join('\n');
    }, [intl, translatedColumnHeaders, translatedRowData]);

    const htmlTable = useMemo(() => {
        const esc = (s: string) => String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        const headerCells = [
            esc(intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.cross-check.data-field' })),
            ...translatedColumnHeaders.map((h) => esc(stripCrossCheckMarkers(String(h.label ?? ''))))
        ];

        const bodyRows = translatedRowData.map((row) => [
            esc(stripCrossCheckMarkers(String(row.label ?? ''))),
            ...row.values.map((v: string) => esc(stripCrossCheckMarkers(String(v ?? '')).replace(/\r?\n/g, '<br>')))
        ]);

        const thead = `<thead><tr>${headerCells.map((c) => `<th>${c}</th>`).join('')}</tr></thead>`;
        const tbody = `<tbody>${bodyRows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
        return `<table>${thead}${tbody}</table>`;
    }, [intl, translatedColumnHeaders, translatedRowData]);

    return (
        <MainCard
            title={title}
            sx={{ marginBottom: 2 }}
            secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CopyButton
                        variant="icon"
                        tooltip={'Copy'}
                        tooltipCopied={'Copied'}
                        getText={() => plainText}
                        getHtml={() => htmlTable}
                    />
                    <ExcelExport
                        {...{
                            data: excelRows,
                            filename: intl.formatMessage({
                                id: "job-number.detail.crosscheck.tables.cross-check.export.filename",
                            }),
                            headers: excelHeaders,
                        }}
                    />
                </Box>
            }
        >
            <TableContainer
                component={Paper}
                variant="outlined"
                sx={{
                    maxHeight: 750,
                    position: "sticky !important",
                    top: 0,
                    zIndex: (theme) => theme.zIndex.appBar + 5,
                }}
            >
                <Table
                    stickyHeader
                    sx={{
                        '& .MuiTableCell-root': {
                            border: '1px solid',
                            borderColor: 'divider',
                            py: 1.5
                        },
                        '& .MuiTableCell-head': {
                            backgroundColor: 'grey.100',
                            fontWeight: 600
                        }
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ position: "sticky !important" }}>
                                {intl.formatMessage({
                                    id: "job-number.detail.crosscheck.tables.cross-check.data-field",
                                })}
                            </TableCell>
                            {translatedColumnHeaders.map((header, idx) => (
                                <TableCell key={idx} align="center" sx={{ position: "sticky !important" }}>
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
                                    const v = value ?? "";
                                    let color = "inherit";
                                    if (v === "FAIL") color = "red";
                                    else if (v === "PASS") color = "green";

                                    const parts = v.split(";"); // giữ xuống dòng giữa các phần

                                    return (
                                        <TableCell
                                            key={colIndex}
                                            align="left"
                                            style={{
                                                color,
                                                fontWeight: v === "FAIL" || v === "PASS" ? "bold" : "normal",
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            {parts.map((part, idx) => (
                                                <Typography key={idx} component="div">
                                                    {highlightTagged(part)}
                                                    {idx < parts.length - 1 && <br />}
                                                </Typography>
                                            ))}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};


export default CrossCheckTable;
