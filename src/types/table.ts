// material-ui
import { TableCellProps } from '@mui/material/TableCell';

// project imports
import { Gender } from 'config';

// types
import { KeyedObject } from './root';

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;

export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, p: string) => void;
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type TableDataApiResponse = {
  data: TableDataProps[];
  meta: {
    totalRowCount: number;
  };
};

export type TableDataProps = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  fatherName: string;
  email: string;
  age: number;
  gender: Gender;
  role: string;
  visits: number;
  progress: number;
  status: string;
  orderStatus: string;
  contact: string;
  country: string;
  address: string;
  about: string;
  avatar: number;
  skills: string[];
  time: string[];
};


export interface CrossCheckTableDataProps {
  id: string;
  item_code: string;
  item_name: string;
  hs_code: string;
  country_of_origin_code: string;
  quantity: number;
  quantity_unit: string;
  secondary_quantity: number;
  secondary_quantity_unit: string;
  invoice_unit_price: number;
  unit_price_currency_code: string;
  invoice_unit_price_unit: string;
  invoice_value: number;
  taxable_value: number;
  taxable_value_currency_code: string;
  import_tariff_code: string;
  import_tax_rate: number;
  import_tax_amount: number;
  special_consumption_tax_code_1: string;
  special_consumption_tax_exemption_reduction_code_1: string;
  special_consumption_tax_reduction_amount_1: number;
  environmental_tax_code_2: string;
  environmental_tax_exemption_reduction_code_2: string;
  environmental_tax_reduction_2: number;
  vat_tax_code_3: string;
  vat_exemption_reduction_code_3: string;
  vat_reduction_amount_3: number;
  tax_rate_code_4: string;
  tax_exemption_reduction_code_4: string;
  tax_reduction_amount_4: number;
  tax_rate_code_5: string;
  tax_exemption_reduction_code_5: string;
  tax_reduction_amount_5: number;
  absolute_tax_rate: number;
  absolute_tax_rate_unit: string;
  absolute_tax_currency_code: string;
  absolute_tax_application_code: string;
  none_quota_code: string;
  adjustment_item_sequence_1: string;
  adjustment_item_sequence_2: string;
  adjustment_item_sequence_3: string;
  adjustment_item_sequence_4: string;
  adjustment_item_sequence_5: string;
  reimport_declaration_line_no: string;
  duty_free_list_reg_no: string;
  list_line_ref: string;
  import_tax_exemption_reduction_code: string;
  import_tax_reduction_amount: number;
  private_management_code: string;
}
