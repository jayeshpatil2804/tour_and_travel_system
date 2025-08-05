import React from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-[calc(100vh-140px)]">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
        <p className="mt-2 text-gray-600">Select an option from the sidebar to manage your application.</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Tours</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">15</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Bookings</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">120</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Users</h2>
                <p className="text-3xl font-bold text-purple-600 mt-2">350</p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;