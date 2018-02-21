import { takeLatest, fork } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {browserHistory} from '../../store';
import { Action } from 'redux';

function* navigateSaga(action: Action<string>) {
  yield browserHistory.push(action.payload);
}

export default [
  takeLatest(actionTypes.NAVIGATE, navigateSaga),
];
