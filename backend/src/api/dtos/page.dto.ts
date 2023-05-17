export class PageDto<T> {
	size: number;
	totalCount: number;
	totalPage: number;
	items: T[];
	
	constructor(totalCount: number, size: number, items: T[]) {
		this.totalCount = totalCount;
		this.size = size;
		this.totalPage = Math.ceil(totalCount / size);
		this.items = items;
	}
}
