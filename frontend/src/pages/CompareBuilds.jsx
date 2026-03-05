import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { calculatePerformance } from '../utils/performanceRating';
import toast from 'react-hot-toast';

const CompareBuilds = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [buildsToCompare, setBuildsToCompare] = useState([]);

    useEffect(() => {
        const selected = location.state?.builds || [];
        if (selected.length < 2) {
            toast.error('Select at least 2 builds to compare');
            navigate('/my-builds');
            return;
        }
        setBuildsToCompare(selected);
    }, [location]);

    const performanceData = buildsToCompare.map(b => calculatePerformance(b.components));

    return (
        <div className="min-h-screen bg-mesh py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter mb-2">Build <span className="text-purple-500">Comparison</span></h1>
                        <p className="text-gray-400">Comparing side-by-side performance and components.</p>
                    </div>
                    <button onClick={() => navigate('/my-builds')} className="btn-secondary">← Back to Builds</button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {buildsToCompare.map((build, index) => {
                        const perf = performanceData[index];
                        return (
                            <GlassCard key={build.id} className="relative overflow-hidden group border-white/5 hover:border-purple-500/30 transition-all duration-500">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                                <h3 className="text-2xl font-black mb-6 text-white truncate">{build.buildName}</h3>

                                {/* Performance Comparison */}
                                <div className="space-y-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Gaming Score</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl font-black text-blue-400">{perf.gaming}%</span>
                                            <div className="h-1.5 flex-1 bg-white/10 rounded-full">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${perf.gaming}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Editing Score</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-3xl font-black text-purple-400">{perf.editing}%</span>
                                            <div className="h-1.5 flex-1 bg-white/10 rounded-full">
                                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${perf.editing}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Component List */}
                                <div className="space-y-4 pt-6 border-t border-white/5">
                                    {Object.entries(build.components).map(([type, component]) => (
                                        <div key={type} className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-gray-500 uppercase">{type}</span>
                                            <p className="text-sm font-bold text-gray-200 truncate">{component?.name || 'N/A'}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Estimated Price</p>
                                    <p className="text-3xl font-black gradient-text">₹{build.totalPrice?.toLocaleString() || '0'}</p>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CompareBuilds;
