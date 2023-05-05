import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TravailDetailComponent } from './travail-detail.component';

describe('Travail Management Detail Component', () => {
  let comp: TravailDetailComponent;
  let fixture: ComponentFixture<TravailDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravailDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ travail: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TravailDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TravailDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load travail on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.travail).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
