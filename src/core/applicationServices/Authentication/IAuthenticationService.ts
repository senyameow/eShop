import { User } from "../../domain/User/User";
import { SignUpRequest } from "./requests/SignUpRequest";


export interface IAuthenticationService {
    signUp(request: SignUpRequest): Promise<User>
}