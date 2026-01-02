import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { ListFilter, Sparkles, CheckCircle2 } from 'lucide-react';

const TaskList = () => {
    const { tasks } = useTasks();
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter(t => {
        if (filter === 'pending') return t.status === 'pending';
        if (filter === 'completed') return t.status === 'completed';
        return true;
    });

    const pendingCount = tasks.filter(t => t.status === 'pending').length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`text-xs font-bold transition-colors ${filter === 'all' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        All <span className="text-[10px] opacity-50 ml-1">{tasks.length}</span>
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`text-xs font-bold transition-colors ${filter === 'pending' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Active <span className="text-[10px] opacity-50 ml-1">{pendingCount}</span>
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`text-xs font-bold transition-colors ${filter === 'completed' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Completed <span className="text-[10px] opacity-50 ml-1">{tasks.length - pendingCount}</span>
                    </button>
                </div>

                <ListFilter size={16} className="text-zinc-600" />
            </div>

            <div className="min-h-[400px]">
                <AnimatePresence mode="popLayout" initial={false}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-24 text-center glass-morphism rounded-3xl border-dashed border-white/5"
                        >
                            {filter === 'completed' ? (
                                <>
                                    <Sparkles size={40} className="text-zinc-800 mb-4" />
                                    <p className="text-zinc-400 font-semibold mb-1">No completed missions</p>
                                    <p className="text-zinc-600 text-[10px] uppercase tracking-wider">Finish an objective to see it here</p>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={40} className="text-zinc-800 mb-4" />
                                    <p className="text-zinc-400 font-semibold mb-1">No active missions</p>
                                    <p className="text-zinc-600 text-[10px] uppercase tracking-wider mb-6">Initialize your first objective above</p>
                                    <div className="w-1 h-8 bg-gradient-to-b from-primary/50 to-transparent rounded-full animate-bounce" />
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TaskList;
