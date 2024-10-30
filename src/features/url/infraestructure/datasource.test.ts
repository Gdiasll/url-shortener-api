import { UrlDatasourceImpl } from './datasource.impl';
import { AppError } from '../../../core';
import Url from './url.model';
import { basicHash, envs } from '../../../core';
import { CreateUrlDto, UpdateUrlDto, DeleteUrlDto } from '../domain/dtos';
import { UrlEntity } from '../domain/entities/url.entity';

jest.mock('./url.model');
jest.mock('../../../core', () => ({
    ...jest.requireActual('../../../core'),
    basicHash: {
        generateHash: jest.fn(),
    },
    envs: {
        DOMAIN: 'http://example.com',
        API_PREFIX: '/api',
    },
}));

describe('UrlDatasourceImpl', () => {
    let urlDatasource: UrlDatasourceImpl;

    beforeEach(() => {
        urlDatasource = new UrlDatasourceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new URL and return the full URL', async () => {
            (basicHash.generateHash as jest.Mock).mockReturnValue('unique-code');
            (Url.create as jest.Mock).mockResolvedValueOnce({
                dataValues: { code: 'unique-code' },
            });

            const dto: CreateUrlDto = { originalUrl: 'http://original.url', userId: 'user-id' };
            const result = await urlDatasource.create(dto);

            expect(result).toBe('http://example.com/api/url/unique-code');
            expect(Url.create).toHaveBeenCalledWith({
                originalUrl: dto.originalUrl,
                code: 'unique-code',
                visits: 0,
                userId: dto.userId,
            });
        });
    });

    describe('getByCode', () => {
        it('should throw error if URL is not found', async () => {
            (Url.findOne as jest.Mock).mockResolvedValueOnce(null);

            await expect(urlDatasource.getByCode('non-existing-code'))
                .rejects.toThrow(AppError.notFound('Url was not found'));
        });

        it('should return UrlEntity and increment visits', async () => {
            const mockUrl = {
                dataValues: {
                    id: 1,
                    originalUrl: 'http://original.url',
                    code: 'existing-code',
                    visits: 5,
                    userId: 'user-id',
                },
                setAttributes: jest.fn(),
                save: jest.fn(),
            };
            (Url.findOne as jest.Mock).mockResolvedValueOnce(mockUrl);

            const result = await urlDatasource.getByCode('existing-code');

            expect(mockUrl.setAttributes).toHaveBeenCalledWith({ visits: 6 });
            expect(mockUrl.save).toHaveBeenCalled();
            expect(result).toEqual(UrlEntity.fromJson(mockUrl.dataValues));
        });
    });

    describe('getByUser', () => {
        it('should return an array of UrlEntity', async () => {
            const mockUrls = [
                { id: 1, originalUrl: 'http://original.url/1', code: 'code1', visits: 0, userId: 'user-id' },
                { id: 2, originalUrl: 'http://original.url/2', code: 'code2', visits: 0, userId: 'user-id' },
            ];
            (Url.findAll as jest.Mock).mockResolvedValueOnce(mockUrls);

            const result = await urlDatasource.getByUser('user-id');

            expect(result).toEqual(mockUrls);
        });
    });

    describe('update', () => {
        it('should throw error if URL is not found', async () => {
            (Url.update as jest.Mock).mockResolvedValueOnce([0]);

            const dto: UpdateUrlDto = { code: 'non-existing-code', userId: 'user-id', originalUrl: 'http://new.url' };
            await expect(urlDatasource.update(dto))
                .rejects.toThrow(AppError.notFound('Url was not found'));
        });

        it('should update the URL and return the full URL', async () => {
            (Url.update as jest.Mock).mockResolvedValueOnce([1]);

            const dto: UpdateUrlDto = { code: 'existing-code', userId: 'user-id', originalUrl: 'http://new.url' };
            const result = await urlDatasource.update(dto);

            expect(result).toBe('http://example.com/api/url/existing-code');
            expect(Url.update).toHaveBeenCalledWith(
                { originalUrl: dto.originalUrl },
                { where: { code: dto.code, userId: dto.userId } }
            );
        });
    });

    describe('delete', () => {
        it('should throw error if URL is not found', async () => {
            (Url.destroy as jest.Mock).mockResolvedValueOnce(0);

            const dto: DeleteUrlDto = { code: 'non-existing-code', userId: 'user-id' };
            await expect(urlDatasource.delete(dto))
                .rejects.toThrow(AppError.notFound('Url was not found'));
        });

        it('should delete the URL', async () => {
            (Url.destroy as jest.Mock).mockResolvedValueOnce(1);

            const dto: DeleteUrlDto = { code: 'existing-code', userId: 'user-id' };
            await urlDatasource.delete(dto);

            expect(Url.destroy).toHaveBeenCalledWith({ where: { code: dto.code, userId: dto.userId } });
        });
    });
});