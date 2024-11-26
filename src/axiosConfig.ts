import axios, { AxiosInstance } from 'axios';

export const baseURL: string = import.meta.env.VITE_BE_URL as string;

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    (error: Error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;