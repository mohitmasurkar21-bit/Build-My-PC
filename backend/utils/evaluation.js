// "Is It Worth It?" evaluation logic

export const evaluateBuild = (components, totalPrice) => {
    const { cpu, gpu, ram, storage } = components;

    let score = 50; // Base score
    let message = '';
    let category = 'Fair';

    // Check if essential components exist
    if (!cpu || !gpu) {
        return {
            score: 0,
            message: 'Incomplete build - missing essential components',
            category: 'Poor'
        };
    }

    // CPU and GPU balance check
    const cpuPrice = cpu.price || 0;
    const gpuPrice = gpu.price || 0;

    if (cpuPrice > 0 && gpuPrice > 0) {
        const ratio = gpuPrice / cpuPrice;

        // For gaming builds, GPU should be 1.5-2.5x CPU price
        if (ratio >= 1.5 && ratio <= 2.5) {
            score += 20;
            message = 'Excellent CPU-GPU balance for gaming. ';
        } else if (ratio > 2.5) {
            score -= 10;
            message = 'GPU is significantly more expensive than CPU - potential CPU bottleneck. ';
        } else if (ratio < 1.5) {
            score -= 10;
            message = 'CPU is more expensive than GPU - may not be optimal for gaming. ';
        }
    }

    // Price to performance ratio
    if (totalPrice < 50000) {
        score += 10;
        message += 'Budget-friendly build. ';
    } else if (totalPrice > 150000) {
        score += 15;
        message += 'High-end premium build. ';
    } else {
        score += 12;
        message += 'Mid-range balanced build. ';
    }

    // RAM check
    if (ram?.specs?.capacity) {
        if (ram.specs.capacity >= 16) {
            score += 10;
            message += 'Good RAM capacity. ';
        } else if (ram.specs.capacity < 8) {
            score -= 5;
            message += 'RAM capacity may be limiting. ';
        }
    }

    // Storage check
    if (storage?.specs?.storageType === 'SSD' || storage?.specs?.storageType === 'NVMe') {
        score += 5;
        message += 'Fast storage selected. ';
    }

    // Determine category based on score
    if (score >= 80) {
        category = 'Excellent';
        message += '🎯 This is a well-balanced, high-performance build!';
    } else if (score >= 65) {
        category = 'Good';
        message += '✅ Solid build with good value for money.';
    } else if (score >= 50) {
        category = 'Fair';
        message += '⚠️ Decent build, but consider rebalancing components.';
    } else if (score >= 35) {
        category = 'Poor';
        message += '❌ Build needs significant improvements.';
    } else {
        category = 'Unbalanced';
        message += '🚫 Highly unbalanced - reconsider component selection.';
    }

    return {
        score: Math.min(100, Math.max(0, score)),
        message: message.trim(),
        category
    };
};
