/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'project',
    title: 'Project',
    type: 'basic',
    icon: 'duotone:square-kanban',
    link: '/project',
  },
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id: 'project',
    title: 'Project',
    type: 'basic',
    icon: 'duotone:square-kanban',
    link: '/project',
  },
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id: 'project',
    title: 'Project',
    type: 'basic',
    icon: 'duotone:square-kanban',
    link: '/project',
  },
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'basic',
    icon: 'duotone:gauge',
    link: '/dashboards/project',
  },
  {
    id: 'project',
    title: 'Project',
    type: 'basic',
    icon: 'duotone:bars-progress',
    link: '/plan',
  },
  {
    id: 'Todo',
    title: 'Todo',
    type: 'group',
    icon: 'duotone:clipboard-list-check',
    children: [
      {
        id: 'tasks',
        title: 'Tasks',
        type: 'basic',
        icon: 'duotone:list-check',
        link: '/tasks',
      },
      {
        id: 'scrumboard',
        title: 'Scrumboard',
        type: 'basic',
        icon: 'duotone:square-kanban',
        link: 'scrumboard/plan',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'basic',
    icon: 'duotone:gear',
    link: '/settings',
  },
];
