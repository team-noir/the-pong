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
  public rank: number;

  @ApiProperty()
  @IsBoolean()
  public is_followed_by_myself: boolean;

  @ApiProperty()
  @IsBoolean()
  public is_blocked_by_myself: boolean;

  // TODO: Type of achievements and games
  @ApiProperty()
  public achievements: any[];

  @ApiProperty()
  public games: any[];
}
