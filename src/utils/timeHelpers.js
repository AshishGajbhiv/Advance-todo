export const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const getAgingStage = (createdAt) => {
    const diff = Date.now() - createdAt;
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) return 'fresh';
    if (hours < 72) return 'stale';
    return 'ancient';
};

export const getHeatmapData = (tasks) => {
    const today = new Date();
    const data = {};

    // Last 30 days
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const key = d.toISOString().split('T')[0];
        data[key] = 0;
    }

    tasks.forEach(task => {
        if (task.status === 'completed' && task.completedAt) {
            const key = new Date(task.completedAt).toISOString().split('T')[0];
            if (data[key] !== undefined) {
                data[key]++;
            }
        }
    });

    return Object.entries(data).reverse();
};
