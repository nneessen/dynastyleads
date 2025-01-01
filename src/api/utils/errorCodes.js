export const ERROR_CODES = {
  BAD_REQUEST: { code: 'BAD_REQUEST', message: 'Invalid or missing input' },
  UNAUTHORIZED: { code: 'UNAUTHORIZED', message: 'User is not authorized' },
  FORBIDDEN: { code: 'FORBIDDEN', message: 'Access is forbidden' },
  NOT_FOUND: { code: 'NOT_FOUND', message: 'Resource not found' },
  METHOD_NOT_ALLOWED: {
    code: 'METHOD_NOT_ALLOWED',
    message: 'HTTP method not allowed'
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An internal server error occurred'
  }
};
