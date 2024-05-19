import { User } from "../../domain/User/User";
import { AddUserDto } from "./dto/AddUserDto";

export interface IUserRepository {
    addUser(dto: AddUserDto): Promise<User>;

    // TODO: find user
}