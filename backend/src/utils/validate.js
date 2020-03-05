/**
 * Decorator for checking args of GraphQL resolver and throwing named errors
 * @param {object} [checks = {}] - Named checks for returning
 * @param {Function} resolver - The GraphQL resolver
 * @returns {Function} - Decorated resolver with args check
 */
module.exports = (checks = {}, resolver) => async (...args) => {
    const errors = {};
    // Go through all checks
    await Promise.all(
        Object.entries(checks(args[1], args[2])).map(async ([label, check]) => {
            const result = await check();

            // If there's an error message, store it
            if (typeof result === 'string') {
                errors[label] = result;
            }
        }),
    );

    // If we have errors, throw Error for GraphQL
    if (Object.keys(errors).length) {
        throw new Error(JSON.stringify(errors));
    }

    return resolver(...args);
};
