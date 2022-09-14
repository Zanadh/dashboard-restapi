import { UserInterface } from '../../interfaces/user';

export const ACTION_CONSTANTS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export interface LoginActionPayload extends UserInterface {
  accessToken: string;
}

export const login = (payload: LoginActionPayload) => ({
  type: ACTION_CONSTANTS.LOGIN,
  payload,
});

export const logout = () => ({
  type: ACTION_CONSTANTS.LOGOUT,
});
