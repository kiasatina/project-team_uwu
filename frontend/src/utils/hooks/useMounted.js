import { useRef, useEffect } from 'react';

export const useMounted = (callback = () => {}) => {
    const mounted = useRef(true);
    const _callback = useRef(callback);
    useEffect(() => {
        const c = _callback.current();
        mounted.current = true;
        return () => {
            mounted.current = false;
            if (c) c();
        }
    }, []);
    return mounted.current;
};
