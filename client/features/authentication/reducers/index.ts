import * as actionTypes from '../constants/actionTypes';

export default function UserLogin(state: any = {}, action: any) {
  switch (action.type) {
    case actionTypes.LOGIN_CHECK_STARTED:
      return {
        ...state,
        isLoginInProgress: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuth: false,
        userInfo: null,
      };
    case actionTypes.LOGIN_COMPLETE:
      return {
        ...state,
        userInfo: action.payload,
        isAuth: true,
        isLoginFailed: false,
        isLoginInProgress: false,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoginFailed: true,
        isLoginInProgress: false,
      };
    default:
      return state;
  }
}
