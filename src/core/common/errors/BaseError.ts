export class BaseError implements Error {
    constructor(
        public readonly name: string = '',
        public readonly code: string = '',
        public readonly message: string = ''
    ) { }
}