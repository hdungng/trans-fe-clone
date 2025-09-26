import { useState, useMemo, useEffect, MouseEvent } from 'react';
import { useIntl } from 'react-intl';
// assets
import { deleteJobNumber, deleteMultipleJobNumber, getJobNumbers } from 'api/job-number';
import { useNavigate } from 'react-router';
import { JobNumber } from 'types/pages/job-number';
import { ColumnFilterConfig, createFuzzyFilter } from 'components/common/DynamicTable';
import AlertDelete from 'components/common/AlertDelete';
import { IconButton } from '@mui/material';
import { DeleteOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { ColumnDef } from '@tanstack/react-table';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { extractMessagesFromErrors } from 'utils/validator';
import { APIResponse } from 'types/response';
import JobNumberTable from 'pages/apps/job-number/tables/JobNumberTable';
import { Stack } from '@mui/material';
import { Tooltip } from '@mui/material';

// ==============================|| CUSTOMER - CARD ||============================== //



export default function JobNumberListPage() {
  const navigate = useNavigate();
  const intl = useIntl();

  const [jobNumberData, setJobNumberData] = useState<JobNumber[]>([]);
  const [jobDeleteId, setjobDeleteId] = useState<string>('');
  const [jobDeleteMultipleName, setJobDeleteMultipleName] = useState<string>('');

  // const [isNoteDialogOpen, setIsNoteDialogOpen] = useState<boolean>(false);

  const [isDeleteMultiple, setIsDeleteMultiple] = useState<boolean>(false);


  let jobDelete = jobNumberData.find((c: any) => c.id === jobDeleteId);
  const [open, setOpen] = useState<boolean>(false);

  const fetchData = async () => {
    const jobNumbers: any = await getJobNumbers();
    setJobNumberData(jobNumbers);

    if (jobNumbers.status === 'success')
      setJobNumberData(jobNumbers.data);
    else
      setJobNumberData([]);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleClose = () => {
    setOpen(!open);
    setIsDeleteMultiple(false);
  };

  const deleteJobCallback = async () => {
    try {
      const response: APIResponse = isDeleteMultiple ? await deleteMultipleJobNumber(jobDeleteMultipleName) : await deleteJobNumber(jobDeleteId);
      if (response.status === "success") {
        fetchData();
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          message: intl.formatMessage({
            id: isDeleteMultiple
              ? 'job-number.notification.delete-multiple-success'
              : 'job-number.notification.delete-project-success'
          }),
          close: true
        } as SnackbarProps);
        handleClose();
      } else if (response.status === "error") {

        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'error'
          },
          message: extractMessagesFromErrors(response.data.errors),
          close: true
        } as SnackbarProps);
      }
    } catch (error) {
      console.log(error);

      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'error'
        },
        message: intl.formatMessage({
          id: isDeleteMultiple
            ? 'job-number.notification.delete-multiple-error'
            : 'job-number.notification.delete-project-error'
        }),
        close: true
      } as SnackbarProps);
      handleClose();
    }
  }

  const columns = useMemo<ColumnDef<JobNumber>[]>(
    () => [
      {
        id: 'id',
        header: () => null,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <IconButton
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getIsExpanded() ? <DownOutlined /> : <RightOutlined />}
            </IconButton>
          ) : null,
      },
      {
        header: intl.formatMessage({ id: 'job-number.table.column.name' }),
        accessorKey: 'name',
        enableGrouping: true,
      },
      {
        header: intl.formatMessage({ id: 'job-number.table.column.company' }),
        accessorKey: 'company_name',
        enableGrouping: false
      },
      {
        header: intl.formatMessage({ id: 'job-number.table.column.method' }),
        accessorKey: 'method',
        enableGlobalFilter: false,
        enableGrouping: false,
        cell: info => {
          const key = info.getValue() as string;
          return intl.formatMessage({ id: `job-number.method.${key}` });
        },
      },
      {
        header: intl.formatMessage({ id: 'job-number.table.column.creator' }),
        accessorKey: 'full_name',
        enableGrouping: false
      },
      {
        header: intl.formatMessage({ id: 'job-number.table.column.actions' }),
        disableSortBy: true,
        cell: ({ row }) => {
          return (
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title={intl.formatMessage({ id: 'job-number.action.delete' })}>
                <IconButton
                  color="error"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setOpen(true);
                    setJobDeleteMultipleName(row.original.name);
                    setIsDeleteMultiple(true)
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    [intl]
  );

  const columnFilterConfigs: ColumnFilterConfig = {
    name: 'includes',
    company_name: 'includes',
    full_name: 'includes',
    created_at: 'date',
  };

  // Create fuzzy filters for the configured columns
  const fuzzyFilter = createFuzzyFilter(columnFilterConfigs);

  return (
    <>
      <JobNumberTable data={jobNumberData} columns={columns} searchMessage={intl.formatMessage({ id: 'job-number.table.search-placeholder' })} hasSearchBar={true} modalToggler={() => {
        navigate('/job-number/add')
      }} setJobDeleteId={setjobDeleteId} setOpenDelete={setOpen} fuzzyFilter={fuzzyFilter} />
      <AlertDelete title={jobDelete?.name || ""} alertMethod={deleteJobCallback} open={open} handleClose={handleClose} />
    </>
  );
}