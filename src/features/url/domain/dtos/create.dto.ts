import { AppError, ValidationType, ZERO } from "../../../../core";
import { CoreDto } from "../../../shared";


export class CreateUrlDto implements CoreDto<CreateUrlDto> {
    private constructor(
        public originalUrl: string,
        public userId?: number,
    ) {
        this.validate(this);
    }

    public validate(dto: CreateUrlDto): void {
        const errors: ValidationType[] = [];
        const { originalUrl } = dto;

        if (!originalUrl || (originalUrl as string).length === ZERO) {
			errors.push({ constraint: 'originalUrl is required', fields: ['originalUrl'] });
        }

        if (errors.length > ZERO) throw AppError.badRequest('Error validating user data', errors);
    }

    public static create(object: Record<string, unknown>): CreateUrlDto {
        const { originalUrl, userId } = object;
        return new CreateUrlDto(
            originalUrl as string,
            userId as number
        );
    }

}