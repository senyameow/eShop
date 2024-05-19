import { USER_ROLE } from "./UserRole";

export type UserName = string
// доменная модель пользователя приложения
export class User {
    constructor(
        public readonly id: UniqueId,
        public readonly firstname: string,
        public readonly phone: Phone,
        public readonly username: UserName,
        public readonly age: number,
        public readonly role: USER_ROLE,
        public readonly email: Email,
    ) { }

    // это доменная функция, нормально ее оставить здесь
    public get isChild(): boolean {
        return this.age < 18;
    }
}