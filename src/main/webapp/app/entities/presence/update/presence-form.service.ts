import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPresence, NewPresence } from '../presence.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPresence for edit and NewPresenceFormGroupInput for create.
 */
type PresenceFormGroupInput = IPresence | PartialWithRequiredKeyOf<NewPresence>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPresence | NewPresence> = Omit<T, 'date'> & {
  date?: string | null;
};

type PresenceFormRawValue = FormValueOf<IPresence>;

type NewPresenceFormRawValue = FormValueOf<NewPresence>;

type PresenceFormDefaults = Pick<NewPresence, 'id' | 'date'>;

type PresenceFormGroupContent = {
  id: FormControl<PresenceFormRawValue['id'] | NewPresence['id']>;
  date: FormControl<PresenceFormRawValue['date']>;
  horaire: FormControl<PresenceFormRawValue['horaire']>;
  bilan: FormControl<PresenceFormRawValue['bilan']>;
  longitude: FormControl<PresenceFormRawValue['longitude']>;
  lattitude: FormControl<PresenceFormRawValue['lattitude']>;
};

export type PresenceFormGroup = FormGroup<PresenceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PresenceFormService {
  createPresenceFormGroup(presence: PresenceFormGroupInput = { id: null }): PresenceFormGroup {
    const presenceRawValue = this.convertPresenceToPresenceRawValue({
      ...this.getFormDefaults(),
      ...presence,
    });
    return new FormGroup<PresenceFormGroupContent>({
      id: new FormControl(
        { value: presenceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      date: new FormControl(presenceRawValue.date, {
        validators: [Validators.required],
      }),
      horaire: new FormControl(presenceRawValue.horaire, {
        validators: [Validators.required],
      }),
      bilan: new FormControl(presenceRawValue.bilan),
      longitude: new FormControl(presenceRawValue.longitude, {
        validators: [Validators.required],
      }),
      lattitude: new FormControl(presenceRawValue.lattitude, {
        validators: [Validators.required],
      }),
    });
  }

  getPresence(form: PresenceFormGroup): IPresence | NewPresence {
    return this.convertPresenceRawValueToPresence(form.getRawValue() as PresenceFormRawValue | NewPresenceFormRawValue);
  }

  resetForm(form: PresenceFormGroup, presence: PresenceFormGroupInput): void {
    const presenceRawValue = this.convertPresenceToPresenceRawValue({ ...this.getFormDefaults(), ...presence });
    form.reset(
      {
        ...presenceRawValue,
        id: { value: presenceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PresenceFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertPresenceRawValueToPresence(rawPresence: PresenceFormRawValue | NewPresenceFormRawValue): IPresence | NewPresence {
    return {
      ...rawPresence,
      date: dayjs(rawPresence.date, DATE_TIME_FORMAT),
    };
  }

  private convertPresenceToPresenceRawValue(
    presence: IPresence | (Partial<NewPresence> & PresenceFormDefaults)
  ): PresenceFormRawValue | PartialWithRequiredKeyOf<NewPresenceFormRawValue> {
    return {
      ...presence,
      date: presence.date ? presence.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
