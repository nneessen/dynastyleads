import { createClient } from '@/utils/supabase/client.js';

const META_GRAPH_API = process.env.META_GRAPH_API;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
console.log('[DEBUG] META_GRAPH_API=', META_GRAPH_API);
console.log('[DEBUG] AD_ACCOUNT_ID=', AD_ACCOUNT_ID);
console.log('[DEBUG] ACCESS_TOKEN=', ACCESS_TOKEN);

const supabase = createClient();

export async function createCampaignOnMeta(campaignData) {
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
  } = campaignData;

  try {
    // 1) Create the campaign in Meta
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
          special_ad_categories: ['NONE'] // or "HOUSING" if relevant
        })
      }
    );

    if (!metaResponse.ok) {
      const errorBody = await metaResponse.json();
      throw new Error(
        errorBody.error?.message || 'Failed to create campaign on Meta'
      );
    }

    const metaData = await metaResponse.json();
    const metaCampaignId = metaData.id; // We'll store this in Supabase

    // 2) Insert into Supabase
    const { data, error } = await supabase.from('campaigns').insert({
      id: metaCampaignId, // store the meta ID in our "id" column
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
      notes,
      created_on: new Date()
    });

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return data;
  } catch (err) {
    throw new Error(`createCampaignOnMeta error: ${err.message}`);
  }
}
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
