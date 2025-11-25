// material-ui
import { Theme, SxProps } from '@mui/material/styles';

//project-import
import { DropzoneType } from 'config';

//third-party
import { DropzoneOptions } from 'react-dropzone';

// ==============================|| TYPES - DROPZONE ||============================== //

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  showList?: boolean;
  file: CustomFile | null;
  setFieldValue: (field: string, value: any) => void;
  setFileTouched? : any;
  setHasChanges?: any;
  sx?: SxProps<Theme>;
}

export interface UploadMultiFileProps extends DropzoneOptions {
  files?: CustomFile[] | null;
  error?: boolean;
  showList?: boolean;
  type?: DropzoneType;
  sx?: SxProps<Theme>;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  setFieldValue: (field: string, value: any) => void;
  setFileTouched : any;
  jobNumberId?: string;
}

export interface UploadMultiFileJobProps extends UploadMultiFileProps {
  setHasChanges?: any;
}

export interface FilePreviewProps {
  showList?: boolean;
  type?: DropzoneType;
  files: (File | string)[];
  jobNumberId?: string;
  onRemove?: (file: File | string) => void;
}

