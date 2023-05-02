import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../presence.test-samples';

import { PresenceFormService } from './presence-form.service';

describe('Presence Form Service', () => {
  let service: PresenceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresenceFormService);
  });

  describe('Service methods', () => {
    describe('createPresenceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPresenceFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            horaire: expect.any(Object),
            bilan: expect.any(Object),
            longitude: expect.any(Object),
            lattitude: expect.any(Object),
          })
        );
      });

      it('passing IPresence should create a new form with FormGroup', () => {
        const formGroup = service.createPresenceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            horaire: expect.any(Object),
            bilan: expect.any(Object),
            longitude: expect.any(Object),
            lattitude: expect.any(Object),
          })
        );
      });
    });

    describe('getPresence', () => {
      it('should return NewPresence for default Presence initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPresenceFormGroup(sampleWithNewData);

        const presence = service.getPresence(formGroup) as any;

        expect(presence).toMatchObject(sampleWithNewData);
      });

      it('should return NewPresence for empty Presence initial value', () => {
        const formGroup = service.createPresenceFormGroup();

        const presence = service.getPresence(formGroup) as any;

        expect(presence).toMatchObject({});
      });

      it('should return IPresence', () => {
        const formGroup = service.createPresenceFormGroup(sampleWithRequiredData);

        const presence = service.getPresence(formGroup) as any;

        expect(presence).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPresence should not enable id FormControl', () => {
        const formGroup = service.createPresenceFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPresence should disable id FormControl', () => {
        const formGroup = service.createPresenceFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
