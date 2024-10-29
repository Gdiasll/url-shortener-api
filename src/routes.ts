import { Router } from 'express';

import { AuthRoutes } from './features/auth';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/auth', AuthRoutes.routes);

		// rest of routes
		// ...

		return router;
	}
}
