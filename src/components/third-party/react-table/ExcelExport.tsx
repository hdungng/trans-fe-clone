import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Box, Tooltip } from '@mui/material';
import { DownloadOutlined } from '@ant-design/icons';

interface ExcelExportProps {
  data: any[];
  filename: string;
  headers?: { label: string; key: string }[];
}

export default function ExcelExport({ data, filename, headers }: ExcelExportProps) {
  const handleExport = () => {
    let worksheet: XLSX.WorkSheet;

    if (headers) {
      // Dòng tiêu đề từ label
      const headerRow = headers.map(h => h.label);
      const keys = headers.map(h => h.key);
      // Dữ liệu từng dòng
      const rows = data.map(item => keys.map(k => item[k]));
      // Tạo worksheet từ mảng 2 chiều (AOA)
      worksheet = XLSX.utils.aoa_to_sheet([headerRow, ...rows]);
    } else {
      worksheet = XLSX.utils.json_to_sheet(data);
    }

    // Tính độ rộng cột
    const columnWidths = headers
      ? headers.map(({ key, label }) => {
          const maxLength = Math.max(
            label.length,
            ...data.map((row) => (row[key] ? row[key].toString().length : 0))
          );
          return { wch: maxLength + 2 };
        })
      : Object.keys(data[0] || {}).map((key) => {
          const maxLength = Math.max(
            key.length,
            ...data.map((row) => (row[key] ? row[key].toString().length : 0))
          );
          return { wch: maxLength + 2 };
        });

    worksheet['!cols'] = columnWidths;

    // Tạo workbook và lưu
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([excelBuffer], { type: 'application/octet-stream' }),
      filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`
    );
  };

  return (
    <Tooltip title="Xuất Excel">
      <Box sx={{ color: 'text.secondary', cursor: 'pointer' }} onClick={handleExport}>
        <DownloadOutlined style={{ fontSize: '24px', marginTop: 4, marginRight: 4, marginLeft: 4 }} />
      </Box>
    </Tooltip>
  );
}
