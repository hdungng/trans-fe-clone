// project imports
import applications from './applications';
import widget from './widget';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  // items: [widget, applications, formsTables, chartsMap, samplePage, pages, other]
  items: [widget, applications]
};

export default menuItems;
