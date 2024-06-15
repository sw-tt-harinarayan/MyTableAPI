import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumberString } from "class-validator";

export default class PaginateDto {
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
}
