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
import AddressDto from "src/utils/dto/address.dto";

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "John Doe",
    description: "Enter your full name",
  })
  readonly fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "john@test.com",
    description: "Enter your email address",
  })
  readonly email: string;

  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/(?=.*[a-z])/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/(?=.*\d)/, {
    message: "Password must contain at least one number",
  })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: "Password must contain at least one special character",
  })
  @MinLength(8, {
    message: "Password must be at least 8 characters long",
  })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "John@123#",
    description: "Enter password",
  })
  readonly password: string;

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

  @IsOptional()
  @ApiPropertyOptional({
    type: AddressDto,
    description: "User address.",
  })
  address: AddressDto;
}
