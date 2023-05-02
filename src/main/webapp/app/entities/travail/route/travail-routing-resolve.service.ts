import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITravail } from '../travail.model';
import { TravailService } from '../service/travail.service';

@Injectable({ providedIn: 'root' })
export class TravailRoutingResolveService implements Resolve<ITravail | null> {
  constructor(protected service: TravailService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITravail | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((travail: HttpResponse<ITravail>) => {
          if (travail.body) {
            return of(travail.body);
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
