import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Circle,
  CircleCheck,
  CircleHelp,
  CircleX,
  Timer,
} from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: CircleHelp,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: Timer,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CircleCheck,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CircleX,
  },
];

export const priorities = [
  {
    label: 'High',
    value: 'high',
    icon: BatteryFull,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: BatteryMedium,
  },
  {
    label: 'Low',
    value: 'low',
    icon: BatteryLow,
  },
];
