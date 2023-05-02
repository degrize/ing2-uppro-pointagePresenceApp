import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TravailFormService, TravailFormGroup } from './travail-form.service';
import { ITravail } from '../travail.model';
import { TravailService } from '../service/travail.service';
import { TypeTravail } from 'app/entities/enumerations/type-travail.model';

@Component({
  selector: 'jhi-travail-update',
  templateUrl: './travail-update.component.html',
})
export class TravailUpdateComponent implements OnInit {
  isSaving = false;
  travail: ITravail | null = null;
  typeTravailValues = Object.keys(TypeTravail);

  editForm: TravailFormGroup = this.travailFormService.createTravailFormGroup();

  constructor(
    protected travailService: TravailService,
    protected travailFormService: TravailFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ travail }) => {
      this.travail = travail;
      if (travail) {
        this.updateForm(travail);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const travail = this.travailFormService.getTravail(this.editForm);
    if (travail.id !== null) {
      this.subscribeToSaveResponse(this.travailService.update(travail));
    } else {
      this.subscribeToSaveResponse(this.travailService.create(travail));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITravail>>): void {
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

  protected updateForm(travail: ITravail): void {
    this.travail = travail;
    this.travailFormService.resetForm(this.editForm, travail);
  }
}
