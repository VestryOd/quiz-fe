import Axios, { type AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001",
});

// Request interceptor to add the auth token header to every request
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// --- Response interceptor for token refresh ---
let isRefreshing = false;
let failedQueue: { resolve: (value?: string | null) => void; reject: (reason?: AxiosError | null) => void }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as { _retry?: boolean })._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest) {
              (originalRequest as { headers?: Record<string, string> }).headers!['Authorization'] = 'Bearer ' + token;
              return AXIOS_INSTANCE(originalRequest);
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      (originalRequest as { _retry?: boolean })._retry = true;
      isRefreshing = true;

      try {
        // Refresh token logic. We might need to send a refresh token from cookies.
        // To the endpoint is /auth/refresh-token
        const { data } = await AXIOS_INSTANCE.post('/auth/refresh-token');
        
        Cookies.set('accessToken', data.token, { expires: 7 });
        AXIOS_INSTANCE.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        (originalRequest as { headers?: Record<string, string> }).headers!['Authorization'] = 'Bearer ' + data.token;

        processQueue(null, data.token);
        if (originalRequest) {
          return AXIOS_INSTANCE(originalRequest);
        }
      } catch (refreshError: unknown) {
        processQueue(refreshError as AxiosError, null);
        // On refresh error, logout user
        Cookies.remove('accessToken');
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// The custom instance that orval will use for the generated hooks
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return AXIOS_INSTANCE({ ...config, ...options }).then(({ data }) => data);
};

export default customInstance;
