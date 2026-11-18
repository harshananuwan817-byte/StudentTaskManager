import React, { createContext, useContext, useMemo, useState } from 'react';
import { initialTasks } from '../data/tasks';
import { sendTaskCompletedNotification } from '../utils/notifications';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = async (taskId) => {
    const currentTask = tasks.find((task) => task.id === taskId);
    if (!currentTask) return;

    const isNowCompleted = !currentTask.completed;
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    if (isNowCompleted) {
      try {
        await sendTaskCompletedNotification(currentTask.title);
      } catch (error) {
        console.warn('Unable to schedule notification:', error);
      }
    }
  };

  const value = useMemo(() => ({ tasks, toggleTask }), [tasks]);
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used inside TasksProvider');
  }
  return context;
}