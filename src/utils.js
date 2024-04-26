import axios from 'axios';

export const customFetch = axios.create({
  baseURL: 'https://localhost:5000/api/tasks',
});
