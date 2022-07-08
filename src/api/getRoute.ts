import axios from "axios";
import { TPointCoords, routing_api_url } from "../config";
import { IRouteResponse } from './types';

export async function getRoute(start: TPointCoords, end: TPointCoords): Promise<IRouteResponse> {
  try {
    const response = await axios.get(routing_api_url(start, end));

    if (response.status === 200) {
      const coords = response.data.features[0].geometry.coordinates[0];
      return { status: 'OK', route: coords.map((point: TPointCoords) => [point[1], point[0]]) };
    }
    else {
      return {
        status: 'ERROR',
        errorData: response.statusText,
      };
    }

  } catch (error) {
    return {
      status: 'ERROR',
      errorData: 'Ошибка сервера, попробуйте построить маршрут позже'
    };
  }
}
