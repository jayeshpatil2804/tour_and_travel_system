import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import TourPackage from '../models/TourPackage.js';

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = asyncHandler(async (req, res) => {
  const { 
    tourPackageId, 
    numberOfGuests, 
    tourDate,
    customerInfo,
    specialRequests,
    emergencyContact
  } = req.body;
  
  const tour = await TourPackage.findById(tourPackageId);
  if (!tour) {
      res.status(404);
      throw new Error('Tour package not found');
  }

  // Check if tour date is available
  if (tour.availableDates && tour.availableDates.length > 0) {
    const isDateAvailable = tour.availableDates.some(date => 
      new Date(date).toDateString() === new Date(tourDate).toDateString()
    );
    if (!isDateAvailable) {
      res.status(400);
      throw new Error('Selected tour date is not available');
    }
  }

  // Check available seats
  if (tour.availableSeats && tour.availableSeats < numberOfGuests) {
    res.status(400);
    throw new Error('Not enough available seats for this tour');
  }

  const totalAmount = tour.price * numberOfGuests;
  
  // Generate unique booking reference
  const bookingReference = `TRV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const booking = new Booking({
    user: req.user._id,
    tourPackage: tourPackageId,
    numberOfGuests,
    tourDate,
    totalAmount,
    customerInfo,
    specialRequests,
    emergencyContact,
    bookingReference
  });

  const createdBooking = await booking.save();
  
  // Update available seats
  if (tour.availableSeats) {
    tour.availableSeats -= numberOfGuests;
    await tour.save();
  }

  // Populate the response with tour details
  await createdBooking.populate('tourPackage', 'title location images price');
  
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