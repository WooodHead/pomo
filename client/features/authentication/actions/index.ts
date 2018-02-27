import * as actionTypes from '../constants/actionTypes';
import {dispatch} from 'Store';

const logout = () => dispatch({ type: actionTypes.LOGOUT });
const login = (payload: any) => dispatch({ type: actionTypes.LOGIN_CHECK, payload });
const loginSuccess = (userInfo: any) => dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: userInfo });
const loginComplete = (userInfo: any) => dispatch({ type: actionTypes.LOGIN_COMPLETE, payload: userInfo });
const authCheck = () => dispatch({ type: actionTypes.AUTH_CHECK });

export {logout, login, loginSuccess, loginComplete, authCheck };
