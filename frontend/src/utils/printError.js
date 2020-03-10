const errors = {
    INVALID_LOGIN_ERROR: 'Invalid login/password',
    USERNAME_EXISTS_ERROR: 'Username is already in use',
    EMAIL_EXISTS_ERROR: 'Email is already in use',
};

/**
 * Translates error message from GraphQL to user friendly message
 * @param {string} error - GraphQL error message
 * @returns {string} - Human language error message
 */
export const printError = error => {
    return errors[error] || 'Something went wrong. Please try again later';
};
