import navigateSaga from './navigateSaga';
import loginSaga from 'features/authentication/sagas';

const sagasList = [
  navigateSaga,
  loginSaga,
];

export function* sagas() {
  yield sagasList;

}
