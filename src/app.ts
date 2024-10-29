import { envs, sequelize } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

async function main(): Promise<void> {
	// * At this point you can connect to your database for example MongoDB

	await sequelize.sync();

	const server = new Server({
		port: envs.PORT,
		apiPrefix: envs.API_PREFIX,
		routes: AppRoutes.routes
	});
	void server.start();
}
