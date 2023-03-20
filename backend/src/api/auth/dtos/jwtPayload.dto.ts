import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class JwtPayloadDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

  @ApiProperty()
  @IsString()
  public nickname: string;
}
