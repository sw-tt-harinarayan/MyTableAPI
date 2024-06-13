import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";

export const EnumSelect = (
  enumObject: any,
  example?: any,
  description?: string,
) => {
  return applyDecorators(
    IsEnum(enumObject),
    ApiProperty({
      enum: enumObject,
      example: example,
      description: description,
    }),
  );
};
