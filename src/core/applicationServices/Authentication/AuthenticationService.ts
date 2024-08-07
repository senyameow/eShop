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
import { compare, genSalt, hash } from 'bcrypt'
import { BaseError } from "../../common/errors/BaseError";
import { CoreErrors } from "../../common/errors/CoreErrors";
import { FindUserByEmailRequest } from "../../domainServices/User/requests/FindUserByEmailRequest";
import { StatusCodes } from "http-status-codes";


@injectable()
export class AuthenticationService implements IAuthenticationService {
    constructor(
        // внедряем нужные репозитории спомощью декоратора @inject
        @inject(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        @inject(DOMAIN_REPOSITORIES_SYMBOLS.ROLE_REPOSITORY)
        private readonly roleRepository: IRoleRepository,
    ) { }

    async signUp({ email, password }: SignUpRequest): Promise<User> {
        const user = await this.userRepository.findUserByEmail(new FindUserByEmailRequest(email))
        if (user) {
            throw new BaseError(
                CoreErrors[CoreErrors.USER_ALREADY_EXISTS],
                StatusCodes.CONFLICT
            )
        }
        const { id: roleId } = await this.roleRepository.findRoleByName(new FindRoleByNameRequest(USER_ROLE.USER))

        const salt = await genSalt(+process.env.SALT)
        const hashedPassword = await hash(password, salt)

        return this.userRepository.addUser(new AddUserRequest(
            +roleId,
            email,
            hashedPassword
        ))
    }

    async login({ email, password }: LoginRequest): Promise<User | null> {
        const user = await this.userRepository.findUserByEmail(new FindUserByEmailRequest(email))

        if (!user || !(await compare(password, user?.Contact?.password || ''))) return null

        return user
    }
}
