export class UI_UserDto {
    constructor(
        public readonly email: string,
        public readonly role: string,
        public readonly id: number,
    ) { }
}