import {call, put} from 'redux-saga/effects';
import LoginApi from '../api/index';
import * as actionTypes from '../constants/actionTypes';

import * as commonActionCreator from '../../../common/actions/';
import {loginSuccess, loginComplete} from '../actions/';
import { Action } from 'redux';

export function * userLogin(action: Action<any>) {
  try {
    yield put({type: actionTypes.LOGIN_CHECK_STARTED});

    const userInfo = yield call(LoginApi.loginUser, action.payload);

    yield put(loginSuccess(userInfo));
  } catch (ex) {
    yield put({type: actionTypes.LOGIN_FAILED, exception: ex});
  }
}

export function * userLoginSuccess(action: Action<any>) {
  yield put(loginComplete(action.payload));
  document.cookie = 'test';
  yield put(commonActionCreator.navigate('/'));
}
