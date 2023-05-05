import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PresenceComponent } from './list/presence.component';
import { PresenceDetailComponent } from './detail/presence-detail.component';
import { PresenceUpdateComponent } from './update/presence-update.component';
import { PresenceDeleteDialogComponent } from './delete/presence-delete-dialog.component';
import { PresenceRoutingModule } from './route/presence-routing.module';

@NgModule({
  imports: [SharedModule, PresenceRoutingModule],
  declarations: [PresenceComponent, PresenceDetailComponent, PresenceUpdateComponent, PresenceDeleteDialogComponent],
})
export class PresenceModule {}
