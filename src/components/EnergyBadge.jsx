import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const EnergyBadge = ({ level, className = "" }) => {
    const configs = {
        low: { color: 'text-energy-low', bg: 'bg-energy-low/10', border: 'border-energy-low/20', icon: '🟢', label: 'Low Energy' },
        medium: { color: 'text-energy-medium', bg: 'bg-energy-medium/10', border: 'border-energy-medium/20', icon: '🟡', label: 'Medium Energy' },
        high: { color: 'text-energy-high', bg: 'bg-energy-high/10', border: 'border-energy-high/20', icon: '🔴', label: 'High Energy' },
    };

    const config = configs[level] || configs.medium;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-medium uppercase tracking-wider ${config.bg} ${config.color} ${config.border} ${className}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_8px_currentColor]" />
            {config.label}
        </motion.div>
    );
};

export default EnergyBadge;
