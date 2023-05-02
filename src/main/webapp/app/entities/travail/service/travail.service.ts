import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITravail, NewTravail } from '../travail.model';

export type PartialUpdateTravail = Partial<ITravail> & Pick<ITravail, 'id'>;

type RestOf<T extends ITravail | NewTravail> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestTravail = RestOf<ITravail>;

export type NewRestTravail = RestOf<NewTravail>;

export type PartialUpdateRestTravail = RestOf<PartialUpdateTravail>;

export type EntityResponseType = HttpResponse<ITravail>;
export type EntityArrayResponseType = HttpResponse<ITravail[]>;

@Injectable({ providedIn: 'root' })
export class TravailService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/travails');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(travail: NewTravail): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(travail);
    return this.http
      .post<RestTravail>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(travail: ITravail): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(travail);
    return this.http
      .put<RestTravail>(`${this.resourceUrl}/${this.getTravailIdentifier(travail)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(travail: PartialUpdateTravail): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(travail);
    return this.http
      .patch<RestTravail>(`${this.resourceUrl}/${this.getTravailIdentifier(travail)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTravail>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTravail[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTravailIdentifier(travail: Pick<ITravail, 'id'>): number {
    return travail.id;
  }

  compareTravail(o1: Pick<ITravail, 'id'> | null, o2: Pick<ITravail, 'id'> | null): boolean {
    return o1 && o2 ? this.getTravailIdentifier(o1) === this.getTravailIdentifier(o2) : o1 === o2;
  }

  addTravailToCollectionIfMissing<Type extends Pick<ITravail, 'id'>>(
    travailCollection: Type[],
    ...travailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const travails: Type[] = travailsToCheck.filter(isPresent);
    if (travails.length > 0) {
      const travailCollectionIdentifiers = travailCollection.map(travailItem => this.getTravailIdentifier(travailItem)!);
      const travailsToAdd = travails.filter(travailItem => {
        const travailIdentifier = this.getTravailIdentifier(travailItem);
        if (travailCollectionIdentifiers.includes(travailIdentifier)) {
          return false;
        }
        travailCollectionIdentifiers.push(travailIdentifier);
        return true;
      });
      return [...travailsToAdd, ...travailCollection];
    }
    return travailCollection;
  }

  protected convertDateFromClient<T extends ITravail | NewTravail | PartialUpdateTravail>(travail: T): RestOf<T> {
    return {
      ...travail,
      date: travail.date?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTravail: RestTravail): ITravail {
    return {
      ...restTravail,
      date: restTravail.date ? dayjs(restTravail.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTravail>): HttpResponse<ITravail> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTravail[]>): HttpResponse<ITravail[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
