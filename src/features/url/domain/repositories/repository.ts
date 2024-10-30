import { CreateUrlDto } from "../dtos/create.dto";
import { DeleteUrlDto } from "../dtos/delete.dto";
import { UpdateUrlDto } from "../dtos/update.dto";
import { UrlEntity } from "../entities/url.entity";


export abstract class UrlRepository {
    abstract create(dto: CreateUrlDto): Promise<string>;
    abstract update(dto: UpdateUrlDto): Promise<string>;
    abstract getByUser(userId: string): Promise<UrlEntity[]>;
    abstract getByCode(code: string): Promise<UrlEntity>;
    abstract delete(code: DeleteUrlDto): Promise<void>;
}