import { ContactUserInfo } from "./UserInfo/Contact/ContactUserInfo";
import { ProfileUserInfo } from "./UserInfo/Profile/ProfileUserInfo";
import { USER_ROLE } from "./UserRole";

export class User {
    constructor(
        // т.к. сущность, то нужен айдишник
        public readonly id: number,
        // admin or user
        public readonly role: USER_ROLE,
        // для покупок требуется
        public readonly Contact: ContactUserInfo,
        // для профиля (для покупок не требуется)
        public readonly Profile?: ProfileUserInfo,
        // эти 2 это value objects, не сущности
    ) { }
}

