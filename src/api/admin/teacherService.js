
// ============================================================================
// src/api/admin/teacherService.js
// ============================================================================
import axios from '../axiosConfig';

export const teacherService = {
  // Get all teachers
  getTeachers: async () => {
    const response = await axios.get('/api/admin/teachers');
    return response.data;
  },

  // Add teacher
  addTeacher: async (username, password) => {
    const response = await axios.post('/api/admin/teachers', { username, password });
    return response.data;
  },

  // Update teacher
  updateTeacher: async (teacherId, data) => {
    const response = await axios.put(`/api/admin/teachers/${teacherId}`, data);
    return response.data;
  },
};

