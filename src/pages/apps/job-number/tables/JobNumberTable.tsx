import { Fragment, MouseEvent, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
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
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useNavigate } from 'react-router';

// third-party
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    useReactTable
} from '@tanstack/react-table';
import { LabelKeyObject } from 'react-csv/lib/core';

// project imports
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { DebouncedInput, EmptyTable, TablePagination } from 'components/third-party/react-table';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Chip, Divider, IconButton, Tooltip } from '@mui/material';
import { formatDate, formatTime } from 'utils/formatDate';
import { Status } from 'types/pages/job-number';
import { getPaginationRowModel } from '@tanstack/react-table';

const statusColorMap: Record<keyof typeof Status, 'primary' | 'warning' | 'success' | 'error' | 'info'> = {
    new: 'warning',
    ready: 'info',
    crosschecked: 'error',
    completed: 'success'
};

interface Props {
    data: any;
    columns: ColumnDef<any>[];
    searchMessage?: string,
    hasSearchBar?: boolean;
    modalToggler: () => void;
    setOpenDelete: any;
    setJobDeleteId: any;
    children?: React.ReactNode;
    fuzzyFilter?: (row: any, columnId: string, value: string, addMeta: (meta: any) => void) => boolean;
}

export default function JobNumberTable({ data, columns, children, hasSearchBar, modalToggler, setJobDeleteId, setOpenDelete, searchMessage, fuzzyFilter }: Props) {
    const intl = useIntl();
    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const statusKeys = Object.keys(Status) as (keyof typeof Status)[];
    const selectedStatusKey = tabValue > 0 ? statusKeys[tabValue - 1] : null;

    const filteredData = useMemo(() => {
        if (!selectedStatusKey) {
            return data; // "All" tab
        }
        // Filter job numbers that have at least one project with the selected status
        return data.filter((jobNumber: any) =>
            jobNumber.projects?.some((project: any) => project.status === selectedStatusKey)
        );
    }, [data, selectedStatusKey]);


    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            globalFilter
        },
        enableExpanding: true,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true
    });
    const headers: LabelKeyObject[] = [];
    columns.map(
        (columns) =>
            columns.id &&
            headers.push({
                label: typeof columns.header === 'string' ? columns.header : '#',
                key: columns.id
            })
    );

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const getTabCounts = useMemo(() => {
        const counts: { [key: string]: number } = { all: data.length };
        statusKeys.forEach(status => {
            counts[status] = data.filter((jobNumber: any) =>
                jobNumber.projects?.some((project: any) => project.status === status)
            ).length;
        });
        return counts;
    }, [data, statusKeys]);

    return (
        <MainCard content={false} sx={{ marginTop: 5 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: 1, marginLeft: 2 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label={intl.formatMessage({ id: 'job-number.status.tabs.aria-label' })}
                >
                    <Tab
                        label={intl.formatMessage({ id: 'job-number.status.tabs.all' })}
                        icon={<Chip label={getTabCounts.all} color="primary" variant="light" size="small" />}
                        iconPosition="end"
                    />
                    {statusKeys.map((key) => {
                        const color = statusColorMap[key];
                        return (
                            <Tab
                                key={key}
                                label={intl.formatMessage({ id: `job-number.status.${key}` })}
                                icon={<Chip label={getTabCounts[key] || 0} color={color} variant="light" size="small" />}
                                iconPosition="end"
                            />
                        )
                    })}
                </Tabs>
            </Box>
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
                        <Button variant="contained" startIcon={<PlusOutlined />} onClick={modalToggler}>
                            {intl.formatMessage({ id: 'job-number.action.add' })}
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <ScrollX>
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
                            {table.getRowModel().rows.length !== 0 ? table.getRowModel().rows.map((row, index) => (
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
                                                    <Box sx={{ margin: 1, paddingX: 10 }} >
                                                        <Table size="small">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.id' })}</TableCell>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.status' })}</TableCell>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.created-at' })}</TableCell>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.note' })}</TableCell>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.customs-procedure' })}</TableCell>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.crosschecked-time' })}</TableCell>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.extracted-time' })}</TableCell>
                                                                    <TableCell>{intl.formatMessage({ id: 'job-number.table.projects.column.actions' })}</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {row.original.projects
                                                                    .filter((project: any) => !selectedStatusKey || project.status === selectedStatusKey)
                                                                    .map((project: any, projectId: number) => {
                                                                        const key = project.status as keyof typeof Status;
                                                                        const label = intl.formatMessage({ id: `job-number.status.${key}` });


                                                                        const color = statusColorMap[key as keyof typeof Status];

                                                                        return (
                                                                            <TableRow key={projectId}>
                                                                                <TableCell>{projectId + 1}</TableCell>
                                                                                <TableCell>
                                                                                    <Chip label={label} color={color} variant="light" />
                                                                                </TableCell>
                                                                                <TableCell>{formatDate(project.created_at, 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                                                                                <TableCell>{project.note}</TableCell>
                                                                                <TableCell>{intl.formatMessage({ id: `job-number.customs-procedure.${project.customs_procedure_type}` })}
                                                                                </TableCell>
                                                                                <TableCell>{formatTime(project.crosschecked_ms)}</TableCell>
                                                                                <TableCell>{formatTime(project.extracted_ms)}</TableCell>
                                                                                <TableCell align="center">
                                                                                    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                                                                        <Tooltip title={intl.formatMessage({ id: 'job-number.action.view' })}>
                                                                                            <IconButton
                                                                                                color="primary"
                                                                                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                                                                    e.stopPropagation();
                                                                                                    navigate(`/job-number/detail/${project.id}`);
                                                                                                }}
                                                                                            >
                                                                                                <EyeOutlined />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                        <Tooltip title={intl.formatMessage({ id: 'job-number.action.delete' })}>
                                                                                            <IconButton
                                                                                                color="error"
                                                                                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                                                                    e.stopPropagation();
                                                                                                    setOpenDelete(true);
                                                                                                    setJobDeleteId(project.id);
                                                                                                }}
                                                                                            >
                                                                                                <DeleteOutlined />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    </Stack>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        )
                                                                    }
                                                                    )}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </Fragment>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <EmptyTable msg={selectedStatusKey
                                            ? intl.formatMessage({ id: 'job-number.table.empty.by-status' }, { status: intl.formatMessage({ id: `job-number.status.${selectedStatusKey}` }) })
                                            : intl.formatMessage({ id: 'job-number.table.empty' })} />
                                    </TableCell>
                                </TableRow>
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
            </ScrollX>
        </MainCard >
    );
}