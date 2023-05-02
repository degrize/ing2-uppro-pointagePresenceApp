import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PresenceDetailComponent } from './presence-detail.component';

describe('Presence Management Detail Component', () => {
  let comp: PresenceDetailComponent;
  let fixture: ComponentFixture<PresenceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresenceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ presence: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PresenceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PresenceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load presence on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.presence).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
