import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-konva';

export const VideoLayer = ({ layer, size, onDragStart, onDragEnd }) => {
    const [sticker, setSticker] = useState();

    // Relevant only if the layer is a sticker
    useEffect(() => {
        if (layer.type === 'STICKER') {
            const onload = () => {
                setSticker(newSticker);
            };
            const newSticker = new window.Image();
            newSticker.src = layer.asset.src;
            newSticker.addEventListener('load', onload);

            return () => {
                newSticker.removeEventListener('load', onload);
            };
        }
    }, [layer]);

    if (layer.type === 'STICKER') {
        return (
            <Image
                image={sticker}
                x={layer.position.x * size.width}
                y={layer.position.y * size.height}
                width={100}
                height={100}
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );
    } else if (layer.type === 'TEXT') {
        return (
            <Text
                text={layer.text}
                align='center'
                verticalAlign='middle'
                fill='white'
                fontSize={24}
                fontStyle='bold'
                fontFamily='Muli'
                shadowColor='black'
                shadowBlur={10}
                x={layer.position.x * size.width}
                y={layer.position.y * size.height}
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            ></Text>
        );
    } else {
        return <></>;
    }
};
