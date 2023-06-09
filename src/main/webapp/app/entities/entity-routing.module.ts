import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'presence',
        data: { pageTitle: 'pointagePresenceApp.presence.home.title' },
        loadChildren: () => import('./presence/presence.module').then(m => m.PresenceModule),
      },
      {
        path: 'travail',
        data: { pageTitle: 'pointagePresenceApp.travail.home.title' },
        loadChildren: () => import('./travail/travail.module').then(m => m.TravailModule),
      },
      {
        path: 'zone',
        data: { pageTitle: 'pointagePresenceApp.zone.home.title' },
        loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
