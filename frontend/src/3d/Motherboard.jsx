import React from 'react';
import BaseComponent from './BaseComponent';

export default function Motherboard({ product, exploded, compatibility, rgbEnabled }) {
    return (
        <BaseComponent
            product={product}
            category="Motherboard"
            position={[0, -0.5, -1.0]}
            size={[3.2, 4.2, 0.1]}
            defaultColor="#004d00" // Green Box
            exploded={exploded}
            offset={[0, -1, -2]}
            compatibility={compatibility}
            rgbEnabled={rgbEnabled}
        />
    );
}
