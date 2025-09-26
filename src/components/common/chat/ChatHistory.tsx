import { useEffect, useRef, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Skeleton,
  Tooltip
} from "@mui/material";
// project imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import { FilePdfOutlined } from '@ant-design/icons';
import { Alert } from '@mui/material';
import { Button } from '@mui/material';
import FilePreviewDialog from './FilePreviewDialog';
import ReactMarkdown from 'react-markdown';
import MarkdownTable, { hasMarkdownTable } from './MarkdownTable';
import ChatbotLoading from './ChatbotLoading';
import { Message, Role } from 'types/pages/hscode';
import { useChat } from 'pages/apps/hscode/service/ChatContext';
import { formatTimeMessage } from 'utils/formatDate';



interface ChatHistoryProps {
  openMode?: 'dialog' | 'inline';
  onOpenInline?: (url: string | null | undefined, name?: string | null) => void;
};

// ==============================|| CHAT MESSAGE HISTORY ||============================== //

export default function ChatHistory({ openMode = 'dialog', onOpenInline }: ChatHistoryProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedFileURL, setSelectedFileUrl] = useState('');
  const [title, setTitle] = useState('');

  const { messages, responseLoading } = useChat();

  const chat: Message[] = messages;


  const handleOpen = (url?: string | null, fileName?: string | null) => {
    if (!url || !fileName) return;
    if (openMode === 'inline') {
      onOpenInline?.(url, fileName);
      return;
    }
    setSelectedFileUrl(url);
    setTitle(fileName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFileUrl('');
    setTitle('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chat, responseLoading]);

  return (
    <SimpleBar
      sx={{
        overflowX: 'hidden',
        height: openMode === 'inline' ? 'calc(100vh - 170px)' : 'calc(100vh - 410px)',
        minHeight: openMode === 'inline' ? 320 : 300,
        '& .simplebar-content': { height: '100%' }
      }}
    >
      <Box sx={{ px: 3, py: 0.75, height: '100%' }}>
        <Grid container spacing={2.5}>
          {chat.length === 0 ? (
            <Grid
              size={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                py: 6,
                opacity: 0.8
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: 600, mb: 1 }} color='primary.main'>
                Xin chào!
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 360 }}>
                Hãy bắt đầu bằng cách nhập câu hỏi hoặc yêu cầu bất kỳ để trò chuyện với AI.
              </Typography>
            </Grid>
          ) : (
            chat.map((msg: Message) => (
              <Grid key={msg.id} size={12} sx={{ width: 1 }}>
                <MessageBubble role={msg.role} time={msg.time} openMode={openMode}>
                  <Box>
                    {msg.content.type === 'text' ? (
                      <TextBlock text={msg.content.text} />
                    ) : (
                      <FileBlockView fileName={msg.content.name} url={msg.content.url} onOpen={handleOpen} />
                    )}
                  </Box>
                </MessageBubble>
              </Grid>
            ))
          )}

          {chat.length > 0 && responseLoading && <ChatbotLoading />}
        </Grid>

        {responseLoading && (
          <Box aria-hidden sx={{ visibility: 'hidden' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} animation="wave" />
            ))}
          </Box>
        )}

        <Grid ref={bottomRef} />
      </Box>

      {/* Dialog xem file */}
      <FilePreviewDialog open={open}
        url={selectedFileURL}
        title={title}
        onClose={handleClose} />
    </SimpleBar>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <Box sx={{ mt: 1 }}>
      {hasMarkdownTable(text) ? <MarkdownTable markdown={text} />
        : <ReactMarkdown>{text}</ReactMarkdown>
      }
    </Box>
  );
}

function MessageBubble({
  role,
  time,
  children,
  openMode
}: {
  role: Role;
  time: string;
  children: React.ReactNode;
  openMode: 'dialog' | 'inline';
}) {
  const isClient = role === 'user';

  return isClient ? (
    <Stack direction="row" sx={{ width: 1, justifyContent: 'flex-end' }}>
      <Stack sx={{ maxWidth: '60%', alignItems: 'flex-end', width: 'fit-content' }}>
        <MainCard
          content={false}
          border={false}
          sx={{
            px: 2,
            bgcolor: 'primary.light',
            borderRadius: 5,
            width: 'fit-content',
          }}
        >
          <Typography
            variant="body1"
            color="common.white"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {children}
          </Typography>
        </MainCard>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textAlign: 'right', mt: 0.5 }}
        >
          {formatTimeMessage(time)}
        </Typography>
      </Stack>
    </Stack>
  ) : (
    <Stack direction="row" sx={{ width: 1 }}>
      <Stack sx={{ maxWidth: openMode === 'inline' ? '100%' : '60%', width: 'fit-content' }}>
        <MainCard
          content={false}
          border={false}
          sx={{
            bgcolor: 'grey.50',
            px: 2,
            borderRadius: 5,
            width: 'fit-content',
          }}
        >
          {children}
        </MainCard>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          {formatTimeMessage(time)}
        </Typography>
      </Stack>
    </Stack>
  );
}


function FileBlockView({
  fileName,
  url,
  onOpen
}: {
  fileName: string;
  url: string;
  onOpen: (url?: string | null, name?: string | null) => void;
}) {
  return (
    <Alert
      variant="outlined"
      color="error"
      icon={<FilePdfOutlined />}
      action={
        <Button
          color="error"
          size="small"
          onClick={() => onOpen(url, fileName)}
        >
          Mở tệp
        </Button>
      }
      sx={{
        alignItems: 'center',
        maxWidth: '100%',
      }}
    >
      <Tooltip title={fileName}>
        <Typography
          variant="body1"
          noWrap
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            maxWidth: '260px',
          }}
        >
          {fileName}
        </Typography>
      </Tooltip>
    </Alert>
  );
}
