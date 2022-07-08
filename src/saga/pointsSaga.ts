import { put, takeEvery } from 'redux-saga/effects';
import { getPoints } from '../api/getPoints';
import { FETCH_POINTS, updatePointsAction, isPointsListLoadingAction } from '../store';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* pointsWorker() {
  yield put(isPointsListLoadingAction(true));
  yield delay(1000);

  const points = getPoints();
  yield put(updatePointsAction(points));

  yield put(isPointsListLoadingAction(false));
}

export function* pointsWatcher() {
  yield takeEvery(FETCH_POINTS, pointsWorker);
}
