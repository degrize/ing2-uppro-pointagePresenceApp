import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { PresenceFormService, PresenceFormGroup } from './presence-form.service';
import { IPresence } from '../presence.model';
import { PresenceService } from '../service/presence.service';
import { HoraireType } from 'app/entities/enumerations/horaire-type.model';
import { IUser, User } from '../../../admin/user-management/user-management.model';
import { UserManagementService } from '../../../admin/user-management/service/user-management.service';
import { AccountService } from '../../../core/auth/account.service';
import { Account } from '../../../core/auth/account.model';

@Component({
  selector: 'jhi-presence-update',
  templateUrl: './presence-update.component.html',
})
export class PresenceUpdateComponent implements OnInit {
  account: Account | null = null;
  isSaving = false;
  presence: IPresence | null = null;
  horaireTypeValues = Object.keys(HoraireType);
  lat: number | null = null;
  long: number | null = null;

  user: IUser = { id: 1, login: '' };
  private readonly destroy$ = new Subject<void>();

  editForm: PresenceFormGroup = this.presenceFormService.createPresenceFormGroup();

  constructor(
    protected presenceService: PresenceService,
    protected presenceFormService: PresenceFormService,
    protected activatedRoute: ActivatedRoute,
    private userManagementService: UserManagementService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ presence }) => {
      this.presence = presence;
      if (presence) {
        this.updateForm(presence);
      }
    });

    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        if (account) {
          const login = account.login;
          if (login) {
            this.userManagementService.find(login).subscribe({
              next: (res: User) => {
                if (res.id) {
                  this.user = res;
                }
              },
              error: () => 'ERREUR',
            });
          }
        }
      });
  }

  previousState(): void {
    window.history.back();
  }

  getCurrentPosition(presence: any): any {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      presence.lattitude = this.lat;
      presence.longitude = this.long;
      this.subscribeToSaveResponse(this.presenceService.create(presence));
    });
  }

  save(): void {
    this.isSaving = true;
    const presence = this.presenceFormService.getPresence(this.editForm);
    presence.user = this.user;
    if (presence.id !== null) {
      this.subscribeToSaveResponse(this.presenceService.update(presence));
    } else {
      this.getCurrentPosition(presence);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
