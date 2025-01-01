export function handleSuccess(res, data, status = 200) {
  return res.status(status).json({
    success: true,
    data
  });
}

export function handleError(
  res,
  error,
  status = 500,
  code = 'INTERNAL_SERVER_ERROR'
) {
  const message = error.message || 'An unknown error occurred';
  return res.status(status).json({
    success: false,
    error: {
      code,
      message
    }
  });
}
