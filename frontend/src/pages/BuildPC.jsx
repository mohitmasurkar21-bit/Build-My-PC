import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI, buildsAPI, cartAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import BuildSummary from '../components/BuildSummary';
import { personas } from '../utils/personaLogic';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Scene from '../3d/Scene';

const BuildPC = () => {
    const { user, isAuthenticated } = useAuth();
    const { fetchCart, addToCart } = useCart();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('CPU');
    const [budget, setBudget] = useState(100000);
    const [activePersona, setActivePersona] = useState(personas.NONE);

    // 3D Specific States
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or '3d'
    const [exploded, setExploded] = useState(false);
    const [rgbEnabled, setRgbEnabled] = useState(false);

    const [selectedComponents, setSelectedComponents] = useState({
        cpu: null,
        motherboard: null,
        gpu: null,
        ram: null,
        storage: null,
        psu: null,
        cabinet: null,
        cooler: null
    });

    const [compatibility, setCompatibility] = useState(null);
    const [evaluation, setEvaluation] = useState(null);

    // Calculate total price locally for instant feedback
    const totalPrice = useMemo(() => {
        return Object.values(selectedComponents).reduce((sum, item) => {
            return sum + (item?.price || 0);
        }, 0);
    }, [selectedComponents]);

    const categories = [
        { id: 'CPU', icon: '💻' },
        { id: 'Motherboard', icon: '🔌' },
        { id: 'GPU', icon: '🎮' },
        { id: 'RAM', icon: '⚡' },
        { id: 'Storage', icon: '💾' },
        { id: 'PSU', icon: '🔋' },
        { id: 'Cabinet', icon: '🖥️' },
        { id: 'Cooler', icon: '❄️' },
        { id: 'Accessories', icon: '⌨️' }
    ];

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, activePersona]);

    useEffect(() => {
        checkCompatibility();
    }, [selectedComponents]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.getAll({
                category: selectedCategory,
                section: activePersona
            });
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkCompatibility = async () => {
        const components = {};
        Object.entries(selectedComponents).forEach(([key, value]) => {
            if (value) components[key] = value.id;
        });

        if (Object.keys(components).length === 0) {
            setCompatibility(null);
            setEvaluation(null);
            return;
        }

        try {
            const response = await buildsAPI.checkCompatibility({ components });
            setCompatibility(response.data.data.compatibility);
            setEvaluation(response.data.data.evaluation);
            // Note: totalPrice is now handled locally via useMemo
        } catch (error) {
            console.error('Error checking compatibility:', error);
        }
    };

    const getProductCompatibility = (product) => {
        const { cpu, motherboard, ram } = selectedComponents;
        if (product.category === 'Motherboard' && cpu) {
            if (product.specs?.socket !== cpu.specs?.socket) return { compatible: false, reason: `Requires ${cpu.specs?.socket} socket` };
        }
        if (product.category === 'CPU' && motherboard) {
            if (product.specs?.socket !== motherboard.specs?.socket) return { compatible: false, reason: `Requires ${motherboard.specs?.socket} socket` };
        }
        if (product.category === 'RAM' && motherboard) {
            if (product.specs?.ramType !== motherboard.specs?.ramType) return { compatible: false, reason: `Requires ${motherboard.specs?.ramType} RAM` };
        }
        return { compatible: true };
    };

    const handleAddComponent = (product) => {
        const categoryKey = product.category.toLowerCase();
        setSelectedComponents(prev => ({ ...prev, [categoryKey]: product }));
        toast.success(`Success! ${product.name} selected.`);
    };

    const handleRemoveComponent = (product) => {
        const categoryKey = product.category.toLowerCase();
        setSelectedComponents(prev => ({ ...prev, [categoryKey]: null }));
        toast.error(`${product.name} removed.`);
    };

    const handleSaveBuild = async () => {
        if (!isAuthenticated) return navigate('/auth');

        const componentIds = {};
        let count = 0;
        Object.entries(selectedComponents).forEach(([key, val]) => {
            if (val) {
                componentIds[key] = val.id;
                count++;
            }
        });

        if (count === 0) return toast.error('Add some components first!');

        const bName = window.prompt("Enter a name for your build:", "My Custom PC");
        if (!bName) return;

        try {
            await buildsAPI.save({
                buildName: bName,
                components: componentIds,
                totalPrice,
                compatibilityStatus: compatibility
            });
            toast.success('Build saved successfully!');
            navigate('/my-builds');
        } catch (error) {
            toast.error('Failed to save build');
        }
    };

    const handleSmartAutoBuild = async () => {
        if (budget < 30000) return toast.error("Budget too low for a full build!");

        const loadToast = toast.loading("Assembling your dream PC...");
        try {
            const response = await productsAPI.getAll();
            const allProducts = response.data.data;

            const categoriesToFill = ['CPU', 'Motherboard', 'GPU', 'RAM', 'Storage', 'PSU', 'Cabinet'];
            const newBuild = { ...selectedComponents };

            const cpus = allProducts.filter(p => p.category === 'CPU').sort((a, b) => b.price - a.price);
            const targetCpuPrice = budget * 0.25;
            const chosenCpu = cpus.find(p => p.price <= targetCpuPrice) || cpus[cpus.length - 1];
            newBuild.cpu = chosenCpu;

            const mobos = allProducts.filter(p => p.category === 'Motherboard' && p.specs.socket === chosenCpu.specs.socket);
            if (mobos.length) newBuild.motherboard = mobos.sort((a, b) => a.price - b.price)[0];

            const gpus = allProducts.filter(p => p.category === 'GPU').sort((a, b) => b.price - a.price);
            const targetGpuPrice = budget * 0.40;
            newBuild.gpu = gpus.find(p => p.price <= targetGpuPrice) || gpus[gpus.length - 1];

            ['RAM', 'Storage', 'PSU', 'Cabinet'].forEach(cat => {
                const options = allProducts.filter(p => p.category === cat).sort((a, b) => a.price - b.price);
                if (options.length) newBuild[cat.toLowerCase()] = options[0];
            });

            setSelectedComponents(newBuild);
            toast.success("Optimized build suggested!", { id: loadToast });
        } catch (error) {
            toast.error("Failed to generate auto-build", { id: loadToast });
        }
    };

    const budgetUsage = (totalPrice / budget) * 100;

    return (
        <div className="min-h-screen bg-mesh flex flex-col md:flex-row">
            {/* Sidebar Configurator */}
            <aside className="w-full md:w-80 lg:w-96 bg-dark-bg/40 backdrop-blur-2xl border-r border-white/5 p-6 flex flex-col gap-6 sticky top-0 md:h-screen overflow-y-auto z-40">
                <div className="mb-4">
                    <h2 className="text-2xl font-black gradient-text mb-1 uppercase">Construct</h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">The Ultimate Rig</p>
                </div>

                {/* Budget Management */}
                <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-gray-400 uppercase">Set Budget</label>
                        <span className="text-sm font-bold text-white">₹{budget.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min="30000"
                        max="500000"
                        step="5000"
                        value={budget}
                        onChange={(e) => setBudget(parseInt(e.target.value))}
                        className="w-full accent-purple-500 cursor-pointer"
                    />

                    <div className="space-y-2">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(budgetUsage, 100)}%` }}
                                className={`h-full transition-colors duration-500 ${budgetUsage > 100 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                    }`}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold">
                            <span className={budgetUsage > 100 ? 'text-red-400' : 'text-gray-500'}>
                                {budgetUsage.toFixed(1)}% Usage
                            </span>
                            {budgetUsage > 100 && <span className="text-red-500 animate-pulse">OVER BUDGET!</span>}
                        </div>
                    </div>

                    <button
                        onClick={handleSmartAutoBuild}
                        className="w-full py-2 bg-gradient-neon text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-neon-sm hover:translate-y-[-2px] transition-all"
                    >
                        ⚡ Smart Auto-Build
                    </button>
                </div>

                {/* Navigation Categories */}
                <div className="flex flex-col gap-2">
                    {categories.map(cat => {
                        const isSelectedCategory = selectedCategory === cat.id;
                        const hasPart = selectedComponents[cat.id.toLowerCase()];
                        return (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setSelectedCategory(cat.id);
                                    // Removed: if (viewMode === '3d') setViewMode('grid'); 
                                    // Keep 3D view active for live updates
                                }}
                                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${isSelectedCategory
                                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 shadow-neon-sm translate-x-1'
                                    : 'bg-white/5 border-transparent hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{cat.icon}</span>
                                    <div className="text-left">
                                        <p className={`text-sm font-bold ${isSelectedCategory ? 'text-white' : 'text-gray-400'}`}>{cat.id}</p>
                                        {hasPart && <p className="text-[10px] text-purple-400 font-medium truncate w-32">{hasPart.name}</p>}
                                    </div>
                                </div>
                                {hasPart && <span className="text-emerald-500 text-xs">✓</span>}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <BuildSummary
                        selectedComponents={selectedComponents}
                        totalPrice={totalPrice}
                        compatibility={compatibility}
                        evaluation={evaluation}
                        onSaveBuild={handleSaveBuild}
                        onRemoveComponent={handleRemoveComponent}
                        onAddToCart={async () => {
                            if (!isAuthenticated) return navigate('/auth');
                            const ids = Object.values(selectedComponents).filter(c => c).map(c => c.id);
                            if (!ids.length) return toast.error('Empty build!');
                            const loadToast = toast.loading("Adding components to cart...");
                            try {
                                await addToCart({ productIds: ids });
                                toast.success('Sent to cart!', { id: loadToast });
                                navigate('/cart');
                            } catch (e) {
                                toast.error('Error adding to cart', { id: loadToast });
                            }
                        }}
                    />
                </div>
            </aside>

            {/* Main Selection Area */}
            <main className="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto flex flex-col">
                <div className="max-w-6xl mx-auto w-full">
                    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-widest text-gray-500 font-bold border border-white/10">Step {categories.findIndex(c => c.id === selectedCategory) + 1} / 9</span>
                                {viewMode === '3d' && <span className="px-3 py-1 bg-purple-500/10 rounded-full text-[10px] uppercase tracking-widest text-purple-400 font-bold border border-purple-500/20 shadow-neon-sm">Live 3D View</span>}
                            </div>
                            <h1 className="text-5xl font-black tracking-tighter">
                                {viewMode === '3d' ? '3D Visualizer' : <>Choose Your <span className="text-purple-500">{selectedCategory}</span></>}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* View Switcher */}
                            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Catalog
                                </button>
                                <button
                                    onClick={() => setViewMode('3d')}
                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === '3d' ? 'bg-gradient-neon text-white shadow-neon-sm' : 'text-gray-500 hover:text-white'}`}
                                >
                                    3D View
                                </button>
                            </div>

                            <div className="flex gap-2">
                                {Object.values(personas).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setActivePersona(p)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activePersona === p
                                            ? 'bg-white text-black'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
                                            }`}
                                    >
                                        {p === personas.NONE ? 'ALL' : p.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </header>

                    <div className="flex-1">
                        {viewMode === '3d' ? (
                            <div className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                                <Scene
                                    selectedComponents={selectedComponents}
                                    compatibility={compatibility}
                                    exploded={exploded}
                                    rgbEnabled={rgbEnabled}
                                />

                                {/* 3D View Controls */}
                                <div className="absolute top-6 right-6 flex flex-col gap-3">
                                    <button
                                        onClick={() => setExploded(!exploded)}
                                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-neon-sm transition-all border ${exploded ? 'bg-purple-500 text-white border-purple-400' : 'bg-black/40 backdrop-blur-xl text-gray-400 border-white/10 hover:border-white/20'}`}
                                    >
                                        {exploded ? 'Collapse View' : 'Exploded View'}
                                    </button>
                                    <button
                                        onClick={() => setRgbEnabled(!rgbEnabled)}
                                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-neon-sm transition-all border ${rgbEnabled ? 'bg-blue-600 text-white border-blue-400' : 'bg-black/40 backdrop-blur-xl text-gray-400 border-white/10 hover:border-white/20'}`}
                                    >
                                        {rgbEnabled ? 'RGB ACTIVE' : 'Toggle RGB'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="h-64 glass-card animate-pulse" />)}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 pb-20">
                                        {products.map(product => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                onAdd={handleAddComponent}
                                                onRemove={handleRemoveComponent}
                                                isSelected={selectedComponents[product.category.toLowerCase()]?.id === product.id}
                                                activePersona={activePersona}
                                                compatibility={getProductCompatibility(product)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BuildPC;
