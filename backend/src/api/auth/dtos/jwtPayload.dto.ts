import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class JwtPayloadDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public nickname: string;

  @ApiProperty()
  @IsBoolean()
  public isTwoFactor: boolean;

  @ApiProperty()
  @IsBoolean()
  public isVerifiedTwoFactor: boolean;
}
