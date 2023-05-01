import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Player } from './player.dto';
import { Game } from './game.dto';

export class AddUserToQueueDto {
  @ApiProperty()
  @IsBoolean()
  public isLadder: boolean;
}

export class InviteUserToGameDto {
  @ApiProperty()
  @IsNumber()
  public userId: number;
}

export class AnswerInvitationDto {
  @ApiProperty()
  @IsBoolean()
  public isAccepted: boolean;
}

export class GameSettingPlayerDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public nickname: string;

  @ApiProperty()
  @IsNumber()
  public level: number;

  @ApiProperty()
  @IsBoolean()
  public isOwner: boolean;

  constructor(player: Player, isOwner: boolean) {
    this.id = player.userId;
    this.nickname = player.username;
    this.level = player.level;
    this.isOwner = isOwner;
  }
}

export class GameSettingInfoDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  public modeCount: number;

  @ApiProperty({
    example: 4,
  })
  @IsNumber()
  public themeCount: number;

  @ApiProperty()
  @IsNumber()
  public mode: number;

  @ApiProperty()
  @IsNumber()
  public theme: number;

  @ApiProperty({
    type: [GameSettingPlayerDto],
  })
  @IsArray()
  public players: GameSettingPlayerDto[];

  @ApiProperty()
  @IsBoolean()
  public isLadder: boolean;

  @ApiProperty()
  public createdAt: Date;

  constructor(game: Game) {
    this.id = game.gameId;
    this.mode = game.mode;
    this.theme = game.theme;
    this.isLadder = game.isLadder;
    this.createdAt = game.createdAt;
    this.players = [];

    game.players.forEach((player) => {
      const isOwner = player.userId == game.ownerId;
      this.players.push(new GameSettingPlayerDto(player, isOwner));
    });
  }
}

export class SetGameSettingDto {
  @ApiProperty()
  @IsNumber()
  mode: number;

  @ApiProperty()
  @IsNumber()
  theme: number;
}
