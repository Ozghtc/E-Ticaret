import React from 'react';
import { Loader, XCircle, CheckCircle } from 'lucide-react';
import { ModuleStatus } from '../types/adminTypes';

// Status icon mapping
import { useTranslation } from "react-i18next";
export const getStatusIcon = (status: string): React.ReactNode => {
  switch (status) {
    case 'in-progress':
      return React.createElement(Loader, {
        className: "w-4 h-4 animate-spin text-blue-600"
      });
    case 'not-started':
      return React.createElement(XCircle, {
        className: "w-4 h-4 text-red-600"
      });
    case 'completed':
      return React.createElement(CheckCircle, {
        className: "w-4 h-4 text-green-600"
      });
    default:
      return null;
  }
};

// Status text mapping
export const getStatusText = (status: string): string => {
  switch (status) {
    case 'in-progress':
      return t("common.yapım_aşamasında");
    case 'not-started':
      return t("common.henüz_başlanmadı");
    case 'completed':
      return 'Hazır';
    default:
      return 'Durum Seçin';
  }
};

// Status emoji mapping
export const getStatusEmoji = (status: string): string => {
  switch (status) {
    case 'in-progress':
      return '⚙️';
    case 'not-started':
      return '❌';
    case 'completed':
      return '✅';
    case 'mixed':
      return '🔄';
    default:
      return '⭕';
  }
};

// Overall status calculation
export const getOverallStatus = (moduleStatuses: {
  [key: string]: ModuleStatus;
}): string => {
  const statuses = Object.values(moduleStatuses);
  if (statuses.length === 0) return 'none';
  const completed = statuses.filter(s => s === 'completed').length;
  const inProgress = statuses.filter(s => s === 'in-progress').length;
  const notStarted = statuses.filter(s => s === 'not-started').length;
  if (completed === statuses.length) return 'completed';
  if (inProgress > 0) return 'in-progress';
  if (notStarted === statuses.length) return 'not-started';
  return 'mixed';
};

// Status toast messages
export const getStatusToastMessage = (status: ModuleStatus): string => {
  const statusText = {
    'in-progress': t("common.yapım_aşamasında"),
    'not-started': t("common.henüz_başlanmadı"),
    'completed': 'Hazır'
  };
  return `${statusText[status]} olarak işaretlendi!`;
};