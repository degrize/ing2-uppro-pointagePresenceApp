import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IZone, NewZone } from '../zone.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IZone for edit and NewZoneFormGroupInput for create.
 */
type ZoneFormGroupInput = IZone | PartialWithRequiredKeyOf<NewZone>;

type ZoneFormDefaults = Pick<NewZone, 'id'>;

type ZoneFormGroupContent = {
  id: FormControl<IZone['id'] | NewZone['id']>;
  ax: FormControl<IZone['ax']>;
  ay: FormControl<IZone['ay']>;
  bx: FormControl<IZone['bx']>;
  by: FormControl<IZone['by']>;
  cx: FormControl<IZone['cx']>;
  cy: FormControl<IZone['cy']>;
  dx: FormControl<IZone['dx']>;
  dy: FormControl<IZone['dy']>;
  nom: FormControl<IZone['nom']>;
  pointA: FormControl<IZone['pointA']>;
  pointB: FormControl<IZone['pointB']>;
  pointC: FormControl<IZone['pointC']>;
  pointD: FormControl<IZone['pointD']>;
};

export type ZoneFormGroup = FormGroup<ZoneFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ZoneFormService {
  createZoneFormGroup(zone: ZoneFormGroupInput = { id: null }): ZoneFormGroup {
    const zoneRawValue = {
      ...this.getFormDefaults(),
      ...zone,
    };
    return new FormGroup<ZoneFormGroupContent>({
      id: new FormControl(
        { value: zoneRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      pointA: new FormControl(zoneRawValue.pointA),
      nom: new FormControl(zoneRawValue.nom, {
        validators: [Validators.required],
      }),
      ax: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      ay: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      bx: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      by: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cx: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      cy: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      dx: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      dy: new FormControl(0.0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      pointB: new FormControl(zoneRawValue.pointB),
      pointC: new FormControl(zoneRawValue.pointC),
      pointD: new FormControl(zoneRawValue.pointD),
    });
  }

  getZone(form: ZoneFormGroup): IZone | NewZone {
    return form.getRawValue() as IZone | NewZone;
  }

  resetForm(form: ZoneFormGroup, zone: ZoneFormGroupInput): void {
    const zoneRawValue = { ...this.getFormDefaults(), ...zone };
    form.reset(
      {
        ...zoneRawValue,
        id: { value: zoneRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ZoneFormDefaults {
    return {
      id: null,
    };
  }
}
