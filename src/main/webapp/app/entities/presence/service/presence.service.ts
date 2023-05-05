import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPresence, NewPresence } from '../presence.model';

export type PartialUpdatePresence = Partial<IPresence> & Pick<IPresence, 'id'>;

type RestOf<T extends IPresence | NewPresence> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestPresence = RestOf<IPresence>;

export type NewRestPresence = RestOf<NewPresence>;

export type PartialUpdateRestPresence = RestOf<PartialUpdatePresence>;

export type EntityResponseType = HttpResponse<IPresence>;
export type EntityArrayResponseType = HttpResponse<IPresence[]>;

@Injectable({ providedIn: 'root' })
export class PresenceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/presences');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(presence: NewPresence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presence);
    return this.http
      .post<RestPresence>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(presence: IPresence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presence);
    return this.http
      .put<RestPresence>(`${this.resourceUrl}/${this.getPresenceIdentifier(presence)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(presence: PartialUpdatePresence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(presence);
    return this.http
      .patch<RestPresence>(`${this.resourceUrl}/${this.getPresenceIdentifier(presence)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPresence>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPresence[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPresenceIdentifier(presence: Pick<IPresence, 'id'>): number {
    return presence.id;
  }

  comparePresence(o1: Pick<IPresence, 'id'> | null, o2: Pick<IPresence, 'id'> | null): boolean {
    return o1 && o2 ? this.getPresenceIdentifier(o1) === this.getPresenceIdentifier(o2) : o1 === o2;
  }

  addPresenceToCollectionIfMissing<Type extends Pick<IPresence, 'id'>>(
    presenceCollection: Type[],
    ...presencesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const presences: Type[] = presencesToCheck.filter(isPresent);
    if (presences.length > 0) {
      const presenceCollectionIdentifiers = presenceCollection.map(presenceItem => this.getPresenceIdentifier(presenceItem)!);
      const presencesToAdd = presences.filter(presenceItem => {
        const presenceIdentifier = this.getPresenceIdentifier(presenceItem);
        if (presenceCollectionIdentifiers.includes(presenceIdentifier)) {
          return false;
        }
        presenceCollectionIdentifiers.push(presenceIdentifier);
        return true;
      });
      return [...presencesToAdd, ...presenceCollection];
    }
    return presenceCollection;
  }

  protected convertDateFromClient<T extends IPresence | NewPresence | PartialUpdatePresence>(presence: T): RestOf<T> {
    return {
      ...presence,
      date: presence.date?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPresence: RestPresence): IPresence {
    return {
      ...restPresence,
      date: restPresence.date ? dayjs(restPresence.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPresence>): HttpResponse<IPresence> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPresence[]>): HttpResponse<IPresence[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
