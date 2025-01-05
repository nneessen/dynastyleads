import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';
import { getCampaigns } from '@/lib/campaigns/campaignService';

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
    // For example, parse optional filters from req.query
    const { id, user_id } = req.query;

    const filters = {};
    if (id) filters.id = id;
    if (user_id) filters.user_id = user_id;

    const data = await getCampaigns(filters);
    return handleSuccess(res, data, 200);
  } catch (error) {
    return handleError(res, error);
  }
}
