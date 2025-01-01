export function handleSuccess(res, data, statusCode = 200) {
  res.status(statusCode).json({ success: true, data });
}

export function handleError(
  res,
  error,
  statusCode = 500,
  errorCode = 'INTERNAL_SERVER_ERROR'
) {
  console.error('API Error:', error.message || error); // Log for debugging
  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: error.message || 'An unknown error occurred'
    }
  });
}
