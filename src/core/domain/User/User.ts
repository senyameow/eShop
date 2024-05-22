import { ContactUserInfo } from "./UserInfo/Contact/ContactUserInfo";
import { ProfileUserInfo } from "./UserInfo/Profile/ProfileUserInfo";
import { USER_ROLE } from "./UserRole";

export class User {
    constructor(
        // т.к. сущность, то нужен айдишник
        public readonly id: number,
        // admin or user
        public readonly role: USER_ROLE,
        // для профиля (для покупок не требуется)
        // public readonly age: number,
        // public readonly firstName: string,
        // public readonly lastName: string,
        // public readonly username: string,
        // для покупок требуется
        // public readonly phone: string,
        // public readonly email: string,
        // public readonly password: string,
        public readonly Contact: ContactUserInfo,
        public readonly Profile?: ProfileUserInfo,
        // эти 2 это VO, не сущности
    ) { }
}