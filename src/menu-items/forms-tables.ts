// assets
import CloudUploadOutlined from '@ant-design/icons/CloudUploadOutlined';
import FileDoneOutlined from '@ant-design/icons/FileDoneOutlined';
import FormOutlined from '@ant-design/icons/FormOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import StepForwardOutlined from '@ant-design/icons/StepForwardOutlined';
import TableOutlined from '@ant-design/icons/TableOutlined';
import InsertRowAboveOutlined from '@ant-design/icons/InsertRowAboveOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  CloudUploadOutlined,
  FileDoneOutlined,
  FormOutlined,
  PieChartOutlined,
  StepForwardOutlined,
  TableOutlined,
  InsertRowAboveOutlined
};

// ==============================|| MENU ITEMS - FORMS & TABLES ||============================== //

const formsTables: NavItemType = {
  id: 'group-forms-tables',
  title: 'forms-tables',
  icon: icons.FileDoneOutlined,
  type: 'group',
  children: [
    {
        id: 'contract',
        title: 'form-contract',
        type: 'collapse',
        icon: icons.StepForwardOutlined,
        children: [
            {
                id: 'contract-input',
                title: 'editable-contract',
                type: 'item',
                url: '/forms/contract/input'
            },
            {
              id: 'contract-list',
              title: 'contract-list',
              type: 'item',
              url: '/forms/contract/list'
            }
        ]
    },
    {
      id: 'order',
      title: 'form-order',
      type: 'collapse',
      icon: icons.StepForwardOutlined,
      children: [
          {
              id: 'order-input',
              title: 'editable-order',
              type: 'item',
              url: '/forms/order/input'
          },
          {
            id: 'order-list',
            title: 'order-list',
            type: 'item',
            url: '/forms/order/list'
          }
      ]
    }
  ]
};

export default formsTables;
