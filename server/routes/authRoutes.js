import express from 'express';
import { registerUser, loginUser, registerAdmin, adminLogin, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/register-admin', registerAdmin);
router.post('/admin-login', adminLogin);
router.get('/profile', protect, getProfile);

export default router;