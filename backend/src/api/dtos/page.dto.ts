export class PageDto<T> {
	pageSize: number;
	totalCount: number;
	totalPage: number;
	items: T[];
	constructor(totalCount: number, pageSize: number, items: T[]) {
		this.totalCount = totalCount;
		this.pageSize = pageSize;
		this.totalPage = Math.ceil(totalCount / pageSize);
		this.items = items;
	}
}
