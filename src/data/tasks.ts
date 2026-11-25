export interface Task {
  id: number;
  title: string;
  notes: string;
  dueDate: string;
}

export const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Submit SIS 3 Mobile App',
    notes: 'Verify Expo Router navigation, swipe gestures, and GitHub Pages build.',
    dueDate: '2026-11-29',
  },
  {
    id: 2,
    title: 'Prepare Swift UIKit Defense',
    notes: 'Review UITableView delegate methods and Auto Layout constraints.',
    dueDate: '2026-11-27',
  },
  {
    id: 3,
    title: 'Finish SAP S/4HANA Lab',
    notes: 'Complete procurement process steps in Fiori launchpad.',
    dueDate: '2026-11-30',
  },
  {
    id: 4,
    title: 'Team Sync for Abai Project',
    notes: 'Finalize magazine layout and presentation slides.',
    dueDate: '2026-11-28',
  },
];