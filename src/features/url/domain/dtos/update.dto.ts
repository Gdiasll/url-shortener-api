import { AppError, ValidationType, ZERO } from "../../../../core";
import { CoreDto } from "../../../shared";


export class UpdateUrlDto implements CoreDto<UpdateUrlDto> {
    private constructor(
        public code: string,
        public originalUrl: string,
        public userId: number,
    ) {
        this.validate(this);
    }

    public validate(dto: UpdateUrlDto): void {
        const errors: ValidationType[] = [];
        const { code, originalUrl } = dto;

        if (!code || (code as string).length === ZERO) {
			errors.push({ constraint: 'code is required', fields: ['code'] });
        }

        if (!originalUrl || (originalUrl as string).length === ZERO) {
			errors.push({ constraint: 'originalUrl is required', fields: ['originalUrl'] });
        }

        if (errors.length > ZERO) throw AppError.badRequest('Error validating user data', errors);
    }

    public static create(object: Record<string, unknown>): UpdateUrlDto {
        const { code, originalUrl, userId } = object;
        return new UpdateUrlDto(
            code as string,
            originalUrl as string,
            userId as number
        );
    }
}