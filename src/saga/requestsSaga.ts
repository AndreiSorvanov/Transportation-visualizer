import { put, takeEvery } from 'redux-saga/effects';
import { getRequests } from '../api/getRequests';
import { createRequest } from '../api/createRequest';
import { updateRequest } from '../api/updateRequest';
import { deleteRequest } from '../api/deleteRequest';
import { FETCH_REQUESTS, FETCH_CREATE_REQUEST, FETCH_UPDATE_REQUEST, FETCH_DELETE_REQUEST, isRequestsListLoadingAction, updateRequestsAction, createRequestAction, updateRequestAction, deleteRequestAction } from '../store';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function* requestsWorker() {
  yield put(isRequestsListLoadingAction(true));
  yield delay(1000);

  const requests = getRequests();
  yield put(updateRequestsAction(requests));

  yield put(isRequestsListLoadingAction(false));
}

export function* createRequestWorker({ type, fromId, toId }: { type: string, fromId: string, toId: string }) {
  const requests = createRequest(fromId, toId);
  yield put(createRequestAction(requests));
}

export function* updateRequestWorker({ type, id, fromId, toId }: { type: string, id: string, fromId: string, toId: string }) {
  const requests = updateRequest(id, fromId, toId);
  yield put(updateRequestAction(requests));
}

export function* deleteRequestWorker({ type, id }: { type: string, id: string }) {
  const requests = deleteRequest(id);
  yield put(deleteRequestAction(requests));
}

export function* requestsWatcher() {
  yield takeEvery(FETCH_REQUESTS, requestsWorker);
  yield takeEvery(FETCH_CREATE_REQUEST, createRequestWorker);
  yield takeEvery(FETCH_UPDATE_REQUEST, updateRequestWorker);
  yield takeEvery(FETCH_DELETE_REQUEST, deleteRequestWorker);
}
