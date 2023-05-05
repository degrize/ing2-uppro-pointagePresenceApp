import { Point } from 'app/entities/enumerations/point.model';

export interface IZone {
  id: number;
  pointA?: Point | null;
  pointB?: Point | null;
  pointC?: Point | null;
  pointD?: Point | null;
}

export type NewZone = Omit<IZone, 'id'> & { id: null };
