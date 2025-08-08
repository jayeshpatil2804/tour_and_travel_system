import React from 'react';
import { Link } from 'react-router-dom';
import { BusIcon, TrainIcon, ClockIcon, UsersIcon } from '../icons/TransportIcons';

const EnhancedTourCard = ({ tour }) => {
  // Function to render transport type icon
  const renderTransportIcon = (type) => {
    if (type === 'bus') {
      return (
        <div className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <BusIcon className="h-4 w-4 mr-1" />
          Bus
        </div>
      );
    } else if (type === 'train') {
      return (
        <div className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          <TrainIcon className="h-4 w-4 mr-1" />
          Train
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <div className="relative">
        <img 
          src={tour.images[0] || `https://picsum.photos/seed/${tour._id}/400/300`} 
          alt={tour.title} 
          className="w-full h-56 object-cover" 
        />
        {/* Transport type badge */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {tour.transportType && tour.transportType.map(type => (
            <span key={type}>{renderTransportIcon(type)}</span>
          ))}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 truncate">{tour.title}</h3>
        <p className="text-gray-600 mt-1">{tour.location}</p>
        
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <ClockIcon className="h-5 w-5 mr-1 text-gray-400" />
          <span>{tour.duration} Days</span>
        </div>
        
        {tour.amenities && tour.amenities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tour.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {tour.amenities.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">+{tour.amenities.length - 3} more</span>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-semibold text-blue-600">${tour.price}</p>
          {tour.availableSeats && (
            <span className="flex items-center text-sm text-gray-500">
              <UsersIcon className="h-4 w-4 mr-1" />
              {tour.availableSeats} seats left
            </span>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link 
            to={`/tours/${tour._id}`} 
            className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <span>View Details</span>
          </Link>
          <Link 
            to={`/tours/${tour._id}?book=true`} 
            className="flex-1 bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
          >
            <span>Book Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTourCard;