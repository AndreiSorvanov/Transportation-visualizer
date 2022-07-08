import { all } from 'redux-saga/effects';
import { pointsWatcher } from './pointsSaga';
import { requestsWatcher } from './requestsSaga';

export function* rootWatcher() {
  yield all([
    pointsWatcher(),
    requestsWatcher()
  ]);
}
