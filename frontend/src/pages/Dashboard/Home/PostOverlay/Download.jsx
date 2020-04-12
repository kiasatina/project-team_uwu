import React, { useState, useRef } from 'react';
import { Button } from '@chakra-ui/core';
import { DisplayPost, DisplayPostItem } from '../../../../components';
import './download.scss';

let url;
export const Download = ({ data, ...props }) => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [loading, setLoading] = useState();
    const videoRef = useRef();
    const layerRef = useRef();

    const download = async () => {
        await setLoading(true);
        const chunks = [];
        const stream = layerRef.current.canvas._canvas.captureStream(60);
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = ({ data }) => {
            chunks.push(data);
        };
        recorder.onstart = () => {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        };
        recorder.onstop = () => {
            URL.revokeObjectURL(url);
            url = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
            window.open(url, 'Download');
            setLoading(false);
        };

        recorder.start();
        window.setTimeout(() => recorder.stop(), 4000);
    };

    return (
        <>
            <Button
                leftIcon='download'
                onClick={download}
                isLoading={loading}
                variant='outline'
                loadingText='Creating Video...'
                {...props}
            >
                Download
            </Button>
            {loading && (
                <DisplayPost
                    className='download'
                    size={size}
                    setSize={setSize}
                    video={data.asset?.src}
                    layers={data.layers}
                    videoRef={videoRef}
                    layerRef={layerRef}
                >
                    {data.layers?.map((layer, index) => (
                        <DisplayPostItem
                            size={size}
                            layer={layer}
                            key={index}
                        />
                    ))}
                </DisplayPost>
            )}
        </>
    );
};
