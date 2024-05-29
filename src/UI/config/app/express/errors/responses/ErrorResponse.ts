

export class ErrorResponse {
    constructor(
        public readonly code: number,
        public readonly message: string,
    ) { }
}