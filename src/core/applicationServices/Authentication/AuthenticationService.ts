import { User } from "../../domain/User/User";
import { USER_ROLE } from "../../domain/User/UserRole";
import { IRoleRepository } from "../../domainServices/Role/IRoleRepository";
import { FindRoleByNameRequest } from "../../domainServices/Role/requests/FindRoleByNameRequest";
import { IUserRepository } from "../../domainServices/User/IUserRepository";
import { AddUserRequest } from "../../domainServices/User/requests/AddUserRequest";
import { IAuthenticationService } from "./IAuthenticationService";
import { SignUpRequest } from "./requests/SignUpRequest";



export class AuthenticationService implements IAuthenticationService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly roleRepository: IRoleRepository,
    ) { }

    async signUp({ email, password }: SignUpRequest): Promise<User> {
        // наш кор не знает про то, какие в БД могут быть роли
        // мы вызываем сервис ответственный за роли и просим найти роль с пользователем
        const { id: roleId } = await this.roleRepository.findRoleByName(new FindRoleByNameRequest(USER_ROLE.USER))

        // нашему приложению хочется вот так, а JWT или сессии, че угодно, не важно
        return this.userRepository.addUser(new AddUserRequest(
            +roleId,
            email,
            password
        ))
    }
}