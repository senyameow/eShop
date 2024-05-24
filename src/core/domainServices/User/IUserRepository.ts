import { User } from "../../domain/User/User";
import { AddUserRequest } from "./requests/AddUserRequest";
import { FindUserByEmailRequest } from "./requests/FindUserByEmailRequest";

export interface IUserRepository {
    addUser(request: AddUserRequest): Promise<User>;
    // репозиторий пытается НАЙТИ - find, а сервис будет принимать запросы на get - получить, как он его получит не волнует
    // такой нейминг мне кажется лучше 
    findUserByEmail(request: FindUserByEmailRequest): Promise<User>;
}