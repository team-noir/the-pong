import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SettingDto {
  @ApiProperty()
  @IsString()
  public nickname: string;
}
