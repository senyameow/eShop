import { inject, injectable } from "inversify";
import { User } from "../../domain/User/User";
import { USER_ROLE } from "../../domain/User/UserRole";
import { IRoleRepository } from "../../domainServices/Role/IRoleRepository";
import { FindRoleByNameRequest } from "../../domainServices/Role/requests/FindRoleByNameRequest";
import { IUserRepository } from "../../domainServices/User/IUserRepository";
import { AddUserRequest } from "../../domainServices/User/requests/AddUserRequest";
import { IAuthenticationService } from "./IAuthenticationService";
import { SignUpRequest } from "./requests/SignUpRequest";
import { DOMAIN_REPOSITORIES_SYMBOLS } from "../../SYMBOLS";
import { AuthRequest } from "./requests/AuthRequest";
import { GetUserByEmailRequest } from "../../domainServices/User/requests/GetUserByEmailRequest";


@injectable()
export class AuthenticationService implements IAuthenticationService {
    constructor(
        @inject(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        @inject(DOMAIN_REPOSITORIES_SYMBOLS.ROLE_REPOSITORY)
        private readonly roleRepository: IRoleRepository,
    ) { }

    async signUp({ email, password }: SignUpRequest): Promise<User> {
        const user = await this.userRepository.getUserByEmail(new GetUserByEmailRequest(email))
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

    async login({ email, password }: AuthRequest): Promise<User> {
        const user = await this.userRepository.getUserByEmail(new GetUserByEmailRequest(email))

    }
}