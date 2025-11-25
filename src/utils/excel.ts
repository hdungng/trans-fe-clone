
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import type { Border, BorderStyle } from 'exceljs';

export type ExcelHeader = { label: string; key: string };
export type ExcelAlign = 'left' | 'center' | 'right';

export interface ExcelColumnOption {
    width?: number;
    numFmt?: string;
    align?: ExcelAlign;
    wrap?: boolean;
}

export interface ExcelTableConfig {
    title?: string;
    headers?: ExcelHeader[];
    rows: Record<string, any>[];
    columnOptions?: Record<string, ExcelColumnOption>;
}

export interface ExcelSheetConfig {
    name: string;
    tables: ExcelTableConfig[];
    freezeHeader?: boolean;
}

const splitAtSemicolon = (value: any) => {
    if (value == null) return value;
    if (typeof value !== 'string') return value;
    return value
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
        .join('\n');
};

const clampWidth = (len: number) => Math.min(Math.max(len + 2, 8), 60);

const textLength = (value: any) => {
    if (value == null) return 0;
    if (typeof value === 'number') return String(value).length;
    if (value instanceof Date) return 10;
    if (typeof value === 'string') {
        return value.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
    }
    try {
        return String(value).length;
    } catch {
        return 0;
    }
};

const computeColumnWidths = (headers: ExcelHeader[], rows: Record<string, any>[]) =>
    headers.map((header) => {
        const maxDataLen = Math.max(
            0,
            ...rows.map((row) => textLength(splitAtSemicolon(row?.[header.key])))
        );
        return clampWidth(Math.max(textLength(header.label), maxDataLen));
    });

type BorderSide = Border;
const makeBorderSide = (style: BorderStyle, color: string): BorderSide => ({
    style,
    color: { argb: color }
});

const setCellBorder = (cell: ExcelJS.Cell, style: BorderStyle = 'thin', color = 'FF000000') => {
    cell.border = {
        top: makeBorderSide(style, color),
        bottom: makeBorderSide(style, color),
        left: makeBorderSide(style, color),
        right: makeBorderSide(style, color)
    };
};

const applyValueFormatting = (
    cell: ExcelJS.Cell,
    rawValue: any,
    columnOption?: ExcelColumnOption
) => {
    const value = splitAtSemicolon(rawValue);
    cell.value = value;

    const horizontal = columnOption?.align ?? 'left';
    cell.alignment = {
        vertical: 'middle',
        horizontal,
        wrapText: columnOption?.wrap ?? true,
        indent: horizontal === 'center' ? 0 : 1
    };

    if (columnOption?.numFmt) {
        cell.numFmt = columnOption.numFmt;
    } else if (typeof rawValue === 'number') {
        cell.numFmt = Number.isInteger(rawValue) ? '#,##0' : '#,##0.00';
    } else if (rawValue instanceof Date) {
        cell.numFmt = 'dd/mm/yyyy';
    }
};

const writeTable = (
    worksheet: ExcelJS.Worksheet,
    startRow: number,
    table: ExcelTableConfig,
    widthTracker: Record<number, number>,
    applyAutoFilter: boolean
) => {
    const { headers = [], rows, title, columnOptions } = table;
    if (rows.length === 0) return startRow;

    const columns = headers.length
        ? headers
        : Object.keys(rows[0] ?? {}).map((key) => ({ key, label: key }));
    if (!columns.length) return startRow;
    const columnWidths = computeColumnWidths(columns, rows);
    columnWidths.forEach((width, index) => {
        const colIndex = index + 1;
        widthTracker[colIndex] = Math.max(widthTracker[colIndex] ?? 0, width);
    });

    let currentRow = startRow;

    if (title) {
        const titleRow = worksheet.getRow(currentRow++);
        titleRow.getCell(1).value = title;
        titleRow.getCell(1).font = { bold: true, size: 14 };
        worksheet.mergeCells(
            currentRow - 1,
            1,
            currentRow - 1,
            Math.max(columns.length, 1)
        );
    }

    const headerRow = worksheet.getRow(currentRow++);
    columns.forEach((column, index) => {
        const cell = headerRow.getCell(index + 1);
        cell.value = column.label;
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F497D' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        setCellBorder(cell, 'medium', 'FF7F7F7F');
    });
    headerRow.height = 30;

    if (applyAutoFilter) {
        worksheet.autoFilter = {
            from: { row: headerRow.number, column: 1 },
            to: { row: headerRow.number, column: columns.length }
        };
    }

    rows.forEach((row, rowIndex) => {
        const excelRow = worksheet.getRow(currentRow++);
        columns.forEach((column, colIndex) => {
            const cell = excelRow.getCell(colIndex + 1);
            const rawValue = row?.[column.key];
            applyValueFormatting(cell, rawValue, columnOptions?.[column.key]);
            const isEven = rowIndex % 2 === 1;
            if (isEven) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9F9F9' } };
            }
            setCellBorder(cell);
        });
    });

    return currentRow + 1;
};

const addSheet = (workbook: ExcelJS.Workbook, sheet: ExcelSheetConfig) => {
    if (!sheet.tables.length) return;

    const worksheet = workbook.addWorksheet(sheet.name, {
        properties: { defaultRowHeight: 18 },
        views: sheet.freezeHeader === false ? undefined : [{ state: 'frozen', ySplit: 1 }]
    });

    const widthTracker: Record<number, number> = {};
    let currentRow = 1;

    sheet.tables.forEach((table, index) => {
        if (!table.rows.length) return;
        if (index > 0) currentRow += 1;
        currentRow = writeTable(worksheet, currentRow, table, widthTracker, index === 0);
    });

    Object.entries(widthTracker).forEach(([columnIndex, width]) => {
        worksheet.getColumn(Number(columnIndex)).width = width;
    });
};

export const exportExcelFile = async (filename: string, sheets: ExcelSheetConfig[]) => {
    const filteredSheets = sheets.filter((sheet) => sheet.tables.some((table) => table.rows.length));
    if (!filteredSheets.length) return;

    const workbook = new ExcelJS.Workbook();
    filteredSheets.forEach((sheet) => addSheet(workbook, sheet));

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
        new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }),
        filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`
    );
};

export type { ExcelJS };
