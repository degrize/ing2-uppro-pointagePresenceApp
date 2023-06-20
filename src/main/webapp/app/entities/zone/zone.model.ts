import { Point } from 'app/entities/enumerations/point.model';

export interface IZone {
  id: number;
  nom?: string | null;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  cx: number;
  cy: number;
  dx: number;
  dy: number;
  pointA?: Point | null;
  pointB?: Point | null;
  pointC?: Point | null;
  pointD?: Point | null;
}

export type NewZone = Omit<IZone, 'id'> & { id: null };
