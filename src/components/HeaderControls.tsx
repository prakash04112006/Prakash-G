import React from 'react';
import { PageId } from '../types';

interface HeaderControlsProps {
  currentPage?: PageId;
  onPageSelect?: (page: PageId) => void;
  unlockedSecret?: boolean;
}

export const HeaderControls: React.FC<HeaderControlsProps> = () => {
  return null;
};
