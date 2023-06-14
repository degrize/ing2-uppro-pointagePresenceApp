import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { MessageService } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';
import { IPresence } from '../entities/presence/presence.model';
import { PresenceFormGroup, PresenceFormService } from '../entities/presence/update/presence-form.service';
import { PresenceService } from '../entities/presence/service/presence.service';
import { UserManagementService } from '../admin/user-management/service/user-management.service';
import { IUser, User } from '../admin/user-management/user-management.model';
import dayjs from 'dayjs/esm';
import { HoraireType } from '../entities/enumerations/horaire-type.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  visible: boolean = false;
  user: IUser = { id: 1, login: '' };
  userId: number | null = null;
  lat: number | null = null;
  long: number | null = null;
  isSaving = false;

  horaireTypeValues = Object.keys(HoraireType);

  delimitedZone = [
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 1],
    // add more coordinates as needed
  ];
  positionUser = [0, 0];
  private readonly destroy$ = new Subject<void>();

  editForm: PresenceFormGroup = this.presenceFormService.createPresenceFormGroup();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageServiceSuccess: MessageService,
    private messageServiceDeny: MessageService,
    protected presenceFormService: PresenceFormService,
    protected presenceService: PresenceService,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {
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

  showDialog() {
    this.visible = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  checkPointInPolygon(): void {
    this.getCurrentPosition();
  }

  checkoutPointInPolygon(polygon: string | any[][], point: any[]): boolean {
    let odd = false;
    //For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
      //If a line from the point into infinity crosses this edge
      if (
        polygon[i][1] > point[1] !== polygon[j][1] > point[1] && // One point needs to be above, one below our y coordinate
        // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
        point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]
      ) {
        // Invert odd
        odd = !odd;
      }
      j = i;
    }
    //If the number of crossings was odd, the point is in the polygon
    return odd;
  }

  getCurrentPosition(): any {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
      this.positionUser = [this.lat, this.long];
      console.log(this.user);
      if (this.checkoutPointInPolygon(this.delimitedZone, this.positionUser)) {
        this.showPositionSuccessToast();
        this.save(); // On peut sauvegarder
      } else {
        this.showPositionDenyToast();
      }
    });
  }

  showPositionSuccessToast() {
    this.messageServiceSuccess.add({
      key: 'positionSuccessToast',
      severity: 'success',
      summary: 'Sticky',
      detail: 'PRESENCE ACCEPTE',
      sticky: true,
    });
  }

  showPositionDenyToast() {
    this.messageServiceDeny.add({
      key: 'positionDenyToast',
      severity: 'error',
      summary: 'Error',
      detail: "Votre presence n'a pas été enregistrée",
      sticky: true,
    });
  }

  save(): void {
    const presence = this.presenceFormService.getPresence(this.editForm);
    if (presence.id === null) {
      presence.user = this.user;
      presence.date = dayjs(); // current Time
      presence.lattitude = this.lat;
      presence.longitude = this.long;
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
    //
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    // this.isSaving = false;
  }

  clearToastDeny() {
    this.messageServiceDeny.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
