import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class PageRequestDto {
	@ApiProperty({
		name: 'pageSize',
		required: false,
		description: 'Number of information per page\n- Default: `10`',
	})
	@IsNumberString()
	@IsOptional()
	public pageSize?: number | 10;

	@ApiProperty({
		name: 'pageNo',
		required: false,
		description: 'Page number\n- Default: `1`',
	})
	@IsNumberString()
	@IsOptional()
	public pageNo?: number | 1;

	@ApiProperty({
		name: 'lastId',
		required: false,
		description: 'Cursor id',
	})
	@IsNumberString()
	@IsOptional()
	public lastId?: number;

	constructor(pageSize: number, pageNo: number, lastId?: number) {
		this.pageSize = pageSize;
		this.pageNo = pageNo;
		this.lastId = lastId;
	}

	getLimit(): number {
		if (
			this.pageSize < 1 ||
			this.pageSize === null ||
			this.pageSize === undefined
		) {
			this.pageSize = 10;
		}
		
		return Number(this.pageSize);
	}

	getOffset(): number {
		if (
			this.pageNo < 1 || 
			this.pageNo === null || 
			this.pageNo === undefined
		) {
			this.pageNo = 1;
		}
	
		if (
			this.pageSize < 1 ||
			this.pageSize === null ||
			this.pageSize === undefined
		) {
			this.pageSize = 10;
		}

		return Number((this.pageNo - 1) * this.pageSize);
	}

	getPageOptions() {
		return {
			take: this.getLimit(),
			skip: Number(this.lastId) ? 1 : this.getOffset(),
			...(this.lastId && {
				cursor: { id: Number(this.lastId) }
			}),
		}
	}

}
