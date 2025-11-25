import { Fragment, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

// material-ui
import { alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { FilterFn } from '@tanstack/react-table';

// third-party
import {
    ColumnDef,
    HeaderGroup,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    useReactTable,
    SortingState,
} from '@tanstack/react-table';

// project imports
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';

import {
    DebouncedInput,
    EmptyTable,
    HeaderSort,
    RowSelection,
    TablePagination
} from 'components/third-party/react-table';

import ExpandingUserDetail from 'sections/apps/customer/ExpandingUserDetail';

// types
import { LabelKeyObject } from 'react-csv/lib/core';

// assets
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { normalizeString } from 'utils/string';
import ExcelExport from 'components/third-party/react-table/ExcelExport';
import { isValid } from 'date-fns';

interface Props {
    data: any;
    columns: ColumnDef<any>[];
    searchMessage?: string,
    children?: React.ReactNode;
    hasSearchBar?: boolean;
    filename?: string,
    modalToggler: () => void;
    showAddButton?: boolean;
    fuzzyFilter?: (row: any, columnId: string, value: string, addMeta: (meta: any) => void) => boolean;
}

/**
 * Tạo một hàm fuzzy filter với danh sách cột được cho phép
 * @param allowedColumns - Danh sách cột sẽ được áp dụng fuzzy search
 * @returns FilterFn
 */
type MatchType = 'startsWith' | 'includes' | 'exact' | 'date';

export interface ColumnFilterConfig {
    [columnId: string]: MatchType;
}

export function createFuzzyFilter<T>(columnConfigs: ColumnFilterConfig): FilterFn<T> {
    return (row, columnId, filterValue) => {
        const matchType = columnConfigs[columnId];
        if (!matchType) return true;

        const rawValue = row.getValue(columnId);
        const normalizedFilter = normalizeString(String(filterValue));

        if (matchType === "date") {
            const cellDate = rawValue instanceof Date
                ? rawValue
                : new Date(String(rawValue));

            if (!isValid(cellDate)) return true;

            // Format thành "DD/MM/YYYY"
            const dd = String(cellDate.getDate()).padStart(2, '0');
            const MM = String(cellDate.getMonth() + 1).padStart(2, '0');
            const yyyy = String(cellDate.getFullYear());
            const dateString = `${dd}/${MM}/${yyyy}`;

            const normalizedDateString = normalizeString(dateString);

            return normalizedDateString.includes(normalizedFilter);
        }

        // Xử lý các kiểu chuỗi còn lại
        const rawString = normalizeString(String(rawValue));

        switch (matchType) {
            case 'startsWith':
                return rawString.startsWith(normalizedFilter);
            case 'includes':
                return rawString.includes(normalizedFilter);
            case 'exact':
                return rawString === normalizedFilter;
            default:
                return true;
        }
    };
}


// ==============================|| REACT TABLE - LIST ||============================== //

export default function DynamicTable({ data, children, searchMessage, hasSearchBar = false, columns, filename, modalToggler, fuzzyFilter, showAddButton = true }: Props) {
    const intl = useIntl();
    const [sorting, setSorting] = useState<SortingState>([
        {
            id: 'id',
            desc: true
        }
    ]);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [statusFilter] = useState<number | undefined>(0);


    const filteredData = useMemo(() => {
        if (!statusFilter) return data;
        return data.filter((data: any) => data.status === statusFilter);
    }, [statusFilter, data]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
            rowSelection,
            globalFilter
        },
        enableRowSelection: true,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getRowCanExpand: () => true,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        globalFilterFn: fuzzyFilter,
        debugTable: true,
        enableColumnFilters: true
    });

    const headers: LabelKeyObject[] = [];
    columns.map(
        (columns) =>
            // @ts-expect-error Type 'string | undefined' is not assignable to type 'string'.
            columns.accessorKey &&
            headers.push({
                label: typeof columns.header === 'string' ? columns.header : '#',
                // @ts-expect-error Type 'string | undefined' is not assignable to type 'string'.
                key: columns.accessorKey
            })
    );

    return (
        <MainCard content={false}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={(theme) => ({
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: hasSearchBar ? 'space-between' : 'end',
                    p: 2,
                    [theme.breakpoints.down('sm')]: { '& .MuiOutlinedInput-root, & .MuiFormControl-root': { width: '100%' } }
                })}
            >
                {hasSearchBar && <DebouncedInput
                    value={globalFilter ?? ''}
                    onFilterChange={(value) => setGlobalFilter(String(value))}
                    placeholder={`${searchMessage}`}
                />}

                {children}

                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 2, alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
                    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
                        {showAddButton && (
                            <Button variant="contained" startIcon={<PlusOutlined />} onClick={modalToggler}>
                                {intl.formatMessage({ id: 'common.add-new' })}
                            </Button>
                        )}
                        {filename && (
                            <ExcelExport
                                {...{
                                    data:
                                        table.getSelectedRowModel().flatRows.map((row) => row.original).length === 0
                                            ? data
                                            : table.getSelectedRowModel().flatRows.map((row) => row.original),
                                    headers,
                                    filename: filename,
                                }}
                            />)}
                    </Stack>
                </Stack>
            </Stack>
            <ScrollX>
                <Stack>
                    <RowSelection selected={Object.keys(rowSelection).length} />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                                                Object.assign(header.column.columnDef.meta, {
                                                    className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                                                });
                                            }

                                            return (
                                                <TableCell
                                                    sx={{
                                                        width: header.column.getSize()
                                                    }}
                                                    key={header.id}
                                                    {...header.column.columnDef.meta}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    {...(header.column.getCanSort() &&
                                                        header.column.columnDef.meta === undefined && {
                                                        className: 'cursor-pointer prevent-select'
                                                    })}
                                                >
                                                    {header.isPlaceholder ? null : (
                                                        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                                                            <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                                                            {header.column.getCanSort() && <HeaderSort column={header.column} />}
                                                        </Stack>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={table.getAllColumns().length}>
                                            <EmptyTable msg={intl.formatMessage({ id: 'common.no-data' })} />
                                        </TableCell>
                                    </TableRow>
                                ) : (

                                    table.getRowModel().rows.map((row) => (
                                        <Fragment key={row.id}>
                                            <TableRow>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                            {row.getIsExpanded() && (
                                                <TableRow
                                                    sx={(theme) => ({
                                                        bgcolor: alpha(theme.palette.primary.lighter, 0.1),
                                                        '&:hover': { bgcolor: `${alpha(theme.palette.primary.lighter, 0.1)} !important` }
                                                    })}
                                                >
                                                    <TableCell colSpan={row.getVisibleCells().length}>
                                                        <ExpandingUserDetail data={row.original} />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </Fragment>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <TablePagination
                            {...{
                                setPageSize: table.setPageSize,
                                setPageIndex: table.setPageIndex,
                                getState: table.getState,
                                getPageCount: table.getPageCount,
                            }
                            }
                        />
                    </Box>

                </Stack>
            </ScrollX>
        </MainCard>
    );
}