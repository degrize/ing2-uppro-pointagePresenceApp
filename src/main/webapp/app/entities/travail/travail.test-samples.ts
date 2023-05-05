import dayjs from 'dayjs/esm';

import { TypeTravail } from 'app/entities/enumerations/type-travail.model';

import { ITravail, NewTravail } from './travail.model';

export const sampleWithRequiredData: ITravail = {
  id: 60093,
};

export const sampleWithPartialData: ITravail = {
  id: 30454,
};

export const sampleWithFullData: ITravail = {
  id: 79685,
  date: dayjs('2023-05-05T08:32'),
  typeTravail: TypeTravail['HEBDOMADAIRE'],
};

export const sampleWithNewData: NewTravail = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
