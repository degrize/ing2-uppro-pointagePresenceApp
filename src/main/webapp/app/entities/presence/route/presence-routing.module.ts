import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PresenceComponent } from '../list/presence.component';
import { PresenceDetailComponent } from '../detail/presence-detail.component';
import { PresenceUpdateComponent } from '../update/presence-update.component';
import { PresenceRoutingResolveService } from './presence-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const presenceRoute: Routes = [
  {
    path: '',
    component: PresenceComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PresenceDetailComponent,
    resolve: {
      presence: PresenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PresenceUpdateComponent,
    resolve: {
      presence: PresenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PresenceUpdateComponent,
    resolve: {
      presence: PresenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(presenceRoute)],
  exports: [RouterModule],
})
export class PresenceRoutingModule {}
