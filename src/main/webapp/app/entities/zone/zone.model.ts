export interface IZone {
  id: number;
}

export type NewZone = Omit<IZone, 'id'> & { id: null };
