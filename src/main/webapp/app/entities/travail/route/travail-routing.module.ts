import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TravailComponent } from '../list/travail.component';
import { TravailDetailComponent } from '../detail/travail-detail.component';
import { TravailUpdateComponent } from '../update/travail-update.component';
import { TravailRoutingResolveService } from './travail-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const travailRoute: Routes = [
  {
    path: '',
    component: TravailComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TravailDetailComponent,
    resolve: {
      travail: TravailRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TravailUpdateComponent,
    resolve: {
      travail: TravailRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TravailUpdateComponent,
    resolve: {
      travail: TravailRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(travailRoute)],
  exports: [RouterModule],
})
export class TravailRoutingModule {}
