import { BASE_URL } from '@/app/constants';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://assignment-todolist-api.vercel.app/api/hiheeen',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
