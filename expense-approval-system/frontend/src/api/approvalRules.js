import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/approval-rules';

// Get all approval rules
export const getRules = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Get rules error:', error);
    throw error;
  }
};

// Create a new approval rule
export const saveRule = async (ruleData) => {
  try {
    const response = await axios.post(BASE_URL, ruleData);
    return response.data;
  } catch (error) {
    console.error('Save rule error:', error);
    throw error;
  }
};
