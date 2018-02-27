import {put} from 'redux-saga/effects';
import * as actionCreator from '../../../common/actions/';

export function * userLogout() {
  yield put(actionCreator.navigate('/Login'));
}
