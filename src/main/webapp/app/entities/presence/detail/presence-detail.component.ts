import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPresence } from '../presence.model';

@Component({
  selector: 'jhi-presence-detail',
  templateUrl: './presence-detail.component.html',
})
export class PresenceDetailComponent implements OnInit {
  presence: IPresence | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ presence }) => {
      this.presence = presence;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
