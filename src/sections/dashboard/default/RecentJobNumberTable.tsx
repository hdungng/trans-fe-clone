// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

// API + types
import { APIResponse } from 'types/response';
import { getJobNumberRecent } from 'api/dashboard';

// project imports
import Dot from 'components/@extended/Dot';
import { ColorProps } from 'types/extended';
import { UserType } from 'types/pages/user';

// types
interface Data {
  name: string;
  company_name: string;
  method: string;
  status: string;
  projects: Projects[];
}

interface Projects{
  id: number;
  name: string;
  method: string;
  status: string;
  created_at: Date;
}

// ==============================|| SORT UTILS ||============================== //

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| TABLE HEADER ||============================== //

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  labelId: string;
  defaultMessage: string;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    labelId: 'dashboard.recent-job-number.table.column.job-number',
    defaultMessage: 'Job Number'
  },
  {
    id: 'company_name',
    align: 'left',
    disablePadding: true,
    labelId: 'dashboard.recent-job-number.table.column.company',
    defaultMessage: 'Company'
  },
  {
    id: 'method',
    align: 'right',
    disablePadding: false,
    labelId: 'dashboard.recent-job-number.table.column.operation',
    defaultMessage: 'Operation'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    labelId: 'dashboard.recent-job-number.table.column.status',
    defaultMessage: 'Status'
  }
];

interface RecentJobNumberTableProps {
  order: Order;
  orderBy: string;
}

function RecentJobNumberTable({ order, orderBy }: RecentJobNumberTableProps) {
  const intl = useIntl();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {intl.formatMessage({ id: headCell.labelId, defaultMessage: headCell.defaultMessage })}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER STATUS ||============================== //

function OrderStatus({ status }: { status: string }) {
  const intl = useIntl();
  let color: ColorProps;
  let title: string;

  switch (status) {
    case 'new':
      color = 'warning';
      title = intl.formatMessage({ id: 'job-number.status.new', defaultMessage: 'New' });
      break;
    case 'completed':
      color = 'success';
      title = intl.formatMessage({ id: 'job-number.status.completed', defaultMessage: 'Extracted' });
      break;
    case 'crosschecked':
      color = 'error';
      title = intl.formatMessage({ id: 'job-number.status.crosschecked', defaultMessage: 'Cross-checked' });
      break;
    case 'ready':
      color = 'primary';
      title = intl.formatMessage({ id: 'job-number.status.ready', defaultMessage: 'Ready' });
      break;
    default:
      color = 'primary';
      title = intl.formatMessage({ id: 'common.unknown', defaultMessage: 'Unknown' });
  }

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| MAIN COMPONENT ||============================== //

interface OrderTableProps {
  userList?: UserType[];
}

export default function OrderTable({ userList = [] }: OrderTableProps) {
  const order: Order = 'asc';
  const orderBy: keyof Data = 'name';

  const [recentJobNumber, setRecentJobNumber] = useState<Data[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | number>('all');
  const intl = useIntl();

  useEffect(() => {
    fetchData();
  }, [selectedUser]);

  const fetchData = async () => {
    const res: APIResponse = await getJobNumberRecent(selectedUser);

    if (res.status === 'success' && Array.isArray(res.data)) {
      const sorted = res.data
        .filter((item: Data) => item.projects?.[0]?.created_at) // skip items without projects or creation date
        .sort((a: Data, b: Data) => {
          const dateA = new Date(a.projects[0].created_at).getTime();
          const dateB = new Date(b.projects[0].created_at).getTime();
          return dateB - dateA; // newest first
        })
        .slice(0, 6); // keep the 6 most recent records

      setRecentJobNumber(sorted);
    } else {
      setRecentJobNumber([]);
    }
  };

  const handleChange = (event: any) => {
    setSelectedUser(event.target.value);
  };

  const getOperate = useMemo(() => {
    return (method: string): string => {
      switch (method) {
        case 'import':
          return intl.formatMessage({ id: 'job-number.method.import', defaultMessage: 'Import' });
        case 'export':
          return intl.formatMessage({ id: 'job-number.method.export', defaultMessage: 'Export' });
        default:
          return intl.formatMessage({ id: 'common.unknown', defaultMessage: 'Unknown' });
      }
    };
  }, [intl]);

  return (
    <Box>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="user-select">
          {intl.formatMessage({ id: 'dashboard.job-number-pie.select-user', defaultMessage: 'Select User' })}
        </InputLabel>
        <Select
          labelId="user-select"
          id="user-select"
          value={selectedUser ?? 'all'}
          onChange={handleChange}
          label="Chọn User"
        >
          <MenuItem value="all">
            {intl.formatMessage({ id: 'job-number.status.tabs.all', defaultMessage: 'All' })}
          </MenuItem>
          {(userList ?? []).map((user: UserType) => (
            <MenuItem key={user.id} value={user.id}>
              {user.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <RecentJobNumberTable order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(recentJobNumber, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.name}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary">{row.name}</Link>
                  </TableCell>
                  <TableCell>{row.company_name}</TableCell>
                  <TableCell align="right">{getOperate(row.method)}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.projects?.[0].status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}