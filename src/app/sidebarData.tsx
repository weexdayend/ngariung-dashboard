// Sidebar Data Types here

import { MenuItem } from "./types"

export const sidebarData: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'office_building',
    subMenu: [
      { id: 11, label: 'Main Dashboard', icon: 'home', link: 'dashboard' },
      { id: 12, label: 'Team Performance', icon: 'user_group', link: 'team-performance'  },
      { id: 13, label: 'Reports and Insights', icon: 'document', link: 'reports-insights' },
    ]
  },
  {
    id: 2,
    label: 'Analytics',
    icon: 'peresentation_chart_bar',
    subMenu: [
      { id: 21, label: 'Product Sales', icon: 'clipboard_check', link: 'analytics/product-sales' },
      { id: 22, label: 'Customer Segmentation', icon: 'users', link: 'analytics/customers-segmentation' },
      { id: 23, label: 'Sales Distribution', icon: 'chart_pie', link: 'analytics/sales-distribution' },
      { id: 24, label: 'Revenue Forecasting', icon: 'chart_bar', link: 'analytics/revenue-forecasting' },
    ]
  },
  {
    id: 3,
    label: 'Management',
    icon: 'briefcase',
    subMenu: [
      { id: 32, label: 'Order', icon: 'tag', link: 'management/order' },
      { id: 33, label: 'Customer', icon: 'identification', link: 'management/customer' },
      { id: 34, label: 'Outlet', icon: 'location_marker', link: 'management/outlet' },
      { id: 35, label: 'Employee', icon: 'users', link: 'management/employee' },
      { id: 36, label: 'Supplier', icon: 'office_building', link: 'management/supplier' },
      { id: 37, label: 'Transfer', icon: 'cloudown', link: 'management/transfer' },
      { id: 38, label: 'Purchasing Order', icon: 'collection', link: 'management/purchasing-order' },
    ]
  },
  {
    id: 4,
    label: 'Library',
    icon: 'briefcase',
    subMenu: [
      { id: 41, label: 'Items', icon: 'cliplist', link: 'fandb-pointofsales' },
      { id: 42, label: 'Modifiers', icon: 'clipcopy', link: 'fandb-pointofsales' },
      { id: 43, label: 'Categories', icon: 'inbox', link: 'fandb-pointofsales' },
      { id: 44, label: 'Build Package', icon: 'newspaper', link: 'fandb-pointofsales' },
      { id: 45, label: 'Promo', icon: 'ticket', link: 'fandb-pointofsales' },
      { id: 46, label: 'Discounts', icon: 'tag', link: 'fandb-pointofsales' },
      { id: 47, label: 'Taxes', icon: 'currency', link: 'fandb-pointofsales' },
      { id: 48, label: 'Services', icon: 'archive', link: 'fandb-pointofsales' },
      { id: 49, label: 'Sales Type', icon: 'symbol', link: 'fandb-pointofsales' },
    ]
  },
  {
    id: 5,
    label: 'Menu Engineering',
    icon: 'cog',
    subMenu: [
      { id: 51, label: 'Inventory', icon: 'clipboard_check', link: 'menu-engineering/inventory' },
      { id: 52, label: 'Adjusment', icon: 'support', link: 'menu-engineering/adjusment' },
      { id: 53, label: 'Ingredient Library', icon: 'support', link: 'menu-engineering/ingredient-library' },
      { id: 54, label: 'Ingredient Category', icon: 'support', link: 'menu-engineering/ingredient-category' },
      { id: 55, label: 'Item Library', icon: 'support', link: 'menu-engineering/item-library' },
      { id: 56, label: 'Recipes', icon: 'support', link: 'menu-engineering/recipes' },
    ]
  },
  {
    id: 7,
    label: 'Settings',
    icon: 'cog',
    subMenu: [
      { id: 71, label: 'User Settings', icon: 'key' },
      { id: 72, label: 'Business Settings', icon: 'office_building', link: 'settings/business' },
      { id: 73, label: 'Help and Support', icon: 'support' },
    ]
  },
]