import * as CryptoJS from 'crypto-js'

export class PageDto<T> {
	totalCount: number;
	data: T[];
	paging: {
		prevCursor: string | null;
		nextCursor: string | null;
	}

	constructor(totalCount: number, data: T[]) {
		this.totalCount = totalCount;
		this.data = data;
		this.paging = {
			prevCursor: null,
			nextCursor: null,
		};
	}

	setPaging(prevCursor: string | null, nextCursor: string | null) {
		this.paging = {
			prevCursor,
			nextCursor,
		};
	}

	setCursor(cursor: Object | null, isPrev: Boolean) {
		if (!cursor) {
			return;
		}

		const cryptedCursor = CryptoJS.AES.encrypt(JSON.stringify(cursor), process.env.CURSOR_SECRET).toString();

		console.log(cryptedCursor);
		if (isPrev) {
			this.paging = {
				...this.paging,
				prevCursor: cryptedCursor,
			}
		} else {
			this.paging = {
				...this.paging,
				nextCursor: cryptedCursor,
			}
		}

		console.log(this.paging);
	}
}
