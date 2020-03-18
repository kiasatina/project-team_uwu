import { useRef, useEffect } from 'react';

/**
 * React hook for checking if component is still mounted
 * @param {Function} callback - A callback function for if unmounted
 * @returns {boolean} - That shows if component is mounted or not
 */
export const useMounted = (callback = () => {}) => {
    const mounted = useRef(true);
    const _callback = useRef(callback);
    useEffect(() => {
        const c = _callback.current();
        mounted.current = true;
        return () => {
            mounted.current = false;
            if (c) c();
        };
    }, []);
    return mounted.current;
};
