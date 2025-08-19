import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode here
import Swal from 'sweetalert2';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data.token);

            // FIX: Add smart redirection based on user role
            const decodedToken = jwtDecode(data.token);
            
            // Show success alert
            await Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: `Welcome back${decodedToken.name ? `, ${decodedToken.name}` : ''}!`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                background: '#f0f9ff',
                color: '#1e40af',
                iconColor: '#10b981'
            });

            if (decodedToken.role === 'admin') {
                navigate('/admin'); // Redirect admins to the dashboard
            } else {
                navigate('/profile'); // Redirect regular users to their profile
            }

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(errorMessage);
            
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#dc2626',
                background: '#fef2f2',
                color: '#991b1b'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow border">
                <h1 className="text-2xl font-bold text-center">Login to your Account</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-2 px-4 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Signing in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;