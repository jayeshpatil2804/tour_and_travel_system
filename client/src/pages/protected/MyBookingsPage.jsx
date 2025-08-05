import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Spinner from '../../components/common/Spinner';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const { data } = await api.get('/bookings/mybookings');
                setBookings(data);
            } catch (err) {
                setError('Failed to fetch your bookings.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    if (loading) return <Spinner />;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
            {bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                <div className="space-y-4">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                               {/* FIX: The placeholder URL needs to be a template literal string `` */}
                               <img 
                                 src={booking.tourPackage.images[0] || https://picsum.photos/seed/${booking.tourPackage._id}/100/100} 
                                 alt={booking.tourPackage.title}
                                 className="w-24 h-24 object-cover rounded-md"
                                />
                               <div>
                                    <h2 className="text-xl font-semibold">{booking.tourPackage.title}</h2>
                                    <p className="text-gray-600">{booking.tourPackage.location}</p>
                                    <p className="text-sm text-gray-500">Booked on: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">${booking.totalAmount}</p>
                                <span className={px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;