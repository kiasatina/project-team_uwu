import React, { useEffect, useState, useRef } from 'react';
import { Spinner } from '@chakra-ui/core';
import './index.scss';

export const Viewer = ({ video }) => {
    const [loading, setLoading] = useState(true);
    const isFile = typeof video === 'string';
    const ref = useRef();

    useEffect(() => {
        ref.current.srcObject = isFile ? undefined : video;
        ref.current.src = isFile ? video : undefined;
        return () => {
            setLoading(true);
            URL.revokeObjectURL(video);
        };
    }, [isFile, video]);

    return (
        <div className='viewer'>
            <div className={`viewer__dimmer ${ loading ? ' viewer__dimmer--show' : '' }`}>
                <Spinner size='xl'/>
            </div>
            <video
                onLoadedData={() => setLoading(false)}
                className='viewer__video'
                height='1000'
                width='1000'
                ref={ref}
                autoPlay
                loop
            />
        </div>
    );
};
