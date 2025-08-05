import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import TourPackage from '../models/TourPackage.js';

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = asyncHandler(async (req, res) => {
  const { tourPackageId, numberOfGuests } = req.body;
  
  const tour = await TourPackage.findById(tourPackageId);
  if (!tour) {
      res.status(404);
      throw new Error('Tour package not found');
  }

  const totalAmount = tour.price * numberOfGuests;

  const booking = new Booking({
    user: req.user._id,
    tourPackage: tourPackageId,
    numberOfGuests,
    totalAmount,
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

/**
 * @desc    Get bookings for the logged-in user
 * @route   GET /api/bookings/mybookings
 * @access  Private
 */
export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('tourPackage', 'title location images');
  res.json(bookings);
});

/**
 * @desc    Get all bookings (for admin)
 * @route   GET /api/bookings
 * @access  Private/Admin
 */
export const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('tourPackage', 'title');
    res.json(bookings);
});

/**
 * @desc    Update booking status (for admin)
 * @route   PUT /api/bookings/:id/status
 * @access  Private/Admin
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking) {
        booking.status = status || booking.status;
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
});