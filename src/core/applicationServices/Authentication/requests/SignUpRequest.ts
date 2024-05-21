export class SignUpRequest {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }
}