import { AuthDatasourceImpl } from './datasource.impl';
import { AppError } from '../../../core';
import User from './user.model';
import { basicEncript, basicJWT } from '../../../core';
import { AuthEntity, UserEntity } from '../domain';

jest.mock('./user.model');
jest.mock('../../../core', () => ({
    ...jest.requireActual('../../../core'),
    basicEncript: {
        hashPassword: jest.fn(),
        comparePassword: jest.fn(),
    },
    basicJWT: {
        generateToken: jest.fn(),
    },
}));

describe('AuthDatasourceImpl', () => {
    let authDatasource: AuthDatasourceImpl;

    beforeEach(() => {
        authDatasource = new AuthDatasourceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('should throw error if user already exists', async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce({});

            await expect(authDatasource.register({ email: 'test@example.com', password: 'password123' }))
                .rejects.toThrow(AppError.badRequest('User already exists'));
        });

        it('should register a new user and return AuthEntity', async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce(null);
            (basicEncript.hashPassword as jest.Mock).mockReturnValue('hashedPassword');
            (authDatasource as any).createUser = jest.fn().mockResolvedValue(1);
            (basicJWT.generateToken as jest.Mock).mockReturnValue('token');

            const result = await authDatasource.register({ email: 'test@example.com', password: 'password123' });

            expect(result).toBeInstanceOf(AuthEntity);
            expect(result.token).toBe('token');
            expect((basicEncript.hashPassword as jest.Mock).mock.calls[0][0]).toBe('password123');
        });
    });

    describe('login', () => {
        it('should throw error if user not found', async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce(null);

            await expect(authDatasource.login({ email: 'test@example.com', password: 'password123' }))
                .rejects.toThrow(AppError.badRequest('User with this email not found'));
        });

        it('should throw error if password is invalid', async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce({ dataValues: { password: 'hashedPassword' } });
            (basicEncript.comparePassword as jest.Mock).mockReturnValue(false);

            await expect(authDatasource.login({ email: 'test@example.com', password: 'wrongPassword' }))
                .rejects.toThrow(AppError.badRequest('Invalid password'));
        });

        it('should login a user and return AuthEntity', async () => {
            (User.findOne as jest.Mock).mockResolvedValueOnce({ dataValues: { id: 1, email: 'test@example.com', password: 'hashedPassword' } });
            (basicEncript.comparePassword as jest.Mock).mockReturnValue(true);
            (basicJWT.generateToken as jest.Mock).mockReturnValue('token');

            const result = await authDatasource.login({ email: 'test@example.com', password: 'password123' });

            expect(result).toBeInstanceOf(AuthEntity);
            expect(result.token).toBe('token');
        });
    });

    describe('getUserById', () => {
        it('should throw error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValueOnce(null);

            await expect(authDatasource.getUserById('1'))
                .rejects.toThrow(AppError.badRequest('User with this id not found'));
        });

        it('should return UserEntity', async () => {
            const mockUser = { id: 1, email: 'test@example.com' };
            (User.findByPk as jest.Mock).mockResolvedValueOnce({ dataValues: mockUser });

            const result = await authDatasource.getUserById('1');

            expect(result).toEqual(UserEntity.fromJson(mockUser));
        });
    });
});