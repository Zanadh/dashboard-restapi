import { UserInterface } from '../interfaces/user';
import Axios, { SuccessResponse } from './axios';

interface SuccessLoginResponse extends UserInterface {
  accessToken: string;
}

export const postAuthGoogle = ({
  accessToken,
}: {
  accessToken: string;
}): Promise<SuccessResponse<SuccessLoginResponse>> => {
  return Axios.post('auth/google', {
    accessToken,
  });
};
