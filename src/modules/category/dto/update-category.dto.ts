import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "Category 1",
    description: "Enter category name",
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    required: true,
    example: "Category description",
    description: "Enter description",
  })
  readonly description: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: "string",
    format: "binary",
    description: "Select your profile image",
  })
  image: string;

  @IsOptional()
  @ApiProperty({
    example: true,
    description: "Status either true or false",
  })
  isActive: boolean;
}
