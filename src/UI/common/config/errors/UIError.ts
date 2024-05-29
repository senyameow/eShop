import { BaseError } from "../../../../core/common/errors/BaseError";

export class UIError extends BaseError {
    constructor(
        public readonly code: number,
        public readonly name: string,
        public readonly message: string = '',

    ) {
        super(name, code, message)
    }
}