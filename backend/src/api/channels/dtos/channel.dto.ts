import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({
    example: "title"
  })
  @IsString()
  public title: string;

  @ApiProperty({
    example: true
  })
  @IsBoolean()
  @IsOptional()
  public isPrivate?: boolean;

  @ApiProperty({
    example: "title"
  })
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
  public role: string;
}

export class ChannelUserStatusDto {
  @ApiProperty()
  @IsString()
  public status: 'kick' | 'ban' | 'mute';
}

export class ChannelMessageDto {
  @ApiProperty()
  @IsString()
  public text: string;
}

export class ChannelInviteDto {
  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  public userIds: number[];
}

export class ChannelIdDto {
  @ApiProperty()
  @IsNumber()
  public id: number;
}

export class ChannelInfoDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public isProtected: boolean;

  @ApiProperty()
  public isPrivate: boolean;

  @ApiProperty()
  public isDm: boolean;

  @ApiProperty()
  public dmUserId: number;

  @ApiProperty()
  public userCount: number;

  @ApiProperty()
  public isJoined: boolean;

  @ApiProperty()
  public createdAt: Date;
}

export class ChannelDetailDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public isProtected: boolean;

  @ApiProperty()
  public isPrivate: boolean;

  @ApiProperty()
  public isDm: boolean;
  
  @ApiProperty()
  public isBlocked: boolean;
  
  @ApiProperty()
  public isJoined: boolean;
  
  @ApiProperty()
  public userCount: number;
  
  @ApiProperty({
    type: [Number],
    example: [1, 2, 3],
  })
  public users: number[];

  @ApiProperty()
  public createdAt: Date;
}
