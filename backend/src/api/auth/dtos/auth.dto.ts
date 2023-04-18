import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class twoFaDto {
  @ApiProperty()
  @IsString()
  public code: string;
}
