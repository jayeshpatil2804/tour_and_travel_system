import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import DebouncedInput from '../common/DebouncedInput';
import { CalendarIcon, LocationIcon, PriceTagIcon, BusIcon, TrainIcon, ClockIcon } from '../icons/TransportIcons';

const TourFilter = ({ filters, setFilters }) => {
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, [setFilters]);

  const handlePriceRangeChange = useCallback((index, value) => {
    const numValue = parseInt(value) || 0;
    setFilters(prev => ({
      ...prev,
      priceRange: index === 0 
        ? [numValue, prev.priceRange[1]]
        : [prev.priceRange[0], numValue]
    }));
  }, [setFilters]);

  const handleTransportTypeChange = useCallback((e) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const updatedTypes = checked 
        ? [...prev.transportType, value]
        : prev.transportType.filter(type => type !== value);
      
      return {
        ...prev,
        transportType: updatedTypes
      };
    });
  }, [setFilters]);

  const clearFilters = useCallback(() => {
    setFilters({
      destination: '',
      date: '',
      priceRange: [0, 5000],
      transportType: [],
      duration: ''
    });
  }, [setFilters]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter Tours</h3>
      
      <div className="space-y-4">
        {/* Destination Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <LocationIcon className="h-4 w-4 mr-1 text-gray-500" />
            Destination
          </label>
          <DebouncedInput 
            type="text" 
            placeholder="Where do you want to go?" 
            name="destination"
            value={filters.destination} 
            onChange={handleChange}
            delay={300}
          />
        </div>
        
        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
            Travel Date
          </label>
          <Input 
            type="date" 
            name="date"
            value={filters.date} 
            onChange={handleChange} 
          />
        </div>
        
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <PriceTagIcon className="h-4 w-4 mr-1 text-gray-500" />
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <div className="flex space-x-4">
            <Input 
              type="number" 
              placeholder="Min" 
              name="priceRange[0]"
              value={filters.priceRange[0]} 
              onChange={(e) => handlePriceRangeChange(0, e.target.value)} 
            />
            <Input 
              type="number" 
              placeholder="Max" 
              name="priceRange[1]"
              value={filters.priceRange[1]} 
              onChange={(e) => handlePriceRangeChange(1, e.target.value)} 
            />
          </div>
        </div>
        
        {/* Transport Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <div className="flex space-x-1">
              <BusIcon className="h-4 w-4 text-gray-500" />
              <TrainIcon className="h-4 w-4 text-gray-500" />
            </div>
            <span className="ml-1">Transport Type</span>
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input 
                type="checkbox" 
                value="bus"
                checked={filters.transportType.includes('bus')}
                onChange={handleTransportTypeChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Bus</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="checkbox" 
                value="train"
                checked={filters.transportType.includes('train')}
                onChange={handleTransportTypeChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">Train</span>
            </label>
          </div>
        </div>
        
        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
            Duration (days)
          </label>
          <DebouncedInput 
            type="number" 
            placeholder="Max duration" 
            name="duration"
            value={filters.duration} 
            onChange={handleChange} 
            min="1"
            delay={300}
          />
        </div>
        
        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          className="w-full mt-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

TourFilter.propTypes = {
  filters: PropTypes.shape({
    destination: PropTypes.string,
    date: PropTypes.string,
    priceRange: PropTypes.arrayOf(PropTypes.number),
    transportType: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.string
  }).isRequired,
  setFilters: PropTypes.func.isRequired
};

export default React.memo(TourFilter);