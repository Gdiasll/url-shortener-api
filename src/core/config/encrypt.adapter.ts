import { createHash, randomBytes } from 'crypto';

import { TEN } from '../constants';

const salt = randomBytes(TEN).toString('hex');

export const basicEncript = {

	hashPassword: (password: string): string => {
		const hash = createHash('sha256')
			.update(salt + password)
			.digest('hex');

		return hash;
	},

	comparePassword: (password: string, hash: string): boolean => {
		const newHash = createHash('sha256')
			.update(salt + password)
			.digest('hex');

		return newHash === hash;
	}
};
