import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  Matches,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from "class-validator";

import { Role } from "src/configs/enums";
import { IsRoleValid } from "src/utils/decorators/role-validation.decorator";

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "John Doe",
    description: "Enter your full name",
  })
  readonly fullName: string;

  @IsEmail()
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

  @IsRoleValid({ message: "Role is not valid" })
  @ApiProperty({
    type: "array",
    items: {
      type: "string",
      enum: Object.values(Role),
    },
    example: [Role.CUSTOMER],
    description: "Select user roles (multiple selections allowed).",
  })
  readonly roles: Role[];

  @IsOptional()
  @ApiPropertyOptional({
    type: "string",
    format: "textarea",
    description: "User address.",
  })
  address: string;
}
