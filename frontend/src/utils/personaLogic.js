export const personas = {
    GAMING: 'Gaming',
    CODING: 'Coding',
    VIDEO_EDITING: 'Video Editing',
    NONE: 'General'
};

export const personaConfig = {
    [personas.GAMING]: {
        title: 'Gaming',
        icon: '🎮',
        description: 'Focused on high frame rates and graphics performance.',
        criteria: {
            CPU: (specs) => specs.cores >= 6,
            GPU: (specs) => specs.vram >= 8,
            RAM: (specs) => specs.capacity >= 16,
            Storage: (specs) => specs.storageType === 'NVMe'
        }
    },
    [personas.CODING]: {
        title: 'Coding & Development',
        icon: '💻',
        description: 'Optimized for compilation speeds and multitasking.',
        criteria: {
            CPU: (specs) => specs.cores >= 8,
            RAM: (specs) => specs.capacity >= 16,
            Storage: (specs) => specs.storageType === 'NVMe'
        }
    },
    [personas.VIDEO_EDITING]: {
        title: 'Video Editing',
        icon: '🎬',
        description: 'Designed for rendering speeds and high-resolution workflows.',
        criteria: {
            CPU: (specs) => specs.cores >= 8,
            RAM: (specs) => specs.capacity >= 32,
            Storage: (specs) => specs.storageCapacity >= 1000,
            GPU: (specs) => specs.vram >= 8
        }
    }
};

export const isProductRecommended = (product, activePersona) => {
    if (!activePersona || activePersona === personas.NONE) return false;

    const config = personaConfig[activePersona];
    if (!config || !config.criteria[product.category]) return false;

    try {
        return config.criteria[product.category](product.specs || {});
    } catch (error) {
        console.error('Error checking product recommendation:', error);
        return false;
    }
};
