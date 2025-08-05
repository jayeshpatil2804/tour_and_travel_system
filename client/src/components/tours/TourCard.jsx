import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      {/* FIX: The placeholder URL needs to be a template literal string `` */}
      <img src={tour.images[0] || `https://picsum.photos/seed/${tour._id}/400/300`} alt={tour.title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 truncate">{tour.title}</h3>
        <p className="text-gray-600 mt-1">{tour.location}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-semibold text-blue-600">${tour.price}</p>
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{tour.duration} Days</span>
        </div>
        <Link to={`/tours/${tour._id}`} className="block w-full text-center mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;