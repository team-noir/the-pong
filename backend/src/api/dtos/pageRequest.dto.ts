import { IsOptional, IsString } from 'class-validator';

export class PageRequestDto {
	@IsString()
	@IsOptional()
	public pageNo?: number | 1;

	@IsString()
	@IsOptional()
	public pageSize?: number | 10;

	getOffset(): number {
		if (this.pageNo < 1 || this.pageNo === null || this.pageNo === undefined) {
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
}
