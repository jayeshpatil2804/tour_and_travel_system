import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import Spinner from '../../../components/common/Spinner';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            const { data } = await api.get('/bookings');
            setBookings(data);
            setLoading(false);
        };
        fetchBookings();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            // FIX: The URL needs to be a template literal string ``
            const { data } = await api.put(`/bookings/${id}/status`, { status });
            setBookings(bookings.map(b => (b._id === id ? data : b)));
        } catch (error) {
            alert('Failed to update status');
        }
    }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-10 bg-gray-100">
                <h1 className="text-3xl font-bold mb-8">Manage Bookings</h1>
                {loading ? <Spinner /> : (
                     <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map(booking => (
                                    <tr key={booking._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.tourPackage.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.user.name} ({booking.user.email})</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                                className="border-gray-300 rounded-md"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManageBookings;