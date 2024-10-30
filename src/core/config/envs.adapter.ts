import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	DOMAIN: get('DOMAIN').default('http://localhost:3000').required().asString(),
	API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	JWT_SEED: get('JWT_SEED').required().asString()
};
