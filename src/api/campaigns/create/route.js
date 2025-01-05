import { NextApiRequest, NextApiResponse } from 'next';
import { handleSuccess, handleError } from '../..//responseHandler';
// Adjust the relative path to match your 'utils/responseHandler' location
import { ERROR_CODES } from '../../utils/errorCodes';
import { createCampaign } from '@/lib/campaigns/campaignService';

export async function POST(request) {
  // Instead of (req, res), the App Router uses different signatures.
  // We'll parse request body with await request.json()

  try {
    const reqBody = await request.json();

    const {
      campaign_name,
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
    } = reqBody;

    if (!campaign_name || !user_id) {
      return handleError(
        new Error(ERROR_CODES.BAD_REQUEST.message),
        400,
        ERROR_CODES.BAD_REQUEST.code
      );
    }

    const result = await createCampaign({
      campaign_name,
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

    // handleSuccess was previously (res, data, status).
    // In the new App Router, we typically return NextResponse.json()
    return handleSuccess(result, 201);
  } catch (error) {
    return handleError(error);
  }
}
