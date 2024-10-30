import { UrlEntity } from "../entities/url.entity";
import { UrlRepository } from "../repositories/repository";

export interface GetUrlByUserUseCase {
    execute: (data: string) => Promise<UrlEntity[]>;
}

export class GetUrlByUser implements GetUrlByUserUseCase {
    constructor(private readonly repository: UrlRepository) {}

    async execute(data: string): Promise<UrlEntity[]> {
        return await this.repository.getByUser(data);
    }
}