import {
	type RegisterUserDto,
	type AuthRepository,
	type AuthEntity,
	type AuthDatasource,
	type LoginUserDto,
} from '../domain';

export class AuthRepositoryImpl implements AuthRepository {
	constructor(private readonly datasource: AuthDatasource) {}

	public async register(dto: RegisterUserDto): Promise<AuthEntity> {
		return await this.datasource.register(dto);
	}

	public async login(dto: LoginUserDto): Promise<AuthEntity> {
		return await this.datasource.login(dto);
	}

	public async getUserById(dto: string): Promise<UserEntity> {
		return await this.datasource.getUserById(dto);
	}
}
