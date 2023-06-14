import dayjs from 'dayjs/esm';
import { HoraireType } from 'app/entities/enumerations/horaire-type.model';
import { IUser } from '../../admin/user-management/user-management.model';

export interface IPresence {
  id: number;
  date?: dayjs.Dayjs | null;
  horaire?: HoraireType | null;
  bilan?: string | null;
  longitude?: number | null;
  lattitude?: number | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewPresence = Omit<IPresence, 'id'> & { id: null };
