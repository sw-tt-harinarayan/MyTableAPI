import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

import { Role } from "src/configs/enums";

export function IsRoleValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "isValidRole",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const roleList: Array<string> = Object.values(Role);

          return value
            .split(",")
            .every((role: string) => roleList.includes(role));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} contains invalid roles`;
        },
      },
    });
  };
}
