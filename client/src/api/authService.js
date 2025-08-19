import api from './api';

class AuthService {
  // Login user
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  }

  // Admin registration
  async registerAdmin(name, email, password) {
    try {
      const response = await api.post('/auth/register-admin', { name, email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Admin registration failed' };
    }
  }

  // Admin login
  async adminLogin(email, password) {
    try {
      const response = await api.post('/auth/admin-login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Admin login failed' };
    }
  }
}

export default new AuthService();