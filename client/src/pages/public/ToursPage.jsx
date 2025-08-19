import React, { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../../api/api';
import EnhancedTourCard from '../../components/tours/EnhancedTourCard';
import TourListItem from '../../components/tours/TourListItem';

import TourSort from '../../components/tours/TourSort';
import ViewToggle from '../../components/tours/ViewToggle';
import RecommendedTours from '../../components/tours/RecommendedTours';
import TourHero from '../../components/tours/TourHero';
import TourEmptyState from '../../components/tours/TourEmptyState';
import Spinner from '../../components/common/Spinner';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('price-low');


  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/tours');
        
        // Add consistent transport type data based on tour ID
        const toursWithTransport = data.map(tour => {
          const seed = tour._id ? tour._id.charCodeAt(0) : 0;
          return {
            ...tour,
            transportType: seed % 2 === 0 ? ['bus'] : ['train'],
            availableSeats: (seed % 20) + 1,
            departureTime: seed % 2 === 0 ? '10:00 AM' : '2:00 PM',
            amenities: ['WiFi', 'Meals', 'Guide', 'Hotel Pickup']
          };
        });
        
        setTours(toursWithTransport);
        setFilteredTours(toursWithTransport);
      } catch (err) {
        setError('Failed to fetch tours. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Apply sorting only
  useEffect(() => {
    let result = [...tours];
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'duration-short':
        result.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration-long':
        result.sort((a, b) => b.duration - a.duration);
        break;
      case 'popularity':
        // For demo purposes, we'll just use a random order
        result.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }
    
    setFilteredTours(result);
  }, [tours, sortOption]);
  
  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div>
      <TourHero />
      
      <div className="container mx-auto px-6 py-8">
        {/* Recommended Tours Section */}
        {tours.length > 0 && (
          <div>
            <RecommendedTours tours={tours} />
          </div>
        )}
        
        <div id="all-tours">
          {/* Main content */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Tours</h2>
                <p className="text-gray-600 mt-1">
                  {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <TourSort sortOption={sortOption} setSortOption={setSortOption} />
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
            
            {filteredTours.length === 0 ? (
              <div>
                <TourEmptyState />
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour, index) => (
                  <div key={tour._id}>
                    <EnhancedTourCard tour={tour} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTours.map((tour, index) => (
                  <div key={tour._id}>
                    <TourListItem tour={tour} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;