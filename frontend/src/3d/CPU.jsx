import React from 'react';
import BaseComponent from './BaseComponent';

export default function CPU({ product, exploded, compatibility, rgbEnabled }) {
    return (
        <BaseComponent
            product={product}
            category="CPU"
            position={[0, 0.5, -0.9]}
            size={[0.8, 0.8, 0.15]}
            defaultColor="#c0c0c0" // Small Silver Box on motherboard
            exploded={exploded}
            offset={[0, 1.5, -2]}
            compatibility={compatibility}
            rgbEnabled={rgbEnabled}
        />
    );
}
