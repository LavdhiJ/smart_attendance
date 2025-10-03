import axios from '../axiosConfig';

export const dropdownService = {
  // Get branches
  getBranches: async () => {
    const response = await axios.get('/api/branches');
    return response.data;
  },

  // Get years
  getYears: async () => {
    const response = await axios.get('/api/dropdowns/years');
    return response.data;
  },

  // Get sections
  getSections: async () => {
    const response = await axios.get('/api/dropdowns/sections');
    return response.data;
  },

  // Get semesters
  getSemesters: async () => {
    const response = await axios.get('/api/dropdowns/semesters');
    return response.data;
  },
};
