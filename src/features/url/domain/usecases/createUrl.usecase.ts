import { CreateUrlDto } from "../dtos/create.dto";
import { UrlRepository } from "../repositories/repository";

export interface CreateUrlUseCase {
    execute: (data: CreateUrlDto) => Promise<string>;
}

export class CreateUrl implements CreateUrlUseCase {
    constructor(private readonly repository: UrlRepository) {}

    async execute(data: CreateUrlDto): Promise<string> {
        return await this.repository.create(data);
    }
}