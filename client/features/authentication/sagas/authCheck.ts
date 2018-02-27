import { put } from 'redux-saga/effects';

import { navigate } from 'common/actions';
import { loginSuccess } from '../actions/';

export function * authCheck() {
  if (document.cookie) {
    yield put(loginSuccess({}));
  } else {
    navigate('/Login');
  }
}
