import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class AchievementDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsString()
  public condition: string;

  @ApiProperty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsDateString()
  public createdAt: Date;
}
