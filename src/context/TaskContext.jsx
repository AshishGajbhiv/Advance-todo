import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [focusMode, setFocusMode] = useState(false);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks(prev => [{
            id: crypto.randomUUID(),
            title: task.title,
            energy: task.energy || 'medium',
            status: 'pending',
            createdAt: Date.now(),
            completedAt: null,
            estimatedTime: task.estimatedTime || 0,
            actualTime: null,
        }, ...prev]);
    };

    const completeTask = (id, actualTime) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, status: 'completed', completedAt: Date.now(), actualTime } : t
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const updateTask = (id, updates) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            completeTask,
            deleteTask,
            updateTask,
            focusMode,
            setFocusMode
        }}>
            {children}
        </TaskContext.Provider>
    );
};
