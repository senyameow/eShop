import { User } from "../../domain/User/User";
import { GetUserByEmailRequest } from "./requests/GetUserByEmailRequest";

export interface IUserService {
    // get - получи, а сервис уже будет просить репозиторий НАЙТИ (find)
    getUserByEmail(request: GetUserByEmailRequest): Promise<User>
}