import { Fragment, useMemo } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { LabelKeyObject } from 'react-csv/lib/core';

// project imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';


import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import ExcelExport from 'components/third-party/react-table/ExcelExport';
import comboBoxData, { getLabelByCode } from 'data/comboBoxInfo';
import { useIntl } from 'react-intl';


interface Props {
    data: any;
    columns: ColumnDef<any>[];
    children?: React.ReactNode;
    method: string,
}

const IMPORT_FIELD_KEYS = [
    'item_code',
    'item_name',
    'hs_code',
    'country_of_origin_code',
    'quantity',
    'quantity_unit',
    'secondary_quantity',
    'secondary_quantity_unit',
    'invoice_unit_price',
    'unit_price_currency_code',
    'invoice_unit_price_unit',
    'invoice_value',
    'taxable_value',
    'taxable_value_currency_code',
    'import_tariff_code',
    'import_tax_rate',
    'import_tax_amount',
    'special_consumption_tax_code_1',
    'special_consumption_tax_exemption_reduction_code_1',
    'special_consumption_tax_reduction_amount_1',
    'environmental_tax_code_2',
    'environmental_tax_exemption_reduction_code_2',
    'environmental_tax_reduction_amount_2',
    'vat_tax_code_3',
    'vat_tax_exemption_reduction_code_3',
    'vat_tax_reduction_amount_3',
    'tax_rate_code_4',
    'tax_exemption_reduction_code_4',
    'tax_reduction_amount_4',
    'tax_rate_code_5',
    'tax_exemption_reduction_code_5',
    'tax_reduction_amount_5',
    'absolute_tax_rate',
    'absolute_tax_rate_unit',
    'absolute_tax_currency_code',
    'absolute_tax_application_code',
    'non_quota_code',
    'adjustment_item_sequence_1',
    'adjustment_item_sequence_2',
    'adjustment_item_sequence_3',
    'adjustment_item_sequence_4',
    'adjustment_item_sequence_5',
    'item_sequence_on_temporary_import_export_declaration',
    'import_tax_exemption_list_registration_number',
    'corresponding_line_in_exemption_list',
    'import_tax_exemption_reduction_code',
    'import_tax_reduction_amount',
    'private_management_code'
] as const;

const EXPORT_FIELD_KEYS = [
    'item_code',
    'item_name',
    'hs_code',
    'quantity',
    'country_of_origin_code',
    'quantity_unit',
    'secondary_quantity',
    'secondary_quantity_unit',
    'invoice_unit_price',
    'unit_price_currency_code',
    'invoice_unit_price_unit',
    'invoice_value',
    'taxable_value',
    'taxable_value_currency_code',
    'export_import_ratio',
    'absolute_tax_rate',
    'absolute_tax_rate_unit',
    'absolute_tax_currency_code',
    'export_import_tax_amount',
    'export_tax_exemption_reduction_code',
    'export_tax_reduction_amount',
    'item_sequence_on_temporary_import_export_declaration',
    'export_tax_exemption_list_registration_number',
    'corresponding_line_in_export_tax_exemption_list',
    'legal_document_code_1',
    'legal_document_code_2',
    'legal_document_code_3',
    'legal_document_code_4',
    'legal_document_code_5',
    'size_number',
    'po_number',
    'private_management_code'
] as const;

const SEQUENCE_COLUMN_KEY = '__sequence';

// ==============================|| REACT TABLE - LIST ||============================== //

