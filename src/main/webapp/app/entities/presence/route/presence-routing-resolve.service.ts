import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPresence } from '../presence.model';
import { PresenceService } from '../service/presence.service';

@Injectable({ providedIn: 'root' })
export class PresenceRoutingResolveService implements Resolve<IPresence | null> {
  constructor(protected service: PresenceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPresence | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((presence: HttpResponse<IPresence>) => {
          if (presence.body) {
            return of(presence.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
