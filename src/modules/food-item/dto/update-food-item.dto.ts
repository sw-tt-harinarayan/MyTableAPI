import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export default class UpdateFoodItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "FoodItem 1",
    description: "Enter FoodItem name",
  })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    required: true,
    example: "FoodItem description",
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
