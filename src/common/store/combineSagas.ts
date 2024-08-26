import { all } from 'redux-saga/effects';
import { dashboardSagas } from '../../Dashboard/redux/sagas';

export function* sagas() {
  yield all([...dashboardSagas]);
}
