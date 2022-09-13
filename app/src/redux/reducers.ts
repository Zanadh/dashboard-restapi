import { ACTION_CONSTANTS } from './actions/sessionsActions';

const appInitialState = {
  accessToken: null,
  permissions: '',
  action: '',
};

type ActionType = keyof typeof ACTION_CONSTANTS;
interface ActionInterface {
  payload?: Record<string, string>;
  type: ActionType;
}

export const sessionsReducer = (
  state = appInitialState,
  action: ActionInterface,
): typeof appInitialState => {
  const { payload, type } = action;

  const actions: Partial<Record<ActionType, typeof appInitialState>> = {
    [ACTION_CONSTANTS.LOGIN]: {
      ...state,
      ...payload,
      action: type,
    },
    [ACTION_CONSTANTS.LOGOUT]: {
      ...appInitialState,
      action: type,
    },
  };

  return actions[type] || state;
};
