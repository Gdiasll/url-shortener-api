import { AppError, ValidationType, ZERO } from "../../../../core";
import { CoreDto } from "../../../shared";


export class DeleteUrlDto implements CoreDto<DeleteUrlDto> {
    private constructor(
        public code: string,
        public userId: number,
    ) {
        this.validate(this);
    }

    public validate(dto: DeleteUrlDto): void {
        const errors: ValidationType[] = [];
        const { code } = dto;

        if (!code || (code as string).length === ZERO) {
			errors.push({ constraint: 'code is required', fields: ['code'] });
        }

        if (errors.length > ZERO) throw AppError.badRequest('Error validating user data', errors);
    }

    public static create(object: Record<string, unknown>): DeleteUrlDto {
        const { code, userId } = object;
        return new DeleteUrlDto(
            code as string,
            userId as number
        );
    }
}