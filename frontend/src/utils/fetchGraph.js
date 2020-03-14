const createPayload = (query, variables) => {
    const payload = new FormData();
    const files = [];
    const map = [];

    // Process variables
    const _variables = Object
        .entries(variables)
        .reduce((acc, [ label, value ]) => {
            // File, then setup to match GraphQL Multipart spec
            if (typeof value.name === 'string') {
                acc[label] = null;
                files.push(value);
                map.push([`variables.${ label }`]);
            } else {
                acc[label] = value;
            }

            return acc;
        }, {})
    ;

    // Create payload to match GraphQL Mutlipart spec
    // (Which dictates this specific order of fields...)
    payload.append('operations', JSON.stringify({
        variables: _variables,
        query,
    }));
    payload.append('map', JSON.stringify(
        Object.assign({}, map)
    ));
    files.forEach((file, i) => {
        payload.append(i, file);
    });

    return payload;
};

/**
 * Helper for fetching from GraphQL server
 * @param {String} query - The query for server
 * @param {Object} [variables = {}] - Variables for server
 * @returns {Object} - The data from query
 */
export const fetchGraph = async (query, variables = {}) => {
    const body = createPayload(query, variables);
    const res = await fetch(process.env.REACT_APP_GRAPHQL, {
        method: 'POST',
        headers: {
            authorization: localStorage.getItem('token'),
        },
        body,
    });
    const { data, errors } = await res.json();
    if (errors) {
        throw new Error(errors[0].message);
    }
    return data;
};
