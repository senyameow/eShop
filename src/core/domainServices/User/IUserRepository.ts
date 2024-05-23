import { User } from "../../domain/User/User";
import { AddUserRequest } from "./requests/AddUserRequest";
import { GetUserByEmailRequest } from "./requests/GetUserByEmailRequest";

export interface IUserRepository {
    addUser(request: AddUserRequest): Promise<User>;
    getUserByEmail(request: GetUserByEmailRequest): Promise<User>;
}