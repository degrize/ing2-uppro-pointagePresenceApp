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
