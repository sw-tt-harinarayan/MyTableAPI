import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  Matches,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

import { Role } from "src/configs/enums";

export default class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    required: true,
    example: "John Doe",
    description: "Enter your full name",
  })
  readonly fullName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    required: true,
    example: "john@test.com",
    description: "Enter your email address",
  })
  readonly email: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: "string",
    format: "binary",
    description: "Select your profile image",
  })
  profileImage: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({
    enum: Role,
    example: Role.CUSTOMER,
    description: "Select user role.",
  })
  readonly role: Role;
}
