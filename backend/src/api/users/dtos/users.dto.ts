import { PageRequestDto } from '@/api/dtos/pageRequest.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

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
}

export class GetUserRequestDto extends PageRequestDto {
  @ApiProperty({
    name: 'q',
    required: false,
    description: 'Search users by nickname',
  })
  @IsString()
  @IsOptional()
  public q?: string;
}
