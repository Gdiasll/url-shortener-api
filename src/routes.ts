import { Router } from 'express';

import { AuthRoutes } from './features/auth';
import { UrlRoutes } from './features/url/presentation/router';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/auth', AuthRoutes.routes);
		router.use('/url', UrlRoutes.routes);

		// rest of routes
		// ...

		return router;
	}
}
