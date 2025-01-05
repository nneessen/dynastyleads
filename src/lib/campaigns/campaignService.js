import { createClient } from '@/utils/supabase/client.js';

const META_GRAPH_API = process.env.META_GRAPH_API;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
console.log('[DEBUG] META_GRAPH_API=', META_GRAPH_API);
console.log('[DEBUG] AD_ACCOUNT_ID=', AD_ACCOUNT_ID);
console.log('[DEBUG] ACCESS_TOKEN=', ACCESS_TOKEN);

const supabase = createClient();

export const createCampaign = async (campaignData) => {
  const {
    id, // if you pass in an 'id' (Meta ID?), we might ignore or override it
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
  } = campaignData;

  try {
    const metaResponse = await fetch(
      `${META_GRAPH_API}/${AD_ACCOUNT_ID}/campaigns`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: campaign_name,
          objective: 'OUTCOME_TRAFFIC',
          status: is_active ? 'ACTIVE' : 'PAUSED',
          special_ad_categories: ['NONE'] // or HOUSING, etc., if needed
        })
      }
    );

    if (!metaResponse.ok) {
      const errorBody = await metaResponse.json();
      throw new Error(
        errorBody.error?.message || 'Meta campaign creation failed'
      );
    }

    const metaData = await metaResponse.json();
    const metaCampaignId = metaData.id; // We'll store this as 'id' in Supabase

    // B) Insert into Supabase (using metaCampaignId as our 'id' column)
    const { data, error } = await supabase.from('campaigns').insert({
      id: metaCampaignId, // Overriding any passed-in 'id' from the argument
      campaign_name,
      created_on: created_on || new Date(), // if you didn't pass one, default to now
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

    if (error) throw error;

    // Return the newly inserted row(s)
    return data;
  } catch (err) {
    throw new Error(`Failed to create campaign in DB: ${err.message}`);
  }
};

// 2. Fetch campaigns
export const getCampaigns = async (filters = {}) => {
  try {
    const query = supabase.from('campaigns').select('*');

    if (filters.id) query.eq('id', filters.id);
    if (filters.user_id) query.eq('user_id', filters.user_id);

    const { data, error } = await query;
    if (error) throw error;

    return data;
  } catch (err) {
    throw new Error(`Failed to fetch campaigns: ${err.message}`);
  }
};

// 3. Update campaign
export const updateCampaign = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    return data;
  } catch (err) {
    throw new Error(`Failed to update campaign: ${err.message}`);
  }
};

// 4. Delete campaign
export const deleteCampaign = async (id) => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return data;
  } catch (err) {
    throw new Error(`Failed to delete campaign: ${err.message}`);
  }
};
