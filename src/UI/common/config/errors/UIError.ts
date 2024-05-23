import { BaseError } from "../../../../core/common/errors/BaseError";

export class UIError extends BaseError {
    constructor(
        public readonly status: number,
        public readonly name: string,
        public readonly code: string = '',
        public readonly message: string = '',

    ) {
        super(name, code, message)
    }
}