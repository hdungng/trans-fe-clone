// FilePreviewDialog.tsx
import * as React from 'react';
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Slide,
  Tooltip,
  Grid,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

import { CloseOutlined, DownloadOutlined, ExportOutlined } from '@ant-design/icons';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import ChatHistory from './ChatHistory';
import ChatMessageSend from './ChatMessageSend';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type FilePreviewDialogProps = {
  open?: boolean;
  onClose?: () => void;
  url?: string;
  title?: string;
  // messages: Message[];
  workerUrl?: string;
  embedded?: boolean;
  // loading: boolean;
  // onSend: any;
};

export default function FilePreviewDialog({
  open,
  onClose,
  url: urlProp,
  title: titleProp = 'Chế độ xem tài liệu',
  workerUrl = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js',
  embedded = false,
  // loading,
  // onSend
}: FilePreviewDialogProps) {
  const theme = useTheme();

  const [url, setUrl] = React.useState<string | undefined>(urlProp);
  const [title, setTitle] = React.useState<string>(titleProp);

  React.useEffect(() => { setUrl(urlProp); }, [urlProp]);
  React.useEffect(() => { setTitle(titleProp); }, [titleProp]);


  const handleOpenNewTab = React.useCallback(() => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }, [url]);

  const handleOpenInline = React.useCallback((nextUrl: string | null | undefined, nextName?: string | null) => {
    if (!nextUrl) return;
    setUrl(nextUrl);
    if (nextName) setTitle(nextName);
  }, []);

  const handleDownload = React.useCallback(async () => {
    if (!url) return;
    const res = await fetch(url);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = title.replace(/\s+/g, '_');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  }, [url, title]);

  const Content = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {!embedded && (
        <AppBar
          position="relative"
          color="default"
          elevation={0}
          sx={{ borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}
        >
          <Toolbar>
            <IconButton edge="start" onClick={onClose} aria-label="Đóng">
              <CloseOutlined />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1, flex: 1, fontWeight: 600 }}>
              {title}
            </Typography>
            <Tooltip title="Mở trong tab mới">
              <IconButton onClick={handleOpenNewTab}><ExportOutlined /></IconButton>
            </Tooltip>
            <Tooltip title="Tải xuống">
              <IconButton onClick={handleDownload}><DownloadOutlined /></IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          {/* Cột trái */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              minHeight: 0,
              display: { xs: 'none', md: 'block' },
              overflow: 'auto',
              borderRight: (t) => `1px solid ${t.palette.divider}`,
              position: 'relative',
              pb: 9,
            }}
          >
            <ChatHistory openMode="inline"
              onOpenInline={handleOpenInline} />

            <Box sx={{
              position: 'fixed',
              bottom: 10,
              left: "15.5px",
              width: { xs: '31%' },
              backgroundColor: 'background.paper',
              borderTop: (t) => `1px solid ${t.palette.divider}`,
              // p: 1,
            }}>
              <ChatMessageSend />
            </Box>
          </Grid>

          {/* Cột phải */}
          <Grid size={{ xs: 12, md: 8 }} sx={{ height: '100%', minHeight: 0, overflow: 'hidden' }}>
            <Worker workerUrl={workerUrl}>
              {url ? (
                <Viewer key={url} fileUrl={url} />
              ) : (
                <Box sx={{ p: 2, color: 'text.secondary' }}>
                  Chưa chọn tệp nào. Hãy bấm “Mở tệp” trong lịch sử để xem.
                </Box>
              )}
            </Worker>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  // Nếu embedded => không bọc Dialog
  if (embedded) return Content;

  // Vẫn cần dialog cho flow khác? render như cũ
  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
      PaperProps={{
        sx: { bgcolor: theme.palette.background.default, backdropFilter: 'saturate(180%) blur(2px)' },
        elevation: 0,
      }}
    >
      {/* phần content */}
      <DialogContent dividers sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {Content}
      </DialogContent>
    </Dialog>
  );
}
