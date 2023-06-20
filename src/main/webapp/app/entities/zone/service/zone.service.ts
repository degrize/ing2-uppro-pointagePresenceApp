import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IZone, NewZone } from '../zone.model';

export type PartialUpdateZone = Partial<IZone> & Pick<IZone, 'id'>;

export type EntityResponseType = HttpResponse<IZone>;
export type EntityArrayResponseType = HttpResponse<IZone[]>;

@Injectable({ providedIn: 'root' })
export class ZoneService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/zones');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(zone: NewZone): Observable<EntityResponseType> {
    console.log(zone);
    return this.http.post<IZone>(this.resourceUrl, zone, { observe: 'response' });
  }

  update(zone: IZone): Observable<EntityResponseType> {
    return this.http.put<IZone>(`${this.resourceUrl}/${this.getZoneIdentifier(zone)}`, zone, { observe: 'response' });
  }

  partialUpdate(zone: PartialUpdateZone): Observable<EntityResponseType> {
    return this.http.patch<IZone>(`${this.resourceUrl}/${this.getZoneIdentifier(zone)}`, zone, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IZone>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZone[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getLastZone(): Observable<IZone> {
    return this.http.get<IZone>(`${this.resourceUrl}/last-zone`);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getZoneIdentifier(zone: Pick<IZone, 'id'>): number {
    return zone.id;
  }

  compareZone(o1: Pick<IZone, 'id'> | null, o2: Pick<IZone, 'id'> | null): boolean {
    return o1 && o2 ? this.getZoneIdentifier(o1) === this.getZoneIdentifier(o2) : o1 === o2;
  }

  addZoneToCollectionIfMissing<Type extends Pick<IZone, 'id'>>(
    zoneCollection: Type[],
    ...zonesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const zones: Type[] = zonesToCheck.filter(isPresent);
    if (zones.length > 0) {
      const zoneCollectionIdentifiers = zoneCollection.map(zoneItem => this.getZoneIdentifier(zoneItem)!);
      const zonesToAdd = zones.filter(zoneItem => {
        const zoneIdentifier = this.getZoneIdentifier(zoneItem);
        if (zoneCollectionIdentifiers.includes(zoneIdentifier)) {
          return false;
        }
        zoneCollectionIdentifiers.push(zoneIdentifier);
        return true;
      });
      return [...zonesToAdd, ...zoneCollection];
    }
    return zoneCollection;
  }
}
