import * as React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import Cookies from 'js-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { redirectTo } from '@/lib/redirect';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('@/lib/redirect', () => ({
  redirectTo: jest.fn(),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useAuth', () => {
  let originalLocation: Location;

  beforeAll(() => {
    originalLocation = window.location;
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { href: '' };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.location.href = '';
  });

  it('should return isAuthenticated=true, if accessToken is given', () => {
    (Cookies.get as jest.Mock).mockReturnValue('token');
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should return isAuthenticated=false, if accessToken is missing', () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logout should return accessToken, reset isAuthenticated and redirects', () => {
    (Cookies.get as jest.Mock).mockReturnValue('token');
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });

    act(() => {
      result.current.logout();
    });

    expect(Cookies.remove).toHaveBeenCalledWith('accessToken');
    expect(result.current.isAuthenticated).toBe(false);
    expect(redirectTo).toHaveBeenCalledWith('/login');
  });
}); 