import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITravail, NewTravail } from '../travail.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITravail for edit and NewTravailFormGroupInput for create.
 */
type TravailFormGroupInput = ITravail | PartialWithRequiredKeyOf<NewTravail>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITravail | NewTravail> = Omit<T, 'date'> & {
  date?: string | null;
};

type TravailFormRawValue = FormValueOf<ITravail>;

type NewTravailFormRawValue = FormValueOf<NewTravail>;

type TravailFormDefaults = Pick<NewTravail, 'id' | 'date'>;

type TravailFormGroupContent = {
  id: FormControl<TravailFormRawValue['id'] | NewTravail['id']>;
  date: FormControl<TravailFormRawValue['date']>;
  typeTravail: FormControl<TravailFormRawValue['typeTravail']>;
};

export type TravailFormGroup = FormGroup<TravailFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TravailFormService {
  createTravailFormGroup(travail: TravailFormGroupInput = { id: null }): TravailFormGroup {
    const travailRawValue = this.convertTravailToTravailRawValue({
      ...this.getFormDefaults(),
      ...travail,
    });
    return new FormGroup<TravailFormGroupContent>({
      id: new FormControl(
        { value: travailRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      date: new FormControl(travailRawValue.date),
      typeTravail: new FormControl(travailRawValue.typeTravail),
    });
  }

  getTravail(form: TravailFormGroup): ITravail | NewTravail {
    return this.convertTravailRawValueToTravail(form.getRawValue() as TravailFormRawValue | NewTravailFormRawValue);
  }

  resetForm(form: TravailFormGroup, travail: TravailFormGroupInput): void {
    const travailRawValue = this.convertTravailToTravailRawValue({ ...this.getFormDefaults(), ...travail });
    form.reset(
      {
        ...travailRawValue,
        id: { value: travailRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TravailFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertTravailRawValueToTravail(rawTravail: TravailFormRawValue | NewTravailFormRawValue): ITravail | NewTravail {
    return {
      ...rawTravail,
      date: dayjs(rawTravail.date, DATE_TIME_FORMAT),
    };
  }

  private convertTravailToTravailRawValue(
    travail: ITravail | (Partial<NewTravail> & TravailFormDefaults)
  ): TravailFormRawValue | PartialWithRequiredKeyOf<NewTravailFormRawValue> {
    return {
      ...travail,
      date: travail.date ? travail.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
