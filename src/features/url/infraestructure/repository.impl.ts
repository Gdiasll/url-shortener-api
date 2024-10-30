import { UrlRepository } from "../domain";
import { UrlDatasource } from "../domain/datasources/datasource";
import { CreateUrlDto } from "../domain/dtos/create.dto";
import { DeleteUrlDto } from "../domain/dtos/delete.dto";
import { UpdateUrlDto } from "../domain/dtos/update.dto";
import { UrlEntity } from "../domain/entities/url.entity";


export class UrlRepositoryImpl implements UrlRepository {
    constructor(private readonly datasource: UrlDatasource) {}

    public async create(dto: CreateUrlDto): Promise<string> {
        return await this.datasource.create(dto);
    }

    public async update(dto: UpdateUrlDto): Promise<string> {
        return await this.datasource.update(dto);
    }

    public async delete(code: DeleteUrlDto): Promise<void> {
        return await this.datasource.delete(code);
    }

    public async getByUser(userId: string): Promise<UrlEntity[]> {
        return await this.datasource.getByUser(userId);
    }

    public async getByCode(code: string): Promise<UrlEntity> {
        return await this.datasource.getByCode(code);
    }
}