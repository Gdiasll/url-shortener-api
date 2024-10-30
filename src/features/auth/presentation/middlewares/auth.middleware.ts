import { type Response, type NextFunction, type Request } from 'express';
import { AppError, ONE, basicJWT } from '../../../../core';

import { type AuthRepository } from '../../../auth';
import { GetUserById } from '../../domain/usecases/getUserById.usecase';

export class AuthMiddleware {
	//* Dependency injection
	constructor(private readonly repository: AuthRepository) {}

	public validateOptionalJwt = (req: Request, _: Response, next: NextFunction): void => {
		const authorization = req.header('Authorization');
		if (authorization) this.validateJWT(req, _, next)
		else next();
	}

	public validateJWT = (req: Request, _: Response, next: NextFunction): void => {
		const authorization = req.header('Authorization');

		if (!authorization) throw AppError.unauthorized('Unauthorized (no authorization header)');

		if (!authorization.startsWith('Bearer ')) {
			throw AppError.unauthorized('Invalid authorization header (Bearer token required)');
		}

		const token = authorization.split(' ').at(ONE) ?? '';
		const payload = basicJWT.validateToken<{ id: string }>(token);

		if (!payload) throw AppError.unauthorized('Invalid token');

		new GetUserById(this.repository)
			.execute(payload.id)
			.then((result) => {
				req.body.user = result;
				next();
			})
			.catch(next);
	};
}
