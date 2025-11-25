// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// project imports
// import IconButton from 'components/@extended/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// assets
// import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
// import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';
// import UserAvatar from 'sections/apps/chat/UserAvatar';
import { 
  IconButton,
  // ListItemIcon, 
  Typography } from '@mui/material';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// import { useState } from 'react';
// import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
// types

interface Props {
  title: string;
  loading: boolean;
  // user: UserProfile;
  openChatDrawer: boolean;
  emailDetails?: boolean;
  handleDrawerOpen: () => void;
}

// ==============================|| CHAT HEADER ||============================== //

export default function ChatHeader({ title, loading, openChatDrawer, emailDetails, handleDrawerOpen }: Props) {
  // const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>(null);

  // const handleClickSort = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
  //   setAnchorEl(event?.currentTarget);
  // };

  // const handleCloseSort = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Grid container justifyContent="space-between" spacing={1.5}>
      <Grid>
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
          <IconButton onClick={handleDrawerOpen} color="secondary" size="large">
            {openChatDrawer ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </IconButton>
          {/* <UserAvatar
            user={{
              online_status: "",
              avatar: "",
              name: "AI Tư vấn HS Code"
            }}
          /> */}
          <Stack>
            <Typography variant="subtitle1">{title}</Typography>
            {/* <Typography variant="caption" color="text.secondary">
              Đang hoạt động
            </Typography> */}
          </Stack>
        </Stack>
      </Grid>
      <Grid>
        {/* <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleClickSort} size="large" color="secondary">
            <MoreOutlined />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseSort}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            sx={{
              p: 0,
              '& .MuiMenu-list': {
                p: 0
              }
            }}
          >
            <MenuItem onClick={handleCloseSort}>
              <ListItemIcon sx={{ p: 1 }}>
                <DeleteOutlined />
              </ListItemIcon>
              <Typography>Xóa</Typography>
            </MenuItem>
          </Menu>
        </Stack> */}
      </Grid>
    </Grid>
  );
}
