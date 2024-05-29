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
import { LoginRequest } from "./requests/LoginRequest";
import { compare } from 'bcrypt'
import { BaseError } from "../../common/errors/BaseError";
import { CoreErrors } from "../../common/errors/CoreErrors";
import { FindUserByEmailRequest } from "../../domainServices/User/requests/FindUserByEmailRequest";
import { StatusCodes } from "http-status-codes";


@injectable()
export class AuthenticationService implements IAuthenticationService {
    constructor(
        @inject(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        @inject(DOMAIN_REPOSITORIES_SYMBOLS.ROLE_REPOSITORY)
        private readonly roleRepository: IRoleRepository,
    ) { }

    async signUp({ email, password }: SignUpRequest): Promise<User> {
        const user = await this.userRepository.findUserByEmail(new FindUserByEmailRequest(email))
        if (user) {
            // TODO error-handler 
            throw new BaseError(
                CoreErrors[CoreErrors.USER_ALREADY_EXISTS],
                StatusCodes.CONFLICT
            )
        }
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

    async login({ email, password }: LoginRequest): Promise<User> {
        const user = await this.userRepository.findUserByEmail(new FindUserByEmailRequest(email))

        if (!user || !(await compare(password, user?.Contact?.password || ''))) return null

        return user
    }
}