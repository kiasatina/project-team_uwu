import { useCallback, useEffect, useRef } from 'react';
import { useMounted } from './useMounted';

// Singleton for video stream from camera (Bless modules)
let _stream;
const getStream = async () =>
    _stream ||
    (await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 256,
            height: 256,
            facingMode: 'user',
        },
    }));

/**
 * useRecorder return object
 * @typedef {Object} useRecorderResult
 * @property {function} getRecorder - Gets media recorder instance
 * @property {function} record - Make a recording
 */

/**
 * Hook for media recorder stuff
 * @param {Number} [duration = 4000] - Duration of recording
 * @returns {useRecorderResult} - The hook stuff
 */
export const useRecorder = (duration = 4000) => {
    const mounted = useMounted();
    const recorder = useRef();
    const timer = useRef();

    const getRecorder = useCallback(async () => {
        if (!recorder.current) {
            recorder.current = new MediaRecorder(await getStream());
        }
        return recorder.current;
    }, []);

    const record = useCallback(
        (_duration = duration) => {
            return new Promise(async resolve => {
                const _recorder = await getRecorder();
                _recorder.start();
                _recorder.ondataavailable = ({ data }) => {
                    resolve(data);
                };

                timer.current = window.setTimeout(() => {
                    _recorder.stop();
                }, _duration);
            });
        },
        [getRecorder, duration],
    );

    // Initialize video and cleanup on unmount
    useEffect(() => {
        getRecorder();
        return () => {
            window.clearTimeout(timer.current);
        };
    }, [mounted, getRecorder]);

    return { getRecorder, record };
};
