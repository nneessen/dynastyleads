import { deleteAdSet } from '@/lib/adSets/adSetService';
import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return handleError(
      res,
      new Error(ERROR_CODES.METHOD_NOT_ALLOWED.message),
      405,
      ERROR_CODES.METHOD_NOT_ALLOWED.code
    );
  }

  try {
    // Similar to update, you can pass adSetId in req.query if using dynamic routes, or in req.body.
    const { adSetId } = req.query; // Example for /api/adSets/delete/[adSetId]

    if (!adSetId) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    const deletedAdSet = await deleteAdSet(adSetId);
    return handleSuccess(res, deletedAdSet, 200);
  } catch (error) {
    return handleError(res, error);
  }
}
