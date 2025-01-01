import { deleteCampaign } from '@/lib/campaigns/campaignService';
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
    // Example: campaignId from req.query if using /api/campaigns/delete/[id]
    const { campaignId } = req.query;

    if (!campaignId) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    const result = await deleteCampaign(campaignId);
    return handleSuccess(res, result, 200);
  } catch (error) {
    return handleError(res, error);
  }
}
