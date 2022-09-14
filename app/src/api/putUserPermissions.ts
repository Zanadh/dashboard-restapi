import { UserInterface } from '../interfaces/user';
import Axios, { SuccessResponse } from './axios';

export const putUserPermissions = ({
  email,
  permissions,
}: {
  email: string;
  permissions: string;
}): Promise<SuccessResponse<UserInterface>> => {
  return Axios.put('user/permissions', {
    email,
    permissions,
  });
};
