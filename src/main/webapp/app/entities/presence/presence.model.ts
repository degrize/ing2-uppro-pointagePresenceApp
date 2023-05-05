import dayjs from 'dayjs/esm';
import { HoraireType } from 'app/entities/enumerations/horaire-type.model';

export interface IPresence {
  id: number;
  date?: dayjs.Dayjs | null;
  horaire?: HoraireType | null;
  bilan?: string | null;
  longitude?: number | null;
  lattitude?: number | null;
}

export type NewPresence = Omit<IPresence, 'id'> & { id: null };
