// Type Data
import { 
  ClipboardCheckIcon, 
  UsersIcon,
  ChartPieIcon,
  ChartBarIcon,
  UserGroupIcon, 
  HomeIcon,
  DocumentIcon,
  SupportIcon,
  KeyIcon,
  LocationMarkerIcon,
  TagIcon,
  IdentificationIcon,
  OfficeBuildingIcon,
  PresentationChartBarIcon,
  BriefcaseIcon,
  CogIcon,
  BeakerIcon,
  CakeIcon,
  ClipboardListIcon,
  ClipboardCopyIcon,
  InboxIcon,
  NewspaperIcon,
  TicketIcon,
  CurrencyDollarIcon,
  ArchiveIcon,
  AtSymbolIcon,
  CollectionIcon,
  CloudDownloadIcon,
  CalendarIcon,
} from '@heroicons/react/outline'

export interface SubMenuItem {
  id: number;
  label: string;
  icon: keyof typeof Heroicons;
  link?: string,
}
  
export interface MenuItem {
  id: number;
  label: string;
  icon: keyof typeof Heroicons;
  subMenu?: SubMenuItem[];
}

export const Heroicons = {
  clipboard_check: ClipboardCheckIcon,
  users: UsersIcon,
  identification: IdentificationIcon,
  chart_pie: ChartPieIcon,
  chart_bar: ChartBarIcon,
  user_group: UserGroupIcon, 
  home: HomeIcon,
  document: DocumentIcon,
  support: SupportIcon,
  key: KeyIcon,
  location_marker: LocationMarkerIcon,
  tag: TagIcon,
  office_building: OfficeBuildingIcon,
  peresentation_chart_bar: PresentationChartBarIcon,
  briefcase: BriefcaseIcon,
  cog: CogIcon,
  beaker: BeakerIcon,
  cake: CakeIcon,
  cliplist: ClipboardListIcon,
  clipcopy: ClipboardCopyIcon,
  inbox: InboxIcon,
  newspaper: NewspaperIcon,
  ticket: TicketIcon,
  currency: CurrencyDollarIcon,
  archive: ArchiveIcon,
  symbol: AtSymbolIcon,
  collection: CollectionIcon,
  cloudown: CloudDownloadIcon,
  calendar: CalendarIcon,
};