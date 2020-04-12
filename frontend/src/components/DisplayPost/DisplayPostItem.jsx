import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-konva';

export const DisplayPostItem = ({ layer, size, drag }) => {
    const [sticker, setSticker] = useState();

    // Relevant only if the layer is a sticker
    useEffect(() => {
        let mounted = true;
        if (layer.type === 'STICKER') {
            const newSticker = new window.Image();
            newSticker.src = layer.sticker.href;
            newSticker.onload = () => {
                if (mounted) setSticker(newSticker);
            };
        }
        return () => {
            mounted = false;
        };
    }, [layer]);

    if (layer.type === 'STICKER') {
        return (
            <Image
                image={sticker}
                x={layer.position.x * size.width}
                y={layer.position.y * size.height}
                width={size.width / 5}
                height={size.height / 5}
                draggable={!!drag}
                onDragEnd={drag ? drag : undefined}
            />
        );
    } else if (layer.type === 'TEXT') {
        return (
            <Text
                text={layer.text}
                align='center'
                verticalAlign='middle'
                fill='white'
                fontSize={size.width / 10}
                fontStyle='bold'
                fontFamily='Muli'
                shadowColor='black'
                shadowBlur={10}
                x={layer.position.x * size.width}
                y={layer.position.y * size.height}
                draggable={!!drag}
                onDragEnd={drag ? drag : undefined}
            />
        );
    } else {
        return null;
    }
};
