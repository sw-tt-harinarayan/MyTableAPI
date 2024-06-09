import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumberString, IsEnum } from "class-validator";

import { SortByUser } from "src/configs/enums";

export class PaginateUserDto {
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    type: "number",
    description: "Page number",
  })
  page: number;

  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    example: 10,
    type: "number",
    description: "Per page data",
  })
  limit: number;

  @IsEnum(SortByUser)
  @IsOptional()
  @ApiPropertyOptional({
    enum: SortByUser,
    type: "string",
    description: "Sort by",
    example: SortByUser.CREATED_DESC,
  })
  sort: SortByUser;
}
