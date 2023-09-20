import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const errors = validationErrors.map((error) => ({
      name: error.property,
      errors: Object.values(error.constraints),
    }));

    throw new HttpException(
      {
        message: errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
