// // // // email-exists.validator.ts
// // import {
// //   registerDecorator,
// //   ValidationOptions,
// //   ValidatorConstraint,
// //   ValidatorConstraintInterface,
// // } from "class-validator";
// // import { Inject, Injectable } from "@nestjs/common";
// // import UserService from "src/modules/user/user.service";

// // @Injectable()
// // @ValidatorConstraint({ name: "emailExists", async: true })
// // export class EmailExistsValidator implements ValidatorConstraintInterface {
// //   constructor(@Inject(UserService) private readonly userService: UserService) {} // Inject UserService here

// //   async validate(email: string) {
// //     const user = await this.userService.findByEmail(email);
// //     return !user; // Return true if email does not exist, false otherwise
// //   }

// //   defaultMessage() {
// //     return "Email already exists";
// //   }
// // }

// // export function EmailExists(validationOptions?: ValidationOptions) {
// //   return function (object: Record<string, any>, propertyName: string) {
// //     registerDecorator({
// //       target: object.constructor,
// //       propertyName: propertyName,
// //       options: validationOptions,
// //       constraints: [],
// //       validator: EmailExistsValidator,
// //     });
// //   };
// // }

// // email-exists.validator.ts
// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from "class-validator";
// import { Inject, Injectable } from "@nestjs/common";
// import UserService from "src/modules/user/user.service";
// // import { UserService } from './user.service';

// @Injectable()
// @ValidatorConstraint({ name: "emailExists", async: true })
// export class EmailExistsValidator implements ValidatorConstraintInterface {
//   constructor(@Inject(UserService) private readonly userService: UserService) {} // Inject UserService here

//   async validate(email: string) {
//     const user = await this.userService.findByEmail(email);
//     return !user; // Return true if email does not exist, false otherwise
//   }

//   defaultMessage() {
//     return "Email already exists";
//   }
// }

// export function EmailExists(validationOptions?: ValidationOptions) {
//   return function (object: Record<string, any>, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: EmailExistsValidator,
//     });
//   };
// }
