export class SignUpRequestBody {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }
}