import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

import AddressDto from "../dto/address.dto";

@Injectable()
export default class AddressValidationDtoPipe implements PipeTransform {
  async transform(value: any) {
    if (value) {
      // Parse the stringified address into a JavaScript object
      const address: AddressDto = JSON.parse(value.address);

      if (Object.keys(address).length > 0) {
        try {
          // Transform and validate the address data against AddressDto
          const addressDto = plainToClass(AddressDto, address);
          const errors: ValidationError[] = await validate(addressDto);

          if (errors.length > 0)
            throw new Error(Object.values(errors[0].constraints)[0]);

          // Return the validated AddressDto instance
          return { ...value, address };
        } catch (error) {
          throw new BadRequestException(error.message);
        }
      }

      return { ...value, address };
    }
  }
}
