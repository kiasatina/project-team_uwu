import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/core';
import { Layer, Stage } from 'react-konva';
import { VideoLayer } from '../VideoLayer';

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

export const DisplayPost = ({
    size,
    setSize,
    videoRef,
    video,
    layers,
    drag,
    ...props
}) => {
    const onload = ({ currentTarget }) =>
        setSize({
            width: currentTarget.offsetWidth,
            height: currentTarget.offsetHeight,
        });

    // Add filter to video if initial layers had one in them
    useEffect(() => {
        layers
            .filter(l => l.type === 'FILTER')
            .forEach(layer => {
                videoRef.current.style.filter =
                    layer.filter + `(${getFilterNum(layer.filter)})`;
            });
    }, [videoRef, layers]);

    useEffect(() => {
        const handler = () => {
            setSize({
                width: videoRef.current.offsetWidth,
                height: videoRef.current.offsetHeight,
            });
        };

        window.addEventListener('resize', handler, true);
        return () => {
            window.removeEventListener('resize', handler, true);
        };
    }, [setSize, videoRef]);

    return (
        <Box className='editor__video-holder'>
            <video
                onLoadedMetadata={onload}
                src={video}
                loop={true}
                autoPlay={true}
                ref={videoRef}
                {...props}
            />

            <Stage
                width={size.width}
                height={size.height}
                className='editor__video-holder__layers'
            >
                <Layer>
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
