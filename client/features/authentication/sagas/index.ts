import { takeLatest, fork } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import { userLogin, userLoginSuccess } from './userLogin';
import {userLogout} from './userLogout';
import {authCheck} from './authCheck';

const loginSaga = [
  takeLatest(actionTypes.LOGIN_CHECK, userLogin),
  takeLatest(actionTypes.LOGIN_SUCCESS, userLoginSuccess),
  takeLatest(actionTypes.LOGOUT, userLogout),
  takeLatest(actionTypes.AUTH_CHECK, authCheck),
];

export default loginSaga;
