const handleError = (error, res) => {
  if (error.response) {
    // Log the detailed response from the API
    console.error(
      `Meta API Error: ${error.response.status} - ${error.response.statusText}`,
      JSON.stringify(error.response.data, null, 2)
    );

    // Handle specific API error codes if necessary
    if (error.response.data?.error?.code === 100) {
      res.status(400).json({
        error: 'Invalid Interest ID provided. Please verify your input.',
        details: error.response.data
      });
    } else if (error.response.data?.error?.code === 190) {
      res.status(401).json({
        error: 'Invalid or expired access token. Please authenticate again.',
        details: error.response.data
      });
    } else {
      // General API error response
      res.status(error.response.status).json({
        error: error.response.data.error?.message || 'API error occurred.',
        details: error.response.data
      });
    }
  } else if (error.request) {
    // No response received from the API
    console.error('No response received from Meta API:', error.request);
    res.status(504).json({
      error: 'No response received from Meta API. Please try again later.'
    });
  } else {
    // Handle unexpected errors
    console.error('Unexpected error occurred:', error.message);
    res.status(500).json({
      error: 'An unexpected error occurred. Please check the server logs.',
      details: error.message
    });
  }
};

export { handleError };
