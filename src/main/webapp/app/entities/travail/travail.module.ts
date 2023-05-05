import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TravailComponent } from './list/travail.component';
import { TravailDetailComponent } from './detail/travail-detail.component';
import { TravailUpdateComponent } from './update/travail-update.component';
import { TravailDeleteDialogComponent } from './delete/travail-delete-dialog.component';
import { TravailRoutingModule } from './route/travail-routing.module';

@NgModule({
  imports: [SharedModule, TravailRoutingModule],
  declarations: [TravailComponent, TravailDetailComponent, TravailUpdateComponent, TravailDeleteDialogComponent],
})
export class TravailModule {}
