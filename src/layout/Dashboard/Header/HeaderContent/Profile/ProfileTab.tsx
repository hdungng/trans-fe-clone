import { useState } from 'react';
import { useIntl } from 'react-intl';
// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { UserFormData } from 'types/pages/user';
import UserFormDialog from 'pages/apps/users/FormDialog';
import { openSnackbar } from 'api/snackbar';
import { SnackbarProps } from 'types/snackbar';
import { extractMessagesFromErrors } from 'utils/validator';
import { getMe, updateUser } from 'api/user';

interface Props {
  handleLogout: () => void;
}

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({ handleLogout }: Props) {
  const [selectedIndex] = useState(0);

  const [editingUser, setEditingUser] = useState<UserFormData | undefined>(undefined);
  const [userUpdateId, setUserUpdateId] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const intl = useIntl();

  const handleSubmit = async (data: UserFormData, { setSubmitting, setErrors }: any) => {
    try {
      // setUsers(users.map(u => (u.email === editingUser.email ? data : u)));
      const response: any = await updateUser(data, userUpdateId);

      if (response.status === "success") {
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          message: intl.formatMessage({ id: 'header.profile-tab.notification.update-success' }),
          close: true
        } as SnackbarProps);
        setDialogOpen(false);


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
        message: editingUser
          ? intl.formatMessage({ id: 'header.profile-tab.notification.update-error' })
          : intl.formatMessage({ id: 'header.profile-tab.notification.create-error' }),
        close: true
      } as SnackbarProps);
    };
  }

  const openDialog = async () => {
    setDialogOpen(true);
    setIsLoading(true);
    const res: any = await getMe();
    if (res.status === 'success') {
        setEditingUser({ ...res.data, full_name: res.data.name });
        setUserUpdateId(res.data.id);
    }
    setIsLoading(false);
  }

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={openDialog}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'header.profile-tab.open-profile' })} />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage({ id: 'header.profile-tab.logout' })} />
      </ListItemButton>

      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingUser}
        isEdit={!!editingUser}
        isLoading={isLoading}
        isProfileMode={true}
      />
    </List>
  );
}