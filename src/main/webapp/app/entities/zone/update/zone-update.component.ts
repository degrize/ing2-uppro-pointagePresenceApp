import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ZoneFormService, ZoneFormGroup } from './zone-form.service';
import { IZone } from '../zone.model';
import { ZoneService } from '../service/zone.service';
import { Point } from 'app/entities/enumerations/point.model';

@Component({
  selector: 'jhi-zone-update',
  templateUrl: './zone-update.component.html',
  styleUrls: ['./zone-update.component.scss'],
})
export class ZoneUpdateComponent implements OnInit {
  isSaving = false;
  zone: IZone | null = null;
  pointValues = Object.keys(Point);
  Ax = null;
  Ay = null;
  Bx = null;
  By = null;
  Cx = null;
  Cy = null;
  Dx = null;
  Dy = null;

  editForm: ZoneFormGroup = this.zoneFormService.createZoneFormGroup();

  constructor(protected zoneService: ZoneService, protected zoneFormService: ZoneFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ zone }) => {
      this.zone = zone;
      if (zone) {
        this.updateForm(zone);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const zone = this.zoneFormService.getZone(this.editForm);
    if (zone.id !== null) {
      this.subscribeToSaveResponse(this.zoneService.update(zone));
    } else {
      alert("veuillez contacter l'ADMIN");
      // this.subscribeToSaveResponse(this.zoneService.create(zone));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IZone>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(zone: IZone): void {
    this.zone = zone;
    this.zoneFormService.resetForm(this.editForm, zone);
  }
}
