import { USER_ROLE } from "./UserRole";

export type UserName = string

export class User {
    constructor(
        public readonly id: UniqueId,
        public readonly age: number,
        public readonly firstName: string,
        public readonly phone: Phone,
        public readonly username: UserName,
        public readonly role: USER_ROLE,
        public readonly email: Email,
    ) { }
}
