import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api'; // Import the custom api instance
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            
            // Show password mismatch alert
            Swal.fire({
                icon: 'warning',
                title: 'Password Mismatch',
                text: 'Please make sure both passwords match.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#f59e0b',
                background: '#fffbeb',
                color: '#92400e'
            });
            return;
        }
        
        setError('');
        setIsLoading(true);
        
        try {
            // FIX: Use the 'api' instance for the request
            const { data } = await api.post('/auth/register', { name, email, password });
            login(data.token);
            
            // Show success alert
            await Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: `Welcome to our platform, ${name}! Your account has been created successfully.`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                toast: true,
                position: 'top-end',
                background: '#f0fdf4',
                color: '#166534',
                iconColor: '#10b981'
            });
            
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
            
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
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
                <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
                            required
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                Creating account...
                            </>
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;