export default function ExpandTable({ data, columns, children, method }: Props) {
    const intl = useIntl();

    const fieldLabels = useMemo(() => {
        const ids: Record<string, string> = {
            item_code: 'job-number.detail.products.column.item-code',
            item_name: 'job-number.detail.products.column.item-name',
            hs_code: 'job-number.detail.products.column.hs-code',
            country_of_origin_code: 'job-number.detail.products.column.country-of-origin',
            quantity: 'job-number.detail.products.column.quantity',
            quantity_unit: 'job-number.detail.products.column.quantity-unit',
            secondary_quantity: 'job-number.detail.products.column.secondary-quantity',
            secondary_quantity_unit: 'job-number.detail.products.column.secondary-quantity-unit',
            invoice_unit_price: 'job-number.detail.products.column.invoice-unit-price',
            unit_price_currency_code: 'job-number.detail.products.column.unit-price-currency',
            invoice_unit_price_unit: 'job-number.detail.products.column.invoice-unit-price-unit',
            invoice_value: 'job-number.detail.products.column.invoice-value',
            taxable_value: 'job-number.detail.products.column.taxable-value',
            taxable_value_currency_code: 'job-number.detail.products.column.taxable-value-currency',
            import_tariff_code: 'job-number.detail.crosscheck.tables.expand.field.import-tariff-code',
            import_tax_rate: 'job-number.detail.crosscheck.tables.expand.field.import-tax-rate',
            import_tax_amount: 'job-number.detail.crosscheck.tables.expand.field.import-tax-amount',
            special_consumption_tax_code_1: 'job-number.detail.crosscheck.tables.expand.field.special-consumption-tax-code-1',
            special_consumption_tax_exemption_reduction_code_1: 'job-number.detail.crosscheck.tables.expand.field.special-consumption-tax-exemption-code-1',
            special_consumption_tax_reduction_amount_1: 'job-number.detail.crosscheck.tables.expand.field.special-consumption-tax-reduction-amount-1',
            environmental_tax_code_2: 'job-number.detail.crosscheck.tables.expand.field.environmental-tax-code-2',
            environmental_tax_exemption_reduction_code_2: 'job-number.detail.crosscheck.tables.expand.field.environmental-tax-exemption-code-2',
            environmental_tax_reduction_amount_2: 'job-number.detail.crosscheck.tables.expand.field.environmental-tax-reduction-amount-2',
            vat_tax_code_3: 'job-number.detail.crosscheck.tables.expand.field.vat-tax-code-3',
            vat_tax_exemption_reduction_code_3: 'job-number.detail.crosscheck.tables.expand.field.vat-tax-exemption-code-3',
            vat_tax_reduction_amount_3: 'job-number.detail.crosscheck.tables.expand.field.vat-tax-reduction-amount-3',
            tax_rate_code_4: 'job-number.detail.crosscheck.tables.expand.field.tax-rate-code-4',
            tax_exemption_reduction_code_4: 'job-number.detail.crosscheck.tables.expand.field.tax-exemption-code-4',
            tax_reduction_amount_4: 'job-number.detail.crosscheck.tables.expand.field.tax-reduction-amount-4',
            tax_rate_code_5: 'job-number.detail.crosscheck.tables.expand.field.tax-rate-code-5',
            tax_exemption_reduction_code_5: 'job-number.detail.crosscheck.tables.expand.field.tax-exemption-code-5',
            tax_reduction_amount_5: 'job-number.detail.crosscheck.tables.expand.field.tax-reduction-amount-5',
            absolute_tax_rate: 'job-number.detail.crosscheck.tables.expand.field.absolute-tax-rate',
            absolute_tax_rate_unit: 'job-number.detail.crosscheck.tables.expand.field.absolute-tax-rate-unit',
            absolute_tax_currency_code: 'job-number.detail.crosscheck.tables.expand.field.absolute-tax-currency-code',
            absolute_tax_application_code: 'job-number.detail.crosscheck.tables.expand.field.absolute-tax-application-code',
            non_quota_code: 'job-number.detail.crosscheck.tables.expand.field.non-quota-code',
            adjustment_item_sequence_1: 'job-number.detail.crosscheck.tables.expand.field.adjustment-item-sequence-1',
            adjustment_item_sequence_2: 'job-number.detail.crosscheck.tables.expand.field.adjustment-item-sequence-2',
            adjustment_item_sequence_3: 'job-number.detail.crosscheck.tables.expand.field.adjustment-item-sequence-3',
            adjustment_item_sequence_4: 'job-number.detail.crosscheck.tables.expand.field.adjustment-item-sequence-4',
            adjustment_item_sequence_5: 'job-number.detail.crosscheck.tables.expand.field.adjustment-item-sequence-5',
            item_sequence_on_temporary_import_export_declaration: 'job-number.detail.crosscheck.tables.expand.field.temp-import-export-item-sequence',
            import_tax_exemption_list_registration_number: 'job-number.detail.crosscheck.tables.expand.field.import-tax-exemption-list-registration-number',
            corresponding_line_in_exemption_list: 'job-number.detail.crosscheck.tables.expand.field.corresponding-line-in-exemption-list',
            import_tax_exemption_reduction_code: 'job-number.detail.crosscheck.tables.expand.field.import-tax-exemption-code',
            import_tax_reduction_amount: 'job-number.detail.crosscheck.tables.expand.field.import-tax-reduction-amount',
            private_management_code: 'job-number.detail.crosscheck.tables.expand.field.private-management-code',
            export_import_ratio: 'job-number.detail.crosscheck.tables.expand.field.export-import-ratio',
            export_import_tax_amount: 'job-number.detail.crosscheck.tables.expand.field.export-import-tax-amount',
            export_tax_exemption_reduction_code: 'job-number.detail.crosscheck.tables.expand.field.export-tax-exemption-code',
            export_tax_reduction_amount: 'job-number.detail.crosscheck.tables.expand.field.export-tax-reduction-amount',
            export_tax_exemption_list_registration_number: 'job-number.detail.crosscheck.tables.expand.field.export-tax-exemption-list-registration-number',
            corresponding_line_in_export_tax_exemption_list: 'job-number.detail.crosscheck.tables.expand.field.corresponding-line-in-export-tax-exemption-list',
            legal_document_code_1: 'job-number.detail.crosscheck.tables.expand.field.legal-document-code-1',
            legal_document_code_2: 'job-number.detail.crosscheck.tables.expand.field.legal-document-code-2',
            legal_document_code_3: 'job-number.detail.crosscheck.tables.expand.field.legal-document-code-3',
            legal_document_code_4: 'job-number.detail.crosscheck.tables.expand.field.legal-document-code-4',
            legal_document_code_5: 'job-number.detail.crosscheck.tables.expand.field.legal-document-code-5',
            size_number: 'job-number.detail.crosscheck.tables.expand.field.size-number',
            po_number: 'job-number.detail.crosscheck.tables.expand.field.po-number'
        };

        return Object.fromEntries(
            Object.entries(ids).map(([key, id]) => [key, intl.formatMessage({ id })])
        ) as Record<string, string>;
    }, [intl]);

    const importFields = useMemo(
        () => IMPORT_FIELD_KEYS.map((key) => ({ label: fieldLabels[key], key })),
        [fieldLabels]
    );

    const exportFields = useMemo(
        () => EXPORT_FIELD_KEYS.map((key) => ({ label: fieldLabels[key], key })),
        [fieldLabels]
    );

    const table = useReactTable({
        data,
        columns,
        enableExpanding: true,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        debugTable: true
    });

    const headers = useMemo<LabelKeyObject[]>(() => {
        const list: LabelKeyObject[] = [];

        columns.forEach((column) => {
            if (!column.id) {
                return;
            }

            if (column.id === 'id') {
                list.push({ label: '#', key: SEQUENCE_COLUMN_KEY });
                return;
            }

            const label =
                typeof column.header === 'string' || typeof column.header === 'number'
                    ? String(column.header)
                    : column.id;

            list.push({
                label,
                key: column.id
            });
        });

        return list;
    }, [columns]);

    const exportRows = table.getRowModel().rows.map((row, index) => ({
        ...row.original,
        [SEQUENCE_COLUMN_KEY]: index + 1
    }));

    return (
        <MainCard
            content={false}
            sx={{ marginTop: 5 }}
            title={intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.title' })}
            secondary={<ExcelExport
                {...{
                    data: exportRows,
                    headers,
                    filename: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.export.filename' })
                }}
            />}
        >
            <ScrollX>
                <Stack>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} sx={{ whiteSpace: 'nowrap' }}>
                                        {headerGroup.headers.map((header) => {
                                            const canSort = header.column.getCanSort();
                                            const toggleSort = header.column.getToggleSortingHandler();

                                            return (
                                                <TableCell
                                                    key={header.id}
                                                    onClick={canSort ? toggleSort : undefined}
                                                    className={canSort ? 'cursor-pointer prevent-select' : ''}
                                                >
                                                    {header.isPlaceholder ? null : (
                                                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                                                            <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                                                        </Stack>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.map((row, index) => (
                                    <Fragment key={row.id}>
                                        <TableRow>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        {row.getIsExpanded() && (
                                            <TableRow>
                                                <TableCell colSpan={row.getVisibleCells().length}>
                                                    <Collapse in={row.getIsExpanded()} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            {children}

                                                            {method === "import" &&
                                                                (
                                                                    <Grid container spacing={2}>
                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.import-tax' })}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.import_tariff_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].import_tariff_code || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.import_tax_rate}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].import_tax_rate || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.import_tax_amount}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].import_tax_amount || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.other-tax' })}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.special_consumption_tax_code_1}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[30].data, data[index].special_consumption_tax_code_1) || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.special_consumption_tax_exemption_reduction_code_1}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[31].data, data[index].special_consumption_tax_exemption_reduction_code_1) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.special_consumption_tax_reduction_amount_1}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].special_consumption_tax_reduction_amount_1 || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.environmental_tax_code_2}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[33].data, data[index].environmental_tax_code_2) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.environmental_tax_exemption_reduction_code_2}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[34].data, data[index].environmental_tax_exemption_reduction_code_2) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.environmental_tax_reduction_amount_2}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].environmental_tax_reduction_amount_2 || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.vat_tax_code_3}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[37].data, data[index].vat_tax_code_3) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.vat_tax_exemption_reduction_code_3}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[38].data, data[index].vat_tax_exemption_reduction_code_3) || '-'}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.vat_tax_reduction_amount_3}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].vat_tax_reduction_amount_3 || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.tax_rate_code_4}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[39].data, data[index].tax_rate_code_4) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.tax_exemption_reduction_code_4}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[32].data, data[index].tax_exemption_reduction_code_4) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.tax_reduction_amount_4}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].tax_reduction_amount_4 || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.tax_rate_code_5}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[39].data, data[index].tax_rate_code_5) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.tax_exemption_reduction_code_5}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[32].data, data[index].tax_reduction_amount_5) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.tax_reduction_amount_5}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].tax_reduction_amount_5}</Typography>
                                                                        </Grid>


                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.absolute-tax' })}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.absolute_tax_rate}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].absolute_tax_rate || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.absolute_tax_rate_unit}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[40].data, data[index].absolute_tax_rate_unit) || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.absolute_tax_currency_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[18].data, data[index].absolute_tax_currency_code) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.absolute_tax_application_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[6].data, data[index].absolute_tax_application_code) || '-'}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.non_quota_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].non_quota_code}</Typography>
                                                                        </Grid>


                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.adjustment' })}</Typography>
                                                                        </Grid>

                                                                        {importFields.slice(37, 42).map(({ label, key }) => (
                                                                            <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
                                                                                <Typography variant="subtitle2">{label}</Typography>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    {data[index]?.[key] ?? '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        ))
                                                                        }

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.item_sequence_on_temporary_import_export_declaration}</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].item_sequence_on_temporary_import_export_declaration}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.import_tax_exemption_list_registration_number}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].import_tax_exemption_list_registration_number}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.corresponding_line_in_exemption_list}</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].corresponding_line_in_exemption_list}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.import_tax_exemption_reduction_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[32].data, data[index].import_tax_exemption_reduction_code)}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.import_tax_reduction_amount}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].import_tax_reduction_amount}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.private_management_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].private_management_code}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                )}


                                                            {method === "export" &&
                                                                (
                                                                    <Grid container spacing={2}>
                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.export-tax' })}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.export_import_ratio}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].export_import_ratio || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.absolute_tax_rate}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].absolute_tax_rate || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.absolute_tax_rate_unit}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[40].data, data[index].absolute_tax_rate_unit) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.absolute_tax_currency_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[18].data, data[index].absolute_tax_currency_code) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.export_import_tax_amount}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].export_import_tax_amount || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.export_tax_exemption_reduction_code}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{getLabelByCode(comboBoxData[32].data, data[index].export_tax_exemption_reduction_code) || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.export_tax_reduction_amount}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].export_tax_reduction_amount  || "-"}</Typography>
                                                                        </Grid>


                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.temp-import-export' })}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.item_sequence_on_temporary_import_export_declaration}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].item_sequence_on_temporary_import_export_declaration || "-"}</Typography>
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.export_tax_exemption_list_registration_number}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].export_tax_exemption_list_registration_number || "-"}</Typography>
                                                                        </Grid>


                                                                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                                                            <Typography variant="subtitle2">{fieldLabels.corresponding_line_in_export_tax_exemption_list}:</Typography>
                                                                            <Typography variant="body2" color="text.secondary">{data[index].corresponding_line_in_export_tax_exemption_list || "-"}</Typography>
                                                                        </Grid>

                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.legal' })}</Typography>
                                                                        </Grid>

                                                                        {exportFields.slice(24, 29).map(({ label, key }) => (
                                                                            <Grid key={key} size={{ xs: 12, sm: 6, xl: 4 }}>
                                                                                <Typography variant="subtitle2">{label}</Typography>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    {getLabelByCode(comboBoxData[12].data, data[index]?.[key]) || '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        ))
                                                                        }

                                                                        <Grid size={{ xs: 12 }} sx={{ marginY: 3 }}>
                                                                            <Typography variant="h5">{intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.expand.section.additional-info' })}</Typography>
                                                                        </Grid>

                                                                        {exportFields.slice(29, 31).map(({ label, key }) => (
                                                                            <Grid key={key} size={{ xs: 12, sm: 6, xl: 4 }}>
                                                                                <Typography variant="subtitle2">{label}</Typography>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    {data[index]?.[key] || '-'}
                                                                                </Typography>
                                                                            </Grid>
                                                                        ))
                                                                        }

                                                                    </Grid>
                                                                )}
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </ScrollX>
        </MainCard >
    );
}
