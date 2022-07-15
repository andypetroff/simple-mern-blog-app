import axios from 'axios';

import { env } from './config';

const instance = axios.create({
    baseURL: `${env.API_URL}`,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});

export default instance;
