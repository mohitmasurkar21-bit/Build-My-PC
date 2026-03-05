import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Stars, Center } from '@react-three/drei';

import Motherboard from './Motherboard';
import CPU from './CPU';
import GPU from './GPU';
import RAM from './RAM';
import PSU from './PSU';
import Storage from './Storage';
import Cooler from './Cooler';
import Cabinet from './Cabinet';

const Scene = ({ selectedComponents, compatibility, exploded, rgbEnabled }) => {
    const canvasRef = useRef();
    const containerRef = useRef();
    const controlsRef = useRef();

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'

    // Theme configurations
    const bgColor = theme === 'light' ? '#f5f7fa' : '#0f172a';
    const ambientIntensity = theme === 'light' ? 0.7 : 0.5;
    const directionalIntensity = theme === 'light' ? 1.3 : 1.0;

    const exportScreenshot = () => {
        const link = document.createElement('a');
        link.setAttribute('download', 'MyPCBuild.png');
        link.setAttribute('href', canvasRef.current.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
        link.click();
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Listen for fullscreen changes to update state
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const resetCamera = () => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    return (
        <div ref={containerRef} className={`relative w-full ${isFullscreen ? 'h-screen fixed inset-0 z-50 rounded-none' : 'h-full rounded-3xl'} bg-[#050505] overflow-hidden border border-white/5 shadow-2xl group transition-all duration-300`}>
            {/* 3D Canvas */}
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [8, 5, 10], fov: 45 }}
                gl={{ preserveDrawingBuffer: true, antialias: true, powerPreference: "high-performance" }}
                ref={canvasRef}
            >
                {/* Visual Environment */}
                <color attach="background" args={[bgColor]} />
                <fog attach="fog" args={[bgColor, 10, 40]} />

                <Suspense fallback={null}>
                    {/* Environment lighting is lightweight and provides reflections */}
                    <Environment preset="city" intensity={0.4} />

                    {/* Basic Optimized Lighting */}
                    <ambientLight intensity={ambientIntensity} />
                    <directionalLight position={[5, 10, 5]} intensity={directionalIntensity} castShadow shadow-mapSize={[512, 512]} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c1d95" />

                    {rgbEnabled && (
                        <>
                            <pointLight position={[0, 2, 0]} intensity={2} color="#a855f7" distance={10} />
                            <pointLight position={[2, -1, 2]} intensity={1.5} color="#3b82f6" distance={10} />
                            <pointLight position={[-2, -1, 2]} intensity={1.5} color="#ec4899" distance={10} />
                        </>
                    )}

                    {/* Background Visuals */}
                    {/* Stars removed for clean light appearance */}

                    {/* Floating Animation Wrapper for the whole build */}
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
                        <Center position={[0, 0, 0]}>
                            <group position={[0, 0, 0]}>
                                <Cabinet product={selectedComponents?.cabinet} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                                <Motherboard product={selectedComponents?.motherboard} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                                <CPU product={selectedComponents?.cpu} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                                <Cooler product={selectedComponents?.cooler} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                                <RAM product={selectedComponents?.ram} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                                <GPU product={selectedComponents?.gpu} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                                <Storage product={selectedComponents?.storage} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                                <PSU product={selectedComponents?.psu} exploded={exploded} compatibility={compatibility} rgbEnabled={rgbEnabled} />
                            </group>
                        </Center>
                    </Float>

                    {/* Fake shadow for performance instead of computing complex meshes on floor */}
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.6}
                        scale={15}
                        blur={2}
                        far={5}
                        color="#000000"
                        resolution={256}
                    />
                </Suspense>

                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    autoRotate={!exploded}
                    autoRotateSpeed={0.5}
                    enableDamping
                    minDistance={5}
                    maxDistance={25}
                />
            </Canvas>

            {/* Incompatible Overlay Alert */}
            <div className="absolute top-6 left-6 pointer-events-none z-10">
                {compatibility?.isCompatible === false && (
                    <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/50 p-4 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500 pointer-events-auto shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <span className="text-white font-black text-xs tracking-widest">COMPATIBILITY ALERT</span>
                        </div>
                        <p className="text-red-200 text-xs font-medium max-w-[250px]">
                            {compatibility.issues[0]}
                        </p>
                    </div>
                )}
            </div>

            {/* Enhanced UI Controls Overlay */}
            <div className={`absolute ${isFullscreen ? 'bottom-10' : 'bottom-6'} left-6 right-6 flex flex-col sm:flex-row justify-between items-center sm:items-end pointer-events-none gap-4 z-10`}>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 bg-black/50 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl pointer-events-auto self-start sm:self-auto shadow-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                    <span className="text-white font-black text-[10px] tracking-widest uppercase">
                        60 FPS Target <span className="text-gray-500 mx-1">|</span> {exploded ? 'Exploded' : 'Assembled'}
                    </span>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap justify-center sm:justify-end gap-3 pointer-events-auto bg-black/40 p-2 rounded-2xl backdrop-blur-md border border-white/5 shadow-xl">

                    {/* Theme Toggle */}
                    <div className="flex items-center bg-black/50 rounded-xl p-1 border border-white/10" title="3D Theme">
                        <button
                            onClick={() => setTheme('dark')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-[#0f172a] text-white shadow-md' : 'text-gray-500 hover:text-white'}`}
                        >
                            Dark
                        </button>
                        <button
                            onClick={() => setTheme('light')}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-white text-black shadow-md' : 'text-gray-500 hover:text-white'}`}
                        >
                            Light
                        </button>
                    </div>

                    <button
                        onClick={resetCamera}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all group/btn"
                        title="Reset Camera"
                    >
                        <svg className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
                        title="Toggle Fullscreen"
                    >
                        {isFullscreen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14.996h5m-5 0v5m5-5v5M15 9.004H9m5 0v-5m-5 5v-5" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={exportScreenshot}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all group/btn"
                        title="Download Build Screenshot"
                    >
                        <svg className="w-5 h-5 transform group-hover/btn:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Subtle Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
    );
};

export default Scene;
