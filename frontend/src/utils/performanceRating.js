export const calculatePerformance = (components) => {
    const { cpu, gpu, ram } = components;

    let gamingScore = 0;
    let editingScore = 0;

    // Gaming Score Calculation
    if (gpu) {
        // GPU is king for gaming
        const vram = gpu.specs?.vram || 0;
        gamingScore += (vram / 24) * 60; // Up to 60 points for VRAM (assuming 24GB is max)

        // Brand/Tier weighting (simplified)
        if (gpu.name.toLowerCase().includes('rtx 4090')) gamingScore += 40;
        else if (gpu.name.toLowerCase().includes('4080')) gamingScore += 35;
        else if (gpu.name.toLowerCase().includes('4070')) gamingScore += 30;
        else if (gpu.name.toLowerCase().includes('4060')) gamingScore += 20;
        else if (gpu.name.toLowerCase().includes('3050')) gamingScore += 10;
        else gamingScore += 15;
    }

    if (cpu) {
        // CPU contributes to gaming too
        const cores = cpu.specs?.cores || 0;
        gamingScore += Math.min((cores / 16) * 10, 10); // Up to 10 points for cores
    }

    // Editing/Productivity Score Calculation
    if (cpu) {
        // Cores are king for editing
        const cores = cpu.specs?.cores || 0;
        const threads = cpu.specs?.threads || cores * 2;
        editingScore += (threads / 32) * 50; // Up to 50 points for multi-threading
    }

    if (ram) {
        // RAM capacity matters for editing
        const capacity = ram.specs?.capacity || 0;
        editingScore += (capacity / 128) * 30; // Up to 30 points for RAM
    }

    if (gpu) {
        // GPU acceleration for rendering
        editingScore += 20; // Basic acceleration
    }

    return {
        gaming: Math.min(Math.round(gamingScore), 100),
        editing: Math.min(Math.round(editingScore), 100)
    };
};
