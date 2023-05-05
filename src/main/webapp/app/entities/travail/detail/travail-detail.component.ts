import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITravail } from '../travail.model';

@Component({
  selector: 'jhi-travail-detail',
  templateUrl: './travail-detail.component.html',
})
export class TravailDetailComponent implements OnInit {
  travail: ITravail | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ travail }) => {
      this.travail = travail;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
