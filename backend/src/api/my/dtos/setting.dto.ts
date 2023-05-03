import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Matches } from 'class-validator';

export class SettingDto {
  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/)
  public nickname: string;
}

export class CheckSettingDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public nickname?: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
