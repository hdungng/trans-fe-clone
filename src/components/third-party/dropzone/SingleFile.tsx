// material-ui
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

// third-party
import { useDropzone } from 'react-dropzone';

// project imports
import PlaceholderContent from './PlaceholderContent';

// types
import { CustomFile, UploadProps } from 'types/dropzone';
import FilesPreview from './FilesPreview';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  background: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

export default function SingleFileUpload({ error, showList = false, file, setFieldValue, setFileTouched, sx }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles: CustomFile[]) => {
      setFileTouched(true);

      const singleFile = acceptedFiles[0];
      if (singleFile) {
        singleFile.preview = URL.createObjectURL(singleFile);
        setFieldValue('file', singleFile);
      }
    }
  });

  const thumbs =
    file && file.type.startsWith('image/') && (
      <CardMedia
        key={file.name}
        component="img"
        src={file.preview}
        sx={{
          top: 8,
          left: 8,
          borderRadius: 2,
          position: 'absolute',
          width: 'calc(100% - 16px)',
          height: 'calc(100% - 16px)',
          bgcolor: 'background.paper'
        }}
        onLoad={() => {
          URL.revokeObjectURL(file.preview!);
        }}
      />
    );


  const onRemove = () => {
    setFieldValue('file', null);
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && { color: 'error.main', borderColor: 'error.light', bgcolor: 'error.lighter' }),
          ...(file && { padding: '12% 0' })
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent />
        {thumbs}
      </DropzoneWrapper>
      {/* {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />} */}

      {file && <FilesPreview files={[file]} showList={showList} onRemove={onRemove} />}
    </Box>
  );
}
