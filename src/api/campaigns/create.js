// TODO: complete POST create campaign logic

import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';
import { createClient } from '../../utils/supabase/server';

const supabase = createClient();

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
    const { name, budget } = req.body;
    if (!name || !budget) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    const { data, error } = await supabase
      .from('campaigns')
      .insert([{ name, budget }]);
    if (error) {
      return handleError(
        res,
        new Error(error.message),
        500,
        ERROR_CODES.INTERNAL_SERVER_ERROR.code
      );
    }

    handleSuccess(res, data, 201);
  } catch (error) {
    handleError(res, error);
  }
}
