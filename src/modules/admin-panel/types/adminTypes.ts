import { LucideIcon } from 'lucide-react';

// Admin Card Interface
export interface AdminCard {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  iconColor: string;
}

// Card Position Interface
export interface CardPosition {
  x: number;
  y: number;
}

// Module Status Type
export type ModuleStatus = 'in-progress' | 'not-started' | 'completed';

// Layout Mode Type
export type LayoutMode = 'grid' | 'free';

// Module Status Map
export interface ModuleStatusMap {
  [key: string]: ModuleStatus;
}

// Card Positions Map
export interface CardPositionsMap {
  [key: string]: CardPosition;
}

// Dropdown State Map
export interface DropdownStateMap {
  [key: string]: boolean;
}

// Click Position Interface
export interface ClickPosition {
  x: number;
  y: number;
}

// Group Module Interface
export interface GroupModule {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  modules: string[];
}

// Grouped Modules Map
export interface GroupedModulesMap {
  [key: string]: GroupModule;
}

// Expanded Groups Map
export interface ExpandedGroupsMap {
  [key: string]: boolean;
}

// Layout Manager Hook Return Type
export interface UseLayoutManagerReturn {
  layoutMode: LayoutMode;
  currentLayout: number;
  cardPositions: CardPositionsMap;
  setCurrentLayout: (layout: number) => void;
  setCardPositions: (positions: CardPositionsMap) => void;
  saveCurrentLayout: () => void;
  loadLayout: (layoutNumber: number) => void;
  resetLayout: () => void;
  autoAlign: () => void;
  handleDragStop: (cardId: string, e: any, data: any) => void;
}

// Admin State Hook Return Type
export interface UseAdminStateReturn {
  useGroupedLayout: boolean;
  expandedGroups: ExpandedGroupsMap;
  toggleLayoutMode: () => void;
  toggleGroup: (groupId: string) => void;
}

// Status Manager Hook Return Type
export interface UseStatusManagerReturn {
  moduleStatuses: ModuleStatusMap;
  openDropdowns: DropdownStateMap;
  showStatusPanel: boolean;
  selectedModule: string;
  clickedPosition: ClickPosition | null;
  setShowStatusPanel: (show: boolean) => void;
  setSelectedModule: (module: string) => void;
  setClickedPosition: (position: ClickPosition | null) => void;
  toggleDropdown: (cardId: string) => void;
  updateModuleStatus: (cardId: string, status: ModuleStatus) => void;
  updateModuleStatusFromPanel: (status: ModuleStatus) => void;
  handleStatusIndicatorClick: (cardId: string, event: React.MouseEvent) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
  getStatusEmoji: (status: string) => string;
}
