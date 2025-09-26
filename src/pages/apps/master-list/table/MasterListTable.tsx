import React, { MouseEvent } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper,
    Divider,
    Box,
    Stack,
    Tooltip,
    IconButton,
} from '@mui/material';
import MainCard from 'components/MainCard';
import { LabelKeyObject } from 'react-csv/lib/core';
import { EmptyTable, TablePagination } from 'components/third-party/react-table';
import { ColumnDef, getCoreRowModel, getPaginationRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ExcelButton from 'components/common/ExcelButton';
import { useIntl } from 'react-intl';

// Props cho component
interface MasterListTableProps {
    columnHeaders: LabelKeyObject[];
    rowData: any;
    hasExcel: boolean;
    title?: React.ReactNode;
    handleEditClick: (id: number) => void;
    handleDeleteClick: (id: number) => void;
    excelCallback?: () => void;
    meta: Meta;
}

export interface Meta {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newSize: number) => void;
}

const MasterListTable: React.FC<MasterListTableProps> = ({ columnHeaders, rowData, title, hasExcel, handleEditClick, handleDeleteClick, excelCallback, meta }) => {
    const intl = useIntl();
    let { pageIndex, pageSize, totalCount, onPageChange, onRowsPerPageChange } = meta;
    const totalCols = columnHeaders.length;

    const columns: ColumnDef<any>[] = columnHeaders.map((item): ColumnDef<any> => ({
        header: item.label,
        accessorKey: item.key,
    }));

    const currentPageIndexBasedZero = pageIndex - 1;

    const table = useReactTable({
        data: rowData,
        columns,
        pageCount: Math.ceil(totalCount / pageSize),
        state: {
            pagination: {
                pageIndex: currentPageIndexBasedZero,
                pageSize,
            } as PaginationState,
        },
        manualPagination: true,
        onPaginationChange: (updater) => {
            const newState =
                typeof updater === 'function'
                    ? updater({ pageIndex, pageSize })
                    : updater;

            if (newState.pageIndex !== pageIndex) {
                onPageChange(newState.pageIndex + 1);
            }
            if (newState.pageSize !== pageSize) {
                onRowsPerPageChange(newState.pageSize);
            }



            const { pageIndex: newPageIndex, pageSize: newPageSize } =
                typeof updater === 'function'
                    ? updater({ pageIndex: currentPageIndexBasedZero, pageSize })
                    : updater;

            if (newPageIndex !== currentPageIndexBasedZero) {
                onPageChange(newPageIndex + 1);
            }
            if (newPageSize !== pageSize) {
                onRowsPerPageChange(newPageSize);
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <MainCard title={title} sx={{ marginBottom: 5 }} secondary={hasExcel && <ExcelButton callback={excelCallback} />}>
            <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 750 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columnHeaders.map((header, idx) => (
                                <TableCell key={idx} align="center" sx={{ position: 'sticky !important' }}>
                                    {header.label}
                                </TableCell>
                            ))}
                            {columnHeaders.length > 0 && <TableCell align="center" sx={{ position: 'sticky !important' }}>{intl.formatMessage({ id: 'master-list.table.actions' })}</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={totalCols} align="center" sx={{ py: 6 }}>
                                    <EmptyTable msg={intl.formatMessage({ id: 'common.no-data' })} />
                                </TableCell>
                            </TableRow>
                        ) : (
                            rowData.map((row: any, rowIndex: number) => {
                                return (
                                    <TableRow key={rowIndex}>
                                        {row.values.map((value: string, colIndex: number) => {
                                            let color = 'inherit';
                                            if (value === 'FAIL') color = 'red';
                                            else if (value === 'PASS') color = 'green';

                                            return (
                                                <TableCell key={colIndex} align="center" style={{ color, fontWeight: (value === 'FAIL' || value === 'PASS') ? 'bold' : 'normal' }}>
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell align="center">
                                            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Tooltip title={intl.formatMessage({ id: 'master-list.action.edit-row' })}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                        e.stopPropagation();
                                                        handleEditClick(row.id);
                                                    }}
                                                >
                                                    <EditOutlined />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={intl.formatMessage({ id: 'master-list.action.delete-row' })}>
                                                <IconButton
                                                    color="error"
                                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                            e.stopPropagation();
                                                            // setMasterListDeleteId(Number(row.original.id));
                                                            // setOpen(true);
                                                            handleDeleteClick(row.id);
                                                        }}
                                                    >
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                )
                            }))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <Box sx={{ p: 2 }}>
                <TablePagination
                    {...{
                        initialPageSize: 100,
                        options: [100, 300, 500],
                        setPageSize: table.setPageSize,
                        setPageIndex: table.setPageIndex,
                        getState: table.getState,
                        getPageCount: table.getPageCount,
                    }
                    }
                />
            </Box>
        </MainCard >
    );
};

export default MasterListTable;