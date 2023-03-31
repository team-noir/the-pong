import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  public isPrivate?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public password?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  public isDm?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public userId?: number;
}

export class SettingChannelDto {
  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public password?: string;
}

export class ChannelPasswordDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public password?: string;
}

export class ChannelRoleDto {
  @ApiProperty()
  @IsString()
  role: string;
}

export class ChannelMessageDto {
  @ApiProperty()
  @IsString()
  text: string;
}
