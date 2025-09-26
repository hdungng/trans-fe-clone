// assets
import LineChartOutlined from '@ant-design/icons/LineChartOutlined';
import IdcardOutlined from '@ant-design/icons/IdcardOutlined';
import DatabaseOutlined from '@ant-design/icons/DatabaseOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { LineChartOutlined, IdcardOutlined, DatabaseOutlined };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const widget: NavItemType = {
  id: 'group-widget',
  title: 'home',
  icon: icons.IdcardOutlined,
  type: 'group',
  children: [
    // {
    //   id: 'statistics',
    //   title: 'statistics',
    //   type: 'item',
    //   url: '/widget/statistics',
    //   icon: icons.IdcardOutlined
    // },
    // {
    //   id: 'data',
    //   title: 'data',
    //   type: 'item',
    //   url: '/widget/data',
    //   icon: icons.DatabaseOutlined
    // },
    // {
    //   id: 'chart',
    //   title: 'chart',
    //   type: 'item',
    //   url: '/widget/chart',
    //   icon: icons.LineChartOutlined
    // }
    {
      id: 'dashboard',
      title: 'dashboard',
      type: 'item',
      icon: icons.LineChartOutlined,
      link: '/dashboard',
      url: '/dashboard',
      // breadcrumbs: false
    },
  ]
};

export default widget;
