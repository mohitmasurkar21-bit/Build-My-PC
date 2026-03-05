import React from 'react';
import BaseComponent from './BaseComponent';

export default function Cabinet({ product, exploded, compatibility, rgbEnabled }) {
    return (
        <BaseComponent
            product={product}
            category="Cabinet"
            position={[0, -0.5, 0]}
            size={[4.5, 5.5, 3.5]}
            defaultColor="#ffffff"
            transparent={true}
            opacity={0.15}
            // Cabinet doesn't explode as dynamically to keep bounds clear
            exploded={exploded}
            offset={[0, 0, 2]}
            compatibility={compatibility}
            rgbEnabled={rgbEnabled}
        />
    );
}
