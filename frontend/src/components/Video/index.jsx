import { Animation } from 'konva';
import React, { useEffect, useMemo, useRef } from 'react';
import { Image } from 'react-konva';

/**
 * credits: https://stackoverflow.com/questions/59741398/play-video-on-canvas-in-react-konva
 */
export const Video = ({ src, size, playing }) => {
    const imageRef = useRef(null);

    const videoElement = useMemo(() => {
        const video = document.createElement('video');
        video.src = src;
        video.loop = true;
        return video;
    }, [src]);

    useEffect(() => {
        playing ? videoElement.play() : videoElement.pause();
        const layer = imageRef.current.getLayer();

        const anim = new Animation(() => {}, layer);
        anim.start();

        return () => {
            videoElement.pause();
            anim.stop();
        };
    }, [videoElement, playing]);

    return (
        <Image
            ref={imageRef}
            image={videoElement}
            width={size.width}
            height={size.height}
        />
    );
};
