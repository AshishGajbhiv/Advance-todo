import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { getHeatmapData } from '../utils/timeHelpers';

const Heatmap = () => {
    const { tasks } = useTasks();
    const heatmapData = useMemo(() => getHeatmapData(tasks), [tasks]);

    const getColor = (count) => {
        if (count === 0) return 'bg-white/5 hover:bg-white/10';
        if (count === 1) return 'bg-primary/30 hover:bg-primary/40';
        if (count === 2) return 'bg-primary/50 hover:bg-primary/60';
        if (count >= 3) return 'bg-primary hover:bg-primary/90';
    };

    return (
        <div className="glass-morphism p-6 rounded-3xl mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-zinc-400" title="Visual history of your completed objectives over time">Activity History</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-white/5" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/30" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-primary/60" />
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-primary" />
                    <span>More</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {heatmapData.map(([day, count]) => (
                    <div
                        key={day}
                        title={`${day}: ${count} tasks completed`}
                        className={`w-[11px] h-[11px] rounded-[2px] transition-all duration-300 ${getColor(count)}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Heatmap;
