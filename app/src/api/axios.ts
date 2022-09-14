import axios, { AxiosResponse } from 'axios';

export interface SuccessResponse<T> extends AxiosResponse {
  data: T;
}

const Axios = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
});

export default Axios;
