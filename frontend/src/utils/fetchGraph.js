const processVar = (...args) => {
    const [value, files, root, map] = args;

    // File, then setup to match GraphQL Multipart spec
    if (value instanceof Blob) {
        map.push([root]);
        files.push(value);
        return null;

        // Recursive step
    } else if (typeof value === 'object') {
        return processVariables(...args)[0];
    }

    // Base
    return value;
};

// rEcUrSiOn
const processVariables = (
    variables,
    files = [],
    root = 'variables',
    map = [],
) => [
    Object.entries(variables).reduce((acc, [label, value]) => {
        // Check every element in an array
        if (Array.isArray(value)) {
            acc[label] = value.map((val, i) =>
                processVar(val, files, `${root}.${i}`, map),
            );

            // Resursive step
        } else {
            acc[label] = processVar(value, files, `${root}.${label}`, map);
        }

        return acc;
    }, {}),
    files,
    map,
];

const createPayload = (query, variables) => {
    // Process variables so that we can do GraphQL Multipart spec
    const [_variables, files, map] = processVariables(variables);

    // Create payload to match GraphQL Mutlipart spec
    // (Which dictates this specific order of fields...)
    const payload = new FormData();
    payload.append(
        'operations',
        JSON.stringify({
            variables: _variables,
            query,
        }),
    );
    payload.append('map', JSON.stringify(Object.assign({}, map)));
    files.forEach((file, i) => {
        payload.append(i, file);
    });

    // I hate GraphQL Multipart spec
    return payload;
};

/**
 * Helper for fetching from GraphQL server that looks simple and
 * harmless if ignore the first 80 lines of code in this file
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
