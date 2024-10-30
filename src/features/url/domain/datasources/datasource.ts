import { CreateUrlDto } from '../dtos/create.dto';
import { DeleteUrlDto } from '../dtos/delete.dto';
import { UrlEntity } from '../entities/url.entity';

export abstract class UrlDatasource {
	abstract create(dto: CreateUrlDto): Promise<string>;
	abstract update(dto: CreateUrlDto): Promise<string>;
    abstract delete(code: DeleteUrlDto): Promise<void>;
    abstract getByCode(code: string): Promise<UrlEntity>;
    abstract getByUser(userId: string): Promise<UrlEntity[]>;
}
