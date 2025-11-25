import type { IntlShape } from 'react-intl';
import type { LabelKeyObject } from 'react-csv/lib/core';
import { ExcelSheetConfig, ExcelTableConfig } from 'utils/excel';
import {
    prepareCrossCheckDataset,
    type CrossCheckRowData
} from '../tables/CrossCheckTable';
import {
    buildProductCheckExportRows,
    getProductCheckColumnHeaders,
    type ProductCheckItem
} from '../tables/ProductCheckTable';

export interface CrossCheckDataset {
    headers: LabelKeyObject[];
    rows: CrossCheckRowData[];
}

export interface CrossCheckExportSource {
    documents?: {
        general?: CrossCheckDataset | null;
        products?: ProductCheckItem[] | null;
        masterList?: ProductCheckItem[] | null;
    };
    coo?: {
        crossCheck?: CrossCheckDataset | null;
        products?: ProductCheckItem[] | null;
    };
    health?: {
        crossCheck?: CrossCheckDataset | null;
    };
    evfta?: {
        declaration?: string | null;
        comments?: string[] | null;
    };
}

const buildCrossCheckTable = (
    intl: IntlShape,
    dataset?: CrossCheckDataset | null,
    titleId?: string
): ExcelTableConfig | null => {
    if (!dataset?.headers?.length || !dataset?.rows?.length || !titleId) return null;
    const { excelHeaders, excelRows } = prepareCrossCheckDataset(intl, dataset.headers, dataset.rows);
    return {
        // title: intl.formatMessage({ id: titleId }),
        headers: excelHeaders,
        rows: excelRows
    };
};

const buildProductTable = (
    intl: IntlShape,
    data?: ProductCheckItem[] | null,
    titleId?: string
): ExcelTableConfig | null => {
    if (!Array.isArray(data) || data.length === 0 || !titleId) return null;
    return {
        // title: intl.formatMessage({ id: titleId }),
        headers: getProductCheckColumnHeaders(intl),
        rows: buildProductCheckExportRows(data)
    };
};

const buildEvftaTable = (intl: IntlShape, declaration?: string | null, comments?: string[] | null) => {
    const rows: { field: string; value: string }[] = [];
    if (declaration) {
        rows.push({
            field: intl.formatMessage({ id: 'job-number.detail.evfta.declaration.title', defaultMessage: 'Declaration' }),
            value: declaration
        });
    }
    comments?.forEach((comment, index) => {
        rows.push({
            field: `${intl.formatMessage({ id: 'job-number.detail.evfta.comment', defaultMessage: 'Comment' })} ${index + 1}`,
            value: comment
        });
    });

    if (!rows.length) return null;

    return {
        title: intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.evfta' }),
        headers: [
            { label: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.cross-check.data-field' }), key: 'field' },
            { label: intl.formatMessage({ id: 'job-number.detail.crosscheck.tables.cross-check.row.result', defaultMessage: 'Value' }), key: 'value' }
        ],
        rows
    };
};

export const buildCrossCheckSheetConfigs = (intl: IntlShape, source: CrossCheckExportSource): ExcelSheetConfig[] => {
    const sheets: ExcelSheetConfig[] = [];

    const documentTables: ExcelTableConfig[] = [];
    const documentGeneral = buildCrossCheckTable(intl, source.documents?.general, 'job-number.detail.crosscheck.general.title');
    if (documentGeneral) documentTables.push(documentGeneral);

    const documentProducts = buildProductTable(intl, source.documents?.products, 'job-number.detail.crosscheck.product.title');
    if (documentProducts) documentTables.push(documentProducts);

    if (documentTables.length) {
        sheets.push({
            name: intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.documents' }),
            tables: documentTables
        });
    }

    const documentMasterList = buildProductTable(intl, source.documents?.masterList, 'job-number.detail.crosscheck.master-list.title');
    if (documentMasterList) {
        sheets.push({
            name: intl.formatMessage({ id: 'job-number.detail.crosscheck.master-list.title' }).slice(0, 31),
            tables: [documentMasterList]
        });
    }

    const cooTables: ExcelTableConfig[] = [];
    const cooCrossCheck = buildCrossCheckTable(intl, source.coo?.crossCheck, 'job-number.detail.crosscheck.coo.title');
    if (cooCrossCheck) cooTables.push(cooCrossCheck);

    const cooProducts = buildProductTable(intl, source.coo?.products, 'job-number.detail.crosscheck.coo.product.title');
    if (cooProducts) cooTables.push(cooProducts);

    if (cooTables.length) {
        sheets.push({
            name: intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.coo' }),
            tables: cooTables
        });
    }

    const healthTable = buildCrossCheckTable(intl, source.health?.crossCheck, 'job-number.detail.crosscheck.health.title');
    if (healthTable) {
        sheets.push({
            name: intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.health' }),
            tables: [healthTable]
        });
    }

    const evftaTable = buildEvftaTable(intl, source.evfta?.declaration, source.evfta?.comments ?? undefined);
    if (evftaTable) {
        sheets.push({
            name: intl.formatMessage({ id: 'job-number.detail.crosscheck.tabs.evfta' }),
            tables: [evftaTable]
        });
    }

    return sheets;
};
