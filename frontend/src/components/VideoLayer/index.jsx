import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-konva';
import { stickers } from '../../assets';

export const VideoLayer = ({ layer, size, onDragStart, onDragEnd }) => {
    const [sticker, setSticker] = useState();

    useEffect(() => {
        const onload = () => {
            setSticker(newSticker);
        };
        const newSticker = new window.Image();
        if (layer.type === 'STICKER') {
            newSticker.src = stickers[0];
        }
        newSticker.addEventListener('load', onload);

        return () => {
            newSticker.removeEventListener('load', onload);
        };
    }, [layer]);

    if (layer.type === 'STICKER') {
        return (
            <Image
                image={sticker}
                x={layer.position.x * size.width}
                y={layer.position.y * size.height}
                width={50}
                height={50}
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        );
    } else if (layer.type === 'TEXT') {
        return (
            <Text
                text={layer.text}
                fill='white'
                align='center'
                verticalAlign='middle'
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
