import React from 'react';
import BaseComponent from './BaseComponent';

export default function Storage({ product, exploded, compatibility, rgbEnabled }) {
    return (
        <BaseComponent
            product={product}
            category="Storage"
            position={[-0.8, -0.2, -0.8]}
            size={[0.4, 1.2, 0.1]}
            defaultColor="#1f2937" // Small dark rectangle
            exploded={exploded}
            offset={[-2, 0, 0]}
            compatibility={compatibility}
            rgbEnabled={rgbEnabled}
        />
    );
}
