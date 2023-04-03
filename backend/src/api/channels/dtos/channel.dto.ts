import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNumber, IsArray } from 'class-validator';

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
}

export class ChannelDmDto {
  @ApiProperty()
  @IsString()
  public title: string;
}

export class SettingChannelDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public title?: string;

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

export class ChannelUserStatusDto {
  @ApiProperty()
  @IsString()
  status: string;
}

export class ChannelMessageDto {
  @ApiProperty()
  @IsString()
  text: string;
}

export class ChannelInviteDto {
  @ApiProperty()
  @IsNumber()
  @IsArray()
  userIds: number[];
}
