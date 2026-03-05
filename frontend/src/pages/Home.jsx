import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const Home = () => {
    const features = [
        {
            icon: '🔧',
            title: 'Easy PC Building',
            description: 'Select components with our intuitive interface'
        },
        {
            icon: '✅',
            title: 'Auto Compatibility',
            description: 'Automatic compatibility checking for all parts'
        },
        {
            icon: '💰',
            title: 'Best Prices',
            description: 'Competitive pricing on all components'
        },
        {
            icon: '🎯',
            title: 'Smart Evaluation',
            description: 'AI-powered "Is It Worth It?" analysis'
        }
    ];

    return (
        <div className="min-h-screen bg-mesh">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Build Your
                        <span className="gradient-text"> Dream PC</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-slide-up">
                        Custom PC builder with automatic compatibility checking,
                        smart recommendations, and the best prices in India
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                        <Link to="/build" className="btn-primary">
                            Start Building Now
                        </Link>
                        <Link to="/auth" className="btn-secondary">
                            Create Account
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Why Choose <span className="gradient-text">Build My PC</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <GlassCard key={index} hover className="text-center">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Components Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-transparent to-dark-card/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Popular <span className="gradient-text">Components</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['CPU', 'GPU', 'RAM'].map((category) => (
                            <GlassCard key={category} hover>
                                <div className="h-40 bg-gradient-neon rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-white">{category}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{category} Components</h3>
                                <p className="text-gray-400 mb-4">
                                    Browse our selection of high-performance {category}s
                                </p>
                                <Link to="/build" className="text-purple-400 hover:text-purple-300 font-semibold">
                                    View All →
                                </Link>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <GlassCard className="neon-border">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Build Your PC?
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Start selecting components and get real-time compatibility checks
                        </p>
                        <Link to="/build" className="btn-primary inline-block">
                            Get Started
                        </Link>
                    </GlassCard>
                </div>
            </section>
        </div>
    );
};

export default Home;
