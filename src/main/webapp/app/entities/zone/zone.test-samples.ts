import { IZone, NewZone } from './zone.model';

export const sampleWithRequiredData: IZone = {
  id: 81853,
};

export const sampleWithPartialData: IZone = {
  id: 63773,
};

export const sampleWithFullData: IZone = {
  id: 62491,
};

export const sampleWithNewData: NewZone = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
