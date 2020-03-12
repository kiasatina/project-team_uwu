import React, { useEffect , useState} from 'react';
import { useRef } from 'react';
import './index.scss';

const CONFIG = {
    audio: true,
    video: {
        width: 200,
        height: 200,
        facingMode: 'user',
    },
};

export const Editor = () => {
    const ref = useRef();
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const _stream = await navigator.mediaDevices.getUserMedia(CONFIG);
                ref.current.srcObject = _stream;
            } catch(err) {
                console.error(err);
            }
        })();

        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div className='editor'>
            <video className='editor__video' height='1000' width='1000' ref={ref} autoPlay/>
        </div>
    );
};
