export class AddUserRequest {
    constructor(
        public readonly roleId: number,
        public readonly email: string,
        public readonly password: string,
    ) { }
}
