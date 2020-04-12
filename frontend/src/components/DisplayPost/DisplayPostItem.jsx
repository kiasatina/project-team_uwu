import React from 'react';
import { VideoLayer } from '../VideoLayer';

export const DisplayPostItem = ({ layer, size, drag }) => {
    const onDragEnd = ({ target }) => {
        drag({
            ...layer,
            position: {
                x: target.x() / size.width,
                y: target.y() / size.height,
            },
        });
    };
    return (
        <VideoLayer
            onDragEnd={drag ? onDragEnd : undefined}
            layer={layer}
            size={size}
        />
    );
};
