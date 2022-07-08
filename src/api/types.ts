import { TPointCoords } from '../config';

export interface IPoint {
  id: string;
  name: string;
  coordinates: TPointCoords;
}

export interface IRequest {
  id: string;
  fromId: string;
  toId: string;
}

interface IRouteResponseOk {
  status: 'OK';
  route: Array<TPointCoords>;
}

interface IRouteResponseError {
  status: 'ERROR';
  errorData: string;
}

export type IRouteResponse = IRouteResponseOk | IRouteResponseError;
