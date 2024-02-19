import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';
@ValidatorConstraint({ name: 'DateFormat', async: false })
@Injectable()
export class DateFormatValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    let [format] = args.constraints as Array<string>;
    if (!format) {
      format = defaultDateFormat;
    }

    if (value) return moment(value, format, true).isValid();

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    let [format] = args.constraints as Array<string>;
    if (!format) {
      format = defaultDateFormat;
    }

    return `Date format is invalid. Expected: ${format}`;
  }
}

/**
 * Checks if a given string is a date in the specified format.
 *
 * @param format The expected format of the date string.
 * @default
 * YYYY-MM-DD HH:mm:ss
 * @param validationOptions Optional validation options. Please check `class-validator` for further information.
 * @returns A validator decorator function that can be used to decorate a property in a DTO.
 */
export const IsDateFormat = (
  format?: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [format],
      validator: DateFormatValidator,
    });
  };
};
