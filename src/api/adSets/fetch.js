import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';
import { createClient } from '@/utils/supabase/server'; // or client
// Alternatively, you could import a service function like getAdSets from adSetService

const supabase = createClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return handleError(
      res,
      new Error(ERROR_CODES.METHOD_NOT_ALLOWED.message),
      405,
      ERROR_CODES.METHOD_NOT_ALLOWED.code
    );
  }

  try {
    // Optionally, parse query params from req.query. Example: ?userId=xyz
    const { userId } = req.query;

    // If your service is purely a DB call, do it here:
    let query = supabase.from('ad_sets').select('*');
    if (userId) query = query.eq('user_id', userId);

    const { data, error } = await query;
    if (error) {
      return handleError(
        res,
        new Error(error.message),
        500,
        ERROR_CODES.INTERNAL_SERVER_ERROR.code
      );
    }

    return handleSuccess(res, data);
  } catch (error) {
    return handleError(res, error);
  }
}
