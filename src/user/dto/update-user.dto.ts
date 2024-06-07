import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Role } from 'src/common/enums';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({
    enum: Role,
    description: 'The categories of the book',
  })
  readonly role: Role;
}
