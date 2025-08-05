import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    const activeLink = "bg-blue-600 text-white";
    const normalLink = "hover:bg-gray-700";

    return (
        <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">Admin Panel</div>
            <nav>
                <ul>
                    {/* FIX: The entire className string must be wrapped in backticks `` */}
                    <li>
                        <NavLink to="/admin" end className={({isActive}) => block p-4 ${isActive ? activeLink : normalLink}}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/tours" className={({isActive}) => block p-4 ${isActive ? activeLink : normalLink}}>Manage Tours</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/bookings" className={({isActive}) => block p-4 ${isActive ? activeLink : normalLink}}>Manage Bookings</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default AdminSidebar;