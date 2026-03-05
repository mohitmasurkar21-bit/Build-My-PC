import React from 'react';

const GlassCard = ({ children, className = '', hover = false }) => {
    return (
        <div className={`glass-card ${hover ? 'glass-hover card-hover' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
