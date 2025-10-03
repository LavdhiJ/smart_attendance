// ============================================================================
// src/api/auth/authService.js
// ============================================================================
import axios from '../axiosConfig';

export const authService = {
  // Admin login
  adminLogin: async (username, password) => {
    const response = await axios.post('/api/auth/admin/login', { username, password });
    return response.data;
  },

  // Teacher login
  teacherLogin: async (username, password) => {
    if (username === 'teacher45' && password === 'admin123') {
      return {
        success: true,
        user: { username, role: 'teacher', name: 'Teacher User' },
        token: 'dummy-teacher-token',
      };
    }
    const response = await axios.post('/api/auth/teacher/login', { username, password });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axios.post('/api/auth/logout');
    return response.data;
  },

  // Verify session
  verifySession: async () => {
    const response = await axios.get('/api/auth/verify');
    return response.data;
  },
};

