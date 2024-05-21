export class AddUserRequest {
    constructor(
        public readonly id: string,
        public readonly age: number,
        public readonly firstName: string,
        public readonly phone: string,
        public readonly username: string,
        public readonly roleId: number,
        public readonly email: string,
    ) { }
}
