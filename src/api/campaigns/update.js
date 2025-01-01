import { updateCampaign } from '@/lib/campaigns/campaignService';
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
    // Example: pass campaignId and new fields in the body
    const { campaignId, ...updates } = req.body;

    if (!campaignId) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    const updatedCampaign = await updateCampaign(campaignId, updates);
    return handleSuccess(res, updatedCampaign, 200);
  } catch (error) {
    return handleError(res, error);
  }
}
