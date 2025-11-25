import { Box, Tooltip } from '@mui/material';
import { DownloadOutlined } from '@ant-design/icons';
import { exportExcelFile, ExcelSheetConfig } from 'utils/excel';

interface ExcelExportProps {
    data: any[];
    filename: string;
    headers?: { label: string; key: string }[];
    columnOptions?: Record<
        string,
        { width?: number; numFmt?: string; align?: 'left' | 'center' | 'right'; wrap?: boolean }
    >;
}

export default function ExcelExport({ data, filename, headers, columnOptions }: ExcelExportProps) {
    const handleExport = async () => {
        if (!data.length) return;

        const sheets: ExcelSheetConfig[] = [
            {
                name: 'Sheet1',
                tables: [
                    {
                        headers,
                        rows: data,
                        columnOptions
                    }
                ]
            }
        ];

        await exportExcelFile(filename, sheets);
    };

    return (
        <Tooltip title="Xuất Excel">
            <Box sx={{ color: 'text.secondary', cursor: 'pointer' }} onClick={handleExport}>
                <DownloadOutlined style={{ fontSize: 24, marginTop: 4, marginRight: 4, marginLeft: 4 }} />
            </Box>
        </Tooltip>
    );
}
