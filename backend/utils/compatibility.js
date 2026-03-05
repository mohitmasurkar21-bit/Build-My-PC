// Compatibility checking logic for PC builds

export const checkCompatibility = (components) => {
    const issues = [];
    let isCompatible = true;

    // Extract components
    const { cpu, motherboard, gpu, ram, psu, cabinet, cooler } = components;

    // 1. CPU & Motherboard Socket Compatibility
    if (cpu && motherboard) {
        const cpuSocket = cpu.specs?.socket;
        const moboSocket = motherboard.specs?.socket;

        if (cpuSocket !== moboSocket) {
            issues.push(`Incompatible Socket: CPU (${cpuSocket}) vs Motherboard (${moboSocket}).`);
            isCompatible = false;
        }
    }

    // 2. RAM Type Compatibility (DDR4 vs DDR5)
    if (ram && motherboard) {
        const ramType = ram.specs?.ramType?.toUpperCase();
        const moboRamType = motherboard.specs?.ramType?.toUpperCase();

        if (ramType && moboRamType && ramType !== moboRamType) {
            issues.push(`Incompatible RAM: RAM (${ramType}) does not match Motherboard support (${moboRamType}).`);
            isCompatible = false;
        }
    }

    // 3. CPU Cooler Compatibility
    if (cpu && cooler) {
        const socket = cpu.specs?.socket;
        const supportedSockets = cooler.specs?.compatibility || [];

        if (socket && supportedSockets.length > 0 && !supportedSockets.includes(socket)) {
            issues.push(`Incompatible Cooler: This cooler does not support the ${socket} socket.`);
            isCompatible = false;
        }
    }

    // 4. PSU Wattage Check
    if (psu && (cpu || gpu)) {
        let totalPowerNeeded = 0;

        // Estimated TDPs if not provided
        if (cpu?.specs?.tdp) totalPowerNeeded += cpu.specs.tdp;
        else if (cpu) totalPowerNeeded += 100; // Placeholder average

        if (gpu?.specs?.tdp) totalPowerNeeded += gpu.specs.tdp;
        else if (gpu) totalPowerNeeded += 200; // Placeholder average

        // System overhead (Mobo, RAM, Fans, etc)
        totalPowerNeeded += 150;

        // PSU should have 20% headroom for safety/efficiency
        const minimumWattage = totalPowerNeeded * 1.25;

        if (psu.specs?.wattage < minimumWattage) {
            issues.push(`Insufficient PSU: ${psu.specs?.wattage}W. Need at least ${Math.ceil(minimumWattage)}W for this build.`);
            isCompatible = false;
        }
    }

    // 5. GPU Dimension Check (Length vs Cabinet)
    if (gpu && cabinet) {
        const gpuLength = gpu.specs?.gpuLength;
        const maxLimit = cabinet.specs?.maxGpuLength;

        if (gpuLength && maxLimit && gpuLength > maxLimit) {
            issues.push(`Physical Conflict: GPU (${gpuLength}mm) is too long for this Cabinet (${maxLimit}mm).`);
            isCompatible = false;
        }
    }

    // 6. Motherboard Form Factor vs Cabinet
    if (motherboard && cabinet) {
        const formFactor = motherboard.specs?.formFactor;
        const supported = cabinet.specs?.supportedFormFactors || [];

        if (formFactor && supported.length > 0 && !supported.includes(formFactor)) {
            issues.push(`Physical Conflict: Cabinet does not support ${formFactor} motherboards.`);
            isCompatible = false;
        }
    }

    return {
        isCompatible,
        issues
    };
};
