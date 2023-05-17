export class PageDto<T> {
	totalCount: number;
	data: T[];
	paging: {
		prevCursor: number | null;
		nextCursor: number | null;
	}

	constructor(totalCount: number, data: T[]) {
		this.totalCount = totalCount;
		this.data = data;
	}

	setPaging(prevCursor: number | null, nextCursor: number | null) {
		this.paging = {
			prevCursor,
			nextCursor,
		};
	}
}
