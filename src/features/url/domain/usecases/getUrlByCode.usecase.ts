import { UrlEntity } from "../entities/url.entity";
import { UrlRepository } from "../repositories/repository";

export interface GetUrlByCodeUseCase {
    execute: (data: string) => Promise<UrlEntity>;
}

export class GetUrlByCode implements GetUrlByCodeUseCase {
    constructor(private readonly repository: UrlRepository) {}

    async execute(data: string): Promise<UrlEntity> {
        return await this.repository.getByCode(data);
    }
}