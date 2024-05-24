import { inject, injectable } from "inversify";
import { User } from "../../domain/User/User";
import { IUserRepository } from "../../domainServices/User/IUserRepository";
import { IUserService } from "./IUserService";
import { GetUserByEmailRequest } from "./requests/GetUserByEmailRequest";
import { DOMAIN_REPOSITORIES_SYMBOLS } from "../../SYMBOLS";
import { FindUserByEmailRequest } from "../../domainServices/User/requests/FindUserByEmailRequest";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(DOMAIN_REPOSITORIES_SYMBOLS.USER_REPOSITORY) private readonly userRepository: IUserRepository
    ) { }

    async getUserByEmail({ email }: GetUserByEmailRequest): Promise<User> {
        return await this.userRepository.findUserByEmail(new FindUserByEmailRequest(email))
    }
}