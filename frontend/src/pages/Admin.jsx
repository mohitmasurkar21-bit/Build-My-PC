import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, productsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Admin = () => {
    const { user, isAdmin, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [builds, setBuilds] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'CPU',
        price: '',
        brand: '',
        stock: '',
        image: '',
        specs: {}
    });

    useEffect(() => {
        if (!isAuthenticated || !isAdmin) {
            navigate('/');
            return;
        }
        fetchDashboardData();
    }, [isAuthenticated, isAdmin, activeTab]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            if (activeTab === 'dashboard') {
                const res = await adminAPI.getStats();
                setStats(res.data.data);
            } else if (activeTab === 'products') {
                const res = await productsAPI.getAll();
                setProducts(res.data.data || res.data);
            } else if (activeTab === 'users') {
                const res = await adminAPI.getUsers();
                setUsers(res.data.data);
            } else if (activeTab === 'builds') {
                const res = await adminAPI.getBuilds();
                setBuilds(res.data.data);
            } else if (activeTab === 'orders') {
                const res = await adminAPI.getOrders();
                setOrders(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await adminAPI.updateProduct(editingProduct.id, formData);
                toast.success('Product updated successfully');
            } else {
                await adminAPI.createProduct(formData);
                toast.success('Product created successfully');
            }
            setShowForm(false);
            setEditingProduct(null);
            fetchDashboardData();
        } catch (error) {
            toast.error('Failed to save product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Delete this product?')) {
            try {
                await adminAPI.deleteProduct(id);
                toast.success('Product deleted');
                fetchDashboardData();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'builds', label: 'All Builds', icon: '🛠️' },
        { id: 'orders', label: 'Orders', icon: '🧾' },
    ];

    return (
        <div className="min-h-screen bg-mesh flex">
            {/* Sidebar */}
            <div className="w-64 bg-dark-bg/50 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col gap-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center text-xl shadow-neon-sm">
                        🛡️
                    </div>
                    <span className="font-bold text-xl tracking-tight">Admin <span className="text-purple-500">Panel</span></span>
                </div>

                <nav className="flex flex-col gap-2">
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                                    ? 'bg-gradient-neon text-white shadow-neon-sm'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto p-4 glass-card border-white/5">
                    <p className="text-xs text-gray-500 mb-1">Logged in as</p>
                    <p className="text-sm font-bold truncate">{user?.username}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-3 w-full text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                    >
                        🏠 Return to Site
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2 capitalize">
                            {activeTab} <span className="text-purple-500">Overview</span>
                        </h1>
                        <p className="text-gray-400">Manage your system components and user activity.</p>
                    </div>

                    {activeTab === 'products' && (
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setFormData({ name: '', category: 'CPU', price: '', brand: '', stock: '', image: '', specs: {} });
                                setShowForm(true);
                            }}
                            className="btn-primary flex items-center gap-2"
                        >
                            <span>+</span> Add New Product
                        </button>
                    )}
                </header>

                <main>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="spinner border-t-purple-500" />
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'dashboard' && stats && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <StatCard label="Total Users" value={stats.totalUsers} icon="👥" color="blue" />
                                        <StatCard label="Total Products" value={stats.totalProducts} icon="📦" color="purple" />
                                        <StatCard label="Total Builds" value={stats.totalBuilds} icon="🛠️" color="emerald" />
                                        <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon="💰" color="amber" />
                                    </div>
                                )}

                                {activeTab === 'products' && (
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                        {products.length === 0 ? (
                                            <div className="col-span-full py-20 text-center text-gray-500 glass-card">No products found</div>
                                        ) : products.map(product => (
                                            <AdminProductCard
                                                key={product.id}
                                                product={product}
                                                onEdit={(p) => {
                                                    setEditingProduct(p);
                                                    setFormData({ ...p });
                                                    setShowForm(true);
                                                }}
                                                onDelete={handleDeleteProduct}
                                            />
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'users' && (
                                    <div className="glass-card overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-white/5 border-b border-white/10">
                                                <tr>
                                                    <th className="px-6 py-4 font-bold text-gray-300">User</th>
                                                    <th className="px-6 py-4 font-bold text-gray-300">Email</th>
                                                    <th className="px-6 py-4 font-bold text-gray-300">Role</th>
                                                    <th className="px-6 py-4 font-bold text-gray-300">Joined</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map(u => (
                                                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4 font-medium">{u.username}</td>
                                                        <td className="px-6 py-4 text-gray-400">{u.email}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.isAdmin ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                                {u.isAdmin ? 'Admin' : 'User'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === 'orders' && (
                                    <div className="glass-card text-center py-20 text-gray-500">
                                        <p className="mb-2 text-2xl">📦</p>
                                        <p>Order management system is ready for data.</p>
                                        <p className="text-sm">Total Orders: {orders.length}</p>
                                    </div>
                                )}

                                {activeTab === 'builds' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {builds.map(build => (
                                            <GlassCard key={build.id} className="p-4 border-white/5">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-bold text-purple-400">{build.buildName || 'Untitled Build'}</h4>
                                                    <span className="text-[10px] text-gray-500">ID: {build.id.slice(-6)}</span>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-2">Creator: <span className="text-white">{build.userId?.username}</span></p>
                                                <div className="flex flex-wrap gap-1">
                                                    {Object.keys(build.components || {}).map(c => (
                                                        <span key={c} className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 uppercase">{c}</span>
                                                    ))}
                                                </div>
                                            </GlassCard>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </main>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-3xl w-full glass-card border-neon-blue/20 shadow-neon-lg overflow-y-auto max-h-[90vh]"
                    >
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-dark-bg/80 backdrop-blur p-4 border-b border-white/10 z-10">
                            <h2 className="text-2xl font-black gradient-text">
                                {editingProduct ? 'Edit Product' : 'Add New Component'}
                            </h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white transition-colors p-2 text-2xl">&times;</button>
                        </div>

                        <form onSubmit={handleProductSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Product Name" value={formData.name} onChange={v => setFormData({ ...formData, name: v })} required />
                            <SelectField
                                label="Category"
                                value={formData.category}
                                options={['CPU', 'Motherboard', 'GPU', 'RAM', 'Storage', 'PSU', 'Cabinet', 'Cooler', 'Accessories']}
                                onChange={v => setFormData({ ...formData, category: v })}
                            />
                            <InputField label="Price (₹)" type="number" value={formData.price} onChange={v => setFormData({ ...formData, price: v })} required />
                            <InputField label="Brand" value={formData.brand} onChange={v => setFormData({ ...formData, brand: v })} required />
                            <InputField label="Stock" type="number" value={formData.stock} onChange={v => setFormData({ ...formData, stock: v })} required />
                            <InputField label="Image URL" value={formData.image} onChange={v => setFormData({ ...formData, image: v })} />

                            <div className="md:col-span-2 pt-6 border-t border-white/5">
                                <button type="submit" className="btn-primary w-full py-4 text-lg font-bold shadow-neon-sm">
                                    {editingProduct ? 'Update Product Component' : 'Add to Catalog'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ label, value, icon, color }) => {
    const colorClasses = {
        blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400',
        purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400',
        emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
        amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400',
    };

    return (
        <GlassCard className={`p-6 border bg-gradient-to-br ${colorClasses[color]}`}>
            <div className="flex justify-between items-start mb-4">
                <span className="text-3xl">{icon}</span>
                <span className="text-2xl font-black text-white">{value}</span>
            </div>
            <p className="text-sm font-bold uppercase tracking-wider opacity-60">{label}</p>
        </GlassCard>
    );
};

const AdminProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="glass-card flex gap-4 p-3 items-center border-white/5 hover:border-white/20 transition-all group">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5">
                <img
                    src={product.image?.startsWith('/') ? `http://localhost:5000${product.image}` : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={e => e.target.src = 'https://via.placeholder.com/100'}
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-purple-400 font-bold uppercase mb-0.5">{product.category}</p>
                <h4 className="font-bold truncate text-white mb-1">{product.name}</h4>
                <div className="flex justify-between items-end">
                    <p className="font-black text-lg gradient-text">₹{product.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                        <button onClick={() => onEdit(product)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs transition-colors">Edit</button>
                        <button onClick={() => onDelete(product.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-colors">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, value, onChange, type = 'text', required = false }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400 font-medium px-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="input-field"
            required={required}
        />
    </div>
);

const SelectField = ({ label, value, onChange, options }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400 font-medium px-1">{label}</label>
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="input-field"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

export default Admin;
