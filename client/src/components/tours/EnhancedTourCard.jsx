import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BusIcon, TrainIcon, ClockIcon, UsersIcon } from '../icons/TransportIcons';
import AutoImageSlider from '../common/AutoImageSlider';
import { formatINR } from '../../utils/currency';

const EnhancedTourCard = ({ tour }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

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

  // Get the primary image with fallback options
  const getImageSrc = () => {
    if (imageError) {
      // If image failed to load, use a location-based fallback
      const locationKeyword = tour.location.toLowerCase().includes('rajasthan') ? 'rajasthan-palace' :
                             tour.location.toLowerCase().includes('kerala') ? 'kerala-backwaters' :
                             tour.location.toLowerCase().includes('goa') ? 'goa-beach' :
                             tour.location.toLowerCase().includes('himalaya') ? 'himalaya-mountains' :
                             tour.location.toLowerCase().includes('delhi') ? 'taj-mahal' :
                             'travel-destination';
      return `https://images.unsplash.com/photo-1599661046827-dacde6976549?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
    }
    
    return tour.images && tour.images.length > 0 && tour.images[0] 
      ? tour.images[0] 
      : `https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&h=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <div className="relative">
        <AutoImageSlider
          images={tour.images && tour.images.length > 0 ? tour.images : [getImageSrc()]}
          autoSlideInterval={4000}
          showNavigation={true}
          showDots={tour.images && tour.images.length > 1}
          className="w-full h-56"
          imageClassName="w-full h-56 object-cover"
          alt={tour.title}
        />
        {/* Transport type badge */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {tour.transportType && tour.transportType.map(type => (
            <span key={type}>{renderTransportIcon(type)}</span>
          ))}
        </div>
        {/* Featured badge */}
        {tour.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              FEATURED
            </span>
          </div>
        )}
        {/* Rating badge */}
        {tour.rating && tour.rating > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
              ⭐ {tour.rating.toFixed(1)}
            </span>
          </div>
        )}
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
          <div>
            <p className="text-2xl font-semibold text-blue-600">{formatINR(tour.price)}</p>
            <p className="text-xs text-gray-500">per person</p>
          </div>
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