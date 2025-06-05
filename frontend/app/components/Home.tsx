'use client';

import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen  text-white font-poppins">
     
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-5xl font-extrabold text-black mb-6">Task Manager</h1>
          <p className="text-2xl mb-8">Organize your tasks and manage your time effectively with ease.</p>
          <Link href="/signup">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

  

    
  );
};

export default Home;
