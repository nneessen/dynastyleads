import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const createAdSet = async (adSetData) => {
  try {
    const response = await axios.post(`${BASE_URL}/adsets/create`, adSetData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Failed to create ad set. Please try again.';
    console.error('Error creating ad set:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteAdSet = async (adSetId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/adsets/delete/${adSetId}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Failed to delete the ad set. Please try again.';
    console.error('Error deleting ad set:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateAdSet = async (adSetId, adSetData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/adsets/update/${adSetId}`,
      adSetData
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error updating ad set:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const duplicateAdSet = async (adSetId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/adsets/duplicate/${adSetId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error duplicating ad set:',
      error.response?.data || error.message
    );
    throw error;
  }
};
