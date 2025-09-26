import React from 'react';
import { Grid, } from '@mui/material';
import { Field } from 'formik';

import ContextMenu from './ContextMenu';
import { FieldRenderer } from './FieldRender';

interface OptionField {
  code?: string;
  label?: string;
  date?: string;
  note?: string;
}
interface Field {
  key: string;
  label: string;
  readOnly?: boolean;
  required: boolean;
  type: string;
  method: string;
  options: OptionField[]
}

interface GridSize {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

interface DynamicFieldProps {
  fields: Field[];
  gridSize?: GridSize;
  onChangeProp?: any;
  isDefaultPage?: boolean;
}

const DynamicField: React.FC<DynamicFieldProps> = ({ fields, onChangeProp = null, gridSize = { xs: 4, sm: 4, lg: 3 }, isDefaultPage = false }) => {

  return (
    <>
      {fields.map((field) => (
        <Grid size={{ ...gridSize }} key={field.key}>
          {
            isDefaultPage ?
              <ContextMenu>
                <FieldRenderer field={field} onChangeProp={onChangeProp} />
              </ContextMenu>
              : <FieldRenderer field={field} onChangeProp={onChangeProp} />
          }
        </Grid >
      ))}
    </>
  );
};

export default DynamicField;