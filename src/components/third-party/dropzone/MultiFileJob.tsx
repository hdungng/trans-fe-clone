// material-ui
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third-party
import { useDropzone } from 'react-dropzone';

// project imports
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import { DropzoneType } from 'config';

// types
import { CustomFile, UploadMultiFileJobProps } from 'types/dropzone';
import FilesPreviewJob from './FilesPreviewJob';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

export default function MultiFileUploadJob({ error, showList = false, files, type, setFieldValue, sx, onUpload, setFileTouched }: UploadMultiFileJobProps) {

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles: CustomFile[]) => {
      setFileTouched((touch: boolean) => touch = true);

      if (files) {
        setFieldValue('files', [
          ...files,
          ...acceptedFiles.map((file: CustomFile) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        ]);
      } else {
        setFieldValue(
          'files',
          acceptedFiles.map((file: CustomFile) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        );
      }
    }
  });

  const onRemoveAll = () => {
    setFieldValue('files', null);
  };

  const onRemove = (file: File | string) => {
    const filteredItems = files && files.filter((_file) => _file !== file);
    setFieldValue('files', filteredItems);
    if (filteredItems?.length === 0) {
      setFieldValue('files', null);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', ...(type === DropzoneType.STANDARD && { width: 'auto', display: 'flex' }), ...sx }}>
        <Stack {...(type === DropzoneType.STANDARD && { alignItems: 'center' })}>
          <DropzoneWrapper
            {...getRootProps()}
            sx={{
              ...(type === DropzoneType.STANDARD && { p: 0, m: 1, width: 64, height: 64 }),
              ...(isDragActive && { opacity: 0.72 }),
              ...((isDragReject || error) && {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: 'error.lighter'
              })
            }}
          >
            <input {...getInputProps()} />
            <PlaceholderContent type={type} />
          </DropzoneWrapper>
          {type === DropzoneType.STANDARD && files && files.length > 1 && (
            <Button variant="contained" color="error" size="extraSmall" onClick={onRemoveAll}>
              Xóa tất cả
            </Button>
          )}
        </Stack>
        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        {files && files.length > 0 && <FilesPreviewJob files={files} showList={showList} onRemove={onRemove} type={type} />}
      </Box>

      {type !== DropzoneType.STANDARD && files && files.length > 0 && (
        <Stack direction="row" sx={{ gap: 1.5, justifyContent: 'flex-end' }}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Xóa tất cả
          </Button>
        </Stack>
      )}
    </>
  );
}
