import React from 'react';
import BaseComponent from './BaseComponent';

export default function Cooler({ product, exploded, compatibility, rgbEnabled }) {
    return (
        <BaseComponent
            product={product}
            category="Cooler"
            position={[0, 0.8, -0.4]}
            size={[0.6, 0.6, 1.2, 32]}
            geometry="cylinder"
            defaultColor="#9ca3af" // Silver cylinder
            exploded={exploded}
            offset={[0, 3, 2]}
            compatibility={compatibility}
            rgbEnabled={rgbEnabled}
        />
    );
}
