import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "Category 1",
    description: "Enter category name",
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    required: true,
    example: "Category description",
    description: "Enter description",
  })
  readonly description: string;

  @IsOptional()
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Select your profile image",
  })
  image: string;
}
