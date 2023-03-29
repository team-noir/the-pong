import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SettingDto {
  @ApiProperty()
  @IsString()
  public nickname: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
