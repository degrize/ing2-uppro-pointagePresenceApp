import dayjs from 'dayjs/esm';
import { TypeTravail } from 'app/entities/enumerations/type-travail.model';
import { IUser } from '../user/user.model';

export interface ITravail {
  id: number;
  date?: dayjs.Dayjs | null;
  typeTravail?: TypeTravail | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewTravail = Omit<ITravail, 'id'> & { id: null };
