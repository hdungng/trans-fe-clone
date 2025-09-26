import React, { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
} from '@mui/material';
import MainCard from 'components/MainCard';
import ExcelExport from 'components/third-party/react-table/ExcelExport';
import { useIntl } from 'react-intl';
import { normalizeString, normalizeStringArray } from 'utils/string';

type Product = {
    product_no: number;
    description: string;
    issues: string[];
    result: 'PASS' | 'FAIL';
};

type Props = {
    data: Product[];
    title: string;
};

const ProductCheckTable: React.FC<Props> = ({ data, title }) => {
    const intl = useIntl();

    const columnHeaders = useMemo(() => ([
        { label: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.index' }), key: 'product_no' },
        { label: intl.formatMessage({ id: 'job-number.detail.products.column.item-name' }), key: 'description' },
        { label: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.issues' }), key: 'issues' },
    ]), [intl]);

    const exportData = data.map((row) => ({
        ...row,
        issues: row.issues.join('\n'),
    }));

    const keywords = normalizeStringArray(["không", "chưa", "failed"]);

    // Từ khóa ngoại trừ
    const excludeKeywords = normalizeStringArray(["không ảnh hưởng", "không mâu thuẫn", "không phát hiện",
        "đủ điều kiện", "không có sai", "khớp đơn giá", "không lệch", "không ghi", "không bắt buộc",
        "không yêu cầu", "hoàn toàn khớp", "phù hợp", "không phải hóa hơn thứ ba."]);

    return (
        <MainCard title={title} sx={{ marginBottom: 4 }} secondary={<ExcelExport
            {...{
                data: exportData,
                filename: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.export.filename' }),
                headers: columnHeaders,
            }}
        />}>
            <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ position: 'sticky !important' }}>
                                {intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.index' })}
                            </TableCell>
                            <TableCell sx={{ position: 'sticky !important' }}>
                                {intl.formatMessage({ id: 'job-number.detail.products.column.item-name' })}
                            </TableCell>
                            <TableCell sx={{ position: 'sticky !important' }}>
                                {intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.issues' })}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.product_no}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    {row.issues.length > 0 ? (
                                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                            {/* Hightlight đỏ */}
                                            {row.issues.map((issue, index) => {
                                                const normalizedIssue = normalizeString(issue);
                                                const hasKeyword = keywords.some(keyword =>
                                                    normalizedIssue.includes(keyword)
                                                );

                                                const hasExclude = excludeKeywords.some(keyword =>
                                                    normalizedIssue.includes(keyword)
                                                );

                                                // Regex: tách theo dấu "." chỉ khi sau nó có khoảng trắng + chữ cái viết hoa
                                                // hoặc khi nó ở cuối chuỗi.
                                                const parts = issue
                                                    .split(/[.;] (?=[A-ZÀ-Ỳ])/g) // chia theo ". " trước chữ cái viết hoa
                                                    .map(p => p.trim())
                                                    .filter(Boolean);

                                                return (
                                                    <Box key={index} component="li" sx={{ listStyleType: 'disc' }}>
                                                        {parts.map((part, i) => (
                                                            <Typography
                                                                key={i}
                                                                component="div"
                                                                sx={{
                                                                    color: hasKeyword && !hasExclude ? "red" : "inherit",
                                                                }}
                                                            >
                                                                {part.endsWith('.') || part.endsWith(';') ? part : part + '.'}
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                    ) : (
                                        <em>{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.no-issues' })}</em>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard >
    );
};

export default ProductCheckTable;