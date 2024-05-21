import { User } from "../../domain/User/User";
import { AddUserRequest } from "./requests/AddUserRequest";

export interface IUserRepository {
    addUser(request: AddUserRequest): Promise<User>
}