import { handleSuccess, handleError } from '../utils/responseHandler';
import { ERROR_CODES } from '../utils/errorCodes';
// The updated createCampaign now calls Meta first, then inserts in DB:
import { createCampaign } from '@/lib/campaigns/campaignService';

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
    // The fields remain exactly as in your snippet
    const {
      id,
      campaign_name,
      created_on,
      states,
      daily_budget,
      lifecycle_budget,
      is_active,
      lead_types,
      user_id,
      campaign_type_id,
      max_leads_per_day,
      target_audience,
      notes
    } = req.body;

    if (!campaign_name || !user_id) {
      return handleError(
        res,
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    // This now calls the updated createCampaign that also does the Meta API call
    const data = await createCampaign({
      id,
      campaign_name,
      created_on,
      states,
      daily_budget,
      lifecycle_budget,
      is_active,
      lead_types,
      user_id,
      campaign_type_id,
      max_leads_per_day,
      target_audience,
      notes
    });

    return handleSuccess(res, data, 201);
  } catch (error) {
    return handleError(res, error);
  }
}
