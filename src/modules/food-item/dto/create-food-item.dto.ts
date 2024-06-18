import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export default class CreateFoodItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "FoodItem 1",
    description: "Enter FoodItem name",
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    required: true,
    example: "FoodItem description",
    description: "Enter description",
  })
  readonly description: string;

  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Select your profile image",
  })
  images: string;
}
