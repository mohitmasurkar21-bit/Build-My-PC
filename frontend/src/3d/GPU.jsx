import React from 'react';
import BaseComponent from './BaseComponent';

export default function GPU({ product, exploded, compatibility, rgbEnabled }) {
    return (
        <BaseComponent
            product={product}
            category="GPU"
            position={[0, -0.8, 0.2]}
            size={[3.8, 1.2, 0.6]}
            defaultColor="#111111" // Long Black Box
            exploded={exploded}
            offset={[0, -2, 3]}
            compatibility={compatibility}
            rgbEnabled={rgbEnabled}
        />
    );
}
