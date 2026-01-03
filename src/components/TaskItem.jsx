import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, Clock, History, AlertCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { formatDuration, getAgingStage } from '../utils/timeHelpers';
import EnergyBadge from './EnergyBadge';

const TaskItem = ({ task }) => {
    const { completeTask, deleteTask } = useTasks();
    const [showRealityCheck, setShowRealityCheck] = useState(false);
    const [completionTime, setCompletionTime] = useState(task.estimatedTime);

    const stage = getAgingStage(task.createdAt);

    const agingStyles = {
        fresh: "opacity-100",
        stale: "opacity-80 grayscale-[0.2]",
        ancient: "opacity-60 grayscale-[0.5] border-red-500/20"
    };

    const handleComplete = () => {
        if (task.status === 'completed') return;
        setShowRealityCheck(true);
    };

    const submitCompletion = () => {
        completeTask(task.id, completionTime);
        setShowRealityCheck(false);
    };

    const isCompleted = task.status === 'completed';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`group relative glass-morphism p-4 rounded-2xl mb-3 transition-all duration-500 hover:border-white/20 ${isCompleted ? 'opacity-50' : agingStyles[stage]} ${showRealityCheck ? 'z-20' : 'z-0'}`}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <button
                        onClick={handleComplete}
                        disabled={isCompleted}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isCompleted
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-white/20 hover:border-emerald-500/50'
                            }`}
                    >
                        {isCompleted && <Check size={14} className="text-black" />}
                    </button>

                    <div className="flex-1">
                        <h3 className={`text-sm font-medium transition-all ${isCompleted ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                            {task.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                            <EnergyBadge level={task.energy} />
                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                                <Clock size={12} />
                                {formatDuration(task.estimatedTime)}
                            </div>
                            {stage === 'ancient' && !isCompleted && (
                                <div className="flex items-center gap-1 text-[10px] text-rose-500 animate-pulse">
                                    <AlertCircle size={12} />
                                    Aging
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-zinc-600 hover:text-rose-500 opacity-100 group-hover:opacity-100 transition-all rounded-lg hover:bg-rose-500/10"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {isCompleted && task.actualTime !== null && (
                <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Time Reality Check</span>
                        <span className="text-[10px] text-zinc-400 font-medium">
                            {task.actualTime <= task.estimatedTime ? 'Under Est.' : 'Over Est.'}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${Math.min(100, (task.estimatedTime / Math.max(task.actualTime, task.estimatedTime)) * 100)}%` }}
                            />
                            <div
                                className={`h-full ${task.actualTime > task.estimatedTime ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                style={{ width: `${Math.max(0, (Math.abs(task.actualTime - task.estimatedTime) / Math.max(task.actualTime, task.estimatedTime)) * 100)}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-zinc-400 min-w-[60px] text-right">
                            {formatDuration(task.actualTime)} actual
                        </span>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {showRealityCheck && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-background/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-4 z-10"
                    >
                        <History className="text-primary mb-2" size={24} />
                        <h4 className="text-sm font-semibold mb-1">Time Reality Check</h4>
                        <p className="text-xs text-zinc-400 mb-4 text-center">How long did this actually take?</p>

                        <div className="flex items-center gap-4 mb-6">
                            <input
                                type="number"
                                value={completionTime}
                                onChange={(e) => setCompletionTime(Number(e.target.value))}
                                className="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-sm focus:outline-none focus:border-primary"
                            />
                            <span className="text-xs text-zinc-500 underline decoration-zinc-800">minutes</span>
                        </div>

                        <div className="flex gap-2 w-full">
                            <button
                                onClick={() => setShowRealityCheck(false)}
                                className="flex-1 py-2 rounded-xl text-xs hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitCompletion}
                                className="flex-1 py-2 bg-primary rounded-xl text-xs font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TaskItem;
