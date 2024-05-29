export class BaseError implements Error {
    constructor(
        public readonly name: string = '',
        public readonly code: number,
        public readonly message: string = ''
    ) { }
}