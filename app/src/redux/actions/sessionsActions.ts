export const ACTION_CONSTANTS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const login = (payload: Record<string, string>) => ({
  type: ACTION_CONSTANTS.LOGIN,
  payload,
});

export const logout = () => ({
  type: ACTION_CONSTANTS.LOGOUT,
});
