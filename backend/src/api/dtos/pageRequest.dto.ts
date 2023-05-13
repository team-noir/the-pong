import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class PageRequestDto {
	@ApiProperty({
		name: 'pageSize',
		required: false,
	})
	@IsNumberString()
	@IsOptional()
	public pageSize?: number | 10;

	@ApiProperty({
		name: 'pageNo',
		required: false,
	})
	@IsNumberString()
	@IsOptional()
	public pageNo?: number | 1;

	@ApiProperty({
		name: 'lastId',
		required: false,
	})
	@IsNumberString()
	@IsOptional()
	public lastId?: number;

	getLimit(): number {
		if (
			this.pageSize < 1 ||
			this.pageSize === null ||
			this.pageSize === undefined
		) {
			this.pageSize = 10;
		}
		
		return this.pageSize;
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

		return (this.pageNo - 1) * this.pageSize;
	}

	getPageOptions() {
		return {
			take: this.getLimit(),
			skip: this.lastId ? 1 : this.getOffset(),
			...(this.lastId && {
				cursor: { id: this.lastId }
			}),
		}
	}

}
