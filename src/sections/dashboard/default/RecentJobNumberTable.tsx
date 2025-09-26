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
import { useEffect, useState } from 'react';

// API + types
import { APIResponse } from 'types/response';
import { getJobNumberRecent } from 'api/dashboard';

// project imports
import Dot from 'components/@extended/Dot';
import { ColorProps } from 'types/extended';

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
  label: string;
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify' | undefined;
}

const headCells: readonly HeadCell[] = [
  { id: 'name', align: 'left', disablePadding: false, label: 'Tên Job Number' },
  { id: 'company_name', align: 'left', disablePadding: true, label: 'Công ty' },
  { id: 'method', align: 'right', disablePadding: false, label: 'Tác nghiệp' },
  { id: 'status', align: 'left', disablePadding: false, label: 'Trạng thái' }
];

interface RecentJobNumberTableProps {
  order: Order;
  orderBy: string;
}

function RecentJobNumberTable({ order, orderBy }: RecentJobNumberTableProps) {
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
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER STATUS ||============================== //

function OrderStatus({ status }: { status: string }) {
  let color: ColorProps;
  let title: string;

  switch (status) {
    case 'new':
      color = 'warning';
      title = 'Mới';
      break;
    case 'completed':
      color = 'success';
      title = 'Đã Extract';
      break;
    case 'crosschecked':
      color = 'error';
      title = 'Đã Crosschecked';
      break;
    case 'ready':
      color = 'primary';
      title = 'Sẵn sàng';
      break;
    default:
      color = 'primary';
      title = 'Không rõ';
  }

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| MAIN COMPONENT ||============================== //

export default function OrderTable() {
  const order: Order = 'asc';
  const orderBy: keyof Data = 'name';

  const [recentJobNumber, setRecentJobNumber] = useState<Data[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  const res: APIResponse = await getJobNumberRecent();

  if (res.status === 'success' && Array.isArray(res.data)) {
    const sorted = res.data
      .filter((item: Data) => item.projects?.[0]?.created_at) // bỏ những item không có project hoặc created_at
      .sort((a: Data, b: Data) => {
        const dateA = new Date(a.projects[0].created_at).getTime();
        const dateB = new Date(b.projects[0].created_at).getTime();
        return dateB - dateA; // mới nhất lên đầu
      })
      .slice(0, 6); // lấy 6 cái gần nhất

    setRecentJobNumber(sorted);
  } else {
    setRecentJobNumber([]);
  }
};

  function getOperate(method : string) : string{
    switch(method){
      case 'import':
        return 'Nhập khẩu';
      case 'export':
        return 'Xuất khẩu';
      default:
        return 'Không xác định';
    }
  }

  return (
    <Box>
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
