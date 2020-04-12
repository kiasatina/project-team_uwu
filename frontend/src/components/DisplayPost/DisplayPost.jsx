import React, { useEffect, useRef, useMemo } from 'react';
import { Box } from '@chakra-ui/core';
import { Layer, Stage, Image } from 'react-konva';
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

export const DisplayPost = ({
    size,
    setSize,
    video,
    playing,
    layers,
    children,
    layerRef,
    videoRef,
    muted,
    ...props
}) => {
    const isFile = typeof video === 'string';
    const imageRef = useRef();
    const ref = useRef();

    const videoElement = useMemo(() => {
        const element = document.createElement('video');
        if (videoRef) videoRef.current = element;
        element.crossOrigin = 'anonymous';
        element.srcObject = isFile ? undefined : video;
        element.src = isFile ? video : undefined;
        element.autoplay = true;
        element.loop = true;
        element.muted = muted;
        return element;
    }, [video, isFile, videoRef, muted]);

    // Add filter to video if initial layers had one in them
    useEffect(() => {
        layers
            .filter(l => l.type === 'FILTER')
            .forEach(layer => {
                const canvas = imageRef.current.getCanvas()._canvas;
                if (canvas) {
                    canvas.style.filter =
                        layer.filter + `(${getFilterNum(layer.filter)})`;
                }
            });
    }, [layers, imageRef]);

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
        (async () => {
            const action = playing ? 'play' : 'pause';
            await videoElement[action]();
        })();
        const layer = imageRef.current.getLayer();
        const anim = new Konva.Animation(() => {}, layer);
        anim.start();

        return () => {
            if (videoElement.playing) {
                videoElement.pause();
            }
            anim.stop();
        };
    }, [videoElement, playing]);

    return (
        <Box {...props} rounded='md' overflow='hidden' ref={ref}>
            <Stage width={size.width} height={size.height}>
                <Layer ref={layerRef}>
                    <Image
                        ref={imageRef}
                        image={videoElement}
                        width={size.width}
                        height={size.height}
                        x={0}
                        y={0}
                    />
                    {children}
                </Layer>
            </Stage>
        </Box>
    );
};
