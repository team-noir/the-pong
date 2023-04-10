import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { ChannelUser } from '../models/user.model';

export class CreateChannelDto {
  @ApiProperty({
    example: 'title',
  })
  @IsString()
  public title: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  public isPrivate?: boolean;

  @ApiProperty({
    example: 'title',
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

export class ChannelDetailUserDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public nickname: string;

  @ApiProperty()
  public role: string;

  @ApiProperty()
  public isMuted: boolean;
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
    type: [ChannelDetailUserDto],
    example: [
      { id: 1, nickname: 'nickname1', role: 'owner', isMuted: false },
      { id: 2, nickname: 'nickname2', role: 'admin', isMuted: false },
      { id: 3, nickname: 'nickname3', role: 'normal', isMuted: true },
    ],
  })
  public users: ChannelDetailUserDto[];

  @ApiProperty()
  public createdAt: Date;
}

export class ChannelMessageDto {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  @IsOptional()
  public senderId?: number;

  @ApiProperty()
  @IsOptional()
  public senderNickname?: string;

  @ApiProperty()
  public isLog: boolean;

  @ApiProperty()
  public text: string;

  @ApiProperty()
  public createdAt: Date;

  constructor(id: number, text: string, sender?: ChannelUser, isLog?: boolean) {
    this.id = id;
    this.text = text;
    this.isLog = isLog;
    this.createdAt = new Date();

    if (sender) {
      this.senderId = sender.id;
      this.senderNickname = sender.name;
    }
  }
}

export class ChannelMessageTextDto {
  @ApiProperty()
  @IsString()
  public text: string;
}
