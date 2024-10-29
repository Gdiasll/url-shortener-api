import { AppError, ZERO } from '../../../../core';

export class UserEntity {
	constructor(
		public id: string,
		public email: string,
		public password: string,
	) {}

	public static fromJson(obj: Record<string, unknown>): UserEntity {
		const { id, email, password} = obj;
		if (!id) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}
		if (!email || (email as string).length === ZERO) {
			throw AppError.badRequest('This entity requires an email', [
				{ constraint: 'email is required', fields: ['email'] }
			]);
		}
		if (!password || (password as string).length === ZERO) {
			throw AppError.badRequest('This entity requires a password', [
				{ constraint: 'password is required', fields: ['password'] }
			]);
		}
		return new UserEntity(
			id as string,
			email as string,
			password as string,
		);
	}
}
