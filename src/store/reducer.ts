import { Reducer } from '@reduxjs/toolkit';
import { ActionCreator, AnyAction } from 'redux';
import { IPoint, IRequest } from '../api/types';

export const FETCH_POINTS = 'FETCH_POINTS';
export const UPDATE_POINTS = 'UPDATE_POINTS';
export const FETCH_REQUESTS = 'FETCH_REQUESTS';
export const UPDATE_REQUESTS = 'UPDATE_REQUESTS';
export const FETCH_CREATE_REQUEST = 'FETCH_CREATE_REQUEST';
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const FETCH_UPDATE_REQUEST = 'FETCH_UPDATE_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const FETCH_DELETE_REQUEST = 'FETCH_DELETE_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const UPDATE_CHOSEN_REQUEST = 'UPDATE_CHOSEN_REQUEST';
export const IS_REQUESTS_LIST_LOADING = 'IS_REQUESTS_LIST_LOADING';
export const IS_POINTS_LIST_LOADING = 'IS_POINTS_LIST_LOADING';
export const IS_ROUTE_LOADING = 'IS_ROUTE_LOADING';

export interface IState {
  points: Array<IPoint>;
  requests: Array<IRequest>;
  chosenRequest?: IRequest;
  isRequestsListLoading: boolean;
  isPointsListLoading: boolean;
  isRouteLoading: boolean;
}

const initialState: IState = {
  points: [],
  requests: [],
  isRequestsListLoading: false,
  isPointsListLoading: false,
  isRouteLoading: false,
}

export const fetchPointsAction: ActionCreator<AnyAction> = () => {
  return { type: FETCH_POINTS };
}

export const updatePointsAction: ActionCreator<AnyAction> = (points: Array<IPoint>) => {
  return { type: UPDATE_POINTS, points };
}

export const fetchRequestsAction: ActionCreator<AnyAction> = () => {
  return { type: FETCH_REQUESTS };
}

export const updateRequestsAction: ActionCreator<AnyAction> = (requests: Array<IRequest>) => {
  return { type: UPDATE_REQUESTS, requests };
}

export const fetchCreateRequestAction: ActionCreator<AnyAction> = (fromId: string, toId: string) => {
  return { type: FETCH_CREATE_REQUEST, fromId, toId };
}

export const createRequestAction: ActionCreator<AnyAction> = (requests: Array<IRequest>) => {
  return { type: CREATE_REQUEST, requests };
}

export const fetchUpdateRequestAction: ActionCreator<AnyAction> = (id: string, fromId: string, toId: string) => {
  return { type: FETCH_UPDATE_REQUEST, id, fromId, toId };
}

export const updateRequestAction: ActionCreator<AnyAction> = (requests: Array<IRequest>) => {
  return { type: UPDATE_REQUEST, requests };
}

export const fetchDeleteRequestAction: ActionCreator<AnyAction> = (id: string) => {
  return { type: FETCH_DELETE_REQUEST, id };
}

export const deleteRequestAction: ActionCreator<AnyAction> = (requests: Array<IRequest>) => {
  return { type: DELETE_REQUEST, requests };
}

export const updateChosenRequestAction: ActionCreator<AnyAction> = (request: IRequest) => {
  return { type: UPDATE_CHOSEN_REQUEST, request };
}

export const isRequestsListLoadingAction: ActionCreator<AnyAction> = (isLoading: boolean) => {
  return { type: IS_REQUESTS_LIST_LOADING, isLoading };
}

export const isPointsListLoadingAction: ActionCreator<AnyAction> = (isLoading: boolean) => {
  return { type: IS_POINTS_LIST_LOADING, isLoading };
}

export const isRouteLoadingAction: ActionCreator<AnyAction> = (isLoading: boolean) => {
  return { type: IS_ROUTE_LOADING, isLoading };
}

export const rootReducer: Reducer<IState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POINTS:
      return {
        ...state,
        points: action.points,
      };
    case UPDATE_REQUESTS:
      return {
        ...state,
        requests: action.requests,
      };
    case CREATE_REQUEST:
      return {
        ...state,
        requests: action.requests,
      };
    case UPDATE_REQUEST:
      let newRequest;
      if (state.chosenRequest) {
        const chosenRequestId = state.chosenRequest.id;
        newRequest = action.requests.find((request: IRequest) => request.id === chosenRequestId);
      }
      return {
        ...state,
        requests: action.requests,
        chosenRequest: newRequest,
      };
    case DELETE_REQUEST: {
      let chosenRequest = state.chosenRequest;
      if (chosenRequest && !action.requests.find((request: IRequest) => request.id === chosenRequest!.id)) {
        chosenRequest = undefined;
      }
      return {
        ...state,
        requests: action.requests,
        chosenRequest,
      };
    }
    case UPDATE_CHOSEN_REQUEST:
      return {
        ...state,
        chosenRequest: {...action.request},
      };
    case IS_REQUESTS_LIST_LOADING:
      return {
        ...state,
        isRequestsListLoading: action.isLoading,
      };
    case IS_POINTS_LIST_LOADING:
      return {
        ...state,
        isPointsListLoading: action.isLoading,
      };
    case IS_ROUTE_LOADING:
      return {
        ...state,
        isRouteLoading: action.isLoading,
      };
    default:
      return state;
  }
}
