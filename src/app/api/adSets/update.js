import { updateAdSet } from '@/lib/adSets/adSetService';
import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return handleError(
      res,
      new Error(ERROR_CODES.METHOD_NOT_ALLOWED.message),
      405,
      ERROR_CODES.METHOD_NOT_ALLOWED.code
    );
  }

  try {
    // Typically, the adSetId might come from req.query if you use /adSets/update/[id].
    // Or you can pass it in the body. Adjust as needed.
    const { adSetId, ...updateData } = req.body;

    if (!adSetId) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    const updated = await updateAdSet(adSetId, updateData);
    return handleSuccess(res, updated, 200);
  } catch (error) {
    return handleError(res, error);
  }
}
