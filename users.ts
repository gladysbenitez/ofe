import Actions from './actions';
import { ActionObject as Action, UserState } from './types';

const initialState: UserState = {
  list: [],
  error: null, 
  userIndex: 0
};

const users = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case Actions.users.fetchUsers.success.toString():
      return {
        ...state,
        list: action.payload,
        error: null
      };
    case Actions.users.fetchUsers.error.toString():
      return {
        ...state,
        error: action.payload
      };
      case 'INCREMENT_USER':
        if (
          (state.list.length -2 ) >= state.userIndex){
        return {
          ...state,
          userIndex: state.userIndex + 1,
          error: null
        };
      }
      return {
        ...state, 
        userIndex:0
      }
      case 'DECREMENT_USER':
        if (
         state.userIndex >= 1){
        return {
          ...state,
          userIndex: state.userIndex - 1,
          error: null
        };
      }
      return {
        ...state, 
        userIndex:9
      }
    default:
      return state;
  }
};

export default users;
