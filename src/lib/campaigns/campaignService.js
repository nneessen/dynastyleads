import { createClient } from '@/utils/supabase/client.js';

const supabase = createClient();
export const createCampaign = async (campaignData) => {
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
  } = campaignData;

  try {
    const { data, error } = await supabase.from('campaigns').insert({
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

    if (error) throw error;

    return data;
  } catch (err) {
    throw new Error(`Failed to create campaign in DB: ${err.message}`);
  }
};

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
