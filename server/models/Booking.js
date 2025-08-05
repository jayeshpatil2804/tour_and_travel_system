import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tourPackage: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
  bookingDate: { type: Date, default: Date.now },
  numberOfGuests: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;