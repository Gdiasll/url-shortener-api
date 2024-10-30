import { UpdateUrlDto } from "../dtos/update.dto";
import { UrlRepository } from "../repositories/repository";

export interface UpdateUrlUseCase {
    execute: (data: UpdateUrlDto) => Promise<string>;
}

export class UpdateUrl implements UpdateUrlUseCase {
    constructor(private readonly repository: UrlRepository) {}

    async execute(data: UpdateUrlDto): Promise<string> {
        return await this.repository.update(data);
    }
}