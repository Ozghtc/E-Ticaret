import { useState, useEffect } from 'react';
import { UseAdminStateReturn, ExpandedGroupsMap } from '../types/adminTypes';

export const useAdminState = (): UseAdminStateReturn => {
  const [useGroupedLayout, setUseGroupedLayout] = useState<boolean>(false);
  const [expandedGroups, setExpandedGroups] = useState<ExpandedGroupsMap>({});

  // Load saved layout mode from localStorage
  useEffect(() => {
    const savedLayoutMode = localStorage.getItem('useGroupedLayout');
    if (savedLayoutMode) {
      setUseGroupedLayout(savedLayoutMode === 'true');
    }
  }, []);

  // Toggle layout mode between grouped and card layout
  const toggleLayoutMode = () => {
    const newMode = !useGroupedLayout;
    setUseGroupedLayout(newMode);
    localStorage.setItem('useGroupedLayout', newMode.toString());
  };

  // Toggle group expansion/collapse
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return {
    useGroupedLayout,
    expandedGroups,
    toggleLayoutMode,
    toggleGroup
  };
};
