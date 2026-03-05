import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const MyBuilds = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [builds, setBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedForCompare, setSelectedForCompare] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }
        fetchBuilds();
    }, [isAuthenticated]);

    const fetchBuilds = async () => {
        try {
            setLoading(true);
            const response = await buildsAPI.getUserBuilds(user.id);
            setBuilds(response.data.data);
        } catch (error) {
            console.error('Error fetching builds:', error);
            toast.error('Failed to load builds');
        } finally {
            setLoading(false);
        }
    };

    const toggleCompare = (build) => {
        setSelectedForCompare(prev => {
            const isSelected = prev.find(b => b.id === build.id);
            if (isSelected) return prev.filter(b => b.id !== build.id);
            if (prev.length >= 3) {
                toast.error('Max 3 builds for comparison');
                return prev;
            }
            return [...prev, build];
        });
    };

    const handleCompare = () => {
        if (selectedForCompare.length < 2) {
            toast.error('Select at least 2 builds');
            return;
        }
        navigate('/compare', { state: { builds: selectedForCompare } });
    };

    return (
        <div className="min-h-screen bg-mesh py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter mb-2">My <span className="text-purple-500">Arsenal</span></h1>
                        <p className="text-gray-400">Manage and compare your custom PC creations.</p>
                    </div>
                    {selectedForCompare.length >= 2 && (
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onClick={handleCompare}
                            className="btn-primary shadow-neon-lg px-10"
                        >
                            Compare {selectedForCompare.length} Builds
                        </motion.button>
                    )}
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="spinner border-t-purple-500" />
                    </div>
                ) : builds.length === 0 ? (
                    <div className="glass-card text-center py-20">
                        <p className="text-6xl mb-4">🛠️</p>
                        <h2 className="text-2xl font-bold mb-4">No builds yet</h2>
                        <button onClick={() => navigate('/build')} className="btn-primary">Start Your First Build</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {builds.map(build => (
                                <motion.div
                                    key={build.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative group"
                                >
                                    <GlassCard className={`h-full flex flex-col border-white/5 group-hover:border-purple-500/30 transition-all duration-500 ${selectedForCompare.find(b => b.id === build.id) ? 'ring-2 ring-purple-500 bg-purple-500/5' : ''}`}>
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-xl font-black text-white truncate pr-4">{build.buildName || 'Untitled Build'}</h3>
                                            <button
                                                onClick={() => toggleCompare(build)}
                                                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border transition-all ${selectedForCompare.find(b => b.id === build.id)
                                                        ? 'bg-purple-500 text-white border-purple-500'
                                                        : 'text-gray-500 border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                {selectedForCompare.find(b => b.id === build.id) ? 'Selected' : 'Compare'}
                                            </button>
                                        </div>

                                        <div className="space-y-2 mb-8 flex-1">
                                            {Object.entries(build.components || {}).slice(0, 4).map(([type, comp]) => (
                                                <div key={type} className="flex justify-between items-center text-xs">
                                                    <span className="text-gray-500 uppercase font-black">{type}</span>
                                                    <span className="text-gray-300 font-medium truncate ml-4">{comp?.name || 'N/A'}</span>
                                                </div>
                                            ))}
                                            {Object.keys(build.components || {}).length > 4 && (
                                                <p className="text-[10px] text-purple-400 font-bold italic">+{Object.keys(build.components).length - 4} more components</p>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase">Est. Value</p>
                                                <p className="text-xl font-black text-white">₹{build.totalPrice?.toLocaleString()}</p>
                                            </div>
                                            <button
                                                onClick={() => navigate('/build', { state: { build } })}
                                                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                                title="Re-open in builder"
                                            >
                                                🛠️
                                            </button>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBuilds;
