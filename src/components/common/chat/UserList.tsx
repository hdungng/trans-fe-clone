// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
// import { useChat } from 'pages/apps/hscode/service/ChatContext';
interface UserListProps {
  search?: string;
  // selectedUser: string | null;
}

// ==============================|| CHAT - USER LIST  ||============================== //

export default function UserList({ search }: UserListProps) {
  // const { state, dispatch } = useChat();
  // const { chatOrder, chats, selectedId } = state;

  // const { usersLoading, users } = useGetUsers();

  const usersLoading = false;

  if (usersLoading)
    return (
      <List>
        {[1, 2, 3, 4, 5].map((index: number) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton animation="wave" height={24} />}
              secondary={<Skeleton animation="wave" height={16} width="60%" />}
            />
          </ListItem>
        ))}
      </List>
    );

  return (
    <List component="nav">
      {/* {
      chatOrder.map((id: any) => {
        const chat = chats[id];
        const isActive = id === selectedId;

        return (
          <ListItemButton
            key={chat.id}
            sx={{ py: 1, my: 1, borderRadius: 3 }}
            // onClick={() => dispatch(selectChat(id))}
            divider
            selected={isActive}
          >
            <ListItemText
              primary={
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {chat.title}
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
        )
      })} */}
    </List>
  );
}
