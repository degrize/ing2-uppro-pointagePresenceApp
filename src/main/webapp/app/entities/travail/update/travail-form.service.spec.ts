import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../travail.test-samples';

import { TravailFormService } from './travail-form.service';

describe('Travail Form Service', () => {
  let service: TravailFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravailFormService);
  });

  describe('Service methods', () => {
    describe('createTravailFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTravailFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            typeTravail: expect.any(Object),
          })
        );
      });

      it('passing ITravail should create a new form with FormGroup', () => {
        const formGroup = service.createTravailFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            typeTravail: expect.any(Object),
          })
        );
      });
    });

    describe('getTravail', () => {
      it('should return NewTravail for default Travail initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createTravailFormGroup(sampleWithNewData);

        const travail = service.getTravail(formGroup) as any;

        expect(travail).toMatchObject(sampleWithNewData);
      });

      it('should return NewTravail for empty Travail initial value', () => {
        const formGroup = service.createTravailFormGroup();

        const travail = service.getTravail(formGroup) as any;

        expect(travail).toMatchObject({});
      });

      it('should return ITravail', () => {
        const formGroup = service.createTravailFormGroup(sampleWithRequiredData);

        const travail = service.getTravail(formGroup) as any;

        expect(travail).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITravail should not enable id FormControl', () => {
        const formGroup = service.createTravailFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTravail should disable id FormControl', () => {
        const formGroup = service.createTravailFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
