import { UserName } from "../../../domain/User/User";

export class AddUserDto {
    constructor(
        public readonly email: Email,
        public readonly password: Password,
        public readonly username: UserName,
    ) { }
}