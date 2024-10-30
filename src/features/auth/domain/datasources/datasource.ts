import { type LoginUserDto, type RegisterUserDto } from '../dtos';
import { UserEntity, type AuthEntity } from '../entities';

export abstract class AuthDatasource {
	abstract register(dto: RegisterUserDto): Promise<AuthEntity>;
	abstract login(dto: LoginUserDto): Promise<AuthEntity>;
	abstract getUserById(dto: string): Promise<UserEntity>;
}
