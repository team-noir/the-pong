import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsBoolean,
	IsOptional,
	IsNumber,
	IsArray,
} from 'class-validator';

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

