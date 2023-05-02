import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PresenceFormService } from './presence-form.service';
import { PresenceService } from '../service/presence.service';
import { IPresence } from '../presence.model';

import { PresenceUpdateComponent } from './presence-update.component';

describe('Presence Management Update Component', () => {
  let comp: PresenceUpdateComponent;
  let fixture: ComponentFixture<PresenceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let presenceFormService: PresenceFormService;
  let presenceService: PresenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PresenceUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PresenceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PresenceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    presenceFormService = TestBed.inject(PresenceFormService);
    presenceService = TestBed.inject(PresenceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const presence: IPresence = { id: 456 };

      activatedRoute.data = of({ presence });
      comp.ngOnInit();

      expect(comp.presence).toEqual(presence);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPresence>>();
      const presence = { id: 123 };
      jest.spyOn(presenceFormService, 'getPresence').mockReturnValue(presence);
      jest.spyOn(presenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ presence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: presence }));
      saveSubject.complete();

      // THEN
      expect(presenceFormService.getPresence).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(presenceService.update).toHaveBeenCalledWith(expect.objectContaining(presence));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPresence>>();
      const presence = { id: 123 };
      jest.spyOn(presenceFormService, 'getPresence').mockReturnValue({ id: null });
      jest.spyOn(presenceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ presence: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: presence }));
      saveSubject.complete();

      // THEN
      expect(presenceFormService.getPresence).toHaveBeenCalled();
      expect(presenceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPresence>>();
      const presence = { id: 123 };
      jest.spyOn(presenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ presence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(presenceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
