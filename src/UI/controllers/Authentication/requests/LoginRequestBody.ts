export class LoginRequestBody {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly fingerprint: string,
    ) { }
}