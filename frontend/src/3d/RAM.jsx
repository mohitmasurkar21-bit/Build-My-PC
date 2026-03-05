import React from 'react';
import BaseComponent from './BaseComponent';

export default function RAM({ product, exploded, compatibility, rgbEnabled }) {
    if (!product) return null;

    // Determine number of sticks from capacity (rough estimation)
    let count = 2; // Default 2 sticks
    const name = product.name.toLowerCase();

    if (name.includes('128gb') || name.includes('4x')) count = 4;
    else if (name.includes('8gb') && !name.includes('2x')) count = 1;

    return (
        <group>
            {Array.from({ length: count }).map((_, i) => (
                <BaseComponent
                    key={i}
                    product={product}
                    category="RAM"
                    position={[0.6 + i * 0.2, 0.5, -0.6]} // Slightly offset each stick
                    size={[0.1, 1.2, 0.4]}
                    defaultColor="#1e40af" // Blue tall boxes
                    exploded={exploded}
                    offset={[1, 1.5, i * 0.5]}
                    compatibility={compatibility}
                    rgbEnabled={rgbEnabled}
                />
            ))}
        </group>
    );
}
