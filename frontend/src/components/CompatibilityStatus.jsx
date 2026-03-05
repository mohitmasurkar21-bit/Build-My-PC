import React from 'react';

const CompatibilityStatus = ({ compatibility, evaluation }) => {
    if (!compatibility) return null;

    return (
        <div className="space-y-4">
            {/* Compatibility Status */}
            <div className={`glass-card ${compatibility.isCompatible ? 'border-green-500' : 'border-red-500'} border-2`}>
                <div className="flex items-center space-x-3">
                    {compatibility.isCompatible ? (
                        <>
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-green-500 font-bold text-lg">✅ Compatible</h3>
                                <p className="text-sm text-gray-400">All components work together</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-red-500 font-bold text-lg">❌ Incompatible</h3>
                                <p className="text-sm text-gray-400">Issues detected</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Compatibility Issues */}
                {!compatibility.isCompatible && compatibility.issues?.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <p className="text-sm font-semibold text-gray-300">Issues:</p>
                        <ul className="space-y-1">
                            {compatibility.issues.map((issue, index) => (
                                <li key={index} className="text-sm text-red-400 flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{issue}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Worth Evaluation */}
            {evaluation && (
                <div className={`glass-card border-2 ${evaluation.category === 'Excellent' ? 'border-green-500' :
                        evaluation.category === 'Good' ? 'border-blue-500' :
                            evaluation.category === 'Fair' ? 'border-yellow-500' :
                                'border-red-500'
                    }`}>
                    <h3 className="font-bold text-lg mb-2">
                        {evaluation.category === 'Excellent' ? '🎯' :
                            evaluation.category === 'Good' ? '✅' :
                                evaluation.category === 'Fair' ? '⚠️' : '❌'}
                        {' '}Is It Worth It?
                    </h3>

                    {/* Score Bar */}
                    <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Score</span>
                            <span className="font-bold">{evaluation.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all ${evaluation.score >= 80 ? 'bg-green-500' :
                                        evaluation.score >= 65 ? 'bg-blue-500' :
                                            evaluation.score >= 50 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                    }`}
                                style={{ width: `${evaluation.score}%` }}
                            />
                        </div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                        {evaluation.message}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CompatibilityStatus;
