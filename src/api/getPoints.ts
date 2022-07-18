import { TPointCoords } from '../config';
import dbPoints from '../db/points.json';
import { IPoint } from './types';

export function getPoints(): Array<IPoint> {
  const points: Array<IPoint> = dbPoints.map((point) => ({ ...point, coordinates: point.coordinates as TPointCoords }));
  return points;
}
