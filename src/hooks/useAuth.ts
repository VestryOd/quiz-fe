'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // We use useEffect to safely check for the token only on the client-side
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    Cookies.remove('accessToken');
    setIsAuthenticated(false);
    // Invalidate all queries to clear user-specific data
    queryClient.invalidateQueries();
    // Redirect to login page
    window.location.href = '/login';
  };

  return { isAuthenticated, logout };
}; 