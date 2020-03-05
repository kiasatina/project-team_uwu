const crypto = require('crypto');

/**
 * Hashes password for security stuff
 * @param {string} password - The actual password to hash
 * @param {string} [salt] - Salt for hash
 * @returns {[string, string]} - The hash and salt
 */
module.exports = (
    password,
    salt = crypto.randomBytes(16).toString('base64'),
) => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return [hash.digest('base64'), salt];
};
