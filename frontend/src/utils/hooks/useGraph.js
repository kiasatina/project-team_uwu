import { useReducer, useEffect, useCallback } from 'react';
import { fetchGraph } from '../fetchGraph';

const reducer = (state, action) => {
    return { ...state, ...action };
};

/**
 * useGraph options
 * @typedef {Object} useGraphOptions
 * @property {Object} [initState = {}] - The initial state of fetch
 * @property {Object} [variables = {}] - The variables for fetch
 * @property {Array} [pipe = []] - Unwraps data after fetch
 * @property {Function} [onError = console.error] - Error handler
 */

/**
 * useGraph return stuff
 * @typedef {Object} useGraphStuff
 * @property {Boolean} loading - Loading state of query
 * @property {Object} data - The result of query
 * @property {Function} dispatch - For updating data directly
 * @property {Function} refetch - For refetching query with option of setting new init state and variables
 */

/**
 * React hook for fetching from GraphQL
 * @param {String} query - The graphQL Query
 * @param {useGraphOptions} [options = {}] - Options to configure query
 * @returns {useGraphStuff} - Hook stuff
 */
export const useGraph = (query, options = {}) => {
    const {
        onError = console.error,
        initState = {},
        variables = {},
        pipe = [],
    } = options;

    const [store, _dispatch] = useReducer(reducer, {
        variables: { ...variables },
        pipe: [...pipe],
        data: initState,
        loading: true,
    });

    useEffect(() => {
        let mounted = true;

        (async () => {
            if (mounted) {
                try {
                    const data = await fetchGraph(query, store.variables);
                    if (mounted) {
                        _dispatch({
                            loading: false,
                            data: store.pipe.reduce((_, prop) => _[prop], data),
                        });
                    }
                } catch (err) {
                    onError(err.message);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, [query, onError, store.variables, store.pipe]);

    const refetch = useCallback(
        (config = {}) => {
            const {
                initState = store.data,
                variables = store.variables,
                setLoading = false,
            } = config;
            const data = Array.isArray(initState)
                ? [...initState]
                : typeof initState === 'object'
                ? { ...initState }
                : initState;
            _dispatch({
                variables: { ...variables },
                loading: setLoading,
                data,
            });
        },
        [store.data, store.variables],
    );

    const dispatch = useCallback(data => {
        _dispatch({ data });
    }, []);

    return {
        loading: store.loading,
        data: store.data,
        dispatch,
        refetch,
    };
};
