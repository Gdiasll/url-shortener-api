import { DeleteUrlDto } from "../dtos/delete.dto";
import { UrlRepository } from "../repositories/repository";

export interface DeleteUrlUseCase {
    execute: (data: DeleteUrlDto) => Promise<void>;
}

export class DeleteUrl implements DeleteUrlUseCase {
    constructor(private readonly repository: UrlRepository) {}

    async execute(data: DeleteUrlDto): Promise<void> {
        return await this.repository.delete(data);
    }
}