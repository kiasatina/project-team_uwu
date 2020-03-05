const jwt = require('jsonwebtoken');

// Middleware for dealing with jwt
module.exports = async (req, res, next) => {
    try {
        const { _id } = jwt.verify(
            req.headers.authorization,
            process.env.SECRET,
        );
        req.user = _id;
    } catch {
        // Nothing wrong, just means that no session
    }
    next();
};
