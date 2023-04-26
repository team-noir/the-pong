import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsDateString } from 'class-validator';

export class MyDto {
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
  public isTwoFactor: boolean;

  @ApiProperty()
  @IsBoolean()
  public isVerifiedTwoFactor: boolean;

  // TODO: remove
  @ApiProperty()
  @IsString()
  public ftUsername: string;

  @ApiProperty()
  @IsDateString()
  public createdAt: Date;

  @ApiProperty()
  @IsDateString()
  public updatedAt: Date;
}

export class FollowDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public nickname: string;

  @ApiProperty()
  @IsString()
  public status: 'online' | 'offline' | 'game';
}

export class BlockDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public nickname: string;
}
