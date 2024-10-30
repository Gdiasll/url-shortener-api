import { type NextFunction, type Request, type Response } from 'express';

import { HttpCode, type SuccessResponse } from '../../../core';
import { UrlRepository } from "../domain";
import { UrlEntity } from '../domain/entities/url.entity';
import { CreateUrlDto } from '../domain/dtos/create.dto';
import { CreateUrl } from '../domain/usecases/createUrl.usecase';
import { GetUrlByCode } from '../domain/usecases/getUrlByCode.usecase';
import { UserEntity } from '../../auth';
import { GetUrlByUser } from '../domain/usecases/getUrlByUser.usecase';
import { UpdateUrl } from '../domain/usecases/updateUrl.usecase';
import { UpdateUrlDto } from '../domain/dtos/update.dto';
import { DeleteUrlDto } from '../domain/dtos/delete.dto';
import { DeleteUrl } from '../domain/usecases/deleteUrl.usecase';

interface RequestBodyCreate {
    originalUrl: string;
    user?: UserEntity;
}

interface RequestBodyUpdate {
    originalUrl: string;
    user: UserEntity;
}

interface RequestAuthenticatedBody {
    user: UserEntity;
}

export class UrlController {
    constructor(private readonly repository: UrlRepository) {}

    public create = (
        req: Request<unknown, unknown, RequestBodyCreate>,
        res: Response<SuccessResponse<string>>,
        next: NextFunction
    ): void => {
        const { originalUrl, user } = req.body;
        const dto = CreateUrlDto.create({ originalUrl, userId: user?.id });
        new CreateUrl(this.repository)
            .execute(dto)
            .then((result) => res.status(HttpCode.CREATED).json({ data: result }))
            .catch(next);
    }

    public getByCode = (
        req: Request<{ code: string }>,
        res: Response<RequestRedirect>,
        next: NextFunction
    ): void => {
        const { code } = req.params;
        new GetUrlByCode(this.repository)
            .execute(code)
            .then((result) => res.redirect(result.originalUrl))
            .catch(next); 
    }

    public getByUser = (
        req: Request<unknown, unknown, RequestAuthenticatedBody>,
        res: Response<SuccessResponse<UrlEntity[]>>,
        next: NextFunction
    ): void =>  {
        const { user } = req.body;
        new GetUrlByUser(this.repository)
            .execute(user.id)
            .then((result) => res.status(HttpCode.OK).json({ data: result }))
            .catch(next);
    }
    
    public update = (
        req: Request<{ code: string }, unknown, RequestBodyUpdate>,
        res: Response<SuccessResponse<string>>,
        next: NextFunction
    ): void => {
        const { code } = req.params;
        const { originalUrl, user } = req.body;
        const dto = UpdateUrlDto.create({ originalUrl, userId: user.id, code });
        new UpdateUrl(this.repository)
            .execute(dto)
            .then((result) => res.status(HttpCode.OK).json({ data: result }))
            .catch(next);
    }

    public delete = (
        req: Request<{ code: string }, unknown, RequestAuthenticatedBody>,
        res: Response<SuccessResponse<string>>,
        next: NextFunction
    ): void => {
        const { code } = req.params;
        const { user } = req.body;
        const dto = DeleteUrlDto.create({ code, userId: user.id });
        new DeleteUrl(this.repository)
            .execute(dto)
            .then(() => res.status(HttpCode.OK).json({ data: 'Url deleted' }))
            .catch(next);
    }
}