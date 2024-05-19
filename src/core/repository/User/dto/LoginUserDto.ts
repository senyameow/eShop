export class LoginUserDto {
    constructor(
        public readonly email: Email,
        public readonly password: Password,
    ) { }
}