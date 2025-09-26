// material-ui
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

// project imports
import IconButton from 'components/@extended/IconButton';
import { DropzoneType } from 'config';

// utils
import getDropzoneData from 'utils/getDropzoneData';

// type
import { FilePreviewProps } from 'types/dropzone';

// assets
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import FileFilled from '@ant-design/icons/FileFilled';
import { ListItemButton } from '@mui/material';

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

export default function FilesPreviewJob({ showList = false, files, onRemove, type }: FilePreviewProps) {
  const hasFile = files.length > 0;
  const layoutType = type;

  return (
    <List
      disablePadding
      sx={{
        ...(hasFile && type !== DropzoneType.STANDARD && { my: 3 }),
        ...(type === DropzoneType.STANDARD && { width: 'calc(100% - 84px)' })
      }}
    >
      {files.map((file, index) => {
        const { key, name, preview, type } = getDropzoneData(file, index);

        const formatType = type === "application/pdf" ? "PDF" : type;


        const handleSelect = () => {
          if (!file) return;

          const fileElement =  file as File;

          // Bạn có thể giới hạn chỉ PDF
          if (fileElement.type  !== 'application/pdf') {
            alert('Chỉ hỗ trợ PDF');
            return;
          }

          // B2 – tạo URL tạm
          const blobUrl = URL.createObjectURL(fileElement);

          // B3 – mở tab mới
          window.open(blobUrl, '_blank', 'noopener,noreferrer');

          // B4 – thu hồi để tránh rò rỉ RAM (sau khi tab mới đã lấy xong)
          setTimeout(() => URL.revokeObjectURL(blobUrl), 0);
        }

        if (showList) {
          return (
            <ListItem
              key={key}
              sx={{
                p: 0,
                m: 0.5,
                width: layoutType === DropzoneType.STANDARD ? 64 : 80,
                height: layoutType === DropzoneType.STANDARD ? 64 : 80,
                borderRadius: 1.25,
                position: 'relative',
                display: 'inline-flex',
                verticalAlign: 'text-top',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden'
              }}
            >
              {type?.includes('image') && <CardMedia component="img" alt="preview" src={preview} style={{ width: '100%' }} />}
              {!type?.includes('image') && <FileFilled style={{ width: '100%', fontSize: '1.5rem' }} />}

              {onRemove && (
                <IconButton
                  size="small"
                  color="error"
                  shape="rounded"
                  onClick={() => onRemove(file)}
                  sx={{
                    fontSize: '0.875rem',
                    bgcolor: 'background.paper',
                    p: 0,
                    width: 'auto',
                    height: 'auto',
                    top: 2,
                    right: 2,
                    position: 'absolute'
                  }}
                >
                  <CloseCircleFilled />
                </IconButton>
              )}
            </ListItem>
          );
        }


        return (
          <ListItem key={key} sx={{ my: 1, px: 2, py: 0.75, borderRadius: 0.75, border: 'solid 1px', borderColor: 'divider' }}>
            <FileFilled style={{ width: '30px', height: '30px', fontSize: '1.15rem', marginRight: 4 }} />
            <ListItemButton onClick={handleSelect} sx={{ paddingX: 3, paddingY: 0 }}>
              <ListItemText
                primary={typeof file === 'string' ? file : name}
                secondary={typeof file === 'string' ? '' : formatType}
                slotProps={{ primary: { variant: 'subtitle2' }, secondary: { variant: 'caption' } }}
              />
            </ListItemButton>
            {onRemove && (
              <IconButton color="error" edge="end" size="small" onClick={() => onRemove(file)}>
                <CloseCircleFilled style={{ fontSize: '1rem' }} />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
