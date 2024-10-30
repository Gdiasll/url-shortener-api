import { Router } from 'express';

import { UrlController } from './controller';
import { UrlDatasourceImpl, UrlRepositoryImpl } from '../infraestructure';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';

export class UrlRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new UrlDatasourceImpl();
		const repository = new UrlRepositoryImpl(datasource);
		const authDatasource = new AuthDatasourceImpl();
		const authRepository = new AuthRepositoryImpl(authDatasource)
		const authMiddleware = new AuthMiddleware(authRepository);
		const controller = new UrlController(repository);

		router.post('/', authMiddleware.validateOptionalJwt, controller.create);
        router.get('/:code', controller.getByCode);
        router.get('/', authMiddleware.validateJWT, controller.getByUser);
		router.put('/:code', authMiddleware.validateJWT, controller.update);
        router.delete('/:code', authMiddleware.validateJWT, controller.delete);

		return router;
	}
}
