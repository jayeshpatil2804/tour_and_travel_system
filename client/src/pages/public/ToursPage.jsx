import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourCard from '../../components/tours/TourCard';
import Spinner from '../../components/common/Spinner';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/tours');
        setTours(data);
      } catch (err) {
        setError('Failed to fetch tours. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Explore Our Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map(tour => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default ToursPage;