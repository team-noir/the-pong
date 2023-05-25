import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
  Matches,
} from 'class-validator';
import { ChannelUser } from '../models/user.model';
import { PageRequestDto } from '@/api/dtos/pageRequest.dto';
import { Channel } from '../models/channel.model';

export class CreateChannelDto {
  @ApiProperty({
    example: 'title',
  })
  @IsString()
  @Matches(/^.{2,25}$/)
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
  @Matches(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{4,10}$/)
  public password?: string;
}

export class ChannelListDto extends PageRequestDto {
  @ApiProperty({
    name: 'enter',
    required: false,
  })
  @IsString()
  @IsOptional()
  public enter?: string;

  @ApiProperty({
    name: 'kind',
    required: false,
    type: [String],
    example: ['public', 'private', 'dm'],
  })
  @IsArray()
  @IsOptional()
  public kind: string[];

  @ApiProperty({
		name: 'sort',
		required: false,
		description: 'sort(created, users)\n- Default: `created`',
	})
	@IsOptional()
	public sort?: 'created' | 'users';

  getConditions() {
    return {
      isEnter: this.enter != undefined,
      isPublic: this.kind && this.kind.includes('public'),
      isPriv: this.kind && this.kind.includes('private'),
      isDm: this.kind && this.kind.includes('dm'),
    };
  }

  compare(a: Channel, b: Channel) {
    let result;

    if (this.sort === 'users') {
      result = a.size() - b.size();
      if (result === 0) {
        return a.id - b.id;
      } else {
        return result;
      }
    } else if (this.sort === 'created') {
      result = a.createdAt.getTime() - b.createdAt.getTime();
      if (result === 0) {
        return a.id - b.id;
      } else {
        return result;
      }
    } else {
      return a.id - b.id;
    }
  }
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
