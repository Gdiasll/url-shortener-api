import { AppError, ZERO } from '../../../../core';

export class UrlEntity {
    constructor(
        public code: string,
        public originalUrl: string,
        public visits: number,
        public id?: number,
        public userId?: number,
    ) {}

    public static fromJson(obj: Record<string, unknown>): UrlEntity {
        const { id, code, originalUrl, visits, userId } = obj;
        if (!id) {
			throw AppError.badRequest('This entity requires an id', [
				{ constraint: 'id is required', fields: ['id'] }
			]);
		}
        if (!code || (code as string).length === ZERO) {
			throw AppError.badRequest('This entity requires an code', [
				{ constraint: 'code is required', fields: ['code'] }
			]);
		}
        if (!originalUrl || (code as string).length === ZERO) {
			throw AppError.badRequest('This entity requires an originalUrl', [
				{ constraint: 'originalUrl is required', fields: ['originalUrl'] }
			]);
		}
        if (!(visits as number > -1)) {
			throw AppError.badRequest('This entity requires an visits', [
				{ constraint: 'visits is required', fields: ['visits'] }
			]);
		}
        return new UrlEntity(
            code as string,
            originalUrl as string,
            visits as number,
            id as number,
            userId as number,
        );
    }
}