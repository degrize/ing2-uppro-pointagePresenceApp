import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ZoneComponent } from './list/zone.component';
import { ZoneDetailComponent } from './detail/zone-detail.component';
import { ZoneUpdateComponent } from './update/zone-update.component';
import { ZoneDeleteDialogComponent } from './delete/zone-delete-dialog.component';
import { ZoneRoutingModule } from './route/zone-routing.module';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [SharedModule, ZoneRoutingModule, InputMaskModule, InputTextModule],
  declarations: [ZoneComponent, ZoneDetailComponent, ZoneUpdateComponent, ZoneDeleteDialogComponent],
})
export class ZoneModule {}
