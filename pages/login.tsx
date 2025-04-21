'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function ProtectedPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      // Save a cookie indicating that the user is authenticated
      Cookies.set('auth', 'true', { expires: 1 }); // expires in 1 day
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(data.message || 'Something went wrong!');
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (isAuthenticated || Cookies.get('auth')) {
    return (
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Protected Content</h1>
        <p className="text-xl">You are now authenticated!</p>
        <button onClick={handleLogout} className="mt-4 p-3 bg-blue-500 text-white rounded-lg">
          Log out
        </button>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 text-black"
          />
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">
            Submit
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </main>
  );
}
