import { useRef, useState } from 'react';

// material-ui
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';

// third-party
// import EmojiPicker, { SkinTones, EmojiClickData } from 'emoji-picker-react';

// project imports
// import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

import { openSnackbar } from 'api/snackbar';
// import { insertChat } from 'api/chat';

// assets
// import PaperClipOutlined from '@ant-design/icons/PaperClipOutlined';
// import PictureOutlined from '@ant-design/icons/PictureOutlined';
import SendOutlined from '@ant-design/icons/SendOutlined';
// import SmileOutlined from '@ant-design/icons/SmileOutlined';
// import SoundOutlined from '@ant-design/icons/SoundOutlined';

// types
// import { UserProfile } from 'types/user-profile';
import { SnackbarProps } from 'types/snackbar';
import { Paper, useTheme } from '@mui/material';
import { useChat } from 'pages/apps/hscode/service/ChatContext';
// interface Props {
//   user: UserProfile;
// }

// ==============================|| CHAT - MESSAGE SEND ||============================== //

export default function ChatMessageSend() {
  // const [anchorElEmoji, setAnchorElEmoji] = useState<any>(); 

  // const handleOnEmojiButtonClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
  //   setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
  // };

  // handle new message form
  const [message, setMessage] = useState('');
  const textInput = useRef(null);
  const [focused, setFocused] = useState(false);

  const theme = useTheme();
  const { responseLoading, handleSend } = useChat();


  const handleOnSend = () => {
    if (message.trim() === '') {
      openSnackbar({
        open: true,
        message: 'Message required',
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    } else {
      // const d = new Date();
      // const newMessage = {
      //   id: 5,
      //   from: 'User1',
      //   to: "hello",
      //   text: message,
      //   time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      // };
      handleSend(message);
    }
    setMessage('');
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  // handle emoji
  // const onEmojiClick = (emojiObject: EmojiClickData) => {
  //   setMessage(message + emojiObject.emoji);
  // };

  // const emojiOpen = Boolean(anchorElEmoji);
  // const emojiId = emojiOpen ? 'simple-popper' : undefined;

  // const handleCloseEmoji = () => {
  //   setAnchorElEmoji(null);
  // };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        border: '2px solid',
        borderColor: focused ? 'primary.main' : theme.palette.grey[400],
        bgcolor: 'background.paper',
        transition: 'border-color 0.3s ease',
      }}
    >
      <TextField
        inputRef={textInput}
        fullWidth
        multiline
        maxRows={10}
        placeholder="Nhập tin nhắn..."
        value={message}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) =>
          setMessage(
            e.target.value.length <= 1
              ? e.target.value.trim()
              : e.target.value
          )
        }
        onKeyDown={handleEnter}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: { fontSize: '0.95rem', px: 1 },
        }}
      />
      <IconButton
        color="primary"
        onClick={handleOnSend}
        size="large"
        sx={{ ml: 1 }}
        disabled={!message.trim() || responseLoading}
      >
        <SendOutlined />
      </IconButton>
    </Paper>
  );
}
