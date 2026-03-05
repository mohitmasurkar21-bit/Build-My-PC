import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/build');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Attempting authentication...');
            let response;
            if (isLogin) {
                // Email field now accepts username or email
                response = await authAPI.login({
                    email: formData.email,
                    password: formData.password
                });
            } else {
                response = await authAPI.register(formData);
            }

            if (response.data && response.data.token) {
                login(response.data.user, response.data.token);
                navigate('/build');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Auth error:', err);
            const errorMessage = err.response?.data?.error || err.message || 'An error occurred during authentication';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-mesh flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="gradient-text">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        {isLogin ? 'Login to continue building' : 'Join us to start building your PC'}
                    </p>
                </div>

                <GlassCard className="neon-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Enter username"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {isLogin ? 'Username or Email' : 'Email'}
                            </label>
                            <input
                                type={isLogin ? 'text' : 'email'}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder={isLogin ? "Enter username or email" : "Enter email"}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="spinner w-5 h-5 border-2" />
                                </div>
                            ) : (
                                isLogin ? 'Login' : 'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setFormData({ username: '', email: '', password: '' });
                            }}
                            className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                        </button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Auth;
