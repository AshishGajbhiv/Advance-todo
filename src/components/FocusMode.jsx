import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Check, Zap } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const FocusMode = () => {
    const { tasks, focusMode, setFocusMode } = useTasks();

    const activeTask = useMemo(() => {
        return tasks.find(t => t.status === 'pending');
    }, [tasks]);

    return (
        <>
            <button
                onClick={() => setFocusMode(!focusMode)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 flex items-center gap-2 group ${focusMode ? 'bg-zinc-800 text-white' : 'bg-primary text-white'
                    }`}
            >
                {focusMode ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold pr-2">
                    {focusMode ? 'Exit Focus' : 'Enter Focus'}
                </span>
            </button>

            <AnimatePresence>
                {focusMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-3xl flex items-center justify-center p-6"
                    >
                        <div className="max-w-xl w-full">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-center mb-12"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-widest font-bold mb-4">
                                    <Zap size={12} className="animate-pulse" />
                                    Hyperfocus Active
                                </div>
                                <h2 className="text-4xl font-bold bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                                    Current Mission
                                </h2>
                            </motion.div>

                            {activeTask ? (
                                <div className="scale-110">
                                    <TaskItem task={activeTask} />
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="glass-morphism p-12 rounded-3xl text-center"
                                >
                                    <Check size={48} className="text-emerald-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Clear Slate</h3>
                                    <p className="text-zinc-500 text-sm">All pending objectives secured.</p>
                                    <button
                                        onClick={() => setFocusMode(false)}
                                        className="mt-6 text-primary text-sm font-medium hover:underline"
                                    >
                                        Return to Mission Control
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FocusMode;
