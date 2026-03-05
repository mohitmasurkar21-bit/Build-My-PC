import React from 'react';
import BaseComponent from './BaseComponent';

export default function PSU({ product, exploded, compatibility, rgbEnabled }) {
    return (
        <BaseComponent
            product={product}
            category="PSU"
            position={[0, -2.4, 0]}
            size={[1.8, 1.2, 1.8]}
            defaultColor="#4b5563" // Gray box at bottom
            exploded={exploded}
            offset={[0, -3, 0]}
            compatibility={compatibility}
            rgbEnabled={rgbEnabled}
        />
    );
}
