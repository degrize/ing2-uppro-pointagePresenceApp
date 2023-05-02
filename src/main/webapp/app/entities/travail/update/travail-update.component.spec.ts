import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TravailFormService } from './travail-form.service';
import { TravailService } from '../service/travail.service';
import { ITravail } from '../travail.model';

import { TravailUpdateComponent } from './travail-update.component';

describe('Travail Management Update Component', () => {
  let comp: TravailUpdateComponent;
  let fixture: ComponentFixture<TravailUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let travailFormService: TravailFormService;
  let travailService: TravailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TravailUpdateComponent],
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
      .overrideTemplate(TravailUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TravailUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    travailFormService = TestBed.inject(TravailFormService);
    travailService = TestBed.inject(TravailService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const travail: ITravail = { id: 456 };

      activatedRoute.data = of({ travail });
      comp.ngOnInit();

      expect(comp.travail).toEqual(travail);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITravail>>();
      const travail = { id: 123 };
      jest.spyOn(travailFormService, 'getTravail').mockReturnValue(travail);
      jest.spyOn(travailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ travail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: travail }));
      saveSubject.complete();

      // THEN
      expect(travailFormService.getTravail).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(travailService.update).toHaveBeenCalledWith(expect.objectContaining(travail));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITravail>>();
      const travail = { id: 123 };
      jest.spyOn(travailFormService, 'getTravail').mockReturnValue({ id: null });
      jest.spyOn(travailService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ travail: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: travail }));
      saveSubject.complete();

      // THEN
      expect(travailFormService.getTravail).toHaveBeenCalled();
      expect(travailService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITravail>>();
      const travail = { id: 123 };
      jest.spyOn(travailService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ travail });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(travailService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
