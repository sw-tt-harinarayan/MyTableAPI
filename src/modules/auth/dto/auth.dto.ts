import { ApiProperty } from "@nestjs/swagger";
import {
  Matches,
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
} from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "hari@test.com",
    description: "The email of your account",
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
    example: "Hari@123#",
    description: "The password of your account",
  })
  readonly password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "John Doe",
    description: "Enter your name",
  })
  readonly name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@test.com",
    description: "Enter your email",
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
    example: "**********",
    description: "Enter your password",
  })
  readonly password: string;
}
