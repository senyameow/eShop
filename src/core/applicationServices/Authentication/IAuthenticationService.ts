import { User } from "../../domain/User/User";
import { AuthRequest } from "./requests/AuthRequest";
import { SignUpRequest } from "./requests/SignUpRequest";


export interface IAuthenticationService {
    signUp(request: SignUpRequest): Promise<User>;
    login(request: AuthRequest): Promise<User>
}