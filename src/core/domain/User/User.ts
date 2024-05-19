import { USER_ROLE } from "./UserRole";

export type UserName = string
// доменная модель пользователя приложения
export type User = {
    id: UniqueId;
    firstname: string;
    lastName?: string;
    username: UserName;
    email: Email;
    age: number;
    role: USER_ROLE
}

// это доменная функция, нормально ее оставить здесь
export function isChild(user: User): boolean {
    return user.age < 18
}