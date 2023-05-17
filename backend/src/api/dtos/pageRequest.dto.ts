import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class PageRequestDto {
	@ApiProperty({
		name: 'size',
		required: false,
		description: 'Number of information per page\n- Default: `10`',
	})
	@IsNumberString()
	@IsOptional()
	public size?: number | 10;

	@ApiProperty({
		name: 'cursor',
		required: false,
		description: 'Cursor id\n- Default: `null`',
	})
	@IsNumberString()
	@IsOptional()
	public cursor?: number;

	@ApiProperty({
		name: 'order',
		required: false,
		description: 'Order\n- Default: `desc`',
	})
	@IsOptional()
	public order?: 'asc' | 'desc';

	constructor(size: number, cursor?: number) {
		this.size = size;
		this.cursor = cursor;
	}

	getLimit(): number {
		if (
			this.size < 1 ||
			this.size === null ||
			this.size === undefined
		) {
			this.size = 10;
		}
		
		return Number(this.size);
	}

	getOrderBy(): 'asc' | 'desc' {
		if (
			this.order !== 'asc' &&
			this.order !== 'desc'
		) {
			this.order = 'desc';
		}

		return this.order;
	}

	getPageOptions() {
		return {
			take: this.getLimit(),
			...(this.cursor && {
				cursor: { id: Number(this.cursor) }
			}),
		}
	}
}
