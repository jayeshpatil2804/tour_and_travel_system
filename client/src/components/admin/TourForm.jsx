import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const TourForm = ({ tour, onFormSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    duration: '',
    maxGroupSize: '',
    images: '', // Handling as a comma-separated string for simplicity
  });

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title,
        description: tour.description,
        location: tour.location,
        price: tour.price,
        duration: tour.duration,
        maxGroupSize: tour.maxGroupSize,
        images: tour.images.join(', '),
      });
    }
  }, [tour]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tourData = {
      ...formData,
      images: formData.images.split(',').map(img => img.trim()),
    };

    try {
      let response;
      if (tour) {
        // Update existing tour
        response = await api.put(`/tours/${tour._id}`, tourData);
      } else {
        // Create new tour
        response = await api.post('/tours', tourData);
      }
      onFormSubmit(response.data);
    } catch (error) {
      console.error('Failed to save tour', error);
      alert('Error: Could not save tour.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{tour ? 'Edit Tour' : 'Add New Tour'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" required />
          <div className="grid grid-cols-3 gap-4">
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price ($)" className="w-full p-2 border rounded" required />
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (days)" className="w-full p-2 border rounded" required />
            <input type="number" name="maxGroupSize" value={formData.maxGroupSize} onChange={handleChange} placeholder="Group Size" className="w-full p-2 border rounded" required />
          </div>
          <input name="images" value={formData.images} onChange={handleChange} placeholder="Image URLs (comma-separated)" className="w-full p-2 border rounded" />
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Tour</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourForm;