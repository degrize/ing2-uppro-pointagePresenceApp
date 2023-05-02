import dayjs from 'dayjs/esm';
import { TypeTravail } from 'app/entities/enumerations/type-travail.model';

export interface ITravail {
  id: number;
  date?: dayjs.Dayjs | null;
  typeTravail?: TypeTravail | null;
}

export type NewTravail = Omit<ITravail, 'id'> & { id: null };
