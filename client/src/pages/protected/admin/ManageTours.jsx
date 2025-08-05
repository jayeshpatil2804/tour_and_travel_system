import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import Spinner from '../../../components/common/Spinner';
import TourForm from '../../../components/admin/TourForm';

const ManageTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTour, setEditingTour] = useState(null);

    const fetchTours = async () => {
        setLoading(true);
        const { data } = await api.get('/tours');
        setTours(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tour?')) {
            try {
                // FIX: The URL needs to be a template literal string ``
                await api.delete(/tours/${id});
                setTours(tours.filter(tour => tour._id !== id));
                alert('Tour deleted successfully');
            } catch (error) {
                alert('Failed to delete tour');
            }
        }
    };
    
    const handleFormSubmit = () => {
        setIsFormVisible(false);
        setEditingTour(null);
        fetchTours(); // Refetch tours to see changes
    };

    const handleEdit = (tour) => {
        setEditingTour(tour);
        setIsFormVisible(true);
    };

    const handleAddNew = () => {
        setEditingTour(null);
        setIsFormVisible(true);
    };

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-10 bg-gray-100">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Manage Tours</h1>
                    <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add New Tour</button>
                </div>
                {loading ? <Spinner /> : (
                    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tours.map(tour => (
                                    <tr key={tour._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{tour.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{tour.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">${tour.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => handleEdit(tour)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(tour._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            {isFormVisible && (
                <TourForm 
                    tour={editingTour}
                    onFormSubmit={handleFormSubmit}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}
        </div>
    );
};

export default ManageTours;