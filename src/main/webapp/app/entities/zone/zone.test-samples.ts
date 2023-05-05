import { Point } from 'app/entities/enumerations/point.model';

import { IZone, NewZone } from './zone.model';

export const sampleWithRequiredData: IZone = {
  id: 81853,
};

export const sampleWithPartialData: IZone = {
  id: 68743,
  pointA: Point['X'],
  pointB: Point['X'],
  pointD: Point['X'],
};

export const sampleWithFullData: IZone = {
  id: 23005,
  pointA: Point['X'],
  pointB: Point['X'],
  pointC: Point['X'],
  pointD: Point['X'],
};

export const sampleWithNewData: NewZone = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
