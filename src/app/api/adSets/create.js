import { createAdSet } from '@/lib/adSets/adSetService';
import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return handleError(
      res,
      new Error(ERROR_CODES.METHOD_NOT_ALLOWED.message),
      405,
      ERROR_CODES.METHOD_NOT_ALLOWED.code
    );
  }

  try {
    // Example expected fields: name, budget, userId, etc.
    // Adjust as needed for your adSets
    const { name, budget, userId } = req.body;

    if (!name || !budget || !userId) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    // Call your service function to create the ad set
    const data = await createAdSet({ name, budget, userId });
    return handleSuccess(res, data, 201);
  } catch (error) {
    return handleError(res, error);
  }
}
