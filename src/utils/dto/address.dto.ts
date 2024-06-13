import { IsNotEmpty } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export default class AddressDto {
  @IsNotEmpty({ message: "Street is required" })
  @ApiPropertyOptional({
    example: "Area",
  })
  readonly street: string;

  @IsNotEmpty({ message: "City is required" })
  @ApiPropertyOptional({
    example: "City",
  })
  readonly city: string;

  @IsNotEmpty({ message: "State is required" })
  @ApiPropertyOptional({
    example: "State",
  })
  readonly state: string;

  @IsNotEmpty({ message: "Country is required" })
  @ApiPropertyOptional({
    example: "country",
  })
  readonly country: string;

  @IsNotEmpty({ message: "ZipCode is required" })
  @ApiPropertyOptional({
    example: "123456",
  })
  readonly zipCode: string;
}
