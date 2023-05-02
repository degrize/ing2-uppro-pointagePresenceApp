import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PresenceFormService, PresenceFormGroup } from './presence-form.service';
import { IPresence } from '../presence.model';
import { PresenceService } from '../service/presence.service';
import { HoraireType } from 'app/entities/enumerations/horaire-type.model';

@Component({
  selector: 'jhi-presence-update',
  templateUrl: './presence-update.component.html',
})
export class PresenceUpdateComponent implements OnInit {
  isSaving = false;
  presence: IPresence | null = null;
  horaireTypeValues = Object.keys(HoraireType);

  editForm: PresenceFormGroup = this.presenceFormService.createPresenceFormGroup();

  constructor(
    protected presenceService: PresenceService,
    protected presenceFormService: PresenceFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ presence }) => {
      this.presence = presence;
      if (presence) {
        this.updateForm(presence);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const presence = this.presenceFormService.getPresence(this.editForm);
    if (presence.id !== null) {
      this.subscribeToSaveResponse(this.presenceService.update(presence));
    } else {
      this.subscribeToSaveResponse(this.presenceService.create(presence));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresence>>): void {
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

  protected updateForm(presence: IPresence): void {
    this.presence = presence;
    this.presenceFormService.resetForm(this.editForm, presence);
  }
}
