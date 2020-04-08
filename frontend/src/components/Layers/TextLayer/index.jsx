import React, { useEffect } from 'react';
import { Text } from 'react-konva';

export const TextLayer = ({ layer, size, onDragStart, onDragEnd }) => {
    useEffect(() => {}, [layer]);

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
            shadowBlur='10'
            x={layer.position.x * size.width}
            y={layer.position.y * size.height}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        ></Text>
    );
};
