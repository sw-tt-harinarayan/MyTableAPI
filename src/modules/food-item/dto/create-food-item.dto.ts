import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export default class CreateFoodItemDto {
  @IsNotEmpty()
  @ApiProperty({
    example: "Food Item 1",
    description: "Enter Food Item name",
  })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "666abda2a4251298064749d0",
    description: "Enter FoodItem name",
  })
  readonly category: string;

  @ApiPropertyOptional({
    example: "Food Item description",
    description: "Enter description",
  })
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 100,
    description: "Enter price",
  })
  @Type(() => Number)
  readonly price: number;

  @ApiProperty({ type: "array", items: { type: "string", format: "binary" } })
  images: Array<string>;
}
