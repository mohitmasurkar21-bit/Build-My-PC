import React from 'react';
import CompatibilityStatus from './CompatibilityStatus';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { calculatePerformance } from '../utils/performanceRating';
import toast from 'react-hot-toast';

const BuildSummary = ({
    selectedComponents,
    totalPrice,
    compatibility,
    evaluation,
    onAddToCart,
    onSaveBuild,
    onRemoveComponent
}) => {
    const componentCategories = [
        { key: 'cpu', label: 'CPU' },
        { key: 'motherboard', label: 'Motherboard' },
        { key: 'gpu', label: 'GPU' },
        { key: 'ram', label: 'RAM' },
        { key: 'storage', label: 'Storage' },
        { key: 'psu', label: 'PSU' },
        { key: 'cabinet', label: 'Cabinet' },
        { key: 'cooler', label: 'Cooler' },
        { key: 'accessories', label: 'Accessories' }
    ];

    const hasComponents = Object.values(selectedComponents).some(comp => comp !== null);
    const performance = calculatePerformance(selectedComponents);

    // Calculate Estimated Wattage
    const estimatedWattage = Object.values(selectedComponents).reduce((acc, comp) => {
        if (!comp) return acc;
        return acc + (comp.specs?.wattage || 0);
    }, 0);

    const exportToPDF = async () => {
        const element = document.getElementById('build-summary-card');
        if (!element) return;

        const loadToast = toast.loading('Generating PDF...');
        try {
            const canvas = await html2canvas(element, {
                backgroundColor: '#030303',
                scale: 2
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('my-pc-build.pdf');
            toast.success('Build exported as PDF!', { id: loadToast });
        } catch (error) {
            console.error('PDF Export Error:', error);
            toast.error('Failed to export PDF', { id: loadToast });
        }
    };

    return (
        <div className="space-y-6">
            <div id="build-summary-card" className="glass-card relative overflow-hidden group">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black gradient-text tracking-tight">
                        Summary
                    </h2>
                    {estimatedWattage > 0 && (
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Est. {estimatedWattage}W</span>
                        </div>
                    )}
                </div>

                {/* Total Price - MOVED TO TOP FOR VISIBILITY */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-6 group-hover:border-purple-500/30 transition-all shadow-neon-sm">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Investment</span>
                        <span className="text-3xl font-black gradient-text">
                            ₹{(totalPrice || 0).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Performance Ratings */}
                {hasComponents && (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Gaming</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-black text-blue-400">{performance.gaming}%</span>
                                <div className="h-1 flex-1 bg-white/10 rounded-full mb-1.5 overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${performance.gaming}%` }} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Editing</p>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-black text-purple-400">{performance.editing}%</span>
                                <div className="h-1 flex-1 bg-white/10 rounded-full mb-1.5 overflow-hidden">
                                    <div className="h-full bg-purple-500" style={{ width: `${performance.editing}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected Components */}
                <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {componentCategories.map(({ key, label }) => (
                        <div key={key} className="group/item flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
                                {selectedComponents[key] && (
                                    <button
                                        onClick={() => onRemoveComponent(selectedComponents[key])}
                                        className="text-[10px] text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity uppercase font-bold"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            {selectedComponents[key] ? (
                                <div className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5 group-hover/item:border-purple-500/30 transition-all">
                                    <span className="text-sm font-bold text-white truncate max-w-[180px]">
                                        {selectedComponents[key].name}
                                    </span>
                                    <span className="text-xs text-purple-400 font-bold">₹{selectedComponents[key].price.toLocaleString()}</span>
                                </div>
                            ) : (
                                <div className="px-3 py-2 rounded-lg border border-dashed border-white/10">
                                    <span className="text-xs text-gray-600 italic">Not selected</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                {hasComponents && (
                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={onAddToCart}
                            disabled={!compatibility?.isCompatible}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <span>🛒 Add Build to Cart</span>
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={onSaveBuild}
                                className="btn-secondary py-2 px-3 text-xs md:text-sm"
                            >
                                💾 Save Build
                            </button>
                            <button
                                onClick={exportToPDF}
                                className="btn-secondary py-2 px-3 text-xs md:text-sm flex items-center justify-center gap-1"
                            >
                                📄 Export PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Compatibility Status */}
            {hasComponents && (
                <CompatibilityStatus
                    compatibility={compatibility}
                    evaluation={evaluation}
                />
            )}
        </div>
    );
};

export default BuildSummary;
