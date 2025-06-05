'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import apiClient from '@/lib/apiClient'; // Importing the API client
import { toast, ToastContainer } from 'react-toastify'; // Importing toast
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for Toastify

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await apiClient.post('/auth/signup', { name, email, password });
    console.log(response.data);

    toast.success('Signup successful!');
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('AxiosError response:', err.response);
      if (err.response) {
        toast.error(`Error: ${err.response.data.message || 'Something went wrong on the server!'}`);
      } else if (err.request) {
        toast.error('No response from the server. Please try again later.');
      } else {
        toast.error('An error occurred while making the request. Please try again.');
      }
    } else if (err instanceof Error) {
      console.error('Error message:', err.message);
      toast.error('An unexpected error occurred. Please try again.');
    } else {
      console.error('Unknown error:', err);
      toast.error('An unknown error occurred. Please try again later.');
    }
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-purple-600 mb-4">Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link href="/login" className="text-sm font-semibold text-purple-600 hover:underline">Login</Link>
        </div>
      </div>
      
      {/* Toast container to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
