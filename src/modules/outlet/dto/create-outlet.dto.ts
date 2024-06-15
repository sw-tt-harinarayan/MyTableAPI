import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray } from "class-validator";

export default class CreateOutletDto {
  @IsNotEmpty()
  @ApiProperty({
    example: "Test Outlet",
    description: "Enter outlet name",
  })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: "1234567890",
    description: "Enter phone number",
  })
  readonly phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({
    format: "textarea",
    example: "Outlet address",
    description: "Enter address",
  })
  readonly address: string;

  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  images: Array<string>;
}
