import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { INITIAL_TASKS } from '../data/tasks';
import type { Task } from '../data/tasks';

interface TasksContextValue {
  tasks: Task[];
  addTask: (title: string, notes: string, dueDate: string) => void;
  deleteTask: (id: number) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = (title: string, notes: string, dueDate: string) => {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask: Task = {
      id: nextId,
      title: title.trim(),
      notes: notes.trim() || 'No additional notes.',
      dueDate: dueDate.trim() || 'No due date',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks(): TasksContextValue {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error('useTasks must be used inside TasksProvider');
  }
  return ctx;
}