import { User } from "../../domain/User/User";
import { IUserRepository } from "../../domainServices/User/IUserRepository";
import { AddUserRequest } from "../../domainServices/User/requests/AddUserRequest";
import { IAuthenticationService } from "./IAuthenticationService";
import { SignUpRequest } from "./requests/SignUpRequest";



export class AuthenticationService implements IAuthenticationService {
    constructor(private readonly userRepository: IUserRepository) { }

    async signUp({ email, password }: SignUpRequest): Promise<User> {
        return this.userRepository.addUser(new AddUserRequest())
    }
}