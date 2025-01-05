import { NextResponse } from 'next/server';
import { createCampaignOnMeta } from '@/lib/campaigns/campaignService';
// If you're sure that's the correct import path

/**
 * A more verbose route that logs each step to the terminal.
 * It doesn't rely on handleSuccess/handleError, so we can see exactly what's happening.
 */
export async function POST(request) {
  // 1) Start logging
  console.log(
    '=== [DEBUG create/route.js] POST /api/campaigns/create START ==='
  );

  try {
    // 2) Show the entire request headers + any known info
    console.log(
      '[DEBUG route.js] request.headers =',
      Object.fromEntries(request.headers)
    );

    // 3) Attempt to parse JSON body
    const reqBody = await request.json().catch((parseErr) => {
      console.log('[DEBUG route.js] Error parsing JSON:', parseErr);
      throw new Error('Invalid JSON in request body');
    });

    console.log('[DEBUG route.js] Parsed request body ->', reqBody);

    // 4) Extract fields
    const {
      campaign_name,
      user_id,
      states,
      daily_budget,
      lifecycle_budget,
      is_active,
      lead_types,
      campaign_type_id,
      max_leads_per_day,
      target_audience,
      notes
    } = reqBody;

    // 5) Check required fields
    if (!campaign_name || !user_id) {
      console.log('[DEBUG route.js] Missing required fields:', {
        campaign_name,
        user_id
      });
      return NextResponse.json(
        { success: false, error: 'Missing campaign_name or user_id' },
        { status: 400 }
      );
    }

    // 6) Call the createCampaignOnMeta function
    console.log('[DEBUG route.js] calling createCampaignOnMeta...');
    const result = await createCampaignOnMeta({
      campaign_name,
      user_id,
      states,
      daily_budget,
      lifecycle_budget,
      is_active,
      lead_types,
      campaign_type_id,
      max_leads_per_day,
      target_audience,
      notes
    }).catch((err) => {
      console.log('[DEBUG route.js] Error from createCampaignOnMeta:', err);
      throw err; // rethrow so we catch it below
    });

    // 7) If we get here, creation presumably succeeded
    console.log('[DEBUG route.js] createCampaignOnMeta result ->', result);

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err) {
    // 8) Log the full error stack
    console.log('[DEBUG route.js] Caught top-level error:', err);
    // Return a 500 for the sake of clarity
    return NextResponse.json(
      { success: false, error: err.message, stack: err.stack },
      { status: 500 }
    );
  } finally {
    console.log(
      '=== [DEBUG create/route.js] POST /api/campaigns/create END ==='
    );
  }
}
