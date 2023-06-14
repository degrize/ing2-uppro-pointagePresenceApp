import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  visible: boolean = false;

  delimitedZone = [
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 1],
    // add more coordinates as needed
  ];
  positionUser = [0, 0];
  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private messageServiceSuccess: MessageService,
    private messageServiceDeny: MessageService
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
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
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      this.positionUser = [lat, long];

      if (this.checkoutPointInPolygon(this.delimitedZone, this.positionUser)) {
        this.showPositionSuccessToast();
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

  clearToastDeny() {
    this.messageServiceDeny.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
