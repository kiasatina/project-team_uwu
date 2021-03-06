const errors = {
    INVALID_LOGIN_ERROR: 'Invalid password',
    USERNAME_EXISTS_ERROR: 'Username is already in use',
    EMAIL_EXISTS_ERROR: 'Email is already in use',
    AUTHENTICATION_ERROR: 'Session expired. Please login again',
    LIVESTREAM_EXISTS_ERROR: 'You already have a livestream. Try again later',
    INVALID_USERNAME_ERROR:
        'Username is invalid. Only alphanumeric characters are accepted',
};

/**
 * Translates error message from GraphQL to user friendly message
 * @param {string} error - GraphQL error message
 * @returns {string} - Human language error message
 */
export const printError = error => {
    return errors[error] || 'Something went wrong. Please try again later';
};
