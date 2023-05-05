import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ZoneFormService } from './zone-form.service';
import { ZoneService } from '../service/zone.service';
import { IZone } from '../zone.model';

import { ZoneUpdateComponent } from './zone-update.component';

describe('Zone Management Update Component', () => {
  let comp: ZoneUpdateComponent;
  let fixture: ComponentFixture<ZoneUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let zoneFormService: ZoneFormService;
  let zoneService: ZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ZoneUpdateComponent],
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
      .overrideTemplate(ZoneUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ZoneUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    zoneFormService = TestBed.inject(ZoneFormService);
    zoneService = TestBed.inject(ZoneService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const zone: IZone = { id: 456 };

      activatedRoute.data = of({ zone });
      comp.ngOnInit();

      expect(comp.zone).toEqual(zone);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IZone>>();
      const zone = { id: 123 };
      jest.spyOn(zoneFormService, 'getZone').mockReturnValue(zone);
      jest.spyOn(zoneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ zone });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: zone }));
      saveSubject.complete();

      // THEN
      expect(zoneFormService.getZone).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(zoneService.update).toHaveBeenCalledWith(expect.objectContaining(zone));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IZone>>();
      const zone = { id: 123 };
      jest.spyOn(zoneFormService, 'getZone').mockReturnValue({ id: null });
      jest.spyOn(zoneService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ zone: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: zone }));
      saveSubject.complete();

      // THEN
      expect(zoneFormService.getZone).toHaveBeenCalled();
      expect(zoneService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IZone>>();
      const zone = { id: 123 };
      jest.spyOn(zoneService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ zone });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(zoneService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
