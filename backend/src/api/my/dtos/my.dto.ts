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
  public rank: number;

  @ApiProperty()
  @IsBoolean()
  public isTwoFactor: boolean;

  @ApiProperty()
  @IsString()
  public ftUsername: string;

  @ApiProperty()
  @IsDateString()
  public createdAt: Date;

  @ApiProperty()
  @IsDateString()
  public updatedAt: Date;

  @ApiProperty()
  @IsDateString()
  public deletedAt: Date;
}
