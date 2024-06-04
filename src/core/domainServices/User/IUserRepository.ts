import { User } from "../../domain/User/User";
import { AddUserRequest } from "./requests/AddUserRequest";
import { FindUserByEmailRequest } from "./requests/FindUserByEmailRequest";

export interface IUserRepository {
    addUser(request: AddUserRequest): Promise<User>;
    findUserByEmail(request: FindUserByEmailRequest): Promise<User>;
}

