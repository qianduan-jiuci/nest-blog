import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(userName = ' ', args: ValidationArguments) {
    const prisma = new PrismaClient();
    const table = args.constraints[0] as string;
    const user = await prisma[table].findFirst({
      where: {
        name: userName,
      },
    })!;
    return !Boolean(user);
  }
}

export function IsUserNotAlreadyExist(
  table: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string | symbol, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [table],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
