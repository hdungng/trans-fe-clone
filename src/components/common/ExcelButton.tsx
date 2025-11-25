import { Box, Tooltip } from '@mui/material';
import { DownloadOutlined } from '@ant-design/icons';

interface ExcelButtonProps {
  callback: any;
}

export default function ExcelButton({ callback }: ExcelButtonProps) {

  return (
    <Tooltip title="Xuất Excel">
      <Box sx={{ color: 'text.secondary', cursor: 'pointer' }} onClick={callback}>
        <DownloadOutlined style={{ fontSize: '24px', marginTop: 4, marginRight: 4, marginLeft: 4 }} />
      </Box>
    </Tooltip>
  );
}
