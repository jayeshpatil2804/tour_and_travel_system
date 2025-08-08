import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
// Corrected imports below
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';


const router = express.Router();

// Authenticated user routes
router.post('/', authMiddleware, createBooking);
router.get('/mybookings', authMiddleware, getUserBookings);

// Admin routes - chain the correct middleware
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.put('/:id/status', authMiddleware, adminMiddleware, updateBookingStatus);

export default router;