import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Zap } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const TaskInput = () => {
    const { addTask, tasks } = useTasks();
    const [title, setTitle] = useState('');
    const [energy, setEnergy] = useState('medium');
    const [estimatedTime, setEstimatedTime] = useState(30);

    const isEmpty = tasks.length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask({ title, energy, estimatedTime });
        setTitle('');
    };

    return (
        <div className={`glass-morphism p-6 rounded-3xl mb-8 relative overflow-hidden group transition-all duration-500 ${isEmpty ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={120} />
            </div>

            <form onSubmit={handleSubmit} className="relative z-10">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    Initialize Objective
                    <span className={`w-2 h-2 rounded-full bg-primary ${isEmpty ? 'animate-ping' : 'animate-pulse'}`} />
                </h2>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Define new objective..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-primary/50 focus:ring-4 ring-primary/5 transition-all mb-6 placeholder:text-zinc-600"
                />

                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <span
                            className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold cursor-help"
                            title="How much cognitive focus this mission requires"
                        >
                            Energy Cost
                        </span>
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                            {['low', 'medium', 'high'].map(level => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setEnergy(level)}
                                    className={`px-4 py-1.5 rounded-lg text-xs capitalize transition-all ${energy === level
                                        ? level === 'low' ? 'bg-energy-low text-black font-bold' :
                                            level === 'medium' ? 'bg-energy-medium text-black font-bold' :
                                                'bg-energy-high text-white font-bold'
                                        : 'hover:bg-white/5 text-zinc-500'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[140px]">
                        <span
                            className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1.5 cursor-help"
                            title="Estimated duration of the mission"
                        >
                            <Clock size={12} />
                            Mission Time
                        </span>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min="5"
                                max="240"
                                step="5"
                                value={estimatedTime}
                                onChange={(e) => setEstimatedTime(Number(e.target.value))}
                                className="flex-1 accent-primary"
                            />
                            <span className="text-sm font-semibold text-zinc-300 w-12 text-right">
                                {estimatedTime}m
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary flex items-center gap-2 py-3 px-8 self-end"
                    >
                        <Plus size={20} />
                        Launch
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskInput;
