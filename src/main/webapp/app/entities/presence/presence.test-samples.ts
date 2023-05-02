import dayjs from 'dayjs/esm';

import { HoraireType } from 'app/entities/enumerations/horaire-type.model';

import { IPresence, NewPresence } from './presence.model';

export const sampleWithRequiredData: IPresence = {
  id: 75632,
  date: dayjs('2023-05-02T14:37'),
  horaire: HoraireType['FIN_SEMAINE'],
  longitude: 82175,
  lattitude: 3133,
};

export const sampleWithPartialData: IPresence = {
  id: 4380,
  date: dayjs('2023-05-02T01:29'),
  horaire: HoraireType['FIN_SEMAINE'],
  longitude: 8092,
  lattitude: 81306,
};

export const sampleWithFullData: IPresence = {
  id: 90716,
  date: dayjs('2023-05-02T08:14'),
  horaire: HoraireType['SOIR'],
  bilan: 'protocol',
  longitude: 75984,
  lattitude: 70527,
};

export const sampleWithNewData: NewPresence = {
  date: dayjs('2023-05-02T07:24'),
  horaire: HoraireType['MATIN'],
  longitude: 66559,
  lattitude: 97941,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
