import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';
import * as CryptoJS from 'crypto-js'

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
	@IsString()
	@IsOptional()
	public cursor?: string | null;

	@ApiProperty({
		name: 'order',
		required: false,
		description: 'Order\n- Default: `desc`',
	})
	@IsOptional()
	public order?: 'asc' | 'desc';

	constructor(size: number) {
		this.size = size;
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

	getCursor(): { cursor: Object } | null {
		if (!this.cursor) {
			return null;
		}

		var bytes  = CryptoJS.AES.decrypt(this.cursor, process.env.CURSOR_SECRET);
		var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

		return { cursor: decryptedData };
	}

	checkCursor(order: 'desc' | 'asc', item: Object | null) {
		const decryptedCursor = this.getCursor();
		if (!decryptedCursor) {
			return true;
		}

		const cursorKeys = Object.keys(decryptedCursor.cursor);

		for (const key of cursorKeys) {
			if (order === 'asc') {
				if (item[key] < decryptedCursor['cursor'][key]) {
					return false;
				}
			} else {
				if (item[key] > decryptedCursor['cursor'][key]) {
					return false;
				}
			}
		}

		return true;
	}

	getPageOptions() {
		return {
			take: this.getLimit(),
			...(this.cursor && this.getCursor()),
		}
	}
}
