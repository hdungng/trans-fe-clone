// material-ui
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

// project imports
import { DropzoneType } from 'config';

// assets
import UploadCover from 'assets/images/upload/upload.svg';
import CameraOutlined from '@ant-design/icons/CameraOutlined';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }: { type?: DropzoneType }) {
  return (
    <>
      {type !== DropzoneType.STANDARD && (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ gap: 1, p: 3 }}>
            <Typography variant="h5">Kéo & Thả hoặc Chọn tệp</Typography>

            <Typography color="secondary">
              Thả tệp vào đây hoặc nhấn&nbsp;
              <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
                duyệt
              </Typography>
              &nbsp;trên máy của bạn
            </Typography>
          </Stack>
        </Stack>
      )}
      {type === DropzoneType.STANDARD && (
        <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: 1 }}>
          <CameraOutlined style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}
