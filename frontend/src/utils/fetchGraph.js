/**
 * Helper for fetching from GraphQL server
 * @param {String} query - The query for server
 * @param {Object} [variables = {}] - Variables for server
 * @returns {Object} - The data from query
 */
export const fetchGraph = async (query, variables = {}) => {
    const res = await fetch(process.env.REACT_APP_GRAPHQL, {
        method: 'POST',
        headers: {
            authorization: localStorage.getItem('token'),
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            variables,
            query,
        }),
    });
    const { data, errors } = await res.json();
    if (errors) {
        throw new Error(errors[0].message);
    }
    return data;
};
