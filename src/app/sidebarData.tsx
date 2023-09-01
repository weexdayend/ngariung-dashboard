// Sidebar Data Types here

import { MenuItem } from "./types"

export const sidebarData: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'office_building',
    subMenu: [
      { id: 11, label: 'Main Dashboard', icon: 'home', link: 'dashboard' },
    ]
  },
  {
    id: 2,
    label: 'Scheduling System',
    icon: 'calendar',
    subMenu: [
      { id: 21, label: 'Schedule', icon: 'calendar', link: 'scheduling-system/schedule' },
      { id: 22, label: 'Event Type', icon: 'calendar', link: 'scheduling-system/event-type' },
      { id: 23, label: 'Event Category', icon: 'calendar', link: 'scheduling-system/event-category' },
      { id: 24, label: 'Schedule Management', icon: 'calendar', link: 'scheduling-system/schedule-management' },
      { id: 25, label: 'Schedule Report', icon: 'calendar', link: 'scheduling-system/schedule-report' },
      { id: 26, label: 'Order Management', icon: 'calendar', link: 'scheduling-system/order-management' },
    ]
  },
  {
    id: 3,
    label: 'Management',
    icon: 'briefcase',
    subMenu: [
      // { id: 33, label: 'Asset', icon: 'location_marker', link: 'management/asset' },
      { id: 34, label: 'Outlet', icon: 'location_marker', link: 'management/outlet' },
      { id: 35, label: 'Employee', icon: 'users', link: 'management/employee' },
      { id: 36, label: 'Supplier', icon: 'office_building', link: 'management/supplier' },
      { id: 37, label: 'Room', icon: 'home', link: 'management/room' },
      // { id: 38, label: 'Inventory', icon: 'home', link: 'management/inventory' },
    ]
  },
  {
    id: 4,
    label: 'Library',
    icon: 'briefcase',
    subMenu: [
      { id: 41, label: 'Items', icon: 'cliplist', link: 'library/items' },
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