import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';

// assets
import { Button } from '@mui/material';
// import { useChat } from 'pages/apps/hscode/service/ChatContext';
import UserList from './UserList';

// types

// ==============================|| CHAT DRAWER ||============================== //

interface ChatDrawerProps {
  handleDrawerOpen: () => void;
  openChatDrawer: boolean | undefined;
  // selectedUser: string | null;
}

export default function ChatDrawer({ handleDrawerOpen, openChatDrawer }: ChatDrawerProps) {

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // set user status on status menu click
  // const { dispatch } = useChat();

  return (
    <Drawer
      sx={{
        mt: { xs: 7.5, lg: 0 },
        width: 320,
        flexShrink: 0,
        display: { xs: openChatDrawer ? 'block' : 'none', lg: 'block' },
        zIndex: { xs: openChatDrawer ? 1100 : -1, lg: 0 },
        '& .MuiDrawer-paper': {
          height: 1,
          width: 320,
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none'
        }
      }}
      variant={downLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openChatDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '4px 0 0 4px',
          borderRight: 'none',
          height: 1,
          '& div:nth-of-type(2)': { height: 'auto' }
        }}
        border={!downLG}
        content={false}
      >
        <Box sx={{ p: 3, pb: 1 }}>
          <Stack sx={{ gap: 2 }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>

              <Typography variant="h5" color="inherit">
                Đoạn Chat
              </Typography>

              {/* nút thêm mới */}
              <Button variant="outlined" color="info">Đoạn chat mới</Button>
            </Stack>
          </Stack>
        </Box>

        <SimpleBar
          sx={{
            overflowX: 'hidden',
            height: downLG ? 'calc(100vh - 354px)' : 'calc(100vh - 402px)',
            minHeight: downLG ? 0 : 420
          }}
        >
          <Box sx={{ p: 3, pt: 0, width: 1 }}>
            <UserList />
          </Box>
        </SimpleBar>
      </MainCard>
    </Drawer>
  );
}
