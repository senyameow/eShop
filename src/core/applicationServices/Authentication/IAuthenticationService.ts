import { User } from "../../domain/User/User";
import { LoginRequest } from "./requests/LoginRequest";
import { SignUpRequest } from "./requests/SignUpRequest";


export interface IAuthenticationService {
    signUp(request: SignUpRequest): Promise<User>;
    login(request: LoginRequest): Promise<User>
}