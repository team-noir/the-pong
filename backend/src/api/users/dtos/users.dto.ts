import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class UserDto {
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
  public isFollowedByMyself: boolean;

  @ApiProperty()
  @IsBoolean()
  public isBlockedByMyself: boolean;

  // TODO: Type of achievements and games
  @ApiProperty()
  public achievements: any[];

  @ApiProperty()
  public games: any[];
}
