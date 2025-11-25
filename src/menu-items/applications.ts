// project imports
// import { handlerCustomerDialog } from 'api/customer';
// import { NavActionType } from 'config';

// assets
import BuildOutlined from '@ant-design/icons/BuildOutlined';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import CustomerServiceOutlined from '@ant-design/icons/CustomerServiceOutlined';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import AppstoreAddOutlined from '@ant-design/icons/AppstoreAddOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import LinkOutlined from '@ant-design/icons/LinkOutlined';
import FileSearchOutlined from '@ant-design/icons/FileSearchOutlined';
import OrderedListOutlined from '@ant-design/icons/OrderedListOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import RobotOutlined from '@ant-design/icons/RobotOutlined';
import SafetyOutlined from '@ant-design/icons/SafetyOutlined';
import BulbOutlined from '@ant-design/icons/BulbOutlined';

// type
import { NavItemType } from 'types/menu';
import { TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  BuildOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  FileSearchOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  PlusOutlined,
  OrderedListOutlined,
  TeamOutlined,
  LinkOutlined,
  SettingOutlined,
  RobotOutlined,
  SafetyOutlined,
  BulbOutlined
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  title: 'menu',
  icon: icons.AppstoreAddOutlined,
  type: 'group',
  children: [
    // {
    //   id: 'chat',
    //   title: 'chat',
    //   type: 'item',
    //   url: '/apps/chat',
    //   icon: icons.MessageOutlined,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'calendar',
    //   title: 'calendar',
    //   type: 'item',
    //   url: '/apps/calendar',
    //   icon: icons.CalendarOutlined,
    //   actions: [
    //     {
    //       type: NavActionType.LINK,
    //       label: 'Full Calendar',
    //       icon: icons.LinkOutlined,
    //       url: 'https://fullcalendar.io/docs/react',
    //       target: true
    //     }
    //   ]
    // },
    {
      id: 'job-number',
      title: 'job-number',
      type: 'collapse',
      icon: icons.FileTextOutlined,
      children: [
        {
          id: 'job-number-list',
          title: 'list',
          type: 'item',
          url: '/job-number/list',
        },
        {
          id: 'job-number-add',
          title: 'add',
          type: 'item',
          url: '/job-number/add',
        },
      ]
    },
    {
      id: 'hs-code',
      title: 'hs-code',
      type: 'item',
      icon: icons.RobotOutlined,
      url: '/hs-code'
    },
    {
      id: 'master-list',
      title: 'master-list',
      type: 'item',
      icon: icons.FileSearchOutlined,
      url: '/master-list/list',
    },
    {
      id: 'client',
      title: 'client',
      type: 'item',
      icon: icons.UserOutlined,
      url: '/client/list',
    },
    {
      id: 'users',
      title: 'users',
      type: 'item',
      icon: icons.UserOutlined,
      url: '/users/list',
      // actions: [
      //   {
      //     type: NavActionType.FUNCTION,
      //     label: 'Add Customer',
      //     function: () => handlerCustomerDialog(true),
      //     icon: icons.PlusOutlined
      //   }
      // ]
    },
    {
      id: 'user-access-control',
      title: 'user-access-control',
      type: 'item',
      icon: icons.SafetyOutlined,
      url: '/user-access-control/list',
    },
    {
      id: 'config',
      title: 'config',
      type: 'collapse',
      icon: icons.SettingOutlined,
      children: [
        {
          id: 'default-setting',
          title: 'default-setting',
          type: 'item',
          icon: icons.SettingOutlined,
          url: '/config/default-setting'
        },
        {
          id: 'guide-ai',
          title: 'guide-ai',
          type: 'item',
          icon: icons.BulbOutlined,
          url: '/config/guide-ai'
        },
      ]
    },
    {
      id: 'manual-use',
      title: 'manual-use',
      type: 'item',
      icon: icons.OrderedListOutlined,
      url: '/manual-use',
      // actions: [
      //   {
      //     type: NavActionType.FUNCTION,
      //     label: 'Add Customer',
      //     function: () => handlerCustomerDialog(true),
      //     icon: icons.PlusOutlined
      //   }
      // ]
    },
    // {
    //   id: 'invoice',
    //   title: 'invoice',
    //   url: '/apps/invoice/dashboard',
    //   type: 'collapse',
    //   icon: icons.FileTextOutlined,
    //   breadcrumbs: false,
    //   children: [
    //     {
    //       id: 'invoice-create',
    //       title: 'create',
    //       type: 'item',
    //       url: '/apps/invoice/create',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'invoice-details',
    //       title: 'details',
    //       type: 'item',
    //       link: '/apps/invoice/details/:id',
    //       url: '/apps/invoice/details/1',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'invoice-list',
    //       title: 'list',
    //       type: 'item',
    //       url: '/apps/invoice/list',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'invoice-edit',
    //       title: 'edit',
    //       type: 'item',
    //       link: '/apps/invoice/edit/:id',
    //       url: '/apps/invoice/edit/1',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
    // {
    //   id: 'product',
    //   title: 'product',
    //   type: 'collapse',
    //   icon: icons.CustomerServiceOutlined,
    //   children: [
    //     {
    //       id: 'product-list',
    //       title: 'list',
    //       type: 'item',
    //       url: '/apps/product/list',
    //       actions: [
    //         {
    //           type: NavActionType.FUNCTION,
    //           label: 'Add Product',
    //           // function: () => handlerProductDialog(true),
    //           icon: icons.PlusOutlined
    //         }
    //       ]
    //     },
    //     {
    //       id: 'customer-card',
    //       title: 'cards',
    //       type: 'item',
    //       url: '/apps/customer/customer-card'
    //     }
    //   ]
    // },
    // {
    //   id: 'profile',
    //   title: 'profile',
    //   type: 'collapse',
    //   icon: icons.UserOutlined,
    //   children: [
    //     {
    //       id: 'user-profile',
    //       title: 'user-profile',
    //       type: 'item',
    //       link: '/apps/profiles/user/:tab',
    //       url: '/apps/profiles/user/personal',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'account-profile',
    //       title: 'account-profile',
    //       type: 'item',
    //       link: '/apps/profiles/account/:tab',
    //       url: '/apps/profiles/account/basic',
    //       breadcrumbs: false
    //     }
    //   ]
    // },

    // {
    //   id: 'e-commerce',
    //   title: 'e-commerce',
    //   type: 'collapse',
    //   icon: icons.ShoppingCartOutlined,
    //   children: [
    //     {
    //       id: 'products',
    //       title: 'products',
    //       type: 'item',
    //       url: '/apps/e-commerce/products'
    //     },
    //     {
    //       id: 'product-details',
    //       title: 'product-details',
    //       type: 'item',
    //       link: '/apps/e-commerce/product-details/:id',
    //       url: '/apps/e-commerce/product-details/1',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: 'product-list',
    //       title: 'product-list',
    //       type: 'item',
    //       url: '/apps/e-commerce/product-list'
    //     },
    //     {
    //       id: 'add-new-product',
    //       title: 'add-new-product',
    //       type: 'item',
    //       url: '/apps/e-commerce/add-new-product'
    //     },
    //     {
    //       id: 'checkout',
    //       title: 'checkout',
    //       type: 'item',
    //       url: '/apps/e-commerce/checkout'
    //     }
    //   ]
    // }
  ]
};

export default applications;
