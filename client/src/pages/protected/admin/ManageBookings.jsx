import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { adminService } from '../../../services/adminService';
import { toast } from 'react-hot-toast';
import ConfirmModal from '../../../components/admin/ConfirmModal';
import BookingDetailsModal from '../../../components/admin/BookingDetailsModal';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingBookings, setUpdatingBookings] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    // Add loading state for this specific booking
    setUpdatingBookings(prev => new Set(prev).add(bookingId));
    
    try {
      const response = await adminService.updateBookingStatus(bookingId, newStatus);
      
      // Check if the response indicates success
      if (response && (response.status === newStatus || response._id)) {
        // Update the booking in state immediately
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
        
        // Show success message
        const statusMessages = {
          'confirmed': 'approved',
          'completed': 'completed',
          'cancelled': 'cancelled'
        };
        toast.success(`Booking ${statusMessages[newStatus] || newStatus} successfully!`, {
          duration: 3000,
          position: 'top-center',
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      
      // Show specific error message
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update booking status';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      // Remove loading state for this booking
      setUpdatingBookings(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookingId);
        return newSet;
      });
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await adminService.deleteBooking(bookingId);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
      toast.success('Booking deleted successfully');
    } catch (error) {
      toast.error('Failed to delete booking');
      console.error('Error deleting booking:', error);
    }
  };

  const openConfirmModal = (action, booking) => {
    setConfirmAction({ action, booking });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    const { action, booking } = confirmAction;
    
    if (action === 'delete') {
      await handleDeleteBooking(booking._id);
    } else {
      await handleStatusUpdate(booking._id, action);
    }
    
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const openBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🎯' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = 
        booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.tourPackage?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingReference?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'customer':
          return a.user?.name?.localeCompare(b.user?.name) || 0;
        case 'tour':
          return a.tourPackage?.title?.localeCompare(b.tourPackage?.title) || 0;
        case 'amount':
          return (b.totalAmount || 0) - (a.totalAmount || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="mt-2 text-gray-600">View, approve, reject, or cancel tour bookings.</p>
        </div>
        
        {/* Controls */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="customer">Sort by Customer</option>
                <option value="tour">Sort by Tour</option>
                <option value="amount">Sort by Amount</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              Total: {filteredBookings.length} bookings
            </div>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{booking.bookingReference || booking._id.slice(-6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.user?.name}</div>
                          <div className="text-sm text-gray-500">{booking.user?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.tourPackage?.title}</div>
                          <div className="text-sm text-gray-500">{booking.tourPackage?.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(booking.tourDate || booking.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{booking.totalAmount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(booking.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openBookingDetails(booking)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                            >
                              👁️ View
                            </button>
                            
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => openConfirmModal('confirmed', booking)}
                                  className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                >
                                  ✅ Approve
                                </button>
                                <button
                                  onClick={() => openConfirmModal('cancelled', booking)}
                                  className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                >
                                  ❌ Reject
                                </button>
                              </>
                            )}
                            
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => openConfirmModal('completed', booking)}
                                className="text-purple-600 hover:text-purple-900 transition-colors duration-200"
                              >
                                🎯 Complete
                              </button>
                            )}
                            
                            <button
                              onClick={() => openConfirmModal('delete', booking)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-200"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        {searchTerm || statusFilter !== 'all' ? 'No bookings match your filters' : 'No bookings found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Confirm Modal */}
        {showConfirmModal && confirmAction && (
          <ConfirmModal
            title={`${confirmAction.action === 'delete' ? 'Delete' : confirmAction.action.charAt(0).toUpperCase() + confirmAction.action.slice(1)} Booking`}
            message={`Are you sure you want to ${confirmAction.action === 'delete' ? 'delete' : confirmAction.action} this booking?`}
            confirmText={confirmAction.action === 'delete' ? 'Delete' : 'Confirm'}
            confirmColor={confirmAction.action === 'delete' ? 'red' : 'blue'}
            onConfirm={handleConfirmAction}
            onCancel={() => {
              setShowConfirmModal(false);
              setConfirmAction(null);
            }}
          />
        )}

        {/* Booking Details Modal */}
        {showDetailsModal && selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedBooking(null);
            }}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </main>
    </div>
  );
};

export default ManageBookings;