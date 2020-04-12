import React, { useEffect, useRef, useMemo } from 'react';
import { Box } from '@chakra-ui/core';
import { Layer, Stage, Image } from 'react-konva';
import { VideoLayer } from '../VideoLayer';
import Konva from 'konva';

// Gives back appropriate scale for the specified
const getFilterNum = filter => {
    switch (filter.toLowerCase()) {
        case 'saturate':
            return '5';
        case 'brightness':
            return '2';
        case 'blur':
            return '5px';
        default:
            return '1';
    }
};

export const DisplayPost = ({ size, setSize, video, layers, drag }) => {
    const imageRef = useRef();
    const ref = useRef();

    const videoElement = useMemo(() => {
        const element = document.createElement('video');
        element.loop = true;
        element.src = video;
        return element;
    }, [video]);

    // Add filter to video if initial layers had one in them
    useEffect(() => {
        layers
            .filter(l => l.type === 'FILTER')
            .forEach(layer => {
                imageRef.current.style.filter =
                    layer.filter + `(${getFilterNum(layer.filter)})`;
            });
    }, [layers]);

    useEffect(() => {
        const handler = () =>
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetWidth,
            });
        window.addEventListener('resize', handler, true);
        handler();

        return () => {
            window.removeEventListener('resize', handler, true);
        };
    }, [videoElement, setSize]);

    useEffect(() => {
        videoElement.play();
        const layer = imageRef.current.getLayer();
        const anim = new Konva.Animation(() => {}, layer);
        anim.start();

        return () => anim.stop();
    }, [videoElement]);

    return (
        <Box rounded='md' overflow='hidden' ref={ref}>
            <Stage width={size.width} height={size.height}>
                <Layer>
                    <Image
                        ref={imageRef}
                        image={videoElement}
                        width={size.width}
                        height={size.height}
                        x={0}
                        y={0}
                    />
                    {layers.map((layer, index) => (
                        <VideoLayer
                            key={index}
                            layer={layer}
                            size={size}
                            onDragEnd={
                                drag
                                    ? e => {
                                          drag(e.target, index);
                                      }
                                    : undefined
                            }
                        />
                    ))}
                </Layer>
            </Stage>
        </Box>
    );
};
