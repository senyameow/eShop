import { User } from "../../../../core/domain/User/User";
import { IUserRepository } from "../../../../core/domainServices/User/IUserRepository";
import { AddUserRequest } from "../../../../core/domainServices/User/requests/AddUserRequest";
import { FindUserByEmailRequest } from "../../../../core/domainServices/User/requests/FindUserByEmailRequest";
import { AbstractRepository } from "../common/Repository";
import { User as UserEntity } from '../../entities/User'
import { injectable } from "inversify";
import { Role } from "../../entities/Role";
import { ContactUserInfo } from "../../../../core/domain/User/UserInfo/Contact/ContactUserInfo";
import { USER_ROLE } from "../../../../core/domain/User/UserRole";

@injectable()
export class UserRepository extends AbstractRepository<UserEntity> implements IUserRepository {

    constructor() {
        super(UserEntity)
    }

    async addUser({ email, password, roleId }: AddUserRequest): Promise<User> {
        const userEntity = new UserEntity()
        userEntity.email = email
        userEntity.password = password

        const userRole = new Role()
        userRole.name = USER_ROLE.USER
        userRole.id = roleId
        userEntity.role = userRole

        const user = await this.save(userEntity)

        const contact = new ContactUserInfo(user.password, user.email)
        return new User(user.id, user.role.name as USER_ROLE, contact)
    }

    async findUserByEmail({ email }: FindUserByEmailRequest): Promise<User> {
        const user = await this._repository
            .createQueryBuilder()
            .leftJoinAndSelect('User.role', 'Role')
            .where('User.email = :email', { email })
            .getOne()


        if (!user) return null

        const contact = new ContactUserInfo(user.password, user.email)
        return new User(user.id, user.role as unknown as USER_ROLE, contact)
    }
}