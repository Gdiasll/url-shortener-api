
import { Model } from 'sequelize';
import { AppError, basicEncript, basicJWT } from '../../../core';
import { type RegisterUserDto, UserEntity, AuthEntity, type LoginUserDto } from '../domain';
import User from './user.model';


export class AuthDatasourceImpl {
	
	public async register(dto: RegisterUserDto): Promise<AuthEntity> {
		const user = await User.findOne({ where: { email: dto.email } });
		if (user) {
			throw AppError.badRequest('User already exists', [{ constraint: 'User already exists', fields: ['email'] }]);
		}
		const createdUser = { ...dto };
		createdUser.password = basicEncript.hashPassword(dto.password);
		const newId = await this.createUser(createdUser.email, createdUser.password);
		const { password, ...rest } = UserEntity.fromJson({ id: newId, ...createdUser});
		const token = basicJWT.generateToken({ id: newId });
		return new AuthEntity(rest, token);
	}

	public async login(dto: LoginUserDto): Promise<AuthEntity> {
		const user = await User.findOne({ where: { email: dto.email } });
		if (!user) throw AppError.badRequest('User with this email not found');
		const isPasswordMatch = basicEncript.comparePassword(dto.password, user.dataValues.password);
		if (!isPasswordMatch) throw AppError.badRequest('Invalid password');
		const { password, ...rest } = UserEntity.fromJson({ ...user.dataValues });
		const token = basicJWT.generateToken({ id: user.dataValues.id });
		return new AuthEntity(rest, token);
	}

    private async createUser(email: string, password: string): Promise<number> {
		const result = await User.create({ email, password });
        if (!result) throw AppError.internalServer;
        return result.id;
    }
}
