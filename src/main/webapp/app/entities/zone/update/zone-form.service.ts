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
    });
  }

  getZone(form: ZoneFormGroup): IZone | NewZone {
    if (form.controls.id.disabled) {
      // form.value returns id with null value for FormGroup with only one FormControl
      return {};
    }
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
