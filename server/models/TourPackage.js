import mongoose from 'mongoose';

const tourPackageSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in days
  maxGroupSize: { type: Number, required: true },
  images: [{ type: String }],
}, { timestamps: true });

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);
export default TourPackage;