import navigateSaga from './navigateSaga';

const sagasList = [
  navigateSaga,
];

export function* sagas() {
  yield sagasList;
}
