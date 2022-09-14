import { UserInterface } from '../interfaces/user';
import Axios, { SuccessResponse } from './axios';

export const getAllUser = (): Promise<SuccessResponse<{ data: UserInterface[] }>> => {
  return Axios.get('users');
};
