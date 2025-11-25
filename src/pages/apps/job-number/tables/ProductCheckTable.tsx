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
    // Typography,
} from '@mui/material';
import MainCard from 'components/MainCard';
import CopyButton from 'components/common/CopyButton';
import ExcelExport from 'components/third-party/react-table/ExcelExport';
import { useIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';

export type ProductCheckItem = {
    product_no: number;
    description: string;
    issues: string[];
    result: 'PASS' | 'FAIL';
};

type Props = {
    data: ProductCheckItem[];
    title: string;
};

export const stripProductMarkers = (text: string) =>
    text.replace(/(?:b|r)\[([^\]]+)\]/gi, '$1');

export const getProductCheckColumnHeaders = (intl: IntlShape) => ([
    { label: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.index' }), key: 'product_no' },
    { label: intl.formatMessage({ id: 'job-number.detail.products.column.item-name' }), key: 'description' },
    { label: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.issues' }), key: 'issues' },
]);

export const buildProductCheckExportRows = (data: ProductCheckItem[]) =>
    data.map((row) => ({
        ...row,
        issues: row.issues.map(stripProductMarkers).join('\n'),
    }));

const ProductCheckTable: React.FC<Props> = ({ data, title }) => {
    const intl = useIntl();

    const columnHeaders = useMemo(() => getProductCheckColumnHeaders(intl), [intl]);
    const stripMarkers = stripProductMarkers;
    const exportData = useMemo(() => buildProductCheckExportRows(data), [data]);

    const plainText = useMemo(() => {
        const rawHeader = [
            String(intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.index' })),
            String(intl.formatMessage({ id: 'job-number.detail.products.column.item-name' })),
            String(intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.issues' }))
        ];

        const rawRows: string[][] = data.map((row) => [
            String(row.product_no ?? ''),
            String(row.description ?? ''),
            row.issues.map((v) => String(v)).join('<br>')
        ]);

        const visibleLen = (val: string) => {
            const clean = stripMarkers(val).replace(/\r?\n/g, ' ');
            const parts = clean.split('<br>');
            return parts.length ? Math.max(...parts.map((s) => s.length)) : 0;
        };
        const renderCell = (val: string) =>
            stripMarkers(val).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
        const extraFor = (val: string) => Math.max(0, renderCell(val).length - visibleLen(val));
        const pad = (text: string, width: number, extraTarget: number) => {
            const rendered = renderCell(text);
            const vis = visibleLen(text);
            const extra = Math.max(0, rendered.length - vis);
            const padSize = Math.max(0, width - vis + (extraTarget - extra));
            return rendered + ' '.repeat(padSize);
        };

        const widths: number[] = rawHeader.map((h, i) => {
            const maxRow = Math.max(0, ...rawRows.map((r) => visibleLen(r[i] ?? '')));
            return Math.max(visibleLen(h), maxRow, 3);
        });
        const extraMax: number[] = rawHeader.map((h, i) =>
            Math.max(0, extraFor(h), ...rawRows.map((r) => extraFor(r[i] ?? '')))
        );

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, intl]);

    const htmlTable = useMemo(() => {
        const esc = (s: string) => String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');

        const headerCells = [
            esc(intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.index' })),
            esc(intl.formatMessage({ id: 'job-number.detail.products.column.item-name' })),
            esc(intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.columns.issues' }))
        ];

        const bodyRows = data.map((row) => [
            esc(String(row.product_no ?? '')),
            esc(stripMarkers(String(row.description ?? ''))),
            esc(row.issues.map((v) => stripMarkers(String(v))).join('<br>'))
        ]);

        const thead = `<thead><tr>${headerCells.map((c) => `<th>${c}</th>`).join('')}</tr></thead>`;
        const tbody = `<tbody>${bodyRows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
        return `<table>${thead}${tbody}</table>`;
    }, [data, intl]);

    const highlightTagged = (text: string) => {
        const regex = /(b|r)\[([\s\S]*?)\]/gi;
        const nodes: React.ReactNode[] = [];
        let lastIndex = 0;
        let m: RegExpExecArray | null;

        while ((m = regex.exec(text)) !== null) {
            const [full, tag, inner] = m;
            const start = m.index;
            const end = start + full.length;

            if (start > lastIndex) {
                nodes.push(text.slice(lastIndex, start));
            }

            nodes.push(
                <Box
                    key={`${start}-${end}`}
                    component="span"
                    sx={{
                        color: tag.toLowerCase() === 'b' ? 'primary.main' : 'error.main',
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

    // const ensurePeriod = (s: string) => (/[.;]$/.test(s) ? s : `${s}.`);

    return (
        <MainCard
            title={title}
            sx={{ marginBottom: 4 }}
            secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CopyButton variant="icon" tooltip={'Copy'} tooltipCopied={'Copied'} getText={() => plainText} getHtml={() => htmlTable} />
                    <ExcelExport
                        {...{
                            data: exportData,
                            filename: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.product.export.filename' }),
                            headers: columnHeaders,
                        }}
                    />
                </Box>
            }
        >
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
                                            {row.issues.map((issue, idxIssue) => {
                                                // Chia câu như trước đây (". " hoặc "; " trước chữ cái viết hoa có dấu)
                                                // const parts = issue
                                                //     .split(/[.;]\s(?=[A-ZÀ-Ỳ])/g)
                                                //     .map((p) => p.trim())
                                                //     .filter(Boolean);

                                                return (
                                                    <Box key={idxIssue} component="li" sx={{ listStyleType: 'disc' }}>
                                                        {highlightTagged(issue)}
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
        </MainCard>
    );
};

export default ProductCheckTable;
