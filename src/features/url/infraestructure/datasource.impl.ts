import { AppError, basicHash, envs, ZERO } from "../../../core";
import { UrlDatasource } from "../domain/datasources/datasource";
import { CreateUrlDto } from "../domain/dtos/create.dto";
import { DeleteUrlDto } from "../domain/dtos/delete.dto";
import { UpdateUrlDto } from "../domain/dtos/update.dto";
import { UrlEntity } from "../domain/entities/url.entity";
import Url from "./url.model";

export class UrlDatasourceImpl implements UrlDatasource{

    public async create(dto: CreateUrlDto): Promise<string> {
        const result = await Url.create({
            originalUrl: dto.originalUrl,
            code: basicHash.generateHash(),
            visits: ZERO,
            userId: dto.userId,
        });
        const { code } = result.dataValues;
        return `${envs.DOMAIN}${envs.API_PREFIX}/url/${code}`;
    }

    public async getByCode(code: string): Promise<UrlEntity> {
        const result = await Url.findOne({ where: { code } });
        if (!result) throw AppError.notFound('Url was not found');
        result.setAttributes({ visits: result.dataValues.visits +1 })
        result.save();
        const { id, originalUrl, visits, userId } = result.dataValues;
        return UrlEntity.fromJson({
            id,
            originalUrl,
            code,
            visits: visits,
            userId,
        });
    }

    public async getByUser(userId: string): Promise<UrlEntity[]> {
        const result = await Url.findAll({ where: { userId } });
        return result;
    }

    public async update(dto: UpdateUrlDto): Promise<string> {
        const { code, userId, originalUrl } = dto;
        const result = await Url.update(
            {
                originalUrl
            },
            { where: {
                    code,
                    userId
                },
            }
        );
        if (!result || result[ZERO] === 0) throw AppError.notFound('Url was not found');
        return `${envs.DOMAIN}${envs.API_PREFIX}/url/${code}`;
    }

    public async delete(dto: DeleteUrlDto): Promise<void> {
        const { code, userId } = dto;
        const result = await Url.destroy({ where: { code, userId }});
        if (!result) throw AppError.notFound('Url was not found');
        return;
    }
}